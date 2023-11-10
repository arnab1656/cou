import { Admin, dbConnect } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

type Data = {
  message: string;
};

const SECRET = process.env.NEXT_SECRET;

export async function GET(req: Request) {
  return new Response("Hello from get of login admin route");
}

export async function POST(req: Request) {
  console.log("I am in the post of Login route");

  const { username, password } = await req.json();

  console.log("bodyData");
  console.log({ username, password });

  console.log("body");
  const body = req.body;

  await dbConnect();

  // const { username, password } = req.body;

  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const decode = jwt.verify(admin.statusToken, SECRET);

    return NextResponse.json({
      message: "Logged in successfully",
      status: "200",
      decode,
      admin,
    });
  } else {
    return NextResponse.json({
      message: "Invalid username or password",
      status: "404",
    });
  }
}
