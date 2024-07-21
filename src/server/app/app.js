import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

// import { authMiddleware } from './middleware/auth.js';
import publicRouter from './routes/public.js';
import protectedRouter from './routes/protected.js';

// import { setupCors } from './middleware/cors.js';
// import { setupBodyParser } from './middleware/bodyParser.js';
// import { setupSecurityHeaders } from './middleware/securityHeaders.js';
// import { setupRateLimiter } from './middleware/rateLimiter.js';
// import { requestLogger } from './middleware/requestLogger.js';
// import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

// setupCors(app);
// setupBodyParser(app);
// setupSecurityHeaders(app);
// setupRateLimiter(app);
// app.use(requestLogger);

// app.get('/', (req, res) => {
// 	res.json({ message: 'Bookshop API' });
// });

// app.use(errorHandler);

app.use('/api', publicRouter);

app.use('/api', protectedRouter);

// app.use('/api', authMiddleware, protectedRoutes);

export default app;
