import { execSync } from 'child_process';
import open from 'open';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config();

const runCommand = (command) => {
	try {
		execSync(command, { stdio: 'inherit' });
	} catch (error) {
		console.error(`Failed to execute ${command}`, error);
		process.exit(1);
	}
};

const deploy = async () => {
	console.log(chalk.blue('Starting deployment process...'));

	console.log(chalk.blue('Building the project...'));
	runCommand('pnpm build-production');

	console.log(chalk.blue('Building Docker image...'));
	runCommand('docker build -t express-react-monorepo .');

	const containerName = 'express-react-app';

	if (containerExists(containerName)) {
		console.log('Stopping and removing existing container...');
		runCommand(`docker stop ${containerName}`);
		runCommand(`docker rm ${containerName}`);
	}

	console.log('Running Docker container...');
	runCommand(
		`docker run -d --name ${containerName} -p 3000:3000 --env-file .env express-react-monorepo`
	);

	console.log(chalk.blue('Deploying to Fly.io...'));
	runCommand('fly deploy');

	console.log(chalk.blue('Deployment successful!'));

	const flyAppUrl = process.env.FLY_APP_URL;
	if (flyAppUrl) {
		console.log(`Opening deployed site: ${flyAppUrl}`);
		await open(flyAppUrl);
	} else {
		console.log(
			'FLY_APP_URL not found in .env file. Please open the deployed site manually.'
		);
	}
};

deploy().catch(console.error);
