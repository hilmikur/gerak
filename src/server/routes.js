const { addVideoHandler, getAllVideosHandler, getVideoByIdHandler } = require('../server/handler');

const videoRoutes = [
  {
    method: 'POST',
    path: '/videos',
    handler: addVideoHandler,
    options: {
      payload: {
        output: 'file',
        parse: true,
        multipart: true,
        allow: 'multipart/form-data',
        maxBytes: 100 * 1024 * 1024 // 100MB max file size
      }
    }
  },
  {
    method: 'GET',
    path: '/videos',
    handler: getAllVideosHandler
  },
  {
    method: 'GET',
    path: '/videos/{id}',
    handler: getVideoByIdHandler
  }
];

module.exports = videoRoutes;
