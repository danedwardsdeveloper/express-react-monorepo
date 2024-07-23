import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const protectedRouter = express.Router();

protectedRouter.get('/protected', verifyToken, (req, res) => {
	res.json({ message: 'This is a protected route', userId: req.userId });
});

protectedRouter.post('/logout', (req, res) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: true,
		sameSite: process.env.VITE_NODE_ENV === 'production' ? 'strict' : 'none',
	});
	res.status(200).json({ message: 'Logged out successfully' });
});

export default protectedRouter;
