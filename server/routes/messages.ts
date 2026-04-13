import { Router } from 'express';
import { submitMessage, getMessages, markAsRead, deleteMessage } from '../controllers/messageController';
import { authMiddleware } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public route for submitting messages
router.post('/', rateLimiter, submitMessage);

// Protected routes (Admin level)
router.get('/', authMiddleware, getMessages);
router.patch('/:id/read', authMiddleware, markAsRead);
router.delete('/:id', authMiddleware, deleteMessage);

export default router;
