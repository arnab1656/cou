import { Course, User, dbConnect } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type Data = {
  message: string;
};

const SECRET = process.env.NEXT_SECRET;

export async function GET(req: Request) {
  return NextResponse.json({ message: "get of login user" });
}

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log({ username, password });

  await dbConnect();

  const user = await User.findOne({ username, password });

  if (user) {
    const decode = jwt.verify(user.statusToken, SECRET);

    return NextResponse.json({
      message: "Logged in successfully",
      status: "200",
      decode,
      user,
    });
  } else {
    return NextResponse.json({
      message: "Invalid username or password",
      status: "404",
    });
  }
}
