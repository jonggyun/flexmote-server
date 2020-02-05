import express from 'express';
import { getGithubCallback } from './socialController';

const router = express.Router();

router.get('/github/callback', getGithubCallback);

export default router;
