const {
    addAvatarImage,
    deleteAvatarImage,
    
    getUserAvatar, updateUserAvatar, getAllAvatars,
  } = require("../models/avatarModel");
  const { saveBase64File } = require("../config/saveBase64File");
  
  const uploadAvatarImage = async (req, res) => {
    try {
      const { image } = req.body;
  
      if (!image) {
        return res.status(400).json({ message: "Image data is required" });
      }
  
      const imagePath = saveBase64File(image, "uploads", "avatar");
      const insertId = await addAvatarImage(imagePath);
  
      res
        .status(201)
        .json({
          message: "Avatar image uploaded successfully",
          id: insertId,
          imagePath,
        });
    } catch (error) {
      console.error("Error uploading Avatar image:", error);
      res.status(500).json({ message: "Internal Server Error" });
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

  // Fetch Selected Avatar for a User
const fetchUserAvatar = async (req, res) => {
  try {
    const { userId } = req.params;
    const avatar = await getUserAvatar(userId);

    if (!avatar) {
      return res.status(404).json({ message: "User avatar not found" });
    }

    res.status(200).json(avatar);
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch All Available Avatars
const fetchAllAvatars = async (req, res) => {
  try {
    const avatars = await getAllAvatars();
    res.status(200).json(avatars);
  } catch (error) {
    console.error("Error fetching avatars:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Selected Avatar for a User
const updateUserAvatarController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { avatarId } = req.body;

    if (!avatarId) {
      return res.status(400).json({ message: "Avatar ID is required" });
    }

    const affectedRows = await updateUserAvatar(userId, avatarId);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found or avatar not updated" });
    }

    res.status(200).json({ message: "User avatar updated successfully", avatarId });
  } catch (error) {
    console.error("Error updating user avatar:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
  
  module.exports = {
    uploadAvatarImage,
    
    removeAvatarImage,
    fetchUserAvatar,
    fetchAllAvatars,
    updateUserAvatarController,
  };
