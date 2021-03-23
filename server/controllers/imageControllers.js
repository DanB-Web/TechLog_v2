// import cloudinary from 'cloudinary';
import fetch from 'node-fetch';

// cloudinary.config({
//   cloud_name: "dasb94yfb",
//   api_key: "281265939685491",
//   api_secret: "3o36L3BCbF4V_vGz_u0unnERlFo"
// })

const addImage = async (req, res) => {
  
  try {
    
    console.log(req.body);

    const myImage = req.body.formData;
    
    const reply = await fetch(`https://api.cloudinary.com/v1_1/dasb94yfb/upload`, {
      method: 'POST',
      body: myImage
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    
    res.send(reply);

  } catch (e) {
    console.log('error', e);
    res.send('image upload error')
  }
 
}

const removeImage = async (req, res) => {

}

export { addImage, removeImage }