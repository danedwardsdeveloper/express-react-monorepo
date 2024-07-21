import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

import app from './app/app.js';

const nodeEnv = process.env.NODE_ENV || `development`;
console.log(chalk.blue(`Environment: ${nodeEnv}`));

const port = parseInt(process.env.EXPRESS_PORT || '3000', 10);

const server = app.listen(port, () => {
	if (nodeEnv === 'production') {
		console.log(`API accessible at ${process.env.API_URL}/`);
	} else {
		console.log(chalk.blue(`API accessible at http://localhost:${port}`));
	}
});

export default server;
