import dbConnect from '../../../lib/db';
import Task from '../../../models/Task';
import { getUserFromToken } from '../../../utils/getUserFromToken';
// import jwt from "jsonwebtoken";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      // Extract user from token
      const user = getUserFromToken(req);

      const { name, description, dueDate } = req.body;

      const task = await Task.create({
        user: user.id, // Assuming the token contains "id"
        name,
        description,
        dueDate,
      });

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
