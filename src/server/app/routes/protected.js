import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const protectedRouter = express.Router();

protectedRouter.get('/protected', verifyToken, (req, res) => {
	res.json({ message: 'This is a protected route', userId: req.userId });
});

protectedRouter.post('/logout', (req, res) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
	});
	res.status(200).json({ message: 'Logged out successfully' });
});

export default protectedRouter;
