import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth";

const googleAI = createGoogleGenerativeAI({
  apiKey: "AIzaSyA5UHsg_4qwWfCGULNSF8VfNn5Ge5Wg9ns",
});

// Native Google client for reliable PDF extraction (avoids AI SDK message schema issues with files)
const nativeGenAI = new GoogleGenerativeAI("AIzaSyA5UHsg_4qwWfCGULNSF8VfNn5Ge5Wg9ns");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 }
      );
    }

    console.log("[v0] Extracting text from file:", file.name);

    let extractedText = "";

    if (file.type === "application/pdf") {
      try {
        // Use native Google Generative AI SDK for reliable PDF extraction
        const arrayBuffer = await file.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');

        const model = nativeGenAI.getGenerativeModel({
          model: "gemini-3.1-flash-lite-preview",
        });

        const result = await model.generateContent([
          {
            text: "Extract the FULL text content from this PDF resume. Be especially thorough with the Education, Academic Qualifications, Degrees, Diplomas, Certifications, and any sections mentioning educational status, institutions, graduation years, and fields of study. Also include experience, skills, and projects. Preserve all important details accurately.",
          },
          {
            inlineData: {
              data: base64,
              mimeType: "application/pdf",
            },
          },
        ]);

        extractedText = result.response.text();
      } catch (error) {
        console.error("Gemini PDF extraction failed:", error);
        // Fallback: return a message
        extractedText = "Unable to extract text from PDF. Please try a different file format or contact support.";
      }
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      // Use mammoth for Word documents
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      extractedText = result.value;

      try {
        // Use Gemini to clean the text
        const cleanResult = await generateText({
          model: googleAI("gemini-3.1-flash-lite-preview"),
          prompt: `Extract and clean the FULL text from this resume. Pay special attention to preserving the complete Education / Academic / Qualifications section (degrees, diplomas, institutions, years, fields of study). Also keep experience, skills, and certifications. Remove only headers, footers, and irrelevant formatting:\n\n${extractedText}`,
        });
        extractedText = cleanResult.text;
      } catch (error) {
        console.error("Gemini text cleaning failed:", error);
        // Keep the extracted text
      }
    } else {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        text: extractedText,
        filename: file.name,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Extract text error:", error);
    return NextResponse.json(
      { error: "Failed to extract text from file" },
      { status: 500 }
    );
  }
}
