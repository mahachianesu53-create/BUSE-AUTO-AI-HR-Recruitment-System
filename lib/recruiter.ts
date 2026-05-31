import db from "./db";

export interface EvaluationResult {
  matchScore: number;
  decision: "ACCEPT" | "REJECT";
  strengths: string[];
  gaps: string[];
  reasoning: string;
}

// Get job requirements from database
function getJobRequirements(jobId: string): string[] {
  const job = db.prepare("SELECT requirements FROM jobs WHERE id = ?").get(jobId) as any;
  
  if (!job) return [];

  try {
    return JSON.parse(job.requirements);
  } catch {
    return [];
  }
}

// Normalize text for comparison
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .trim();
}

// Calculate keyword match percentage
function calculateKeywordMatches(
  resumeText: string,
  requirements: string[]
): {
  matchedRequirements: string[];
  unmatchedRequirements: string[];
  matchPercentage: number;
} {
  const normalizedResume = normalizeText(resumeText);
  const matchedRequirements: string[] = [];
  const unmatchedRequirements: string[] = [];

  for (const requirement of requirements) {
    const normalizedReq = normalizeText(requirement);
    const keywords = normalizedReq.split(/\s+/).filter((k) => k.length > 2);

    // Check how many keywords from requirement are in resume
    const matchedKeywords = keywords.filter((keyword) =>
      normalizedResume.includes(keyword)
    );

    if (matchedKeywords.length / keywords.length >= 0.5) {
      matchedRequirements.push(requirement);
    } else {
      unmatchedRequirements.push(requirement);
    }
  }

  const matchPercentage =
    requirements.length > 0
      ? Math.round((matchedRequirements.length / requirements.length) * 100)
      : 0;

  return { matchedRequirements, unmatchedRequirements, matchPercentage };
}

// Evaluate resume against job requirements
export function evaluateResume(
  resumeText: string,
  jobId: string
): EvaluationResult {
  // Get job requirements
  const requirements = getJobRequirements(jobId);

  if (requirements.length === 0) {
    return {
      matchScore: 50,
      decision: "REJECT",
      strengths: [],
      gaps: [],
      reasoning: "No job requirements found for evaluation",
    };
  }

  // Calculate keyword matches
  const { matchedRequirements, unmatchedRequirements, matchPercentage } =
    calculateKeywordMatches(resumeText, requirements);

  // Additional scoring factors
  let scoreBonus = 0;

  // Check for years of experience indicators
  const experienceMatch = resumeText.match(/(\d+)\s*(?:\+)?\s*years?/gi);
  if (experienceMatch) {
    scoreBonus += 5;
  }

  // Check for education level
  if (
    /bachelor|master|phd|degree|university|college/i.test(resumeText)
  ) {
    scoreBonus += 5;
  }

  // Check for certifications
  if (/certification|certified|certificate|accredited/i.test(resumeText)) {
    scoreBonus += 3;
  }

  // Final score calculation
  let finalScore = Math.min(100, matchPercentage + scoreBonus);

  // Adjust score based on minimum requirements met
  const minRequirementsMet = matchedRequirements.length >= Math.ceil(requirements.length * 0.5);

  // Decision logic
  let decision: "ACCEPT" | "REJECT";

  if (finalScore >= 70 && minRequirementsMet) {
    decision = "ACCEPT";
  } else if (finalScore >= 50 && matchedRequirements.length > 0) {
    decision = "ACCEPT"; // Give second chance if some requirements met
  } else {
    decision = "REJECT";
  }

  // Build reasoning
  const reasoning = buildReasoning(
    finalScore,
    matchedRequirements,
    unmatchedRequirements,
    decision
  );

  return {
    matchScore: Math.round(finalScore),
    decision,
    strengths: matchedRequirements,
    gaps: unmatchedRequirements,
    reasoning,
  };
}

// Build evaluation reasoning
function buildReasoning(
  score: number,
  matched: string[],
  unmatched: string[],
  decision: string
): string {
  let reasoning = `Evaluation Score: ${score}%. `;

  if (matched.length > 0) {
    reasoning += `Matched requirements: ${matched
      .slice(0, 3)
      .join(", ")}${matched.length > 3 ? `, and ${matched.length - 3} more` : ""}. `;
  }

  if (unmatched.length > 0) {
    reasoning += `Missing requirements: ${unmatched
      .slice(0, 2)
      .join(", ")}${unmatched.length > 2 ? `, and ${unmatched.length - 2} more` : ""}. `;
  }

  if (decision === "ACCEPT") {
    reasoning += "Candidate meets minimum qualifications and is recommended for interview.";
  } else {
    reasoning += "Candidate does not meet minimum required qualifications at this time.";
  }

  return reasoning;
}

// Batch evaluate applications
export function batchEvaluateApplications(
  jobId: string
): {
  evaluated: number;
  accepted: number;
  rejected: number;
} {
  const applications = db
    .prepare(
      `SELECT * FROM applications 
       WHERE job_id = ? AND status = 'PENDING'`
    )
    .all(jobId) as any[];

  let evaluated = 0;
  let accepted = 0;
  let rejected = 0;

  for (const app of applications) {
    if (app.extracted_text) {
      const evaluation = evaluateResume(app.extracted_text, jobId);

      const updateStmt = db.prepare(`
        UPDATE applications
        SET match_score = ?, evaluation_reasoning = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);

      updateStmt.run(evaluation.matchScore, evaluation.reasoning, evaluation.decision, app.id);

      evaluated++;
      if (evaluation.decision === "ACCEPT") {
        accepted++;
      } else {
        rejected++;
      }
    }
  }

  return { evaluated, accepted, rejected };
}
