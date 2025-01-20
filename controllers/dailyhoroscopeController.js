const db = require('../models/dailyhoroscopeModels');

const addDailyHoroscope = (req, res) => {
    const { daily_horoscope } = req.body;

    if (!daily_horoscope) {
        return res.status(400).json({ error: 'Daily horoscope is required.' });
    }

    const query = `
        INSERT INTO daily_horoscope (daily_horoscope) 
        VALUES (?)
    `;

    const values = [daily_horoscope];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error adding daily horoscope:', err);
            return res.status(500).json({ error: 'Failed to add daily horoscope.' });
        }
        res.status(201).json({ message: 'Daily horoscope added successfully.', horoscopeId: result.insertId });
    });
};

module.exports = { addDailyHoroscope };
