const dotenv = require("dotenv");
dotenv.config(); // Load environment variables first

const cron = require('node-cron');
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // Import bcryptjs
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const User = require("./models/User");
const Task = require("./models/duty");
const app = express();
const cors = require("cors");

const crimeDataRoutes = require("./routes/crimeDataRoutes");

// Connect to the database
connectDB();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://dpcop.delhicop.in/',
  'http://www.dpcop.delhicop.in/',
  'http://195.35.56.134:5000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/crime-data", crimeDataRoutes);

// Schedule a cron job to run every minute
cron.schedule('* * * * *', async () => { // Runs every minute
  try {
    const currentTime = new Date().getTime();
    const tasks = await Task.find({ isChecked: true });

    for (const task of tasks) {
      const user = await User.findOne({ mobileNumber: task.phoneNumber });

      if (user) {
        const taskStartTime = new Date(`${task.date}T${task.startTime}`).getTime();
        const taskEndTime = new Date(`${task.date}T${task.endTime}`).getTime();

        if (currentTime >= taskStartTime && currentTime <= taskEndTime) {
          user.active = true;
        } else {
          user.active = false;
        }

        await user.save();
      }
    }
  } catch (error) {
    console.error('Error updating user active status:', error.message);
  }
});

// User status endpoint
app.get("/api/user-status/:phoneNumber", async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    const user = await User.findOne({ mobileNumber: phoneNumber });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ active: user.active });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(400).json({ message: "Invalid mobile number or password" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).json({ message: "Invalid mobile number or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: 86400 } // 24 hours
    );
    res.status(200).json({ token, user: { name: user.name } });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).send("Server Error");
  }
});

// Fetch users by area
app.get("/api/users", async (req, res) => {
  const { area } = req.query;

  if (!area) {
    return res.status(400).json({ msg: "Area is required" });
  }

  try {
    const users = await User.find({ areas: area });

    if (users.length === 0) {
      return res.status(404).json({ msg: `No users found in area '${area}'` });
    }

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Fetch total users
app.get("/api/total-users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ active: true });

    res.json({ total: totalUsers, active: activeUsers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Fetch active users
app.get("/api/activeUser", async (req, res) => {
  try {
    const activeUsers = await User.find({ active: true }, 'name mobileNumber areas');

    res.json(activeUsers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new user
app.post("/api/users", async (req, res) => {
  const { name, mobileNumber, password, areas } = req.body;

  if (!name || !mobileNumber || !areas || areas.length === 0) {
    return res.status(400).json({ msg: "Please provide name, mobile number, and area" });
  }

  try {
    const area = areas[0];
    const existingUser = await User.findOne({ mobileNumber, areas: area });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists in the specified areas" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const newUser = new User({
      name,
      mobileNumber,
      password: hashedPassword,
      role: "user",
      areas,
    });

    await newUser.save();
    res.json({ msg: "User added successfully" });
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server Error");
  }
});

// Add a new crime
app.post("/api/crimes", async (req, res) => {
  const { lat, long, crime, beat, date, month, year } = req.body;

  try {
    const newCrime = new Crime({
      lat,
      long,
      crime,
      beat,
      date,
      month,
      year
    });

    await newCrime.save();
    res.status(201).json({ msg: "Crime details added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a user by phone number and area
app.delete("/api/users", async (req, res) => {
  const { name, mobileNumber, areas } = req.body;

  if (!name || !mobileNumber || !areas) {
    return res.status(400).json({ msg: "Please provide name, mobile number, and area" });
  }

  try {
    const user = await User.findOneAndDelete({ mobileNumber, areas, name });

    if (!user) {
      return res.status(404).json({ msg: "User not found in the specified area" });
    }

    res.status(200).json({ msg: "User removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Fetch users for a specific area
app.get('/api/usersForTask', async (req, res) => {
  const { area } = req.query;

  if (!area) {
    return res.status(400).json({ msg: "Area is required" });
  }

  try {
    const users = await User.find({ areas: area });

    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found in that area" });
    }

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Assign duty to a user
app.post('/api/assignDuty', async (req, res) => {
  const { name, phoneNumber, date, isChecked, startTime, endTime } = req.body;

  if (!name || !phoneNumber || !date || typeof isChecked !== 'boolean') {
    return res.status(400).json({ msg: "Name, phone number, date, and isChecked are required" });
  }

  if (isChecked && (!startTime || !endTime)) {
    return res.status(400).json({ msg: "Start time and end time are required when isChecked is true" });
  }

  try {
    let user = await User.findOne({ mobileNumber: phoneNumber });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.isChecked = isChecked;
    user.startTime = isChecked ? startTime : null;
    user.endTime = isChecked ? endTime : null;

    await user.save();

    let existingTask = await Task.findOne({ phoneNumber, date });

    if (existingTask) {
      existingTask.name = name;
      existingTask.startTime = isChecked ? startTime : null;
      existingTask.endTime = isChecked ? endTime : null;
      existingTask.isChecked = isChecked;
      existingTask.station = user.areas[0];
      await existingTask.save();
    } else {
      const newTask = new Task({
        name,
        phoneNumber,
        date,
        startTime: isChecked ? startTime : null,
        endTime: isChecked ? endTime : null,
        isChecked,
        station: user.areas[0]
      });

      await newTask.save();
    }

    res.json({ msg: "Duty assigned successfully", user });
  } catch (err) {
    console.error("Error in assignDuty:", err.message);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
