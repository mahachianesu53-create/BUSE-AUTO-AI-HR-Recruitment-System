import { Application, Job } from "./types";

const STORAGE_KEY = "hr_applications";
const JOBS_STORAGE_KEY = "hr_jobs";

export function saveApplication(application: Application): void {
  if (typeof window === "undefined") return;

  const applications = getAllApplications();
  applications.push(application);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

export function getAllApplications(): Application[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getApplicationById(id: string): Application | null {
  const applications = getAllApplications();
  return applications.find((app) => app.id === id) || null;
}

export function getApplicationsByStatus(
  status: "ACCEPTED" | "REJECTED"
): Application[] {
  const applications = getAllApplications();
  return applications.filter((app) => app.status === status);
}

export function updateApplicationNote(
  id: string,
  note: string
): Application | null {
  if (typeof window === "undefined") return null;

  const applications = getAllApplications();
  const index = applications.findIndex((app) => app.id === id);

  if (index > -1) {
    const updated = {
      ...applications[index],
      hrNote: note,
    };
    applications[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return updated;
  }

  return null;
}

export function clearAllApplications(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Job Management Functions
export function saveJob(job: Job): void {
  if (typeof window === "undefined") return;

  const jobs = getAllJobs();
  jobs.push(job);
  localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
}

export function getAllJobs(): Job[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(JOBS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getActiveJobs(): Job[] {
  const jobs = getAllJobs();
  const now = new Date();
  return jobs.filter((job) => job.isActive && new Date(job.applicationDeadline) > now);
}

export function getJobById(id: string): Job | null {
  const jobs = getAllJobs();
  return jobs.find((job) => job.id === id) || null;
}

export function updateApplicationEmail(
  id: string,
  emailSent: boolean
): Application | null {
  if (typeof window === "undefined") return null;

  const applications = getAllApplications();
  const index = applications.findIndex((app) => app.id === id);

  if (index > -1) {
    const updated = {
      ...applications[index],
      emailSent,
      emailSentAt: emailSent ? new Date().toISOString() : undefined,
    };
    applications[index] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    return updated;
  }

  return null;
}

export function getApplicationsByJob(jobId: string): Application[] {
  const applications = getAllApplications();
  return applications.filter((app) => app.jobId === jobId);
}
