import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

function checkAndLogEnvVariable(variable: string): string {
    const value = process.env[variable];

    if (value == null) {
        console.error(chalk.red(`${variable} not set`));
        return '';
    } else {
        console.log(`${variable}: ${chalk.blue(value)}`);
        return value;
    }
}

function calculateAndLogAllowedOrigins(variable: string): string[] | null {
    const value = process.env[variable];

    if (value == null) {
        console.error(chalk.red(`EXPRESS_ALLOWED_ORIGINS not set`));
        return null;
    } else {
        const originArray = value.split(',').map(origin => origin.trim());
        console.log('Allowed origins:');
        originArray.forEach(origin => console.log(chalk.green(`- ${origin}`)));
        return originArray;
    }
}

export const expressEnv = checkAndLogEnvVariable('EXPRESS_ENV');
export const port: number = parseInt(checkAndLogEnvVariable("EXPRESS_PORT"), 10);
export const jwtSecret = checkAndLogEnvVariable('EXPRESS_JWT_SECRET');



export const allowedOrigins = calculateAndLogAllowedOrigins("EXPRESS_ALLOWED_ORIGINS");