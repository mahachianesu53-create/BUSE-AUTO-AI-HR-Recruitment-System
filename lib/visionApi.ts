import fs from "fs";
import path from "path";

const GOOGLE_API_KEY = "AIzaSyA5UHsg_4qwWfCGULNSF8VfNn5Ge5Wg9ns";

interface DocumentAnnotation {
  text?: string;
  error?: string;
}

// Extract text from image/PDF using Google Vision API
export async function extractTextFromDocument(
  filePath: string
): Promise<{ text: string; error?: string }> {
  try {
    // Read file and convert to base64
    const fileBuffer = fs.readFileSync(filePath);
    const base64Image = fileBuffer.toString("base64");

    // Determine MIME type from file extension
    const ext = path.extname(filePath).toLowerCase();
    let mimeType = "image/jpeg";

    if (ext === ".pdf") {
      mimeType = "application/pdf";
    } else if (ext === ".png") {
      mimeType = "image/png";
    } else if (ext === ".gif") {
      mimeType = "image/gif";
    } else if (ext === ".webp") {
      mimeType = "image/webp";
    } else if ([".doc", ".docx"].includes(ext)) {
      // For Word documents, we'll use a fallback
      return extractTextFromWordFallback(filePath);
    }

    // Call Google Vision API
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: "DOCUMENT_TEXT_DETECTION",
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("[v0] Vision API error:", error);
      return {
        text: "",
        error: `Vision API error: ${response.status}`,
      };
    }

    const result = await response.json() as any;

    if (
      result.responses &&
      result.responses[0] &&
      result.responses[0].fullTextAnnotation
    ) {
      const text = result.responses[0].fullTextAnnotation.text || "";
      return { text };
    }

    return { text: "", error: "No text found in document" };
  } catch (error) {
    console.error("[v0] Text extraction error:", error);
    return { text: "", error: String(error) };
  }
}

// Fallback for Word documents
function extractTextFromWordFallback(filePath: string): {
  text: string;
  error?: string;
} {
  try {
    // For Word files, we'll do a simple extraction as a fallback
    // In production, you'd use a library like mammoth or python-docx
    const buffer = fs.readFileSync(filePath);
    const text = buffer.toString("utf-8", 0, Math.min(10000, buffer.length));

    // Filter out binary data
    const cleanText = text
      .replace(/[^\x20-\x7E\n\r\t]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    return {
      text: cleanText || "Unable to extract text from Word document",
    };
  } catch (error) {
    return {
      text: "",
      error: `Failed to extract from Word file: ${String(error)}`,
    };
  }
}

// Extract text from buffer (for uploaded files)
export async function extractTextFromBuffer(
  buffer: Buffer,
  filename: string
): Promise<{ text: string; error?: string }> {
  try {
    // Save buffer to temporary file
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const tempPath = path.join(tempDir, `temp_${Date.now()}_${filename}`);
    fs.writeFileSync(tempPath, buffer);

    // Extract text from temporary file
    const result = await extractTextFromDocument(tempPath);

    // Clean up temporary file
    fs.unlinkSync(tempPath);

    return result;
  } catch (error) {
    console.error("[v0] Buffer extraction error:", error);
    return { text: "", error: String(error) };
  }
}
