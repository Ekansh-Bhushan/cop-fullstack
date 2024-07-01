import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/header";
import "./dutytask.css";
import "./staffMembers.css";
import { API_URL } from '../config/config';
const StaffManagement = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [selectedArea, setSelectedArea] = useState("");
  const [users, setUsers] = useState([]);

  const areaNames = [
    "Alipur",
    "Bawana",
    "Bhalswa Dairy",
    "Narela",
    "Narela Industrial Area",
    "Samaypur Badli",
    "Shahbad Dairy",
    "Swaroop Nagar",
  ];

  // useEffect(() => {
  //   // Check for the authentication token
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     toast.error("Please login first!");
  //     navigate("/"); // Redirect to login if token is not present
  //     return;
  //   }
  // }, [navigate]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
      setIsValidPhoneNumber(value.length === 10);
    }
  };

  const handleAreaChange = (e) => {
    const value = e.target.value;
    setSelectedArea(value);
  };

  const handleAddStaff = async () => {
    if (name.trim() === "" || phoneNumber.trim() === "") {
      toast.error("Please fill out both Name and Phone Number.");
    } else if (!isValidPhoneNumber) {
      toast.error("Please enter a valid 10-digit Phone Number.");
    } else if (!selectedArea) {
      toast.error("Please select an area.");
    } else {
      try {
        // console.log("Adding staff:", { name, phoneNumber, selectedArea });
        await axios.post("/api/users", {
          name,
          mobileNumber: phoneNumber,
          areas: [selectedArea],
        });

        toast.success("STAFF MEMBER HAS BEEN ADDED SUCCESSFULLY!");
        setName("");
        setPhoneNumber("");
        setIsValidPhoneNumber(true);
        await handleSubmit();
      } catch (error) {
        console.error("Error adding staff:", error);
        const errorMsg =
          error.response && error.response.data
            ? error.response.data.msg
            : "Failed to add staff member.";
        toast.error(errorMsg);
      }
    }
  };

  const handleRemoveStaff = async () => {
    if (name.trim() === "" || phoneNumber.trim() === "") {
      toast.error("Please fill out both Name and Phone Number.");
    } else if (!selectedArea) {
      toast.error("Please select an area.");
    } else {
      try {
        // console.log("Removing staff:", { name, phoneNumber, selectedArea });
        await axios.delete(`${API_URL}/api/users`, {
          data: { name, mobileNumber: phoneNumber, areas: [selectedArea] },
        });
        toast.success("STAFF MEMBER HAS BEEN REMOVED SUCCESSFULLY!");
        setName("");
        setPhoneNumber("");
        setIsValidPhoneNumber(true);
        await handleSubmit();
      } catch (error) {
        console.error("Error removing staff:", error);
        const errorMsg =
          error.response && error.response.data
            ? error.response.data.msg
            : "Failed to remove staff member.";
        toast.error(errorMsg);
      }
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!selectedArea) {
      toast.error("Please select an area.");
      return;
    }

    try {
      // console.log("Fetching users for area:", selectedArea);
      const response = await axios.get(`${API_URL}/api/users`, {
        params: { area: selectedArea },
      });
      setUsers(response.data);
      toast.success("Users fetched successfully!");

      // Navigate to new URL with selected area as query parameter and state
      navigate(`/StaffMembers`, { state: { users: response.data } });
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response && error.response.status === 404) {
        toast.error("No users found in that area.");
      } else {
        toast.error("Failed to fetch users.");
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Header />
      <div>
        <div className="select_copstation">
          <h3>SELECT POLICE STATION</h3>
          <form onSubmit={handleSubmit}>
            <select
              className="selectoption"
              style={{
                backgroundColor: "#EBEBEB",
                width: "130px",
                border: "none",
              }}
              value={selectedArea}
              onChange={handleAreaChange}
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
              type="submit"
              value="SELECT"
              className="select"
              style={{
                backgroundColor: "#009ADC",
                color: "#fff",
                textAlign: "center",
                margin: "20px",
                width: "130px",
                border: "none",
                fontWeight: "bold",
              }}
            />
          </form>
        </div>

        <br />
        <br />
        <div className="userlist">
          <div className="staffmembers">
            <h2>
              STAFF MEMBERS UNDER{" "}
              <span className="nameareaofselectarea">{selectedArea}</span>{" "}
              POLICE STATION
            </h2>
          </div>
          <div className="fetched-user">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Station</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.mobileNumber}</td>
                    <td>{selectedArea}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffManagement;
