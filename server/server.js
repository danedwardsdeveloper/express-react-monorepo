import chalk from 'chalk';
import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import app from './app/app.js';

const nodeEnv = process.env.NODE_ENV || `development`;
console.log(chalk.blue(`Environment: ${nodeEnv}`));

const port = parseInt(process.env.EXPRESS_PORT || '3000', 10);

app.get('/api', (req, res) => {
	res.json({ message: 'Bookshop API' });
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = app.listen(port, () => {
	switch (nodeEnv) {
		case 'production':
			app.use(express.static(path.join(__dirname, '../client')));

			app.get('*', (req, res) => {
				res.sendFile(path.join(__dirname, '../client/index.html'));
			});

			console.log(`API accessible at ${process.env.API_URL}/`);
			break;

		case 'build':
			app.use(express.static(path.join(__dirname, '../client')));

			app.get('*', (req, res) => {
				res.sendFile(path.join(__dirname, '../client/index.html'));
			});
			console.log(
				chalk.yellow(
					`Build mode: API accessible at http://localhost:${port}/api`
				)
			);
			break;

		case 'dev':
		default:
			console.log(chalk.blue(`API accessible at http://localhost:${port}`));
			console.log(
				chalk.blue(`React app is served by the development server`)
			);
			break;
	}
});

export default server;
