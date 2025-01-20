const Book = require('../models/booklistModel');

const BookController = {
    // Fetch and return the Mandir list
    getBookList: (req, res) => {
        Book.getAllBooks((err, results) => {
            if (err) {
                console.error('Error fetching book list:', err);
                res.status(500).json({ error: 'Failed to fetch book list' });
            } else {
                res.json(results);
            }
        });
    },
};

module.exports=BookController;