import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../Header/header';
import '../dutychart/dutychart.css';

const DutyTask = () => {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isDateValid, setIsDateValid] = useState(false);

  const areaNames = [
    "Bawana", "Shahbad Dairy", "Narela", "Narela Industrial Area",
    "Alipur", "Samaypur Badli", "Swaroop Nagar", "Bhalswa Dairy"
  ];

  const handleStationChange = (e) => {
    const station = e.target.value;
    setSelectedStation(station);

    // Fetch tasks for selectedStation from API or local data
    // For demonstration, here we are setting some dummy tasks
    if (station) {
      setTasks([
        { id: 1, name: "John Doe", phoneNumber: "9876543210", startTime: "", endTime: "", isChecked: false },
        { id: 2, name: "Jane Smith", phoneNumber: "1234567890", startTime: "", endTime: "", isChecked: false }
      ]);
    } else {
      setTasks([]);
    }
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;

    // Check if the input matches the expected format after the user has finished typing
    if (dateValue.length === 10) {
      // Validate date format (yyyy-mm-dd)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      const isValidFormat = dateRegex.test(dateValue);

      // Validate against past dates
      const selectedDateObj = new Date(dateValue);
      const currentDate = new Date();
      const isFutureDate = selectedDateObj >= currentDate;

      if (isValidFormat && isFutureDate) {
        setSelectedDate(dateValue);
        setIsDateValid(true);
      } else {
        setIsDateValid(false);
        if (!isValidFormat) {
          alert("Please enter a valid date in yyyy-mm-dd format.");
        } else if (!isFutureDate) {
          alert("Please select a date that is today or in the future.");
        }
      }
    } else {
      setSelectedDate(dateValue); // Update selected date even if not fully entered
      setIsDateValid(false); // Set date as invalid until fully validated
    }
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
    );
    setTasks(updatedTasks);
  };

  const handleTimeChange = (taskId, type, value) => {
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) || value === '') {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, [type]: value } : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a valid date is selected
    if (!isDateValid) {
      alert("Please select a valid date before submitting.");
      return;
    }

    const tasksToSubmit = tasks.filter(task => task.isChecked && task.startTime && task.endTime);

    if (tasksToSubmit.length > 0) {
      try {
        // Extract tasks to submit to backend
        const tasksData = tasksToSubmit.map(({ name, phoneNumber, isChecked, startTime, endTime }) => ({
          name,
          phoneNumber,
          date: selectedDate,
          isChecked,
          ...(isChecked ? { startTime, endTime } : {}),
        }));

        // Example URL of your backend endpoint
        const url = 'http://localhost:4000/api/assignDuty';

        // Make POST request to backend using Axios
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
    return tasks.map(task => (
      <div className="names" key={task.id}>
        <h3 style={{ border: 'solid', borderColor: '#b7e2e7', borderRadius: '30px', width: '80px', height:'20px' , textAlign: 'center', position: 'relative', bottom: '15px' }}>
          {task.id}.
        </h3>
        <label>NAME</label>
        <input type="text" className="inputclass" value={task.name} readOnly style={{ borderRadius: '30px', borderColor: '#b7e2e7' }} />
        <label>PH. NO.</label>
        <input type="text" className="inputclass" value={task.phoneNumber} readOnly style={{ borderRadius: '30px', borderColor: '#b7e2e7' }} />
        <label>
          <input
            type="checkbox"
            checked={task.isChecked}
            onChange={() => handleCheckboxChange(task.id)}
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
              onChange={(e) => handleTimeChange(task.id, 'startTime', e.target.value)}
              style={{ borderRadius: '30px', borderColor: '#b7e2e7' }}
              placeholder="HH:MM"
            />
            <label>END TIME</label>
            <input
              type="text"
              className="inputclass"
              value={task.endTime}
              onChange={(e) => handleTimeChange(task.id, 'endTime', e.target.value)}
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
            onChange={handleDateChange}
            placeholder="yyyy-mm-dd"
            style={{ marginLeft: '10px', padding: '10px', fontSize: '16px', borderRadius: '5px', borderColor: '#ccc' }}
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
