//  import UserModel from "../models/user.model.js"
// import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

//  export const getCurrentUser = async(req , res)=>{
//     try {
//         const userId = req.userId;

//         const user = await UserModel.findById(userId).select("-password");
//         if (!user) {
//             return res
//             .status(404)
//             .json({success: false, message: "User not found!"});
//         }
//         return res.status(200).json({success:true, user});
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({success: false , message: "Internal Server Error!"})
//     }
//  };



//  export const updateProfile = async (req, res) => {
//     try {
//         const userId = req.userId;
//         let {
//             name,
//             phone,
//             whatsappNumber,
//             address,
//             city,
//             state,
//             country,
//             title,
//             intro,
//             description,
//             github,
//             linkedin,
//             instagram,
//             facebook,
//             twitter,
//             youtube,
//             isAvailable,
//         } = req.body;
//         const user = await UserModel.findById(userId);
//         if (!user) {
//             return res
//             .status(404)
//             .json({success: false, message: "User not found"});
//         }

//         let profilePic;
//         profilePic = user.profilePic;

//         if(req.file && req.file.buffer) {
//             try {
//                 profilePic =await uploadOnCloudinary(req.file.buffer);
//             } catch (error) {
//                 console.log(error);
//                 return res
//                 .status(500)
//                 .json({success: false, message: "Error while uploading Image"});
//             }
//         }

//         await UserModel.findByIdAndUpdate(userId , {
//             name,
//             phone,
//             whatsappNumber,
//             address,
//             city,
//             state,
//             country,
//             title,
//             intro,
//             description,
//             github,
//             linkedin,
//             instagram,
//             facebook,
//             twitter,
//             youtube,
//             profilePic,
//             isAvailable: isAvailable === "true",
//         }, {new:true , runValidators: true});
//         return res.status(200).json({success: true, message: "Profile updated!"});
//     } catch (error) {
//         console.log(error, "error in update profile");
//         return res
//         .status(500)
//         .json({success: false, message: "Internal Server Error"});
//     }
//  };



import UserModel from "../models/user.model.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

// Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get Current User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};


// Update User Profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      name,
      phone,
      whatsappNumber,
      address,
      city,
      state,
      country,
      title,
      intro,
      description,
      github,
      linkedin,
      instagram,
      facebook,
      twitter,
      youtube,
      isAvailable,
    } = req.body;

    // Find existing user
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    // Keep existing profile picture
    let profilePic = user.profilePic;

    // Upload new profile picture if selected
    if (req.file && req.file.buffer) {
      try {
        profilePic = await uploadOnCloudinary(req.file.buffer);
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        return res.status(500).json({
          success: false,
          message: "Error while uploading image!",
        });
      }
    }

    // Update user and get updated document
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        whatsappNumber,
        address,
        city,
        state,
        country,
        title,
        intro,
        description,
        github,
        linkedin,
        instagram,
        facebook,
        twitter,
        youtube,
        profilePic,
        isAvailable: isAvailable === "true",
      },
      {
         returnDocument: "after",
        runValidators: true,
      }
    ).select("-password");

    // Return updated user
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};
