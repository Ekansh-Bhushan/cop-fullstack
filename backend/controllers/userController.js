// const Crime = require("../models/Crime");
const { get } = require("mongoose");
const User = require("../models/User");

const getUsers = async (req, res) => {
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
};

const getTotalUsers = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ active: true }); // Assuming you have an 'active' field
    
        res.json({ total: totalUsers, active: activeUsers });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
};

const activeUsers = async (req, res) => {
    try {
        const activeUsers = await User.find(
          { active: true },
          "name mobileNumber areas"
        ); // Fetch only name, phone number, and areas of active users
    
        // Fetch the duty times for each active user
        const usersWithDutyTimes = await Promise.all(
          activeUsers.map(async (user) => {
            const duty = await Task.findOne({
              phoneNumber: user.mobileNumber,
              isChecked: true,
            });
            return {
              ...user._doc,
              dutyStartTime: duty ? duty.startTime : null,
              dutyEndTime: duty ? duty.endTime : null,
            };
          })
        );
    
        res.json(usersWithDutyTimes);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
};

const addUser = async (req, res) => {
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
  
};

const deleteUser = async (req, res) => {
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
};

const getUsersfromMobile = async (req, res) => {
    try {
        const users = await User.find({}, "mobileNumber"); // Fetch only mobileNumber field
        const mobileNumbers = users.map((user) => user.mobileNumber); // Extract mobileNumber values
    
        res.json({ mobileNumbers });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
};

const getUserStatus = async (req, res) => {
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
};

module.exports = {
  getUsers, getTotalUsers, activeUsers, addUser, deleteUser, getUsersfromMobile, getUserStatus
};
