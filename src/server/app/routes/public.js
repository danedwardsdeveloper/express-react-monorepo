import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const publicRouter = express.Router();

const users = [{ id: 1, email: 'user@gmail.com', password: 'securePassword' }];

publicRouter.get('/', (req, res) => {
	res.json({ message: 'Express React Monorepo API' });
});

publicRouter.post('/login', (req, res) => {
	const { email, password } = req.body;

	const user = users.find(
		(user) => user.email === email && user.password === password
	);

	if (!user) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
		expiresIn: '1h',
	});

	res.cookie('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'none',
		maxAge: 60 * 60 * 1000,
		path: '/',
	});

	res.json({ message: 'Login successful', userId: user.id });
});

export default publicRouter;
