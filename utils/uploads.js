import axios from "axios";

const upload = async (file) => {
  const instance = axios.create();

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "fiverr"); // Your unsigned preset name

  try {
    console.log(data.get("upload_preset"));
    const res = await instance.post(
      "https://api.cloudinary.com/v1_1/dc3ytk5jo/image/upload", // Notice `/image/upload`
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("upload",res.data);

    const { secure_url } = res.data;
    console.log("Uploaded Image URL:", secure_url);
    return secure_url;
  } catch (err) {
    console.error("Upload error:", err?.response?.data || err.message);
  }
};

export default upload;
