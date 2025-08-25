import axios from "axios";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "react_upload");
  formData.append("cloud_name", "dxmlebwrn");

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dxmlebwrn/image/upload",
      formData
    );
    return res.data.secure_url; 
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
};
