import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import Client from './models/Client.js';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// seed admin user if not exists
async function seedAdmin() {
  const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return;
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (!existing) {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({ 
      name: 'Admin', 
      email: ADMIN_EMAIL, 
      password: hash, 
      role: 'admin' 
    });
    console.log('🔐 Admin account created');
  }
}

import { verifyToken, verifyAdmin } from './middlewares/authMiddleware.js';

app.use('/api/auth', authRoutes);
app.use('/api/admin', verifyToken, verifyAdmin, adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await seedAdmin();
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
  })
  .catch(err => console.error(err));
