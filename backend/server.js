const dotenv = require("dotenv");
dotenv.config(); // Load environment variables first

const express = require("express");

const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // Import bcryptjs
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const User = require("./models/User");
const StaffMember = require("./models/StaffMember");
const Crime = require("./models/Crime");
const Task = require("./models/duty")
const app = express();
const cors = require("cors");

const crimeDataRoutes = require("./routes/crimeDataRoutes");
// Use CORS middleware
app.use(cors());

// Connect to the database

connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/crime-data", crimeDataRoutes);

app.post("/api/login", async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    // Log the request body for debugging
    console.log("Login request body:", req.body);

    // Find the user by mobile number
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      console.log("User not found");
      return res
        .status(400)
        .json({ message: "Invalid mobile number or password" });
    }

    // Check if password matches
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      console.log("Password mismatch");
      return res
        .status(400)
        .json({ message: "Invalid mobile number or password" });
    }

    // Generate JWT token
    // Modify backend /api/login endpoint response to include user information
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: 86400, // 24 hours
      }
    );
    res.status(200).json({ token, user: { name: user.name } }); // Adjust as per your User schema
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).send("Server Error");
  }
});

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

// GET all the users
app.get("/api/total-users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ active: true }); // Assuming you have an 'active' field

    res.json({ total: totalUsers, active: activeUsers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET route to fetch users by area
app.get("/api/users", async (req, res) => {
  const { area } = req.query;
  console.log("Fetching users for area:", area);
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

// POST route to add a new user
// const bcrypt = require('bcryptjs');

app.post("/api/users", async (req, res) => {
  const { name, mobileNumber, password, areas } = req.body;

  // Debugging: Log the received request body
  console.log("Received request body:", req.body);

  if (!name || !mobileNumber || !areas || areas.length === 0) {
    return res
      .status(400)
      .json({ msg: "Please provide name, mobile number, and area" });
  }

  try {
    const area = areas[0];
    const existingUser = await User.findOne({ mobileNumber, areas: area });

    // Debugging: Log the existing user check
    console.log("Checking if user exists:", { mobileNumber, area });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists in the specified areas" });
    }

    // Create a new user with hashed password
    const hashedPassword = bcrypt.hashSync(password, 8);

    const newUser = new User({
      name,
      mobileNumber,
      password, // Use the provided password
      role: "user",
      areas,
    });

    // Debugging: Log the new user object before saving
    console.log("Creating new user:", newUser);

    await newUser.save();
    res.json({ msg: "User added successfully" });
  } catch (err) {
    console.error("Server Error:", err.message);
    res.status(500).send("Server Error");
  }
});

// POST the crime to the dataset
app.post("/api/crimes", async (req, res) => {
  const { lat, long, crime,beat, date, month,year } = req.body;

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

// DELETE route to remove a user by phone number and area
app.delete("/api/users", async (req, res) => {
  const { name, mobileNumber, areas } = req.body;
  console.log("Removing user:", { name, mobileNumber, areas });
  if (!name || !mobileNumber || !areas) {
    return res
      .status(400)
      .json({ msg: "Please provide name, mobile number, and area" });
  }

  try {
    const user = await User.findOneAndDelete({
      mobileNumber,
      areas: areas,
      name,
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found in the specified area" });
    }

    res.status(200).json({ msg: "User removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
app.delete("/api/users", async (req, res) => {
  const { name, mobileNumber, area } = req.body;
  console.log("Removing user:", { name, mobileNumber, area });
  if (!name || !mobileNumber || !area) {
    return res
      .status(400)
      .json({ msg: "Please provide name, mobile number, and area" });
  }

  try {
    const user = await User.findOneAndDelete({
      mobileNumber,
      areas: area,
      name,
    });

    if (!user) {
      return res
        .status(404)
        .json({ msg: "User not found in the specified area" });
    }

    res.status(200).json({ msg: "User removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add duty to users 
app.get('/api/tasks', async (req, res) => {
    const { station } = req.query;
  
    if (!station) {
      return res.status(400).json({ msg: 'Station is required' });
    }
  
    try {
      const tasks = await Task.find({ station });
  
      if (tasks.length === 0) {
        return res.status(404).json({ msg: `No tasks found for station '${station}'` });
      }
  
      res.json(tasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  app.post('/api/tasks', async (req, res) => {
    const tasks = req.body;
  
    try {
      for (const task of tasks) {
        await Task.findByIdAndUpdate(task._id, task, { new: true });
      }
      res.status(200).json({ msg: 'Tasks updated successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
