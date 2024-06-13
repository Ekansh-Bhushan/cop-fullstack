import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapImage from '../assets/MAP.png';
import Header from './header.js';
import '../styles/dutytask.css';

const DutyTask = () => {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, name: "John Doe", phoneNumber: "9876543210", startTime: "", endTime: "", isChecked: false },
    { id: 2, name: "Jane Smith", phoneNumber: "1234567890", startTime: "", endTime: "", isChecked: false }
  ]);

  const areaNames = [
    "Bawana",
    "shahbad dairy",
    "Narela",
    "Narela Industrial Area",
    "Alipur",
    "Samaypur Badli",
    "Swaroop Nagar",
    "Bhalswa Dairy"
  ];

  const handleStationChange = (e) => {
    setSelectedStation(e.target.value);
    // Example: Fetch tasks for selectedStation from API or local data
    // For demonstration, here we are setting some dummy tasks
    setTasks([
      { id: 1, name: "John Doe", phoneNumber: "9876543210", startTime: "", endTime: "", isChecked: false },
      { id: 2, name: "Jane Smith", phoneNumber: "1234567890", startTime: "", endTime: "", isChecked: false }
    ]);
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
    );
    setTasks(updatedTasks);
  };

  const handleTimeChange = (taskId, type, value) => {
    // Validate time format as HH:MM
    if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value) || value === '') {
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, [type]: value } : task
      );
      setTasks(updatedTasks);
    }
  };

  const handleSubmit = () => {
    // Validate that start and end times are filled for necessary tasks
    const tasksToSubmit = tasks.filter(task => task.isChecked && task.startTime && task.endTime);

    if (tasksToSubmit.length > 0) {
      // Here you can send `tasksToSubmit` data to your backend API
      console.log("Tasks to submit:", tasksToSubmit);
      // Send data to backend using fetch or axios
      // fetch('your-backend-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(tasksToSubmit),
      // })
      // .then(response => response.json())
      // .then(data => {
      //   console.log('Success:', data);
      //   // Optionally navigate to a success page or show a success message
      // })
      // .catch((error) => {
      //   console.error('Error:', error);
      //   // Handle error scenario, show toast or message
      // });
    } else {
      // Display a message or toast indicating that at least one task is missing start/end time
      alert("Please fill start and end times for necessary tasks.");
    }
  };

  const renderTasks = () => {
    return tasks.map(task => (
      <div className="names" key={task.id}>
        <h3 style={{ border: 'solid', borderColor: '#b7e2e7', borderRadius: '30px', width: '100px', textAlign: 'center', position: 'relative', bottom: '15px' }}>
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
      <div className='background' style={{ 
        backgroundImage: `url(${mapImage})`, 
        backgroundRepeat:'no-repeat',
        fontFamily: 'Montserrat',
      }}>
        <br /><br /><br />
        <div className="selectstation">
          <h2>SELECT POLICE STATION</h2>
          <select className="select" value={selectedStation} onChange={handleStationChange} style={{ backgroundColor: '#EBEBEB', width: '150px', border: 'none' }}>
            <option value="">AREA</option>
            {areaNames.map((area, index) => (
              <option key={index} value={area}>{area}</option>
            ))}
          </select>
          <input
            type="submit"
            value="SUBMIT"
            className="select"
            style={{ backgroundColor: '#009ADC', color: '#fff', textAlign: 'center', margin: '20px', width: '150px', border: 'none' }}
          />
        </div>
        <br /><br />
        {selectedStation && (
          <div className="task">
            <h2>STAFF DUTY TASK</h2>
            {tasks.length > 0 ? (
              renderTasks()
            ) : (
              <p>No tasks found for selected station.</p>
            )}
            <br />
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>
    </>
  );
};

export default DutyTask;
