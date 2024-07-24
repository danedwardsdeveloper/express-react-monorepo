import express from 'express';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();

import { expressEnv, port } from './utils/environmentChecks.js';
import app from './app/app.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = app.listen(port, () => {
	const serveReactWithExpress: boolean = expressEnv !== 'development';

	if (serveReactWithExpress) {
		app.use(express.static(path.join(__dirname, '../client/')));
		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/index.html'));
		});
	}
	// Redirect to custom URL in production only
	// app.use((req, res, next) => {
	// 	if (req.hostname === 'plant-counter-monorepo.fly.dev') {
	// 	  return res.redirect(301, 'https://plant-counter.co.uk' + req.url);
	// 	}
	// 	next();
	//   });
});

export default server;
