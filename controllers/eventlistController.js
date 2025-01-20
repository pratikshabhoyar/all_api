const Event = require('../models/eventlistModel');

const EventController = {
    // Fetch and return the Mandir list
    getEventList: (req, res) => {
        Event.getAllEvents((err, results) => {
            if (err) {
                console.error('Error fetching event list:', err);
                res.status(500).json({ error: 'Failed to fetch event list' });
            } else {
                res.json(results);
            }
        });
    },
};

module.exports=EventController;