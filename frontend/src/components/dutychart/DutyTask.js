import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../config/config';
import Header from '../Header/header';
import '../dutychart/dutychart.css';

const DutyTask = () => {
  const navigate = useNavigate();
  const [selectedStation, setSelectedStation] = useState('');
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [isDateValid, setIsDateValid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login page if not authenticated
    }
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    setSelectedDate(formatDate(today));
    setMinDate(formatDate(today));
    setMaxDate(formatDate(oneMonthLater));
  }, [navigate]);

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

  const handleStationChange = async (e) => {
    const station = e.target.value;
    setSelectedStation(station);

    if (station) {
      try {
        const response = await axios.get(`${API_URL}/api/usersForTask?area=${station}`);
        const tasksData = response.data.map(task => ({
          ...task,
          startTime: task.startTime || '',
          endTime: task.endTime || '',
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching users for task:", error);
      }
    } else {
      setTasks([]);
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task._id === taskId ? { ...task, isChecked: !task.isChecked } : task
    );
    setTasks(updatedTasks);
  };

  const handleTimeChange = (taskId, type, value) => {
    const updatedTasks = tasks.map(task =>
      task._id === taskId ? { ...task, [type]: value + ':00' } : task
    );
    setTasks(updatedTasks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tasksToSubmit = tasks.filter(task => task.isChecked && task.startTime && task.endTime);

    if (tasksToSubmit.length > 0) {
      try {
        // Send each task as a separate request
        for (const task of tasksToSubmit) {
          const taskData = {
            name: task.name,
            phoneNumber: task.mobileNumber,
            date: selectedDate,
            isChecked: task.isChecked,
            startTime: task.startTime,
            endTime: task.endTime
          };

          // console.log('Sending request to backend:', taskData);

          const response = await axios.post(`${API_URL}/api/assignDuty`, taskData);

          // console.log('Response from server:', response.data);

          // Show success toast
          toast.success('Duty assigned successfully!', {
            position: 'top-center'
          });
        }
      } catch (error) {
        console.error('Error assigning duty:', error.response ? error.response.data : error.message);

        // Show error toast
        toast.error(`Failed to assign duty. Please try again later. Error: ${error.response ? error.response.data : error.message}`, {
          position: 'top-center'
        });
      }
    } else {
      toast.warn("Please fill start and end times for necessary tasks.");
    }
  };

  const renderTasks = () => {
    return tasks.map((task, index) => (
      <div className="names" key={task._id}>
        <h3 style={{ border: 'solid', borderColor: '#b7e2e7', borderRadius: '30px', width: '80px', height: '30px', textAlign: 'center', position: 'relative', bottom: '15px' }}>
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
              type="time"
              className="inputclass"
              value={task.startTime.slice(0, 5)}
              onChange={(e) => handleTimeChange(task._id, 'startTime', e.target.value)}
              style={{ borderRadius: '30px', borderColor: '#b7e2e7' }}
            />
            <label>END TIME</label>
            <input
              type="time"
              className="inputclass"
              value={task.endTime.slice(0, 5)}
              onChange={(e) => handleTimeChange(task._id, 'endTime', e.target.value)}
              style={{ borderRadius: '30px', borderColor: '#b7e2e7' }}
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
            type="date"
            value={selectedDate}
            min={minDate}
            max={maxDate}
            onChange={handleDateChange}
            style={{ marginLeft: '10px', padding: '10px', fontSize: '16px', borderRadius: '5px', borderColor: '#ccc', backgroundColor: '#e9e9e9' }}
          />
          <button type="submit" className="select-button" onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>
      <div>
        {renderTasks()}
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar/>
    </>
  );
};

export default DutyTask;
