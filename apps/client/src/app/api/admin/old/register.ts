import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

import { Admin } from "db";
import { dbConnect } from "db";

type Data = {
  token?: string;
  message?: string;
  name?: string;
  status: string;
  newAdmin?: object;
};

const SECRET = "SECRET";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("I am in the admin register route ");

  // connecting to the DataBase

  const { username, password } = req.body;

  await dbConnect();

  const admin = await Admin.findOne({ username });

  if (admin) {
    res.json({ message: "Admin already exists", status: "404" });
  } else {
    const newAdmin = new Admin({ username, password });
    newAdmin.save();

    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "The Admin is created Succesfully",
      token,
      status: "200",
      newAdmin,
    });
  }
}
