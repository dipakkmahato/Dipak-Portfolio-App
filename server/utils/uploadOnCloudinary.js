// import cloudinary from "../config/cloudinary.js";
// import streamifier from 'streamifier'

// const uploadOnCloudinary = (fileBuffer)=>{
//     return new Promise((resolve , reject)=>{
//       const pipeForStream = cloudinary.uploader.upload_stream(
//         {
//          folder: 'portfolio_profiles',
//          resource_type: 'auto'
//       },
//       (error, result) => {
//         if (result){
//           resolve(result.secure_url)
//         } else{
//           reject(error)
//         }
//       },
//     );
  
//     streamifier.createReadStream(fileBuffer).pipe(pipeForStream);
//       });
// };

// export default uploadOnCloudinary;


import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadOnCloudinary = (fileBuffer, folder = "portfolio-skills") => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error("File buffer is missing"));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result?.secure_url) {
          return reject(new Error("Cloudinary did not return image URL"));
        }

        resolve(result.secure_url);
      }
    );

    streamifier
      .createReadStream(fileBuffer)
      .pipe(uploadStream);
  });
};

export default uploadOnCloudinary;
