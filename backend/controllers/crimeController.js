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

const addCrime = async (req, res) => {
  const { lat, long, crime, beat, date, month, year } = req.body;

  try {
    const newCrime = new Crime({
      lat,
      long,
      crime,
      beat,
      date,
      month,
      year,
    });

    await newCrime.save();
    res.status(201).json({ msg: "Crime details added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

const getCrimeAttributes = async (req, res) => {
  try {
    const attributes = await Crime.find().distinct("crime");
    const count = attributes.length;
    const attributeCounts = {};

    for (const attribute of attributes) {
      const attributeCount = await Crime.countDocuments({ crime: attribute });
      attributeCounts[attribute] = attributeCount;
    }

    res.json({ attributes, count, attributeCounts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  showCrimeData, addCrime, getCrimeAttributes
};
