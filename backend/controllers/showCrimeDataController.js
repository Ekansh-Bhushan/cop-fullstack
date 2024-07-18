const Crime = require("../models/Crime");
const moment = require("moment");

const showCrimeData = async (req, res) => {
  const area = req.params.area;
  const date = req.params.date;

  try {
    const formattedArea =
      area.charAt(0).toUpperCase() + area.slice(1).toLowerCase();
    const crimeData = await Crime.find({
      $or: [{ beat: formattedArea }, { beat: formattedArea.toUpperCase() }],
      date: date,
    });
    res.send(crimeData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch crime data." });
  }
};

module.exports = {
  showCrimeData,
};
