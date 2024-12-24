import jwt from 'jsonwebtoken';

export const getUserFromToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Unauthorized: No token provided');
  }

  const token = authHeader.split(' ')[1]; // Assuming "Bearer <token>"
  if (!token) {
    throw new Error('Unauthorized: Invalid token format');
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error('Unauthorized: Invalid token');
  }
};
