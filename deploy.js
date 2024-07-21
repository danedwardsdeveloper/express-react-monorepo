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
	console.log(chalk.bgMagenta('Starting deployment process...'));

	console.log(chalk.bgMagenta('Building the project...'));
	runCommand('pnpm run build-production');

	console.log(chalk.bgMagenta('Building Docker image...'));
	runCommand('docker build -t express-react-monorepo .');

	console.log(chalk.bgMagenta('Running Docker container...'));
	runCommand(
		`docker run -d --name express-react-app -p 3000:3000 --env-file .env express-react-monorepo`
	);

	console.log(chalk.bgMagenta('Deploying to Fly.io...'));
	runCommand('fly deploy');

	console.log(chalk.bgMagenta('Deployment successful!'));

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
