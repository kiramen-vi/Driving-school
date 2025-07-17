import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Client from '../models/Client.js';
import User from '../models/User.js';

export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email & password required.' });
  }

  try {
    const existing = await Client.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = await Client.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      _id: newClient._id,
      name: newClient.name,
      email: newClient.email,
      role: 'client',
      token: jwt.sign({ id: newClient._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Registration failed' });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email & password required.' });
  }

  try {
    // Try Admin Login
    const admin = await User.findOne({ email });
    if (admin && await bcrypt.compare(password, admin.password)) {
      return res.json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
      });
    }

    // Try Client Login
    const client = await Client.findOne({ email });
    if (client && await bcrypt.compare(password, client.password)) {
      return res.json({
        _id: client._id,
        name: client.name,
        email: client.email,
        role: 'client',
        token: jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
      });
    }

    return res.status(401).json({ message: 'Invalid credentials.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login failed' });
  }
}
