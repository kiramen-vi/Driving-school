import express from 'express';
import {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} from '../controllers/adminController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/clients', verifyToken, verifyAdmin, createClient);
router.get('/clients', verifyToken, verifyAdmin, getAllClients);
router.get('/clients/:id', verifyToken, verifyAdmin, getClientById);
router.put('/clients/:id', verifyToken, verifyAdmin, updateClient);
router.delete('/clients/:id', verifyToken, verifyAdmin, deleteClient);

export default router;
