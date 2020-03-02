import { google } from 'googleapis';
import { Response, Request } from 'express';

export const redirectGoogleLogin = async (req: Request, res: Response) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.OAUTH_GOOGLE_CLINET_ID,
      process.env.OAUTH_GOOGLE_CLINET_SECRET,
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

export const callbackGoogleLogin = async (req: Request, res: Response) => {
  try {
    const { code } = req.query;

    const oauth2Client = new google.auth.OAuth2(
      process.env.OAUTH_GOOGLE_CLINET_ID,
      process.env.OAUTH_GOOGLE_CLINET_SECRET,
      process.env.OAUTH_GOOGLE_REDIRECT_URL,
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.status(200).json({
      tokens,
    });
  } catch (err) {
    console.log('err', err);
  }
};
