const service = require('../services/activity');

let dto = {
  message: '',
  status: 200,
  data: [],
  error: [],
};

const allowedExtensions = ['jpeg', 'png', 'webp'];
const maxFileSizeMB = 5;

async function controllerCreateActivity(name, content, image) {
  try {
    if (!name || !content || !image) {
      throw new Error('Please fill all the required fields');
    } else if (!allowedExtensions.includes(image.mimetype.split('/')[1])) {
      throw new Error('Image extension not allowed');
    } else if (image.size / (1024 * 1024) > maxFileSizeMB) {
      throw new Error('Image size too large, must be less than 5MB');
    }
    const responseService = await service.serviceCreateActivity(
      name,
      content,
      image
    );
    dto.data = responseService;

    return dto;
  } catch (error) {
    dto.error = error;
    dto.status = 400;
    dto.message = error.message;
    dto.data = [];
    return dto;
  }
}

module.exports = {
  controllerCreateActivity,
};
