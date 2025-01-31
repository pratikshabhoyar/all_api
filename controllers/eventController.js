// Reuse saveBase64File utility if already created
const { saveBase64File } = require("../config/saveBase64File");
const eventModel = require("../models/eventModel"); // Correctly import eventModel

// Add Event
// const addNewEvent = async (req, res) => {
//   const { title, location, date, time, description, link, bannerImage } =
//     req.body;

//   try {
//     const imagePath = saveBase64File(bannerImage, "uploads", "event");
//     const eventId = await eventModel.addEvent({
//       title,
//       location,
//       date,
//       time,
//       description,
//       link,
//       banner_image: imagePath,
//     });

//     res.status(201).json({ message: "Event added successfully", eventId });
//   } catch (err) {
//     console.error("Error adding event:", err);
//     res.status(500).json({ error: "Failed to add event." });
//   }
// };
const addNewEvent = async (req, res) => {
  const { title, location, date, time, description, link, bannerImage } = req.body;

  // Validate required fields
  if (!title || !location || !date || !time || !description || !bannerImage) {
    return res.status(400).json({
      error: true,
      message: "All fields (title, location, date, time, description, bannerImage) are required.",
    });
  }

  try {
    const imagePath = saveBase64File(bannerImage, "uploads", "event");
    const eventId = await eventModel.addEvent({
      title,
      location,
      date,
      time,
      description,
      link,
      banner_image: imagePath,
    });

    return res.status(201).json({
      error: false,
      message: "Event added successfully.",
      eventId,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error. Failed to add event.",
    });
  }
};


// Update Event
// const updateExistingEvent = async (req, res) => {
//   const { id } = req.params;
//   const { title, location, date, time, description, link, bannerImage } =
//     req.body;

//   try {
//     let imagePath = null;
//     if (bannerImage) {
//       imagePath = saveBase64File(bannerImage, "uploads", "event");
//     }

//     const updated = await eventModel.updateEvent(id, {
//       title,
//       location,
//       date,
//       time,
//       description,
//       link,
//       banner_image: imagePath,
//     });

//     if (!updated) {
//       return res.status(404).json({ error: "Event not found." });
//     }

//     res.status(200).json({ message: "Event updated successfully." });
//   } catch (err) {
//     console.error("Error updating event:", err);
//     res.status(500).json({ error: "Failed to update event." });
//   }
// };
const updateExistingEvent = async (req, res) => {
  const { id } = req.params;
  const { title, location, date, time, description, link, bannerImage } = req.body;

  // Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      error: true,
      message: "Invalid event ID. Must be a number.",
    });
  }

  try {
    let imagePath = null;
    if (bannerImage) {
      imagePath = saveBase64File(bannerImage, "uploads", "event");
    }

    const updated = await eventModel.updateEvent(id, {
      title,
      location,
      date,
      time,
      description,
      link,
      banner_image: imagePath,
    });

    if (!updated) {
      return res.status(404).json({
        error: true,
        message: "Event not found. Update failed.",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Event updated successfully.",
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error. Failed to update event.",
    });
  }
};


// Delete Event
// const deleteEventById = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deleted = await eventModel.deleteEvent(id);

//     if (deleted) {
//       res.status(200).json({ message: "Event deleted successfully" });
//     } else {
//       res.status(404).json({ error: "Event not found" });
//     }
//   } catch (err) {
//     console.error("Error deleting event:", err);
//     res.status(500).json({ error: "Failed to delete event" });
//   }
// };
const deleteEventById = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      error: true,
      message: "Invalid event ID. Must be a number.",
    });
  }

  try {
    const deleted = await eventModel.deleteEvent(id);

    if (!deleted) {
      return res.status(404).json({
        error: true,
        message: "Event not found. Deletion failed.",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error. Failed to delete event.",
    });
  }
};


// Get All Events
// const getAllEventsList = async (req, res) => {
//   try {
//     const events = await eventModel.getAllEvents();
//     res.status(200).json(events);
//   } catch (err) {
//     console.error("Error fetching events:", err);
//     res.status(500).json({ error: "Failed to fetch events" });
//   }
// };
const getAllEventsList = async (req, res) => {
  try {
    const events = await eventModel.getAllEvents();

    if (!events || events.length === 0) {
      return res.status(404).json({
        error: true,
        message: "No events available in the database.",
      });
    }

    res.status(200).json({
      error: false,
      events: events,
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

// Get Event by ID
// const getEventDetails = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const event = await eventModel.getEventById(id);

//     if (event) {
//       res.status(200).json(event);
//     } else {
//       res.status(404).json({ error: "Event not found" });
//     }
//   } catch (err) {
//     console.error("Error fetching event:", err);
//     res.status(500).json({ error: "Failed to fetch event" });
//   }
// };

// const getEventsCount = async (req, res) => {
//   try {
//     const count = await eventModel.getEventsCount(); // Call the newly added function
//     res.status(200).json({ count });
//   } catch (error) {
//     console.error("Error fetching event count:", error);
//     res.status(500).json({ error: "Failed to fetch event count." });
//   }
// };
const getEventDetails = async (req, res) => {
  const { id } = req.params;

  // Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({
      error: true,
      message: "Invalid event ID. Must be a number.",
    });
  }

  try {
    const event = await eventModel.getEventById(id);

    if (!event) {
      return res.status(404).json({
        error: true,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      error: false,
      event,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error. Failed to fetch event.",
    });
  }
};

// Get Events Count
const getEventsCount = async (req, res) => {
  try {
    const count = await eventModel.getEventsCount();

    return res.status(200).json({
      error: false,
      count,
    });
  } catch (error) {
    console.error("Error fetching event count:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error. Failed to fetch event count.",
    });
  }
};

module.exports = {
  addNewEvent,
  updateExistingEvent,
  deleteEventById,
  getAllEventsList,
  getEventDetails,
  getEventsCount,
};