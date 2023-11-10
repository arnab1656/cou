import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// const token = jwt.sign({ username: "Arnab", role: "user" }, "S3CrET");

export function GET() {
  // const decode = jwt.verify(token, SECRET);

  console.log("I am from get route of token " + process.env.SECRET);

  // console.log(process.env.NEXT_BASE_URL);
  return NextResponse.json({
    message: "post of token route",
    status: "200",
    decode: "",
  });
}

export function POST() {
  return NextResponse.json({
    message: "post of token route",
    status: "200",
    token: "",
  });
}
