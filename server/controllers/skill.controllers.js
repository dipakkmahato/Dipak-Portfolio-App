// import skillModel from "../models/skill.model.js";
// import UserModel from "../models/user.model.js";
// import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

// export const addSkill = async (req, res) => {
//   try {
//     let userId = req.userId;
//     let skillName = req.body.skillName;
//     let skillLevel = parseInt(req.body.skillLevel);

//     let skillImage;

//     const user = await UserModel.findById(userId);
//     if (!user) {
//         return res
//         .status(404)
//         .json({success: false, message: "User not found!" });
//     }

//     if (!req.file) {
//         return res
//         .status(400)
//         .json({success: false, message: "Please upload a file" });
//     }
//     try {
//         skillImage = await uploadOnCloudinary(
//             req.file.buffer,
//             "portfolio-skills"
//         );
//     } catch (error) {
//         console.log(error, "error in image upload");
//         return res
//         .status(500)
//         .json({ success: false, message: " Image upload failed!"})
//     }

// //     if (!req.file) {
// //   return res.status(400).json({
// //     success: false,
// //     message: "Please upload a skill image!"
// //   });
// // }

// // skillImage = await uploadOnCloudinary(
// //   req.file.buffer,
// //   "portfolio-skills"
// // );

// // if (!skillImage) {
// //   return res.status(500).json({
// //     success: false,
// //     message: "Image upload failed!"
// //   });
// // }

//     const skill = await skillModel.create({
//         userId,
//         skillName,
//         skillLevel,
//         skillImage,
//     });

//     return res.status(200).json({success: true, message: "skill added!"});
//   } catch (error) {
//     console.log(error, "error in add skill");
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error!" });
//   }
// };

// export const deleteSkill = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const skillId = req.params.skillId;
//     const user = await UserModel.findById(userId);
//     if(!user) {
//         return res 
//         .status(400)
//         .json({ success: false, message: "User not found!"});
//     }

//     const skill = await skillModel.findByIdAndDelete({
//         _id: skillId,
//     });

//     if (!skill) {
//         return res
//         .status(404)
//         .json({success: true, message: " skill deleted!"});
//     }
//   } catch (error) {
//     console.log(error, "error in delete skill");
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error!" });
//   }
// };

// export const getSkillsByAdmin = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await UserModel.findById(userId);
//     if (!user) {
//         return res 
//         .status(404)
//         .json({success: false, message: "User not found!"});
//     }
//     const skills = await skillModel.find({ userId});
//     return res.status(200).json({
//   success: true,
//   skills
// });
//   } catch (error) {
//     console.log(error, "error in getSkillsByAdmin");
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error!" });
//   }
// };


import skillModel from "../models/skill.model.js";
import UserModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const addSkill = async (req, res) => {
  try {
    const userId = req.userId;
    const skillName = req.body.skillName?.trim();
    const skillLevel = Number(req.body.skillLevel);

    // Validate input
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required!",
      });
    }

    if (!skillName || !Number.isInteger(skillLevel) ||
        skillLevel < 1 || skillLevel > 100) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid skill name and level (1-100).",
      });
    }

    if (!req.file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "Please upload a skill image!",
      });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Upload image to Cloudinary
    let skillImage;

    try {
      skillImage = await uploadOnCloudinary(
        req.file.buffer,
        "portfolio-skills"
      );
    } catch (uploadError) {
      console.error("Cloudinary Upload Error:", uploadError);

      return res.status(500).json({
        success: false,
        message: "Skill image upload failed!",
      });
    }

    if (!skillImage) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary image URL not received!",
      });
    }

    // Save skill in MongoDB
    const skill = await skillModel.create({
      userId,
      skillName,
      skillLevel,
      skillImage,
    });

    return res.status(201).json({
      success: true,
      message: "Skill added successfully!",
      skill,
    });

  } catch (error) {
    console.error("Add Skill Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error!",
    });
  }
};


export const deleteSkill = async (req, res) => {
  try {
    const userId = req.userId;
    const skillId = req.params.skillId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const skill = await skillModel.findOneAndDelete({
      _id: skillId,
      userId,
    });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully!",
    });

  } catch (error) {
    console.error("Delete Skill Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error!",
    });
  }
};


export const getSkillsByAdmin = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const skills = await skillModel.find({ userId });

    return res.status(200).json({
      success: true,
      skills,
    });

  } catch (error) {
    console.error("Get Skills Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error!",
    });
  }
};
