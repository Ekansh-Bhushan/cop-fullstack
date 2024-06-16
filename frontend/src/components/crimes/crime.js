import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/leftArrow.png";
import "./crime.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./crime.css";

function Crime() {
  const [lat, setLatitude] = useState("");
  const [long, setLongitude] = useState("");
  const [crime, setTypeOfCrime] = useState("");
  const [beat, setBeat] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check for the authentication token
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/"); // Redirect to login if token is not present
      return;
    }
  }, [navigate]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date();
    const selected = new Date(selectedDate);

    // Check if selected date is valid (not future date)
    if (selected <= today) {
      setDate(selectedDate);
      const monthName = selected.toLocaleString("default", { month: "long" });
      const year = selected.getFullYear();
      setYear(year);
      setMonth(monthName);
    } else {
      alert("Please select a date from today or earlier.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const crimeDetails = {
      lat,
      long,
      crime,
      beat,
      date,
      month,
      year,
    };

    try {
      const response = await fetch("http://localhost:4000/api/crimes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(crimeDetails),
      });

      if (response.ok) {
        alert("Crime details added successfully");
        setLatitude("");
        setLongitude("");
        setTypeOfCrime("");
        setBeat("");
        setDate("");
        setMonth("");
      } else {
        alert("Error adding crime details");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding crime details");
    }
  };

  return (
    <>
      <div className="back" onClick={() => navigate("/homepage")}>
        <div className="blockForImageArrow">
          <img src={arrow} alt="back arrow" />
        </div>
        <div className="textHere">Go Back to Dashboard</div>
      </div>
      <ToastContainer />
      <form className="crime-form" onSubmit={handleSubmit}>
        <h2>Enter Crime Details</h2>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            step="0.000001"
            value={lat}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            step="0.000001"
            value={long}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type of Crime:</label>
          <input
            type="text"
            value={crime}
            onChange={(e) => setTypeOfCrime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Police Station Area:</label>
          <input
            type="text"
            value={beat}
            onChange={(e) => setBeat(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            required
            max={new Date().toISOString().split("T")[0]} // Sets max date to today
          />
        </div>
        <div>
          <label>Month:</label>
          <input type="text" value={month} readOnly required />
        </div>
        <div>
          <label>Year:</label>
          <input type="text" value={year} readOnly required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Crime;
