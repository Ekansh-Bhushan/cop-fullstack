const dotenv = require("dotenv");
dotenv.config(); // Load environment variables first
const cron = require("node-cron");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // Import bcryptjs
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db");
const User = require("./models/User");
const StaffMember = require("./models/StaffMember");
const Crime = require("./models/Crime");
const Task = require("./models/duty");
const app = express();
const cors = require("cors");

const crimeDataRoutes = require("./routes/crimeDataRoutes");
const userRoutes = require("./routes/userRoutes");
const dutyRoutes = require("./routes/dutyRoutes");

connectDB();
app.use(cors()); // Open CORS for all origins

// Middleware]
const allowedOrigins = [
  "http://localhost:3000",
  "http://dpcop.delhicop.in/",
  "http://www.dpcop.delhicop.in/",
  "http://195.35.56.134:5000",
  "https://delhicop.in",
  "http://93.127.172.217:3000/",
  "http://93.127.172.217:5000/",
  "https://www.delhicop.in",
  "http://www.delhicop.in",
  "http://delhicop.in",
  "https://dpfrontend.onrender.com",
  "http://inrizz.com/",
  "http://www.inrizz.com/",
  "https://inrizz.com/",
  "https://www.inrizz.com/",
];


// ****************************************

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use("*", cors(corsOptions));
app.use(bodyParser.json());
app.use("/crime-data", crimeDataRoutes);
app.use(userRoutes);
app.use(dutyRoutes);

// Schedule a cron job to run every minute
cron.schedule("* * * * *", async () => {
  // Runs every minute
  try {
    const currentTime = new Date().getTime();
    const tasks = await Task.find({ isChecked: true });

    for (const task of tasks) {
      const user = await User.findOne({ mobileNumber: task.phoneNumber });

      if (user) {
        const taskStartTime = new Date(
          `${task.date}T${task.startTime}`
        ).getTime();
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
    console.error("Error updating user active status:", error.message);
  }
});

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

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(_dirname, '/frontend/build/index.html'))
);

const PORT = process.env.PORT || 2005;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
