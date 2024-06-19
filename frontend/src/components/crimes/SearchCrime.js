import React, { useState, useEffect } from "react";
import "./searchCrime.css";

const SearchCrime = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [area, setArea] = useState("");
  const [crimes, setCrimes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://195.35.56.134:5000/crime-data/filter/${area}/${date}`
      );
      const data = await response.json();
      setCrimes(data);
    } catch (error) {
      console.error("Error fetching crime data:", error);
    }
  };

  const handleAreaChange = (e) => {
    const value = e.target.value;
    setArea(value);
  };

  const areaNames = [
    "BAWANA",
    "SHAHBAD DAIRY",
    "NARELA",
    "NARELA INDUSTRIAL AREA",
    "ALIPUR",
    "SAMAYPUR BADLI",
    "SWAROOP NAGAR",
    "BHALSWA DAIRY",
  ];
  return (
    <div className="searchCrime-container">
      <h2>Search Crime</h2>
      <form className="searchCrime-container-inputs" onSubmit={handleSubmit}>
        <select
          className="selectoption"
          value={area}
          onChange={handleAreaChange}
          required
        >
          <option value="" disabled>
            Select Area
          </option>
          {areaNames.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
        <input
          type="date"
          placeholder="Enter date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]} // Sets max date to today
          required
        />
        <button type="submit">Search</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Area</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Crime</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {crimes.map((crime, index) => (
            <tr key={index}>
              <td>{crime.beat}</td>
              <td>{crime.lat}</td>
              <td>{crime.long}</td>
              <td>{crime.crime}</td>
              <td>{crime.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchCrime;
