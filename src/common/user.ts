/* eslint-disable @typescript-eslint/camelcase */
import { getRepository } from 'typeorm';
import uuid from 'uuid/v1';

import User from '../entity/User';

export const createUser = async ({
  username,
  email,
  social,
}: {
  username: string;
  email: string;
  social: string;
}) => {
  try {
    const user = new User();
    const userId = uuid();

    user.user_id = userId;
    user.email = email;
    user.username = username;
    user.social = social;
    user.created_at = new Date();

    await getRepository(User).insert(user);
    return userId;
  } catch (error) {
    console.log('error', error);
  }
};

export const findUser = async ({
  email,
  social,
}: {
  email: string;
  social: string;
}) => {
  try {
    return await getRepository(User).findOne({
      email: email.trim(),
      social: social.trim(),
    });
  } catch (err) {
    console.log('error', err);
  }
};

export const getUserId = async ({
  username,
  email,
  social,
}: {
  username: string;
  email: string;
  social: string;
}) => {
  const existedUser = await findUser({
    email,
    social,
  });

  let userId;
  if (!existedUser) {
    userId = await createUser({ username, email, social });
  } else {
    userId = existedUser.user_id;
  }
  return userId;
};
