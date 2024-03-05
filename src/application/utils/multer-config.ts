import { diskStorage } from 'multer';

const multerConfig = {
  storage: diskStorage({
    destination: './upload',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
};

export default multerConfig;
