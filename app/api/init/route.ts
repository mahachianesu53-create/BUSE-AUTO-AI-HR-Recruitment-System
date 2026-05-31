import { NextRequest, NextResponse } from "next/server";
import { initializeDefaultUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const user = initializeDefaultUser();

    return NextResponse.json(
      {
        success: true,
        message: "System initialized",
        user: {
          employeeNumber: user.employee_number,
          isPasswordSet: user.is_password_set,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Initialization error:", error);
    return NextResponse.json(
      { error: "Initialization failed" },
      { status: 500 }
    );
  }
}
