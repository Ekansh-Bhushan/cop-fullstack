const dotenv = require('dotenv');
dotenv.config(); // Load environment variables first

const express = require('express');

const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // Import bcryptjs
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const User = require('./models/User');
const StaffMember = require('./models/StaffMember');

const app = express();
const cors = require('cors');

// Use CORS middleware
app.use(cors());

// Connect to the database

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.post('/api/login', async (req, res) => {
    const { mobileNumber, password } = req.body;

    try {
        // Log the request body for debugging
        console.log('Login request body:', req.body);
        
        // Find the user by mobile number
        const user = await User.findOne({ mobileNumber });

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid mobile number or password' });
        }

        // Check if password matches
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid mobile number or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).json({ token });
    } catch (err) {
        console.error('Server error:', err.message);
        res.status(500).send('Server Error');
    }
});



// GET route to fetch users by area
app.get('/api/users', async (req, res) => {
    const { area } = req.query;
    console.log('Fetching users for area:', area);
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
// const bcrypt = require('bcryptjs');

// Example user creation route
app.post('/api/users', async (req, res) => {
    const { name, mobileNumber, area } = req.body;

    if (!name || !mobileNumber || !area) {
        return res.status(400).json({ msg: 'Please provide name, mobile number, and area' });
    }

    try {
        const existingUser = await User.findOne({ mobileNumber, areas: area });
        console.log(name , mobileNumber ,area) ;
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
    const { name, mobileNumber, areas } = req.body;
    console.log('Removing user:', { name, mobileNumber, areas });
    if (!name || !mobileNumber || !areas) {
        return res.status(400).json({ msg: 'Please provide name, mobile number, and area' });
    }

    try {
        const user = await User.findOneAndDelete({ mobileNumber, areas: areas, name });

        if (!user) {
            return res.status(404).json({ msg: 'User not found in the specified area' });
        }

        res.status(200).json({ msg: 'User removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
app.delete('/api/users', async (req, res) => {
    const { name, mobileNumber, area } = req.body;
    console.log('Removing user:', { name, mobileNumber, area });
    if (!name || !mobileNumber || !area) {
        return res.status(400).json({ msg: 'Please provide name, mobile number, and area' });
    }

    try {
        const user = await User.findOneAndDelete({ mobileNumber, areas: area, name });

        if (!user) {
            return res.status(404).json({ msg: 'User not found in the specified area' });
        }

        res.status(200).json({ msg: 'User removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
