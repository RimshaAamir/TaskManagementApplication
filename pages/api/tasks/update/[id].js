import dbConnect from '../../../../lib/db';
import Task from '../../../../models/Task';
import { getUserFromToken } from '../../../../utils/getUserFromToken';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      await dbConnect();

      // Extract user from token
      const user = getUserFromToken(req);

      const { id } = req.query;
      const { name, description, dueDate } = req.body;

      const task = await Task.findOneAndUpdate(
        { _id: id, user: user.id }, // Assuming the token contains "id"
        { name, description, dueDate },
        { new: true }
      );

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
