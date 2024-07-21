// import express from 'express';
// import cors from 'cors';
// import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';
// import chalk from 'chalk';
// import * as dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// app.use([
// 	express.json(),
// 	cookieParser(),
// 	cors({
// 		origin:
// 			nodeEnv === 'production'
// 				? process.env.LIVE_CLIENT
// 				: 'http://localhost:5173',
// 		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// 		allowedHeaders: ['Content-Type', 'Authorization'],
// 		credentials: true,
// 	}),
// ]);

// const SECRET_KEY = process.env.JWT_SECRET;
// const users = [
// 	{ id: 1, email: 'userOne@gmail.com', password: 'securePassword' },
// ];

// export const verifyToken = (req, res, next) => {
// 	const token = req.cookies.token;

// 	if (!token) {
// 		return res.status(401).json({ message: 'No token provided' });
// 	}

// 	jwt.verify(token, SECRET_KEY, (err, decoded) => {
// 		if (err) {
// 			return res
// 				.status(401)
// 				.json({ message: 'Failed to authenticate token' });
// 		}

// 		req.userId = decoded.userId;
// 		next();
// 	});
// };

// app.post('/login', (req, res) => {
// 	const { email, password } = req.body;

// 	const user = users.find((u) => u.email === email && u.password === password);

// 	if (!user) {
// 		return res.status(401).json({ message: 'Invalid credentials' });
// 	}

// 	const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
// 		expiresIn: '1h',
// 	});

// 	res.cookie('token', token, {
// 		httpOnly: true,
// 		secure: process.env.NODE_ENV === 'production',
// 		sameSite: 'lax',
// 		maxAge: 60 * 60 * 1000,
// 		path: '/',
// 	});

// 	res.json({ message: 'Logged in successfully', userId: user.id });
// });

// app.get('/protected', verifyToken, (req, res) => {
// 	res.json({ message: 'This is a protected route', userId: req.userId });
// });

// app.post('/logout', (req, res) => {
// 	res.clearCookie('token', {
// 		httpOnly: true,
// 		secure: process.env.NODE_ENV === 'production',
// 		sameSite: 'strict',
// 	});
// 	res.status(200).json({ message: 'Logged out successfully' });
// });
