import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
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
