import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePasswordToggle from '../../hooks/usepasswordtoggle';
import logo from '../../assets/Logo.png';
import policeLogo from '../../assets/policeLogo.png';
import './login.css';
import axios from 'axios';
import { API_URL } from '../config/config';

function Login() {
  const [passwordInputType, toggleIcon] = usePasswordToggle();
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    const regex = /^[0-9\b]+$/;

    if (value === '' || (regex.test(value) && value.length <= 10)) {
      setMobileNumber(value);
    } else {
      if (!regex.test(value)) {
        toast.error("Please enter only numeric characters!");
      } else if (value.length > 10) {
        toast.error("Phone number cannot exceed 10 digits!");
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting with:', mobileNumber, password);
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        mobileNumber,
        password
      });

      console.log('Response:', response.data);
      const { token, user } = response.data; // Assuming the response includes the user's name

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', user.name); // Store the user's name
        window.location.href = '/homepage';
        toast.success("Welcome");
      } else {
        toast.error("Invalid response from server");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Invalid mobile number or password!");
    }
  };

  return (
    <>
      <img src={policeLogo} alt='LOGO' className='police-logo'/>
      <div className="login-container">
        <div className="header">
          <img src={logo} alt="COP Logo" className="logo" />
        </div>
        <div className="login-box">
          <h2 className="signin-title">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Enter the Mobile Number" 
              className="input-field"
              value={mobileNumber}
              onChange={handleMobileNumberChange} 
            />
            <input 
              type={passwordInputType}
              placeholder='Enter the Password' 
              className="input-field" 
              value={password}
              onChange={handlePasswordChange}
            />
            <button type="submit" className="signin-button">Sign in</button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar/>
    </>
  );
}

export default Login;
