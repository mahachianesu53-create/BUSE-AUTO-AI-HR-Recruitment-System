import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const job = db
      .prepare("SELECT * FROM jobs WHERE id = ? AND is_active = 1")
      .get(jobId);

    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Convert to camelCase
    const parsedJob = {
      id: job.id,
      title: job.title,
      description: job.description,
      requirements: JSON.parse(job.requirements),
      applicationDeadline: job.application_deadline,
      createdBy: job.created_by,
      isActive: Boolean(job.is_active),
      createdAt: job.created_at,
      updatedAt: job.updated_at,
    };

    return NextResponse.json(parsedJob, { status: 200 });
  } catch (error) {
    console.error("[v0] Get job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id: jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Check if job exists and belongs to user
    const existingJob = db
      .prepare("SELECT * FROM jobs WHERE id = ? AND created_by = ?")
      .get(jobId, user.id);

    if (!existingJob) {
      return NextResponse.json(
        { error: "Job not found or unauthorized" },
        { status: 404 }
      );
    }

    // Soft delete by setting is_active = 0
    const stmt = db.prepare(`
      UPDATE jobs
      SET is_active = 0, updated_at = ?
      WHERE id = ?
    `);

    stmt.run(new Date().toISOString(), jobId);

    return NextResponse.json(
      {
        success: true,
        message: "job deleted succsesfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Delete job error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}