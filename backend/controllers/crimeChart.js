const Crime = require("../models/Crime");

const getCrimeDataByYear = async (req, res) => {
  try {
    const year = req.params.year;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const crimeData = [];

    for (const month of months) {
      const totalCrimes = await Crime.countDocuments({
        year: year,
        month: month,
      });
      crimeData.push(totalCrimes);
    }

    res.send(crimeData);
  } catch (error) {
    console.error("Error retrieving crime data by year:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getCrimeDataByAreaAndCrime = async (req, res) => {
  try {
    const area = req.params.area;
    const crime = req.params.crime;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const crimeData = [];
    if (crime == "All") {
      for (const month of months) {
        const totalCrimes = await Crime.countDocuments({
          month: month,
          beat: area,
        });
        crimeData.push(totalCrimes);
      }
      res.send(crimeData);
      return;
    }
    for (const month of months) {
      const totalCrimes = await Crime.countDocuments({
        month: month,
        beat: area,
        crime: crime,
      });
      crimeData.push(totalCrimes);
    }
    res.send(crimeData);
  } catch (error) {
    console.error("Error retrieving crime data by area and type:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCrimeDataByYear,
  getCrimeDataByAreaAndCrime,
};
