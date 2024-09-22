// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
//   api_secret: import.meta.env.CLOUDINARY_API_SECRET,
// });

// export default cloudinary;\

import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true // Force https, set to false if you want to force http
  }
});

export default cld;