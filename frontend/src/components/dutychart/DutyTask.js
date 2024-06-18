import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../Header/header';
import '../dutychart/dutychart.css';

const DutyTask = () => {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDateValid, setIsDateValid] = useState(true);

  useEffect(() => {
    // Set the selected date to today's date
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const areaNames = [
    "Bawana", "Shahbad Dairy", "Narela", "Narela Industrial Area",
    "Alipur", "Samaypur Badli", "Swaroop Nagar", "Bhalswa Dairy"
  ];

  const handleStationChange = async (e) => {
    const station = e.target.value;
    setSelectedStation(station);

    if (station) {
      try {
        const response = await axios.get(`http://localhost:4000/api/usersForTask?area=${station}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching users for task:", error);
      }
    } else {
      setTasks([]);
    }
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task._id === taskId ? { ...task, isChecked: !task.isChecked } : task
    );
    setTasks(updatedTasks);
  };

  const handleTimeChange = (taskId, type, value) => {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) || value === '') {
      const updatedTasks = tasks.map(task =>
        task._id === taskId ? { ...task, [type]: value } : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tasksToSubmit = tasks.filter(task => task.isChecked && task.startTime && task.endTime);

    if (tasksToSubmit.length > 0) {
      try {
        const tasksData = tasksToSubmit.map(({ name, mobileNumber, isChecked, startTime, endTime }) => ({
          name,
          phoneNumber: mobileNumber,
          date: selectedDate,
          isChecked,
          ...(isChecked ? { startTime, endTime } : {}),
        }));

        const url = 'http://localhost:4000/api/assignDuty';
        const response = await axios.post(url, tasksData);

        console.log('Response from server:', response.data);
        alert('Duty assigned successfully!');
      } catch (error) {
        console.error('Error assigning duty:', error);
        alert('Failed to assign duty. Please try again later.');
      }
    } else {
      alert("Please fill start and end times for necessary tasks.");
    }
  };

  const renderTasks = () => {
    return tasks.map((task, index) => (
      <div className="names" key={task._id}>
        <h3 style={{ border: 'solid', borderColor: '#b7e2e7', borderRadius: '30px', width: '80px', height: '20px', textAlign: 'center', position: 'relative', bottom: '15px' }}>
          {index + 1}.
        </h3>
        <label>NAME</label>
        <input type="text" className="inputclass" value={task.name} readOnly style={{ borderRadius: '30px', borderColor: '#b7e2e7' }} />
        <label>PH. NO.</label>
        <input type="text" className="inputclass" value={task.mobileNumber} readOnly style={{ borderRadius: '30px', borderColor: '#b7e2e7' }} />
        <label>
          <input
            type="checkbox"
            checked={task.isChecked}
            onChange={() => handleCheckboxChange(task._id)}
          />
          &nbsp; Enter Time
        </label>
        {task.isChecked && (
          <>
            <label>START TIME</label>
            <input
              type="text"
              className="inputclass"
              value={task.startTime}
              onChange={(e) => handleTimeChange(task._id, 'startTime', e.target.value)}
              style={{ borderRadius: '30px', borderColor: '#b7e2e7' }}
              placeholder="HH:MM"
            />
            <label>END TIME</label>
            <input
              type="text"
              className="inputclass"
              value={task.endTime}
              onChange={(e) => handleTimeChange(task._id, 'endTime', e.target.value)}
              style={{ borderRadius: '30px', borderColor: '#b7e2e7' }}
              placeholder="HH:MM"
            />
          </>
        )}
      </div>
    ));
  };

  return (
    <>
      <Header />
      <div className='selectstations'>
        <h2>SELECT POLICE STATION</h2>
        <div className="select-container">
          <select className="select" value={selectedStation} onChange={handleStationChange}>
            <option value="">Area</option>
            {areaNames.map(area => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          <input className='dateinput'
            type="text"
            value={selectedDate}
            readOnly
            style={{ marginLeft: '10px', padding: '10px', fontSize: '16px', borderRadius: '5px', borderColor: '#ccc', backgroundColor: '#e9e9e9' }}
          />
          <button type="submit" className="select-button" onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>
      <div>
        {renderTasks()}
      </div>
    </>
  );
};

export default DutyTask;
