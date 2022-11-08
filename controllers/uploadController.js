import cloudinary from '../utils/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    const file = JSON.parse(req.body.data);
    const uploadedResponse = await cloudinary.uploader.upload(file, {
      upload_preset: 'dev_setups',
    });
    res.status(200).json(uploadedResponse.public_id);
  } catch (error) {
    res.status(500).json(error);
  }
};
