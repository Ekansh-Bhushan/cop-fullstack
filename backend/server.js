const dotenv = require('dotenv');
dotenv.config(); // Load environment variables first

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const User = require('./models/User');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// GET route to fetch users by area
app.get('/api/users', async (req, res) => {
    const { area } = req.query;

    if (!area) {
        return res.status(400).json({ msg: 'Area is required' });
    }

    try {
        const users = await User.find({ areas: area });

        if (users.length === 0) {
            return res.status(404).json({ msg: 'No users found in that area' });
        }

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST route to add a new user
app.post('/api/users', async (req, res) => {
    const { name, mobileNumber, area } = req.body;

    if (!name || !mobileNumber || !area) {
        return res.status(400).json({ msg: 'Please provide name, mobile number, and area' });
    }

    try {
        const existingUser = await User.findOne({ mobileNumber, areas: area });

        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists in the specified area' });
        }

        const newUser = new User({
            name,
            mobileNumber,
            password: 'defaultPassword', // Set a default password, or prompt the user for one
            role: 'user',
            areas: [area],
        });

        await newUser.save();
        res.json({ msg: 'User added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE route to remove a user by phone number and area
app.delete('/api/users', async (req, res) => {
    const { name, mobileNumber, area } = req.body;

    if (!name || !mobileNumber || !area) {
        return res.status(400).json({ msg: 'Please provide name, mobile number, and area' });
    }

    try {
        const user = await User.findOneAndDelete({ mobileNumber, areas: area, name });

        if (!user) {
            return res.status(404).json({ msg: 'User not found in the specified area' });
        }

        res.json({ msg: 'User removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
