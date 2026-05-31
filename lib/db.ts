import Database from 'better-sqlite3';
import path from 'path';

interface User {
  id: string;
  employee_number: string;
  password_hash: string;
  is_password_set: number;
  created_at: string;
  updated_at: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  application_deadline: string;
  created_by: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface Application {
  id: string;
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  resume_filename: string;
  extracted_text: string | null;
  match_score: number | null;
  evaluation_reasoning: string | null;
  status: string;
  email_sent: number;
  email_sent_at: string | null;
  submitted_at: string;
  created_at: string;
  updated_at: string;
}

const dbPath = path.join(process.cwd(), 'ai_hr_recruiter.db');
const db = new Database(dbPath);

export function initializeDatabase() {
  // Create tables if they don't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      employee_number TEXT UNIQUE NOT NULL,
      password_hash TEXT,
      is_password_set INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      requirements TEXT NOT NULL,
      application_deadline TEXT NOT NULL,
      created_by TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      job_id TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      resume_filename TEXT NOT NULL,
      extracted_text TEXT,
      match_score REAL,
      evaluation_reasoning TEXT,
      status TEXT DEFAULT 'pending',
      email_sent INTEGER DEFAULT 0,
      email_sent_at TEXT,
      submitted_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (job_id) REFERENCES jobs (id)
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  console.log("[v0] Database initialized (SQLite mode)");
}

// Initialize database on module load
initializeDatabase();

// Helper functions for database operations
export function insertUser(user: User) {
  const stmt = db.prepare(`
    INSERT INTO users (id, employee_number, password_hash, is_password_set, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(user.id, user.employee_number, user.password_hash, user.is_password_set, user.created_at, user.updated_at);
  return { changes: result.changes };
}

export function getUserByEmployeeNumber(employeeNumber: string): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE employee_number = ?');
  return stmt.get(employeeNumber) as User | undefined;
}

export function getUserById(userId: string): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(userId) as User | undefined;
}

export function updateUserPassword(userId: string, passwordHash: string) {
  const stmt = db.prepare(`
    UPDATE users SET password_hash = ?, is_password_set = 1, updated_at = ? WHERE id = ?
  `);
  const result = stmt.run(passwordHash, new Date().toISOString(), userId);
  return { changes: result.changes };
}

export function insertJob(job: Job) {
  const stmt = db.prepare(`
    INSERT INTO jobs (id, title, description, requirements, application_deadline, created_by, is_active, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(job.id, job.title, job.description, job.requirements, job.application_deadline, job.created_by, job.is_active, job.created_at, job.updated_at);
  return { changes: result.changes };
}

export function getAllJobs(): Job[] {
  const stmt = db.prepare('SELECT * FROM jobs ORDER BY created_at DESC');
  return stmt.all() as Job[];
}

export function getJobById(jobId: string): Job | undefined {
  const stmt = db.prepare('SELECT * FROM jobs WHERE id = ?');
  return stmt.get(jobId) as Job | undefined;
}

export function insertApplication(application: Application) {
  const stmt = db.prepare(`
    INSERT INTO applications (id, job_id, full_name, email, phone, resume_filename, extracted_text, match_score, evaluation_reasoning, status, email_sent, email_sent_at, submitted_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(application.id, application.job_id, application.full_name, application.email, application.phone, application.resume_filename, application.extracted_text, application.match_score, application.evaluation_reasoning, application.status, application.email_sent, application.email_sent_at, application.submitted_at, application.created_at, application.updated_at);
  return { changes: result.changes };
}

export function getAllApplications(): Application[] {
  const stmt = db.prepare('SELECT * FROM applications ORDER BY created_at DESC');
  return stmt.all() as Application[];
}

export function getApplicationById(applicationId: string): Application | undefined {
  const stmt = db.prepare('SELECT * FROM applications WHERE id = ?');
  return stmt.get(applicationId) as Application | undefined;
}

export function updateApplicationStatus(applicationId: string, status: string, score: number, reasoning: string, extractedText: string) {
  const stmt = db.prepare(`
    UPDATE applications SET status = ?, match_score = ?, evaluation_reasoning = ?, extracted_text = ?, updated_at = ? WHERE id = ?
  `);
  const result = stmt.run(status, score, reasoning, extractedText, new Date().toISOString(), applicationId);
  return { changes: result.changes };
}

export function updateApplicationEmail(applicationId: string) {
  const stmt = db.prepare(`
    UPDATE applications SET email_sent = 1, email_sent_at = ?, updated_at = ? WHERE id = ?
  `);
  const now = new Date().toISOString();
  const result = stmt.run(now, now, applicationId);
  return { changes: result.changes };
}

export function insertSession(session: any) {
  const stmt = db.prepare(`
    INSERT INTO sessions (id, token, user_id, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(session.id, session.token, session.user_id, session.expires_at, session.created_at);
  return { changes: result.changes };
}

export function getSessionByToken(token: string) {
  const stmt = db.prepare('SELECT * FROM sessions WHERE token = ?');
  return stmt.get(token);
}

export function deleteSession(token: string) {
  const stmt = db.prepare('DELETE FROM sessions WHERE token = ?');
  const result = stmt.run(token);
  return { changes: result.changes };
}

// Export database instance
export { db };

// Default export
export default db;
