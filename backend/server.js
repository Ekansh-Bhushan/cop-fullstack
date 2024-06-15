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
    const { name, mobileNumber, password, role, areas } = req.body;

    if (!name || !mobileNumber || !password || !role || !areas) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    try {
        // Hash password before saving to database
        // const hashedPassword = bcrypt.hashSync(password, 10); // Adjust salt rounds as needed

        const newUser = new User({
            name,
            mobileNumber,
            password,
            role,
            areas,
        });

        await newUser.save();
        res.json({ msg: 'User created successfully', user: newUser });
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

app.get('/api/staff', async (req, res) => {
    const { station } = req.query;
  
    try {
        let staffMembers;
        if (station) {
            staffMembers = await StaffMember.find({ station }, 'name phoneNumber');
        } else {
            staffMembers = await StaffMember.find({}, 'name phoneNumber');
        }
  
        if (!staffMembers.length) {
            return res.status(404).json({ msg: 'No staff members found' });
        }
  
        res.json(staffMembers);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
});

app.get('/checkData', async (req, res) => {
    try {
        const data = await User.find(); // Replace User with your actual model
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Duty assignment route
app.post('/api/duty/assign', async (req, res) => {
    const tasks = req.body;

    try {
        const dutyPromises = tasks.map(async (task) => {
            const user = await User.findOne({ mobileNumber: task.mobileNumber });

            if (!user) {
                throw new Error(`Invalid mobile number: ${task.mobileNumber}`);
            }

            if (!user.areas.includes(task.selectedArea)) {
                throw new Error(`User is not assigned to the selected area: ${task.selectedArea}`);
            }

            const duty = new Duty({
                checkbox: task.checkbox,
                startTime: task.startTime,
                endTime: task.endTime,
                assignedArea: task.selectedArea,
                assignedTo: user._id,
            });

            await duty.save();
        });

        await Promise.all(dutyPromises);

        res.status(200).json({ message: 'Assigned Successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
