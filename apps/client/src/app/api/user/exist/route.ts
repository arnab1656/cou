import { User, dbConnect } from "db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  const { username, password } = await req.json();
  console.log({ username, password });

  const user = await User.findOne({ username });

  if (user) {
    return NextResponse.json({ message: "user exist", status: 200 });
  }
  return NextResponse.json({ message: "user not exist", status: 400 });
}
