const mandirModel = require("../models/mandirModel"); // Import model
const { saveBase64File } = require("../config/saveBase64File");
//////
const {
  getSelectedMandirsByUserId,
  updateSelectedMandirsByUserId,
  getMandirDetails,
} = require('../models/userModel');
const pool = require("../config/db");
// Add Mandir
const addMandir = async (req, res) => {
  const { images } = req.body;
  let imageUrls = [];
  
  if (images && images.length > 0) {
    try {
      // Wait for all image saves to complete
      imageUrls = await Promise.all(
        images.map((image) => saveBase64File(image, "uploads", "mandir"))
      );
    } catch (err) {
      console.error("Error saving images:", err);
      return res.status(500).json({ error: "Failed to save images." });
    }
  }

  try {
    const mandirId = await mandirModel.addMandir({
      ...req.body,
      images: imageUrls,
    });

    res.status(201).json({ message: "Mandir added successfully", mandirId });
  } catch (err) {
    console.error("Error adding mandir:", err);
    res.status(500).json({ error: "Failed to add mandir." });
  }
};

// Update Mandir
const updateMandir = async (req, res) => {
  const mandirId = req.params.id;
  const {
    title,
    nickname,
    description,
    youtube_live_link,
    offline_video_morning,
    offline_video_evening,
    offline_video_night,
    aarti_time_morning,
    aarti_time_evening,
    aarti_time_night,
    map_link,
    images, // Expecting base64 images or existing paths
    city,
    country,
  } = req.body;

  let imageUrls = [];
  try {
    if (images && images.length > 0) {
      imageUrls = images.map((image) => {
        if (image.startsWith("data:image")) {
          // Save new Base64 image
          return saveBase64File(image, "uploads", "mandir");
        } else {
          // Retain existing image path
          return image;
        }
      });
    } else {
      // Retain existing images if no new ones are provided
      const existingMandir = await mandirModel.getMandirById(mandirId);
      if (!existingMandir) {
        return res.status(404).json({ error: "Mandir not found." });
      }
      imageUrls = existingMandir.images;
    }
  } catch (err) {
    console.error("Error processing images:", err);
    return res.status(500).json({ error: "Failed to process images." });
  }

  try {
    const updated = await mandirModel.updateMandir(mandirId, {
      title,
      nickname,
      description,
      youtube_live_link,
      offline_video_morning,
      offline_video_evening,
      offline_video_night,
      aarti_time_morning,
      aarti_time_evening,
      aarti_time_night,
      map_link,
      images: imageUrls,
      city,
      country,
    });

    if (!updated) {
      return res.status(404).json({ error: "Mandir not found." });
    }

    res.status(200).json({ message: "Mandir updated successfully." });
  } catch (err) {
    console.error("Error updating mandir:", err);
    res.status(500).json({ error: "Failed to update mandir." });
  }
};

// const getAllMandirs = async (req, res) => {
//   try {
//     const mandirs = await mandirModel.getAllMandirs();
//     res.status(200).json(mandirs);
//   } catch (err) {
//     console.error("Error fetching mandirs:", err);
//     res.status(500).json({ error: "Failed to fetch mandirs." });
//   }
// };
const getAllMandirs = async (req, res) => {
  try {
    const mandirs = await mandirModel.getAllMandirs();

    if (!mandirs || mandirs.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No mandirs available in the database.",
      });
    }

    res.status(200).json({
      error: false,
      mandirs: mandirs,
    });
  } catch (err) {
    console.error("Error fetching mandirs:", err);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const getMandirById = async (req, res) => {
  const mandirId = req.params.id;

  try {
    const mandir = await mandirModel.getMandirById(mandirId);
    if (!mandir) {
      return res.status(404).json({ error: "Mandir not found." });
    }
    res.status(200).json(mandir);
  } catch (err) {
    console.error("Error fetching mandir:", err);
    res.status(500).json({ error: "Failed to fetch mandir." });
  }
};

const deleteMandir = async (req, res) => {
  const mandirId = req.params.id;

  try {
    const result = await mandirModel.deleteMandir(mandirId);

    if (result === 0) {
      return res.status(404).json({ error: "Mandir not found." });
    }

    res.status(200).json({ message: "Mandir deleted successfully." });
  } catch (err) {
    console.error("Error deleting mandir:", err);
    res.status(500).json({ error: "Failed to delete mandir." });
  }
};

const updateMandirStatus = async (req, res) => {
  const mandirId = req.params.id;
  const { status } = req.body;

  if (typeof status !== "number") {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updated = await mandirModel.updateMandirStatus(mandirId, status);

    if (!updated) {
      return res.status(404).json({ error: "Mandir not found" });
    }

    res.status(200).json({ message: "Mandir status updated successfully" });
  } catch (err) {
    console.error("Error updating mandir status:", err);
    res.status(500).json({ error: "Failed to update mandir status" });
  }
};

const getMandirCount = async (req, res) => {
  try {
    const count = await mandirModel.getMandirCount();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching Mandir count:", error);
    res.status(500).json({ error: "Failed to fetch Mandir count." });
  }
};


// ///////////////////////////
// // Fetch selected mandirs for a user
// const getSelectedMandirs = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Fetch selected mandir IDs
//     const selectedMandirIds = await getSelectedMandirsByUserId(userId);

//     // If no selected mandirs, return an empty array
//     if (!Array.isArray(selectedMandirIds) || selectedMandirIds.length === 0) {
//       return res.status(200).json({
//         user_id: userId,
//         selected_mandirs: [],
//       });
//     }

//     // Fetch mandir details
//     const mandirDetails = await getMandirDetails(selectedMandirIds);

//     res.status(200).json({
//       user_id: userId,
//       selected_mandirs: mandirDetails,
//     });
//   } catch (error) {
//     console.error("Error fetching selected mandirs:", error);
//     res.status(500).json({ error: "Internal Server Error", message: error.message });
//   }
// };


// // Update selected mandirs for a user
// const updateSelectedMandirs = async (req, res) => {
//   const { userId } = req.params;
//   const { mandirIds } = req.body;

//   if (!Array.isArray(mandirIds)) {
//     return res.status(400).json({ error: "Invalid format. Expected an array of mandir IDs." });
//   }

//   try {
//     // Update selected mandir IDs in the User table
//     await updateSelectedMandirsByUserId(userId, mandirIds);
//     res.status(200).json({
//       message: "Selected mandirs updated successfully.",
//       user_id: userId,
//       selected_mandirs: mandirIds,
//     });
//   } catch (error) {
//     console.error("Error updating selected mandirs:", error);
//     res.status(500).json({ error: "Internal Server Error", message: error.message });
//   }
// };
// Fetch selected mandirs for a user
const getSelectedMandirs = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch selected mandir IDs
    const result = await getSelectedMandirsByUserId(userId);

    if (result.error) {
      return res.status(404).json({ error: true, message: result.message });
    }

    // Fetch valid mandir details
    const mandirDetails = await getMandirDetails(result.mandirIds);

    if (mandirDetails.error) {
      return res.status(400).json({ error: true, message: mandirDetails.message });
    }

    res.status(200).json({
      user_id: userId,
      selected_mandirs: mandirDetails.mandirs, // Only return valid mandirs
    });
  } catch (error) {
    console.error("Error fetching selected mandirs:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// Update selected mandirs for a user
const updateSelectedMandirs = async (req, res) => {
  const { userId } = req.params;
  const { mandirIds } = req.body;

  if (!Array.isArray(mandirIds) || mandirIds.length === 0) {
    return res.status(400).json({ error: true, message: "Mandir list cannot be empty or invalid." });
  }

  try {
    // Fetch valid mandir IDs from the `mandir` table
    const placeholders = mandirIds.map(() => "?").join(",");
    const [validMandirs] = await pool.execute(
      `SELECT id FROM mandir WHERE id IN (${placeholders})`,
      mandirIds
    );

    const validMandirIds = validMandirs.map(m => m.id);

    // Find invalid Mandir IDs
    const invalidMandirs = mandirIds.filter(id => !validMandirIds.includes(id));

    if (invalidMandirs.length > 0) {
      return res.status(400).json({
        error: true,
        message: `Invalid mandir IDs: ${invalidMandirs.join(", ")}`,
      });
    }

    // Update selected mandirs only with valid IDs
    const serializedMandirs = JSON.stringify(validMandirIds);
    const [result] = await pool.execute(
      "UPDATE users SET selected_mandirs = ? WHERE id = ?",
      [serializedMandirs, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: true, message: "User not found." });
    }

    res.status(200).json({
      message: "Selected mandirs updated successfully.",
      user_id: userId,
      selected_mandirs: validMandirIds,
    });
  } catch (error) {
    console.error("Error updating selected mandirs:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};



module.exports = {
  addMandir,
  updateMandir,
  deleteMandir,
  getAllMandirs,
  getMandirById,
  updateMandirStatus,
  getMandirCount,
  /////////////
  getSelectedMandirs,
  updateSelectedMandirs,
 
};
