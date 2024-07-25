const Crime = require("../models/Crime");

const showCrimeData = async (req, res) => {
  const area = req.params.area;
  const date = req.params.date;

  try {
    const crimeData = await Crime.find({
      beat: area,
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
