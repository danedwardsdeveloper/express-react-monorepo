import express from 'express';
// import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

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

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	jwt.verify(token, jwtSecret, (err, decoded) => {
		if (err) {
			return res
				.status(401)
				.json({ message: 'Failed to authenticate token' });
		}

		req.userId = decoded.userId;
		next();
	});
};
