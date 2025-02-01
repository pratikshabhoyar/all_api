const {
    addAvatarImage,
    deleteAvatarImage,
    
    getUserAvatar, updateUserAvatar, getAllAvatars,
  } = require("../models/avatarModel");
  const { saveBase64File } = require("../config/saveBase64File");
  
  // const uploadAvatarImage = async (req, res) => {
  //   try {
  //     const { image } = req.body;
  
  //     if (!image) {
  //       return res.status(400).json({ message: "Image data is required" });
  //     }
  
  //     const imagePath = saveBase64File(image, "uploads", "avatar");
  //     const insertId = await addAvatarImage(imagePath);
  
  //     res
  //       .status(201)
  //       .json({
  //         message: "Avatar image uploaded successfully",
  //         id: insertId,
  //         imagePath,
  //       });
  //   } catch (error) {
  //     console.error("Error uploading Avatar image:", error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // };
  const uploadAvatarImage = async (req, res) => {
    try {
      const { image } = req.body;
  
      // Validate if image data is provided
      if (!image) {
        return res.status(400).json({ error: true, message: "Image data is required" });
      }
  
      // Attempt to save the base64 image
      const imagePath = await saveBase64File(image, "uploads", "avatar");
  
      if (!imagePath) {
        return res.status(500).json({ error: true, message: "Failed to save image" });
      }
  
      // Insert image path into database
      const insertId = await addAvatarImage(imagePath);
  
      if (!insertId) {
        return res.status(500).json({ error: true, message: "Failed to save image in database" });
      }
  
      res.status(201).json({
        error: false,
        message: "Avatar image uploaded successfully",
        id: insertId,
        imagePath,
      });
    } catch (error) {
      console.error("Error uploading Avatar image:", error);
      res.status(500).json({
        error: true,
        message: "Internal Server Error",
        details: error.message,
      });
    }
  };
  
  
  
  const removeAvatarImage = async (req, res) => {
    try {
      const { id } = req.params;
  
      const affectedRows = await deleteAvatarImage(id);
      if (affectedRows === 0) {
        return res.status(404).json({ message: "Avatar image not found" });
      }
  
      res.status(200).json({ message: "Avatar image deleted successfully" });
    } catch (error) {
      console.error("Error deleting Avatar image:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

//   // Fetch Selected Avatar for a User
// const fetchUserAvatar = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const avatar = await getUserAvatar(userId);

//     if (!avatar) {
//       return res.status(404).json({ message: "User avatar not found" });
//     }

//     res.status(200).json(avatar);
//   } catch (error) {
//     console.error("Error fetching user avatar:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// Fetch Selected Avatar for a User
const fetchUserAvatar = async (req, res) => {
  try {
    const { userId } = req.params;
    const avatar = await getUserAvatar(userId);

    // If no avatar is found for the user
    if (!avatar) {
      return res.status(404).json({
        error: true,
        message: "No avatar set for the user or user not found.",
      });
    }

    // If avatar is found, return it
    res.status(200).json({
      error: false,
      message: "User avatar fetched successfully.",
      avatar: avatar,
    });
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error. Unable to fetch user avatar.",
    });
  }
};


// // Fetch All Available Avatars
// const fetchAllAvatars = async (req, res) => {
//   try {
//     const avatars = await getAllAvatars();
//     res.status(200).json(avatars);
//   } catch (error) {
//     console.error("Error fetching avatars:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
const fetchAllAvatars = async (req, res) => {
  try {
    const avatars = await getAllAvatars();

    if (!avatars || avatars.length === 0) {
      return res.status(404).json({ message: "No avatars available at the moment." });
    }

    res.status(200).json(avatars);
  } catch (error) {
    console.error("Error fetching avatars:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// // Update Selected Avatar for a User
// const updateUserAvatarController = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const { avatarId } = req.body;

//     if (!avatarId) {
//       return res.status(400).json({ message: "Avatar ID is required" });
//     }

//     const affectedRows = await updateUserAvatar(userId, avatarId);

//     if (affectedRows === 0) {
//       return res.status(404).json({ message: "User not found or avatar not updated" });
//     }

//     res.status(200).json({ message: "User avatar updated successfully", avatarId });
//   } catch (error) {
//     console.error("Error updating user avatar:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
// Update Selected Avatar for a User
const updateUserAvatarController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { avatarId } = req.body;

    // Check if avatarId is provided in the request
    if (!avatarId) {
      return res.status(400).json({
        error: true,
        message: "Avatar ID is required to update the avatar.",
      });
    }

    // Update the user's avatar
    const affectedRows = await updateUserAvatar(userId, avatarId);

    // If no user is found or the avatar was not updated
    if (affectedRows === 0) {
      return res.status(404).json({
        error: true,
        message: "User not found or avatar update failed.",
      });
    }

    // Successfully updated avatar
    res.status(200).json({
      error: false,
      message: "User avatar updated successfully.",
      avatarId,
    });
  } catch (error) {
    console.error("Error updating user avatar:", error);
    res.status(500).json({
      error: true,
      message: "Internal Server Error. Unable to update user avatar.",
    });
  }
};

  
  module.exports = {
    uploadAvatarImage,
    
    removeAvatarImage,
    fetchUserAvatar,
    fetchAllAvatars,
    updateUserAvatarController,
  };
