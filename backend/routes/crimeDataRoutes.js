const express = require("express");
const router = express();
router.use(express.json());

const crimechart = require("../controllers/crimeChart");
const { showCrimeData } = require("../controllers/showCrimeDataController");

// Existing routes
router.get("/by-year/:year", crimechart.getCrimeDataByYear);
router.get("/by/:area/:crime", crimechart.getCrimeDataByAreaAndCrime);

router.get("/filter/:area/:date", showCrimeData);

module.exports = router;
