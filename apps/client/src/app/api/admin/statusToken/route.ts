import { Admin, dbConnect } from "db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type Data = {
  message: string;
};

const SECRET = "secr3t";

export async function GET(req: Request) {
  return new Response("Hello from get of me route");
}

export async function POST(req: Request) {
  await dbConnect();
  const { username } = await req.json();

  const admin = await Admin.findOne({ username });
  console.log(admin);

  if (!admin) {
    return NextResponse.json({
      decode: { username: null },
    });
  }
  const statusToken = admin.statusToken;

  const decode = jwt.verify(statusToken, SECRET);

  return NextResponse.json({
    decode,
  });
}
