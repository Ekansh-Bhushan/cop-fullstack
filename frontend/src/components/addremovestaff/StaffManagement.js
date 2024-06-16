import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/header';
import mapImage from '../../assets/MAP.png';
import '../addremovestaff/StaffManagement.css'

const StaffManagement = () => {
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

  function generateRandomPassword(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    return Array.from({length}, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
  }

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
    if (name.trim() === '' || phoneNumber.trim() === '') {
        toast.error('Please fill out both Name and Phone Number.');
    } else if (!isValidPhoneNumber) {
        toast.error('Please enter a valid 10-digit Phone Number.');
    } else if (!selectedArea) {
        toast.error('Please select an area.');
    } else {
        try {
            const password = generateRandomPassword();
            const userPayload = {
                name: name,
                mobileNumber: phoneNumber,
                password: password,
                role: "user",
                areas: [selectedArea]
            };

            // Debugging: Log the payload being sent to the server
            console.log('Adding staff:', userPayload);

            await axios.post('http://localhost:4000/api/users', userPayload);
            
            toast.success('STAFF MEMBER HAS BEEN ADDED SUCCESSFULLY!');
            setName('');
            setPhoneNumber('');
            setIsValidPhoneNumber(true);
            await handleSubmit();
        } catch (error) {
            console.error('Error adding staff:', error);
            const errorMsg = error.response && error.response.data ? error.response.data.msg : 'Failed to add staff member.';
            toast.error(errorMsg);
        }
    }
};


  const handleRemoveStaff = async () => {
    if (name.trim() === '' || phoneNumber.trim() === '') {
      toast.error('Please fill out both Name and Phone Number.');
    } else if (!selectedArea) {
      toast.error('Please select an area.');
    } else {
      try {
        console.log('Removing staff:', { name, phoneNumber, selectedArea });
        await axios.delete('http://localhost:4000/api/users', {
          data: { name, mobileNumber: phoneNumber, areas: [selectedArea] }
        });
        toast.success('STAFF MEMBER HAS BEEN REMOVED SUCCESSFULLY!');
        setName('');
        setPhoneNumber('');
        setIsValidPhoneNumber(true);
        await handleSubmit();
      } catch (error) {
        console.error('Error removing staff:', error);
        const errorMsg = error.response && error.response.data ? error.response.data.msg : 'Failed to remove staff member.';
        toast.error(errorMsg);
      }
    }
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
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Header />
      <div
        // style={{
        //   backgroundImage: `url(${mapImage})`,
        //   backgroundRepeat: 'no-repeat',
        //   fontFamily: 'Montserrat',
        // }}
      >
        
        <div className="select_station">
          <h3>SELECT POLICE STATION</h3>
          <form onSubmit={handleSubmit}>
            <select
              className="selectoption"
              style={{
                backgroundColor: '#EBEBEB',
                width: '120px',
                border: 'none',
                
              }}
              value={selectedArea}
              onChange={handleAreaChange}
            >
              <option value="" disabled>Select Area</option>
              {areaNames.map((area, index) => (
                <option key={index} value={area}>{area}</option>
              ))}
            </select>
            <input
              type="submit"
              value="SELECT"
              className="select"
              style={{
                backgroundColor: '#009ADC',
                color: '#fff',
                textAlign: 'center',
                margin : '20px',
                width: '120px',
                border: 'none',
                fontWeight : 'bold' ,
              }}
            />
          </form>
        </div>
        
        <div className="tasks">
          <h2>ADD / REMOVE STAFF</h2>
          <div className="details">
            <div className='name'>

              <label>NAME</label>
              <input
                type="text"
                className="input_class"
                placeholder="Enter the Name"
                value={name}
                onChange={handleNameChange}
                style={{ borderRadius: '30px', borderColor: '#b7e2e7'  }}
                />
            </div>
            <div className='detail'>

              <label>PH. NO.</label>
              <input
                type="text"
                className="input_class"
                placeholder="Enter the Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                style={{
                  borderRadius: '30px',
                  borderColor: isValidPhoneNumber ? '#b7e2e7' : 'red',
                }}
                />
              </div>
            {!isValidPhoneNumber && (
              <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                Please enter a valid 10-digit phone number.
              </p>
            )}
          </div>
          
          <div className="buttons">
            <button className="button" onClick={handleAddStaff} disabled={name.trim() === '' || phoneNumber.trim() === '' || !selectedArea}>
              ADD
            </button>
            <button className="button" onClick={handleRemoveStaff} disabled={name.trim() === '' || phoneNumber.trim() === '' || !selectedArea}>
              REMOVE
            </button>
          </div>
        </div>
        <br />
        <br />
        <div className="userlist">
          <h2>USERS IN SELECTED AREA</h2>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user.name} - {user.mobileNumber}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StaffManagement;
