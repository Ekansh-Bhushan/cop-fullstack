import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mapImage from '../../assets/MAP.png';
import Header from '../Header/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../dutychart/dutychart.css';

const DutyTask = () => {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState('');
  const [tasks, setTasks] = useState([]);

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

  useEffect(() => {
    // Check for the authentication token
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login first!");
      navigate('/'); // Redirect to login if token is not present
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedStation) {
      fetchTasks(selectedStation);
    }
  }, [selectedStation]);

  const fetchTasks = async (station) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/tasks?station=${station}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Error fetching tasks');
    }
  };

  const handleStationChange = (e) => {
    setSelectedStation(e.target.value);
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
      console.log("Tasks to submit:", tasksToSubmit);
      // Send data to backend using fetch or axios
      axios.post('http://localhost:4000/api/tasks', tasksToSubmit)
        .then(response => {
          console.log('Success:', response.data);
          toast.success('Tasks submitted successfully');
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('Error submitting tasks');
        });
    } else {
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
      <ToastContainer />
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
