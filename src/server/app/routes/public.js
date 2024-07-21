import express from 'express';

const publicRouter = express.Router();

publicRouter.get('/', (req, res) => {
	res.json({ message: 'Bookshop API' });
});

export default publicRouter;
