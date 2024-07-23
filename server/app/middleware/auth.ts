import jwt from 'jsonwebtoken';

import { jwtSecret } from '../../utils/processEnvVars'
import { NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	jwt.verify(token, jwtSecret, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: 'Invalid token' });
		}

		req.userId = decoded.userId;
		next();
	});
};
