import { NextRequest, NextResponse } from "next/server";
import { setPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeNumber, newPassword } = body;

    if (!employeeNumber || !newPassword) {
      return NextResponse.json(
        { error: "Missing employee number or password" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const result = setPassword(employeeNumber, newPassword);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Password set successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Set password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
