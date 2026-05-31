import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    const user = token ? getUserFromToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get applications for jobs created by this user
    const applications = db
      .prepare(
        `SELECT a.* FROM applications a
         JOIN jobs j ON a.job_id = j.id
         WHERE j.created_by = ?
         ORDER BY a.submitted_at DESC`
      )
      .all(user.id);

    return NextResponse.json(applications, { status: 200 });
  } catch (error) {
    console.error("[v0] Get applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      jobId,
      fullName,
      email,
      phone,
      resumeFilename,
      extractedText,
      matchScore,
      evaluationReasoning,
    } = body;

    if (!jobId || !fullName || !email || !phone || !resumeFilename) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const applicationId = randomUUID();
    const stmt = db.prepare(`
      INSERT INTO applications (
        id, job_id, full_name, email, phone, resume_filename,
        extracted_text, match_score, evaluation_reasoning, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')
    `);

    stmt.run(
      applicationId,
      jobId,
      fullName,
      email,
      phone,
      resumeFilename,
      extractedText || null,
      matchScore || null,
      evaluationReasoning || null
    );

    return NextResponse.json(
      {
        success: true,
        applicationId,
        message: "Application created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[v0] Create application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
