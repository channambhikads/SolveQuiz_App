const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db.js');
const port = process.env.PORT || 5000;
const usersRoute = require('./routes/usersRoute');
const examRoute = require('./routes/examRoute');

// Connect to the database
connectDB();

app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/exams", examRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
