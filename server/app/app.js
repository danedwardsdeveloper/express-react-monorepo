import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

// import { setupCors } from './middleware/cors.js';
// import { setupBodyParser } from './middleware/bodyParser.js';
// import { setupSecurityHeaders } from './middleware/securityHeaders.js';
// import { setupRateLimiter } from './middleware/rateLimiter.js';
// import { requestLogger } from './middleware/requestLogger.js';
// import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// setupCors(app);
// setupBodyParser(app);
// setupSecurityHeaders(app);
// setupRateLimiter(app);
// app.use(requestLogger);

// app.get('/', (req, res) => {
// 	res.json({ message: 'Bookshop API' });
// });

// app.use(errorHandler);

export default app;
