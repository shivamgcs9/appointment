import { NextResponse } from "next/server";
import { connectDB, query } from "../../lib/db";

export async function GET() {
  await connectDB();
  try {
    const results = await query({
      query: "Select * from users",
    });
    return NextResponse.json({
      status: 200,
      message: "User family members.",
      data: results,
    });
  } catch (error) {}
  return NextResponse.json({
    status: 200,
    message: "hello",
  });
}
