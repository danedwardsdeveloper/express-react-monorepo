import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const setupMiddleware = (app) => {
	app.use(express.json());
	app.use(cookieParser());

	const allowedOrigin =
		process.env.VITE_NODE_ENV === 'production'
			? `${process.env.LIVE_CLIENT}/api`
			: 'http://localhost:5173';

	app.use(
		cors({
			origin: allowedOrigin,
			methods: ['GET', 'POST'],
			allowedHeaders: ['Content-Type', 'Authorization'],
			credentials: true,
		})
	);
};

export default setupMiddleware;
