import express from 'express';
import { getAllUsers, getUserById } from '../controllers/adminController.js';

const router = express.Router();

// Get all users (for testing/admin purposes)
router.get('/users', getAllUsers);

// Get specific user by ID
router.get('/users/:id', getUserById);

export default router;
