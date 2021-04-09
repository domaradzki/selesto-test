const express = require('express');
const router = express.Router();
const controller = require('../controller/file.controller');
const uploadFile = require('../middleware/upload');

let routes = (app) => {
  router.post('/api/upload', uploadFile, controller.upload);
  router.get('/api/files', controller.getListFiles);
  router.delete('/api/delete/:name', controller.deleteFile);
  router.get('/api/files/:name', controller.download);
  router.get('/api/info', controller.info);
  app.use(router);
};

module.exports = routes;
