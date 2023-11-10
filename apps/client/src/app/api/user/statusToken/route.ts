import { User, dbConnect } from "db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type Data = {
  message: string;
};

const SECRET = process.env.NEXT_SECRET;

export async function GET(req: Request) {
  return new Response("Hello from get of me route");
}

export async function POST(req: Request) {
  await dbConnect();
  const { username } = await req.json();

  const user = await User.findOne({ username });
  console.log(user);

  if (!user) {
    return NextResponse.json({
      decode: { username: null },
    });
  }
  const statusToken = user.statusToken;

  const decode = jwt.verify(statusToken, SECRET);

  return NextResponse.json({
    decode,
  });
}
