require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path"); // Import path module
const adminRoutes = require("./routes/adminRoutes");
const mandirRoutes = require("./routes/mandirRoutes"); // Add Mandir routes
const eventRoutes = require("./routes/eventRoutes");
const bookRoutes = require("./routes/bookRoutes");
const suvicharRoutes = require("./routes/suvicharRoutes");
const userRoutes = require("./routes/userRoutes");
//const horoscopeRoutes = require('./routes/dailyhoroscopeRoutes');
const mandirlistRoutes = require('./routes/mandirlistRoutes'); // Path to your routes
const userlistRoutes = require('./routes/userlistRoutes');
const eventlistRoutes = require('./routes/eventlistRoutes');
const booklistRoutes = require('./routes/booklistRoutes');
const offlinemandirRoutes = require('./routes/offlinemandirlistRoutes');
const authRoutes = require('./routes/authRoutes');
const signupRoutes = require('./routes/signupRoutes');
const authRoutesNotification = require('./routes/notificationSettingsRoutes');
const db_notification = require('./models/notificationSettings');
const { getNotificationSettings, updateNotificationSettings } = require('./models/notificationSettings');
const avatarRoutes = require("./routes/avatarRoutes");
const templeRoutes = require('./routes/templeRoutes');
const fetchmandirRoutes = require('./routes/fetchmandirRoutes');
// const db = require('./models/db');
const db=require('./config/db');
const app = express();

// Middleware for CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Only allow requests from your React frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed methods
    credentials: true, // Allow credentials (cookies, headers, etc.)
  })
);

app.use(bodyParser.json({ limit: "100mb" })); // Increase the limit for base64 data
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // URL encoding with larger data
app.use(express.json()); // Middleware for parsing JSON

// Static file serving for images
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images from 'uploads' folder

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/mandir", mandirRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/suvichar", suvicharRoutes); // Add suvichar routes
app.use("/api/users", userRoutes);
//app.use('/api/horoscope', horoscopeRoutes);
// Routes
app.use('/api/auth',authRoutesNotification);
app.use("/api/avatar", avatarRoutes);
app.use('/api', templeRoutes);

// //mandirlist Routes
// app.use('/api', mandirlistRoutes); // API base URL
// // // userlist routes
// app.use('/api', userlistRoutes);
// //eventlist routes
// app.use('/api', eventlistRoutes);
// //booklist routes
// app.use('/api', booklistRoutes);
// //offlinemandirlist routes
// app.use('/api', offlinemandirRoutes);
app.use('/api/mandirlist', mandirlistRoutes);
app.use('/api/userlist', userlistRoutes);
app.use('/api/eventlist', eventlistRoutes);
app.use('/api/booklist', booklistRoutes);
app.use('/api/offlinemandirlist', offlinemandirRoutes);
app.use('/api/auth',authRoutes);
app.use('api/auth',signupRoutes);
app.use('/api', fetchmandirRoutes);
// Test database connection
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err.stack);
//     return;
//   }
//   console.log('Connected to database.');
// });

// console.log(__dirname);
console.log(require.resolve('./routes/mandirRoutes'));
console.log('Mandir routes loaded successfully.');

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//add event
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route);
  }
});
// Error handling middleware (horoscope)
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error stack trace
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});
