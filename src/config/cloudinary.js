import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

export const uploadImageToCloudinary = async (image)=> {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', "profile_uploads");
  return axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData
  ).then(response=>{
    console.log(response.data.secure_url);
    return response.data.secure_url;
  }).catch((e)=>{
    console.log(e);
  })
};