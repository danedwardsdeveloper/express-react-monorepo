import express from 'express';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

import { expressEnv, port } from './utils/processEnvVars';
import app from './app/app';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = app.listen(port, () => {
	const isProdOrBuild = ['production', 'build'].includes(expressEnv);
	const baseUrl =
		expressEnv === 'production'
			? process.env.VITE_DEPLOYED_SITE_URL
			: `http://localhost:${port}`;

	if (isProdOrBuild) {
		app.use(express.static(path.join(__dirname, '../dist/client/')));
		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../dist/client/index.html'));
		});
	}

	const frontEndUrl = isProdOrBuild ? baseUrl : 'http://localhost:5173';

	console.log(
		chalk.blue(`API accessible at ${baseUrl}/api\n`),
		chalk.blue(`Front-end accessible at ${frontEndUrl}`)
	);
});

export default server;
