import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import connectDB from "../../../lib/db";
import User from "../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "POST") {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: "Email is already registered." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({ name, email, password: hashedPassword });

      res.status(201).json({ message: "User registered successfully.", user: { name: newUser.name, email: newUser.email } });
    } catch (error) {
      res.status(500).json({ message: "Error registering user.", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
