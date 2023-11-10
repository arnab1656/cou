import { Admin } from "db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  console.log({ username, password });

  const user = await Admin.findOne({ username });

  if (user) {
    return NextResponse.json({ message: "Admin exist", status: 200 });
  }
  return NextResponse.json({ message: "Admin not exist", status: 400 });
}
