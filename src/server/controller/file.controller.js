const path = require('path');
const fs = require('fs');

const upload = async (req, res) => {
  res.json({ file: req.file });
};

const baseDir = path.resolve(path.dirname(''));
console.log(baseDir);
const baseUrl = 'http://localhost:8070/api/files/';

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
    if (fs.existsSync(`${directoryPath}${fileName}`)) {
      fs.unlink(`${directoryPath}${fileName}`, function () {
        res.status(200).send({
          response: 'success',
        });
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = baseDir + '/uploads/';

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Nie można pobrać pliku. ' + err,
      });
    }
  });
};

const info = (req, res) => {
  res.json({ msg: +new Date() });
};

module.exports = {
  upload,
  getListFiles,
  deleteFile,
  download,
  info,
};
