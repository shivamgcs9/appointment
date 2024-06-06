import { NextResponse } from "next/server";
import { connectDB, query } from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export async function POST(request) {
  await connectDB();
  let payload = await request.json();
  const { email, password, type } = payload;

  if (!["user", "organization"].includes(type)) {
    return NextResponse.json({
      status: 400,
      message: "Invalid Login type",
    });
  }

  try {
    let user;
    const table = type === "user" ? "users" : "organizations";
    const idField = type === "user" ? "user_id" : "organization_id";
    const nameField = type === "user" ? "username" : "name";

    const result = await query({
      query: `SELECT * FROM ${table} WHERE email = ?`,
      values: [email],
    });

    if (result.length === 0) {
      return NextResponse.json({
        status: 401,
        message: "Invalid email or password",
      });
    }

    user = result[0];

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({
        status: 401,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user[idField], type, name: user[nameField] },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      status: 200,
      message: "Login successful",
      token,
      data: result,
    });
  } catch (error) {}
  return NextResponse.json({
    status: 500,
    message: "Internal Server Error",
    error: error.message,
  });
}
