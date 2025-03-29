import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createMultipleUsers,
  deleteAllUsers,
  protegida,
} from '../controllers/usersController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/protegida', authMiddleware, protegida);

export default router;
