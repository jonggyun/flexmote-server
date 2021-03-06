/* eslint-disable @typescript-eslint/camelcase */
import { google } from 'googleapis';
import { Response, Request } from 'express';
import axios from 'axios';

import { getUserId } from '../../common/user';

export const redirectGoogleLogin = async (req: Request, res: Response) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.OAUTH_GOOGLE_CLIENT_ID,
      process.env.OAUTH_GOOGLE_CLIENT_SECRET,
      process.env.OAUTH_GOOGLE_REDIRECT_URL,
    );
    // generate a url that asks permissions for Blogger and Google Calendar scopes
    const scopes = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      // access_type: 'offline',
      // If you only need one scope you can pass it as a string
      scope: scopes,
    });
    res.redirect(url);
  } catch (err) {
    console.log('err', err);
  }
};

export const redirectGithubLogin = (req: Request, res: Response) => {
  try {
    const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
    const redirectUri = process.env.OAUTH_GITHUB_REDIRECT_URL;
    const githubOauthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_url=${redirectUri}&scope=user:email`;
    res.redirect(githubOauthUrl);
  } catch (err) {
    console.log('err', err);
  }
};

export const callbackGoogleLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    const oauth2Client = new google.auth.OAuth2(
      process.env.OAUTH_GOOGLE_CLIENT_ID,
      process.env.OAUTH_GOOGLE_CLIENT_SECRET,
      process.env.OAUTH_GOOGLE_REDIRECT_URL,
    );

    const { tokens } = await oauth2Client.getToken(code);
    const { access_token, id_token } = tokens;
    oauth2Client.setCredentials(tokens);

    const ticket = await oauth2Client.verifyIdToken({
      idToken: id_token || '',
      audience: process.env.OAUTH_GOOGLE_CLIENT_ID || '',
    });
    const email = ticket.getPayload()?.email || '';
    const username = ticket.getPayload()?.name || '';

    const userId = await getUserId({ username, email, social: 'google' });

    res.cookie('access_token', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
    });
    res.cookie('user_id', userId, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.redirect(
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
    );
  } catch (err) {
    console.log('err', err);
  }
};

export const callbackGithubLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    const {
      data: { access_token },
    } = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.OAUTH_GITHUB_CLIENT_ID,
        client_secret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    const {
      data: { email, name: username },
    } = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Token ${access_token}`,
      },
    });

    const userId = await getUserId({ username, email, social: 'github' });

    res.cookie('access_token', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.cookie('user_id', userId, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.redirect(
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
    );
  } catch (err) {
    console.log('err', err);
  }
};
