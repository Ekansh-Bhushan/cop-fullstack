import React, { useState } from 'react';
import mapImage from '../assets/MAP.png';
import Header from './header'; // Adjust import path based on your project structure
import '../styles/dutytask.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Ensure axios is imported
import { toast } from 'react-toastify'; // Assuming toast is being used for notifications

const StaffMembers = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [selectedArea, setSelectedArea] = useState('');
  const [users, setUsers] = useState([]);

  const areaNames = ["Bawana", "Shahbad Dairy", "Narela", "Narela Industrial Area", "Alipur", "Samaypur Badli", "Swaroop Nagar", "Bhalswa Dairy"];

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

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!selectedArea) {
      toast.error('Please select an area.');
      return;
    }

    try {
      console.log('Fetching users for area:', selectedArea);
      const response = await axios.get('http://localhost:4000/api/users', {
        params: { area: selectedArea }
      });
      setUsers(response.data);
      toast.success('Users fetched successfully!');

      // Navigate to new URL with selected area as query parameter
      navigate(`/StaffManagement?area=${encodeURIComponent(selectedArea)}`);

    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response && error.response.status === 404) {
        toast.error('No users found in that area.');
      } else {
        toast.error('Failed to fetch users.');
      }
    }
  };

  return (
    <>
      <Header />
      <div
        className="background"
        style={{
          backgroundImage: `url(${mapImage})`,
          backgroundRepeat: 'no-repeat',
          fontFamily: 'Montserrat',
        }}
      >
        <br />
        <br />
        <br />
        <div className="selectstation">
          <h2>SELECT POLICE STATION</h2>
          <select
            className="select"
            value={selectedArea}
            onChange={handleAreaChange}
            style={{
              backgroundColor: '#EBEBEB',
              width: '150px',
              border: 'none',
            }}
          >
            <option value="">AREA</option>
            {areaNames.map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
        <br />
        <br />
        {selectedArea && (
          <div className="task">
            <h2>Staff Members Under {selectedArea} Police Station</h2>
            {users.length > 0 ? (
              users.map((user, index) => (
                <div key={index}>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Phone Number:</strong> {user.mobileNumber}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No Staff Members found under this police station.</p>
            )}
            <br />
          </div>
        )}
      </div>
    </>
  );
};

export default StaffMembers;
