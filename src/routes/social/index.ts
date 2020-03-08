import express from 'express';
import {
  redirectGoogleLogin,
  callbackGoogleLogin,
  redirectGithubLogin,
  callbackGithubLogin,
} from './socialController';

const router = express.Router();

router.get('/redirect/google', redirectGoogleLogin);
router.get('/callback/google', callbackGoogleLogin);

router.get('/redirect/github', redirectGithubLogin);
router.get('/callback/github', callbackGithubLogin);

export default router;
