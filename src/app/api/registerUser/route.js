import { connectDB, query } from "../../../lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  let payload = await request.json();

  const { username, email, password, phone } = payload;

  if (!username || !email || !password) {
    return NextResponse.json({
      status: 400,
      message: "Please provide all required fields",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query({
      query:
        "INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)",
      values: [username, email, hashedPassword, phone],
    });

    return NextResponse.json({
      status: 201,
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
