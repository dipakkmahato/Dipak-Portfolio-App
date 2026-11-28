import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Skills = () => {
  const [previewImage, setPreviewImage] = useState("https://th.bing.com/th?id=OIF.N94ii5Ftp6G9%2fPEVpDu%2f6Q&r=0&rs=1&pid=ImgDetMain&o=7&rm=3");
  const [skillImage, setSkillImage] = useState(null);
  const [skillLevel, setSkillLevel] = useState(0);
  const [skillName, setSkillName] = useState("");
  const [loading, setLoading] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setSkillImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if((!skillName, !skillLevel)){
      toast.error("Please fill all the fields");
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("skillName", skillName);
      formData.append("skillLevel", skillLevel);
      if (!skillImage) {
        toast.error("Please upload a file");
      }
      formData.append("skillImage", skillImage);
      const response = await axios.post(
        `${serverUrl}/api/skill/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message || "Skill added successfully");
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "error in add skill");
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <img
          src={previewImage}
          alt="skill-image"
          height={"100px"}
          width={"100px"}
        />
        <input type="file" onChange={handleFileChange} />

        <input
          type="text"
          placeholder="Skill Name"
          onChange={(e) => setSkillName(e.target.value)}
          value={skillName}
        />
        <input
          type="range"
          name="skillLevel"
          min="0"
          max="100"
          id=""
          onChange={(e) => setSkillLevel(Number(e.target.value))}
        />
        <button type="submit">{loading ? "Adding Skill" : "Add Skill"}</button>
      </form>
    </>
  );
};

export default Skills; 
