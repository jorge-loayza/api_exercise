import express from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createMultipleUsers,
  deleteAllUsers,
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/multiple', createMultipleUsers);
router.delete('/all', deleteAllUsers);

export default router;
