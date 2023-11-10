import { Admin, dbConnect } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

type Data = {
  message: string;
};

const SECRET = process.env.NEXT_SECRET;

export async function GET(req: Request) {
  return new Response("Hello from get of register of admin route");
}

export async function POST(req: Request) {
  console.log("I am in the post admin register route");

  await dbConnect();

  const { username, password } = await req.json();
  console.log({ username, password });

  const admin = await Admin.findOne({ username });

  if (admin) {
    return NextResponse.json({
      message: "Admin already exists",
      status: "404",
    });
  } else {
    const statusToken = jwt.sign({ username, role: "admin" }, SECRET);
    const newAdmin = new Admin({ username, password, statusToken });
    newAdmin.save();

    return NextResponse.json({
      message: "The Admin is created Succesfully",
      statusToken,
      status: "200",
      newAdmin,
    });
  }
}
