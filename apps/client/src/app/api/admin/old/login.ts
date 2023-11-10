import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { dbConnect } from "db";
import { Admin } from "db";

type Data = {
  token?: string;
  message?: string;
  name?: string;
  status: string;
  admin?: object;
};

const SECRET = "SECRET";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in the Login route ");

  await dbConnect();

  const { username, password } = req.body;

  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Logged in successfully",
      token,
      status: "200",
      admin,
    });
  } else {
    res.json({ message: "Invalid username or password", status: "404" });
  }
}
