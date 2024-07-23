import chalk from 'chalk';
import * as dotenv from 'dotenv';
dotenv.config();

function processVariable(variable: string): string {
    const value = process.env[variable];
    if (!value) throw new Error(chalk.red(`${variable} not set`));

    const isSecret = variable.toLowerCase().includes('secret');
    console.log(`${variable}: ${chalk.blue(isSecret ? `${value.slice(0, 6)}...` : value)}`);
    return value;
}

function processAllowedOrigins(origins: string, environment: string): string[] {
    const value = process.env[origins];

    if (value == null) {
        throw new Error(chalk.red(`${origins} not set`));
    }

    console.log('Allowed origins:');

    const originArray = value.split(',').map(origin => origin.trim());

    const inProduction: boolean = environment === 'production';

    originArray.forEach(origin => console.log(
        chalk.blue(`- ${inProduction ? origin : chalk.strikethrough(origin)}`)
    ));

    !inProduction && console.log(chalk.blue(`- *`));

    return inProduction ? originArray : ["*"];
}


// Strings
export const expressEnv = processVariable('EXPRESS_ENV');
export const jwtSecret = processVariable('EXPRESS_JWT_SECRET');

// Numbers
export const port: number = parseInt(processVariable("EXPRESS_PORT"), 10);

// Arrays
export const allowedOrigins = processAllowedOrigins("EXPRESS_ALLOWED_ORIGINS", expressEnv);