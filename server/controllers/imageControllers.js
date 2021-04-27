import cloudinary from 'cloudinary';

//MOVE TO SEPERATE FILE AND IMPORT
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
})

const addImage = async (req, res) => {

  try {

    const { file, company } = req.body;

    const reply = await cloudinary.v2.uploader.upload(file, {
      upload_preset: `${company}`
    });

    const {asset_id, public_id, url} = reply;

    const imageInfo = {
      assetId: asset_id,
      publicId: public_id,
      imageUrl: url
    }
    
    res.send(imageInfo);

  } catch (e) {
    console.log('IMAGE TO CLOUDINARY ERROR', e);
    res.send('ERROR - CLOUDINARY ERROR');
  }
 
}

const removeImage = async (req, res) => {
  
  try {

    const imageId = req.body.data;

    //REMOVE IMAGE FROM CLOUDINARY
    const cloudinaryReply = await cloudinary.v2.uploader.destroy(imageId);

    res.send(cloudinaryReply);

  } catch (err) {
    console.log('IMAGE DELETE CLOUDINARY ERROR', e);
    res.send('ERROR - CLOUDINARY ERROR');
  }
}

export { addImage, removeImage }