import express from 'express';
import authRouter from './auth';
import socialRouter from './social';
import companyRouter from './company';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/social', socialRouter);
router.use('/company', companyRouter);

export default router;
