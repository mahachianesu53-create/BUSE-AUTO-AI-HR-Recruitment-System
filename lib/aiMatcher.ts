import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

const evaluationSchema = z.object({
  decision: z.enum(["ACCEPT", "REJECT"]),
  matchScore: z.number().min(0).max(100),
  reasoning: z.string(),
  keyStrengths: z.array(z.string()),
  gaps: z.array(z.string()),
});

export async function evaluateCandidate(resumeText: string, job: { title: string; description: string; requirements: string[] }) {
  try {
    const prompt = `You are an expert HR recruiter evaluating candidates for a job position.

Job Title: ${job.title}
Job Description: ${job.description}
Job Requirements: ${job.requirements.join(", ")}

Candidate's Resume/CV:
${resumeText}

Please evaluate if the candidate qualifies for this job based on the requirements. Provide a match score from 0-100, decision to ACCEPT or REJECT, reasoning, key strengths, and gaps.

Provide a detailed evaluation in the specified JSON format.`;

    const result = await generateObject({
      model: google("gemini-1.5-flash-latest"),
      schema: evaluationSchema,
      prompt,
    });

    return result.object;
  } catch (error) {
    console.error("[v0] Error evaluating candidate:", error);
    // Fallback evaluation if AI fails
    return {
      decision: "REJECT" as const,
      matchScore: 0,
      reasoning: "Error processing resume. Please try again.",
      keyStrengths: [],
      gaps: ["Unable to process"],
    };
  }
}
