const { s3Upload } = require('../S3-sdkConfig');
const db = require('../schemas')

async function serviceCreateActivity(name, content, image) {
  try {
    const resImage = await s3Upload(image);
    const newActivity = await db["Activities"].create({name,content,image: resImage['$metadata'].extendedRequestId});
    return newActivity;
  } catch (error) {
    return error;
  }
}

module.exports = {
  serviceCreateActivity,
};
