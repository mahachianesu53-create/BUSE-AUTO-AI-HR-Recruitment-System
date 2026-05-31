import { NextRequest, NextResponse } from "next/server";
import { loginUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeNumber, password } = body;

    console.log("[v0] Login attempt with employee number:", employeeNumber);

    if (!employeeNumber || !password) {
      return NextResponse.json(
        { error: "Missing employee number or password" },
        { status: 400 }
      );
    }

    const result = loginUser(employeeNumber, password);
    console.log("[v0] Login result:", result.success ? "Success" : result.error);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        token: result.token,
        user: result.user,
      },
      { status: 200 }
    );

    // Set secure httpOnly cookie
    response.cookies.set("auth_token", result.token || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[v0] Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
