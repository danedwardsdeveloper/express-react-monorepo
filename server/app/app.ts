import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import setupMiddleware from './middleware/middleware';
import publicRouter from './routes/public';
import protectedRouter from './routes/protected';

// import { setupBodyParser } from './middleware/bodyParser.js';
// import { setupSecurityHeaders } from './middleware/securityHeaders.js';
// import { setupRateLimiter } from './middleware/rateLimiter.js';
// import { requestLogger } from './middleware/requestLogger.js';
// import { errorHandler } from './middleware/errorHandler.js';

const app = express();
setupMiddleware(app);

// setupBodyParser(app);
// setupSecurityHeaders(app);
// setupRateLimiter(app);
// app.use(requestLogger);

// app.use(errorHandler);

app.use('/api', publicRouter);

app.use('/api', protectedRouter);

// app.use('/api', authMiddleware, protectedRoutes);

export default app;
