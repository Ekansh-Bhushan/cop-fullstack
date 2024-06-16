const express = require("express");
const router = express();
router.use(express.json());

const crimechart = require("../controllers/crimeChart");

// Existing routes
router.get("/by-year/:year", crimechart.getCrimeDataByYear);
router.get("/by/:area/:crime", crimechart.getCrimeDataByAreaAndCrime);

module.exports = router;
