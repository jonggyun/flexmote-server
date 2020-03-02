/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';

export const login = async (req: any, res: any) => {
  try {
    const result = await axios.get('https://github.com/login/oauth/authorize', {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
      },
    });

    res.status(200, result);
  } catch (err) {
    console.log('!!!!!', err);
    res.status(400);
  }
};
