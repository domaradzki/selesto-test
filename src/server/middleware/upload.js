const multer = require('multer');

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/tiff',
    'image/bmp',
    'image/gif',
  ];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error('Incorrect file');
    error.code = 'INCORRECT_FILETYPE';
    return cb(error, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5000000,
  },
}).single('file');

module.exports = uploadFile;
