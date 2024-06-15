import React, { useState } from 'react';
import mapImage from '../assets/MAP.png';
import Header from './header'; // Adjust import path based on your project structure
import '../styles/dutytask.css';

const StaffMembers = () => {
  const [selectedStation, setSelectedStation] = useState('');
  const [staffMembers, setStaffMembers] = useState([]);

  const areaNames = [
    'Bawana',
    'Shahbad Dairy',
    'Narela',
    'Narela Industrial Area',
    'Alipur',
    'Samaypur Badli',
    'Swaroop Nagar',
    'Bhalswa Dairy',
  ];

  // Simulated sample data based on selected station
  const sampleData = {
    Bawana: [
      { name: 'John Doe', phoneNumber: '9876543210' },
      { name: 'Jane Smith', phoneNumber: '1234567890' },
    ],
    'Shahbad Dairy': [
      { name: 'Mike Johnson', phoneNumber: '5556667777' },
      { name: 'Emily Brown', phoneNumber: '9998887777' },
    ],
    Narela: [
      { name: 'Robert Lee', phoneNumber: '1112223333' },
      { name: 'Maria Garcia', phoneNumber: '4445556666' },
    ],
    // Add more stations with sample data as needed
  };

  const handleStationChange = (e) => {
    const station = e.target.value;
    setSelectedStation(station);
    // Simulate fetching data based on selected station
    const data = sampleData[station] || [];
    setStaffMembers(data);
  };

  const renderStaffMembers = () => {
    return staffMembers.map((member, index) => (
      <div key={index}>
        <p><strong>Name:</strong> {member.name}</p>
        <p><strong>Phone Number:</strong> {member.phoneNumber}</p>
        <hr />
      </div>
    ));
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
            value={selectedStation}
            onChange={handleStationChange}
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
        {selectedStation && (
          <div className="task">
            <h2>Staff Members Under {selectedStation} Police Station</h2>
            {staffMembers.length > 0 ? (
              renderStaffMembers()
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
