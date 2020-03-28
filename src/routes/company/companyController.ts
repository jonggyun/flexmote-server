import { Request, Response } from 'express';

export const setCompanyLogo = async (req: Request, res: Response) => {
  try {
    res.send({
      data: 'success',
    });
    res.status(200);
  } catch (err) {
    console.log('error', err);
    res.status(400);
  }
};
