import express from 'express';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

import app from './app/app.js';

const nodeEnv = process.env.VITE_NODE_ENV || `production`;
console.log(
	'Node environment:',
	process.env.VITE_NODE_ENV || chalk.yellow('VITE_NODE_ENV not set!')
);

const port = parseInt(process.env.EXPRESS_PORT || '3000', 10);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = app.listen(port, () => {
	const isProdOrBuild = ['production', 'build'].includes(nodeEnv);
	const baseUrl =
		nodeEnv === 'production'
			? process.env.VITE_DEPLOYED_SITE_URL
			: `http://localhost:${port}`;

	if (isProdOrBuild) {
		app.use(express.static(path.join(__dirname, '../client')));
		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/index.html'));
		});
	}

	const frontEndUrl = isProdOrBuild ? baseUrl : 'http://localhost:5173';

	console.log(
		chalk.blue(`API accessible at ${baseUrl}/api\n`),
		chalk.blue(`Front-end accessible at ${frontEndUrl}`)
	);
});

export default server;
