const express = require('express'); // Express is required to create an application
const mongoose = require('mongoose'); // Mongoose is required for MongoDB interactions

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myFirstDB')
    .then(() => {
        console.log('Yeah, Connected to the database');
    })
    .catch((err) => {
        console.log('Error is...: ', err);
    });

// Create a schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    {timestamps: true}
);

// Create a model
const User = mongoose.model('User', userSchema);

// Route to create a new user
app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (!body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            gender: body.gender,
            jobTitle: body.jobTitle,
        });
        console.log("Result is", result);
        return res.status(201).json({ message: "User created successfully", data: result });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user", error });
    }
});

// Start the server--> http://localhost:8000/api/users
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} :)`);
});


