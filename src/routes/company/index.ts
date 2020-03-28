import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { setCompanyLogo } from './companyController';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (/image\/+/g.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multerS3({
  s3: new AWS.S3({ apiVersion: '2006-03-01' }),
  bucket: `${process.env.AWS_S3_BUCKET}/companies`,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter,
});

const router = express.Router();

router.post('/logo', upload.single('logo'), setCompanyLogo);

export default router;
