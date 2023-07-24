import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'snapup', 
  api_key: process.env.CLOUD_API, 
  api_secret: process.env.CLOUD_SECRET
});

export default cloudinary;