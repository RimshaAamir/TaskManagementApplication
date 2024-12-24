// import dbConnect from '../../../lib/db';
// import Task from '../../../models/Task';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     console.log("INGETTTTTTTTTTTT");
//     try {
//       await dbConnect();

//       const tasks = await Task.find({ user: session.user.id }).sort({
//         createdAt: -1,
//       });

//       res.status(200).json(tasks);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }




import dbConnect from '../../../lib/db';
import Task from '../../../models/Task';
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    console.log("IN GETTTTTTT");
  if (req.method === 'GET') {
    console.log('GET request received');
    try {
      await dbConnect();

      // Extract the token from Authorization header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const token = authHeader.split(' ')[1]; // Assuming the header format is "Bearer <token>"

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
      }

      console.log(token);
      console.log(process.env.JWT_SECRET);
      // Decode the token to get the user ID
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken?.id;

      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      // Fetch tasks for the user
      const tasks = await Task.find({ user: userId }).sort({
        createdAt: -1,
      });

      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
