const {
    addAvatarImage,
    deleteAvatarImage,
    getAllAvatarImages,
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
  
  const fetchAllAvatarImages = async (req, res) => {
    try {
      const images = await getAllAvatarImages();
      res.status(200).json(images);
    } catch (error) {
      console.error("Error fetching Avatar images:", error);
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
  
  module.exports = {
    uploadAvatarImage,
    fetchAllAvatarImages,
    removeAvatarImage,
  };
