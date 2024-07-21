import express from 'express';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

import app from './app/app.js';

const nodeEnv = process.env.VITE_NODE_ENV || `development`;
console.log(chalk.blue(`Environment: ${nodeEnv}`));

const port = parseInt(process.env.EXPRESS_PORT || '3000', 10);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = app.listen(port, () => {
	switch (nodeEnv) {
		case 'production':
		case 'build':
			app.use(express.static(path.join(__dirname, '../client')));

			app.get('*', (req, res) => {
				res.sendFile(path.join(__dirname, '../client/index.html'));
			});

			console.log(`API accessible at ${process.env.API_URL}/`);
			break;

		case 'development':
		default:
			console.log(
				chalk.blue(`API accessible at http://localhost:${port}/api`)
			);
			console.log(
				chalk.blue(`React app available at http://localhost:5173/`)
			);
			break;
	}
});

export default server;
