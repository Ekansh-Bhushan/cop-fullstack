const express = require("express");
const router = express();
router.use(express.json());

const crimechart = require("../controllers/crimeChart");
const { showCrimeData, addCrime, getCrimeAttributes } = require("../controllers/crimeController");

// Existing routes
router.get("/by-year/:year", crimechart.getCrimeDataByYear);
router.get("/by/:area/:crime", crimechart.getCrimeDataByAreaAndCrime);

router.get("/filter/:area/:date", showCrimeData);
router.post("/api/crimes", addCrime);
router.get("/api/crime-attributes", getCrimeAttributes);


module.exports = router;
