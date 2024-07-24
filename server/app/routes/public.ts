import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { jwtSecret, expressEnv } from '../../utils/environmentChecks.js';

const publicRouter = express.Router();

const users = [{ id: 1, email: 'user@gmail.com', password: 'securePassword' }];

publicRouter.get('/', (req, res) => {
	res.json({ message: 'Plant Counter API' });
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

	const inProduction: boolean = expressEnv === 'production';

	res.cookie('token', token, {
		httpOnly: true,
		secure: true,
		sameSite: inProduction ? 'strict' : 'none',
		maxAge: 60 * 60 * 1000,
		path: '/',
	});

	res.json({ message: 'Login successful', userId: user.id });
});

export default publicRouter;
