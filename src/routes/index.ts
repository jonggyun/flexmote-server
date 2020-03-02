import express from 'express';
import authRouter from './auth';
import socialRouter from './social';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/social', socialRouter);

export default router;
