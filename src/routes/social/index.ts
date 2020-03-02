import express from 'express';
import { redirectGoogleLogin, callbackGoogleLogin } from './socialController';

const router = express.Router();

router.get('/redirect/google', redirectGoogleLogin);
router.get('/callback/google', callbackGoogleLogin);

export default router;
