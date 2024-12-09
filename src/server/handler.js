const { uploadVideo, getAllVideos, getVideoById } = require('../controllers/uploadvideo');
const Boom = require('@hapi/boom');

const addVideoHandler = async (request, h) => {
  try {
    const { payload } = request;
    
    if (!payload.video) {
      throw Boom.badRequest('No video file provided');
    }

    const video = payload.video;
    const result = await uploadVideo(video);
    
    return h.response({
      status: 'success',
      message: 'Video uploaded successfully',
      data: result
    }).code(201);
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    throw Boom.badImplementation('Failed to upload video');
  }
};

const getAllVideosHandler = async (request, h) => {
  try {
    const videos = await getAllVideos();
    return {
      status: 'success',
      data: videos
    };
  } catch (error) {
    throw Boom.badImplementation('Failed to fetch videos');
  }
};

const getVideoByIdHandler = async (request, h) => {
  try {
    const { id } = request.params;
    const video = await getVideoById(id);
    return {
      status: 'success',
      data: video
    };
  } catch (error) {
    if (Boom.isBoom(error)) {
      throw error;
    }
    throw Boom.badImplementation('Failed to fetch video');
  }
};

module.exports = {
  addVideoHandler,
  getAllVideosHandler,
  getVideoByIdHandler
};
