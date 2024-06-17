const Crime = require("../models/Crime");
const moment = require("moment");

const showCrimeData = async (req, res) => {
  const area = req.params.area;
  const date = req.params.date;

  try {
    // const formattedDate = moment(date, "DD-MM-YYYY").toDate();
    const crimeData = await Crime.find({ beat: area, date: date });
    res.send(crimeData);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch crime data." });
  }
};
module.exports = {
  showCrimeData,
};
