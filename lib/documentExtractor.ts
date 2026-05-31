import mammoth from "mammoth";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  try {
    const result = await generateText({
      model: google("gemini-1.5-flash-latest"),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Extract all the text content from this PDF document. Include all resume details like experience, skills, education, etc." },
            { type: "image", image: uint8Array, mimeType: "application/pdf" }
          ]
        }
      ]
    });
    return result.text;
  } catch (error) {
    console.error("Error extracting text from PDF with Gemini:", error);
    throw new Error("Failed to extract text from PDF. Please try a different file.");
  }
}

export async function extractTextFromDocx(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const rawText = result.value;

  // Use Gemini to clean and extract the main text
  try {
    const geminiResult = await generateText({
      model: google("gemini-1.5-flash-latest"),
      prompt: `Extract and clean the main text from this resume, removing any headers, footers, or irrelevant content. Focus on the candidate's experience, skills, education, and qualifications:\n\n${rawText}`,
    });
    return geminiResult.text;
  } catch (error) {
    console.error("Error using Gemini for text extraction:", error);
    return rawText; // Fallback to raw text
  }
}

export async function extractTextFromDocument(file: File): Promise<string> {
  const fileType = file.type;

  if (fileType === "application/pdf") {
    return extractTextFromPDF(file);
  } else if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileType === "application/msword"
  ) {
    return extractTextFromDocx(file);
  } else {
    throw new Error(
      "Unsupported file type. Please upload a PDF or Word document."
    );
  }
}
