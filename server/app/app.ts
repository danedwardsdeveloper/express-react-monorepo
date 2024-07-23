import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();


// import { setupBodyParser } from './middleware/bodyParser.js';
// import { setupSecurityHeaders } from './middleware/securityHeaders.js';
// import { setupRateLimiter } from './middleware/rateLimiter.js';
// import { requestLogger } from './middleware/requestLogger.js';
// import { errorHandler } from './middleware/errorHandler.js';

import setupMiddleware from './middleware/middleware.js';
setupMiddleware(app);

// setupBodyParser(app);
// setupSecurityHeaders(app);
// setupRateLimiter(app);
// app.use(requestLogger);

// app.use(errorHandler);

import publicRouter from './routes/public.js';
app.use('/api', publicRouter);

import protectedRouter from './routes/protected.js';
app.use('/api', protectedRouter);

export default app;
