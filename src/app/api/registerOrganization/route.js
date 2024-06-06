import { NextResponse } from "next/server";
import { connectDB, query } from "../../lib/db";

export async function POST(request) {
  await connectDB();

  let payload = await request.json();
  const { name, email, password, phone, address, service_type } = payload;
  console.log(payload);

  if (!name || !email || !password || !address || !service_type) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
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
