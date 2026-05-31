import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getUserFromToken } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    const user = token ? getUserFromToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const application = db
      .prepare(
        `SELECT a.* FROM applications a
         JOIN jobs j ON a.job_id = j.id
         WHERE a.id = ? AND j.created_by = ?`
      )
      .get(params.id, user.id) as any;

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(application, { status: 200 });
  } catch (error) {
    console.error("[v0] Get application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    const user = token ? getUserFromToken(token) : null;

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { emailSent } = body;

    // Verify ownership
    const application = db
      .prepare(
        `SELECT a.* FROM applications a
         JOIN jobs j ON a.job_id = j.id
         WHERE a.id = ? AND j.created_by = ?`
      )
      .get(params.id, user.id) as any;

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Update email status
    if (typeof emailSent === "boolean") {
      const stmt = db.prepare(`
        UPDATE applications
        SET email_sent = ?, email_sent_at = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `);

      stmt.run(emailSent ? 1 : 0, emailSent ? new Date().toISOString() : null, params.id);
    }

    return NextResponse.json(
      { success: true, message: "Application updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Update application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
