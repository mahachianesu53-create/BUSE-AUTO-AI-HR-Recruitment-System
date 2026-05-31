export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  resumeFile: File;
}

export interface ExtractedResume {
  rawText: string;
  fileName: string;
  extractedAt: string;
}

export interface AIEvaluation {
  decision: "ACCEPT" | "REJECT";
  matchScore: number;
  reasoning: string;
  keyStrengths: string[];
  gaps: string[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  applicationDeadline: string; // ISO date string
  createdAt: string;
  isActive: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resumeFileName: string;
  extractedText: string;
  evaluation: AIEvaluation;
  submittedAt: string;
  status: "ACCEPTED" | "REJECTED";
  emailSent?: boolean;
  emailSentAt?: string;
}
