import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import User from '../models/User.js';

export async function verifyToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // First try admin model
    let user = await User.findById(decoded.id).select('-password');
    if (!user) {
      // If not found, try client model
      user = await Client.findById(decoded.id).select('-password');
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid token user' });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function verifyAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
}
