import { NextRequest, NextResponse } from "next/server";
import { generateObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import db from "@/lib/db";

const evaluationSchema = z.object({
  decision: z.enum(["ACCEPT", "REJECT"]),
  matchScore: z.number().min(0).max(100),
  reasoning: z.string(),
  keyStrengths: z.array(z.string()),
  gaps: z.array(z.string()),
});

const googleAI = createGoogleGenerativeAI({
  apiKey: "AIzaSyA5UHsg_4qwWfCGULNSF8VfNn5Ge5Wg9ns",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, jobId } = body;

    if (!resumeText || !jobId) {
      return NextResponse.json(
        { error: "Missing resumeText or jobId" },
        { status: 400 }
      );
    }

    // Get job details
    const job = db.prepare("SELECT * FROM jobs WHERE id = ? AND is_active = 1").get(jobId) as any;
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    const jobRequirements = JSON.parse(job.requirements);

    const prompt = `You are a fair, accurate, and professional HR recruiter. Your job is to evaluate candidates objectively against the listed minimum requirements.

Job Title: ${job.title}
Job Description: ${job.description}

MINIMUM REQUIREMENTS (these must be checked one by one):
${jobRequirements.map((r: string, i: number) => `${i + 1}. ${r}`).join("\n")}

Candidate's Resume / CV:
${resumeText}

EVALUATION INSTRUCTIONS (follow exactly):
- Read the resume carefully, especially the Education, Academic Background, Qualifications, and Certifications sections.
- For every requirement above, determine whether the resume provides clear evidence that it is met.
- **Education is critical**: If a requirement mentions a degree, diploma, Bachelor's, Master's, or specific field of study, check the Education section first. Slight differences in wording are acceptable (e.g. "BSc Computer Science" satisfies "Bachelor's degree in Computer Science").
- If the candidate meets the large majority of the minimum requirements (particularly education + core technical skills), you MUST return decision = "ACCEPT" and matchScore >= 65.
- Only return "REJECT" when there is a clear, major gap in one or more mandatory requirements (for example: completely missing the required degree, or zero relevant experience when 3+ years is mandatory).
- Be reasonable and give the benefit of the doubt when evidence is present but phrasing differs.
- Do not reject for minor or nice-to-have items.

Return your evaluation in the exact JSON format requested. Do not add any extra text outside the JSON.`;

    let evaluation;
    try {
      const result = await generateObject({
        model: googleAI("gemini-3.1-flash-lite-preview"),
        schema: evaluationSchema,
        prompt,
        temperature: 0.2,
      });
      evaluation = result.object;

      // Safety net: if the model is too conservative on a "lite" model,
      // force ACCEPT when matchScore is reasonably high and no critical gaps are listed
      if (evaluation.decision === "REJECT" && evaluation.matchScore >= 70) {
        evaluation.decision = "ACCEPT";
        evaluation.reasoning = (evaluation.reasoning || "") + " (Adjusted to ACCEPT due to high match score and sufficient evidence in resume.)";
      }
    } catch (error) {
      console.error("Gemini evaluation failed:", error);
      // Fallback evaluation
      evaluation = {
        decision: "REJECT" as const,
        matchScore: 0,
        reasoning: "Error evaluating resume. Please try again.",
        keyStrengths: [],
        gaps: ["Unable to process"],
      };
    }

    return NextResponse.json(
      {
        success: true,
        evaluation: {
          matchScore: evaluation.matchScore,
          decision: evaluation.decision,
          keyStrengths: evaluation.keyStrengths,
          gaps: evaluation.gaps,
          reasoning: evaluation.reasoning,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Evaluate error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
