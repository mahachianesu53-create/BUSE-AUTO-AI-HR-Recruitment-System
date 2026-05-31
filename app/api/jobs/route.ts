import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function GET(request: NextRequest) {
  try {
    const jobs = db
      .prepare("SELECT * FROM jobs WHERE is_active = 1 ORDER BY created_at DESC")
      .all();

    // Parse requirements JSON for each job and convert snake_case to camelCase
    const parsedJobs = jobs.map((job: any) => ({
      id: job.id,
      title: job.title,
      description: job.description,
      requirements: JSON.parse(job.requirements),
      applicationDeadline: job.application_deadline,
      createdBy: job.created_by,
      isActive: Boolean(job.is_active),
      createdAt: job.created_at,
      updatedAt: job.updated_at,
    }));

    return NextResponse.json(parsedJobs, { status: 200 });
  } catch (error) {
    console.error("[v0] Get jobs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get("auth_token")?.value;
    const user = token ? getUserFromToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, requirements, applicationDeadline } = body;

    if (!title || !description || !requirements || !applicationDeadline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Parse requirements if it's a string
    const parsedRequirements =
      typeof requirements === "string" ? JSON.parse(requirements) : requirements;

    const jobId = randomUUID();
    // Insert job with timestamps for created_at and updated_at (required by DB schema)
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO jobs (
        id,
        title,
        description,
        requirements,
        application_deadline,
        created_by,
        is_active,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
    `);

    stmt.run(
      jobId,
      title,
      description,
      JSON.stringify(parsedRequirements),
      applicationDeadline,
      user.id,
      now,
      now
    );

    return NextResponse.json(
      {
        success: true,
        jobId,
        message: "Job created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[v0] Create job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
