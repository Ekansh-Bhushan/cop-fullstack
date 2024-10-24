const Duty = require('../models/duty');
const User = require('../models/User');

const dutyAssign = async (req, res) => {
  const { name, phoneNumber, date, isChecked, startTime, endTime } = req.body;

  console.log("Received request:", req.body);

  if (!name || !phoneNumber || !date || typeof isChecked !== "boolean") {
    return res
      .status(400)
      .json({ msg: "Name, phone number, date, and isChecked are required" });
  }

  if (isChecked && (!startTime || !endTime)) {
    return res.status(400).json({
      msg: "Start time and end time are required when isChecked is true",
    });
  }

  try {
    // Find the user by phone number
    let user = await User.findOne({ mobileNumber: phoneNumber });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("User found:", user);

    // Update user's isChecked, startTime, and endTime
    user.isChecked = isChecked;
    user.startTime = isChecked ? startTime : null;
    user.endTime = isChecked ? endTime : null;

    // Save the user changes
    await user.save();

    // Check if there's an existing task for the user on the same date
    let existingTask = await Task.findOne({ phoneNumber, date });

    if (existingTask) {
      console.log("Existing task found for user:", existingTask);

      // Update existing task
      existingTask.name = name;
      existingTask.startTime = isChecked ? startTime : null;
      existingTask.endTime = isChecked ? endTime : null;
      existingTask.isChecked = isChecked;
      existingTask.station = user.areas[0];
      await existingTask.save();
    } else {
      console.log("No existing task found, creating new task");

      // Create a new task
      const newTask = new Task({
        name,
        phoneNumber,
        date,
        startTime: isChecked ? startTime : null,
        endTime: isChecked ? endTime : null,
        isChecked,
        station: user.areas[0],
      });

      // Save the new task
      await newTask.save();
      
    }

    res.json({ msg: "Duty assigned successfully", user });
  } catch (err) {
    console.error("Error in assignDuty:", err.message);
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
};

const usersForTask = async (req, res) => {
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
}

module.exports = {
  dutyAssign, usersForTask
};
