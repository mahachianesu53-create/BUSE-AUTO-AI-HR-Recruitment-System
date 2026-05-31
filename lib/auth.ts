import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  insertUser,
  getUserByEmployeeNumber,
  getUserById,
  updateUserPassword,
  insertSession,
  getSessionByToken,
  deleteSession,
  db,
} from "./db";
import { randomUUID } from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRY = "7d";

export interface AuthUser {
  id: string;
  employee_number: string;
  is_password_set: boolean;
}

// Hash password
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

// Verify password
export function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

// Create JWT token
export function createToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

// Verify JWT token
export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch {
    return null;
  }
}

// Get or create default HR user
export function initializeDefaultUser(): AuthUser {
  const employeeNumber = "EC1234567";
  const defaultPasswordHash = hashPassword("initial123");

  // Check if user exists
  const existing = getUserByEmployeeNumber(employeeNumber);

  if (existing) {
    return {
      id: existing.id,
      employee_number: existing.employee_number,
      is_password_set: !!existing.is_password_set,
    };
  }

  // Create new user
  const userId = randomUUID();
  insertUser({
    id: userId,
    employee_number: employeeNumber,
    password_hash: defaultPasswordHash,
    is_password_set: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  return {
    id: userId,
    employee_number: employeeNumber,
    is_password_set: false,
  };
}

// Login user
export function loginUser(
  employeeNumber: string,
  password: string
): {
  success: boolean;
  token?: string;
  user?: AuthUser;
  error?: string;
} {
  const user = getUserByEmployeeNumber(employeeNumber);

  if (!user) {
    return { success: false, error: "Invalid employee number" };
  }

  if (!verifyPassword(password, user.password_hash)) {
    return { success: false, error: "Invalid password" };
  }

  const token = createToken(user.id);

  // Create session
  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  insertSession({
    id: sessionId,
    user_id: user.id,
    token,
    expires_at: expiresAt,
    created_at: new Date().toISOString(),
  });

  return {
    success: true,
    token,
    user: {
      id: user.id,
      employee_number: user.employee_number,
      is_password_set: !!user.is_password_set,
    },
  };
}

// Set password for user
export function setPassword(
  employeeNumber: string,
  newPassword: string
): { success: boolean; error?: string } {
  const user = getUserByEmployeeNumber(employeeNumber);

  if (!user) {
    return { success: false, error: "User not found" };
  }

  const passwordHash = hashPassword(newPassword);
  updateUserPassword(user.id, passwordHash);

  return { success: true };
}

// Change password (requires current password verification)
export function changePassword(
  employeeNumber: string,
  currentPassword: string,
  newPassword: string
): { success: boolean; error?: string } {
  const user = getUserByEmployeeNumber(employeeNumber);
  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (!verifyPassword(currentPassword, user.password_hash)) {
    return { success: false, error: "Current password is incorrect" };
  }

  if (newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters" };
  }

  const newPasswordHash = hashPassword(newPassword);
  updateUserPassword(user.id, newPasswordHash);

  return { success: true };
}

// Get user from token
export function getUserFromToken(token: string): AuthUser | null {
  const decoded = verifyToken(token);
  if (!decoded) return null;

  const session = getSessionByToken(token);
  if (!session || new Date(session.expires_at) < new Date()) {
    return null;
  }

  // Get user from database
  const user = getUserById(decoded.userId);
  
  if (!user) return null;

  return {
    id: user.id,
    employee_number: user.employee_number,
    is_password_set: !!user.is_password_set,
  };
}

// Logout user
export function logoutUser(token: string): void {
  deleteSession(token);
}
