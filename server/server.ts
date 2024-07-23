import express from 'express';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

import { expressEnv, port } from './utils/processEnvVars.js';
import app from './app/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, '..', 'client');

const server = app.listen(port, () => {
	const isProdOrBuild = ['production', 'build'].includes(expressEnv);

	if (isProdOrBuild) {
		console.log(chalk.green(`Static files served from: ${staticPath}`));

		app.use(express.static(path.join(__dirname, '../client/')));
		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/index.html'));
		});
	}

	const baseUrl =
		expressEnv === 'production'
			? process.env.VITE_DEPLOYED_SITE_URL
			: `http://localhost:${port}`;

	const frontEndUrl = isProdOrBuild ? baseUrl : 'http://localhost:5173';

	console.log(chalk.green(`API accessible at ${baseUrl}/api`));
	console.log(chalk.green(`Front-end accessible at ${frontEndUrl}`));
});

export default server;
