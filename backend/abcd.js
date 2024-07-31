app.get("/api/crime-attributes", async (req, res) => {
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
});

app.get("/api/crime-beats", async (req, res) => {
  try {
    const beats = await Crime.find().distinct("beat");
    const count = beats.length;
    const beatCounts = {};

    for (const beat of beats) {
      const beatCount = await Crime.countDocuments({ beat });
      beatCounts[beat] = beatCount;
    }

    res.json({ beats, count, beatCounts });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// convertin to upper case
app.get("/api/crime-beats/upper", async (req, res) => {
  const crimes = await Crime.find();
  const beats = crimes.map((crime) => crime.crime);

  // Change the variable value to upper case
  const upperCaseBeats = beats.map((beat) => beat.toUpperCase());

  // Replace the entry in the database
  for (let i = 0; i < crimes.length; i++) {
    crimes[i].crime = upperCaseBeats[i];
    await crimes[i].save();
  }
  res.json({ msg: "Beats updated successfully" });
});

// ****************************************
// Read beat value from crime schema and store them in a variable
app.get("/api/crimeb/upper", async (req, res) => {
  const crimes = await Crime.find();
  const beats = crimes.map((crime) => crime.crime);

  // Change the variable value to upper case
  // const upperCaseBeats = beats.map((beat) => beat.toUpperCase());

  // Replace the entry in the database
  for (let i = 0; i < crimes.length; i++) {
    if (crimes[i].crime === "M V Theft") {
      crimes[i].crime = "MV THEFT";
    }
    await crimes[i].save();
  }
  res.json({ msg: "Beats updated successfully" });
});
// ****************************************
