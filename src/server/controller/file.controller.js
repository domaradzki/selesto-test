const path = require('path');
const fs = require('fs');

const upload = async (req, res) => {
  res.json({ file: req.file });
};

const baseDir = path.resolve(path.dirname(''));

const baseUrl = 'http://localhost:8080/api/files/';

const getListFiles = (req, res) => {
  const directoryPath = baseDir + '/uploads/';

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: 'Nie można wczytać plików!',
      });
    }

    let fileList = [];

    files.forEach((file) => {
      fileList.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileList);
  });
};

const deleteFile = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = baseDir + '/uploads/';
  try {
    fs.unlinkSync(`${directoryPath}${fileName}`);
  } catch (err) {
    console.error(err);
  }
};

const info = (req, res) => {
  res.json({ msg: +new Date() });
};

module.exports = {
  upload,
  getListFiles,
  deleteFile,
  info,
};
