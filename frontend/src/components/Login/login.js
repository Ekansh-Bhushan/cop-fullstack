import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePasswordToggle from '../../hooks/usepasswordtoggle';
import logo from '../../assets/Logo.png';
import policeLogo from '../../assets/policeLogo.png';
import './login.css';
import axios from 'axios';

function Login() {
    const [passwordInputType, toggleIcon] = usePasswordToggle();
    const [mobileNumber, setmobileNumber] = useState('');
    const [password, setPassword] = useState('');
  
    const handlemobileNumberChange = (e) => {
      const value = e.target.value;
      const regex = /^[0-9\b]+$/;
  
      if (value === '' || (regex.test(value) && value.length <= 10)) {
        setmobileNumber(value);
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
        console.log('Submitting with:', mobileNumber, password); // Check values before making request
        try {
            const response = await axios.post('http://localhost:4000/api/login', {
                mobileNumber, // Correct field name
                password
            });
            console.log('Response:', response.data); // Log response for debugging
            const { token } = response.data;
            localStorage.setItem('token', token);
            // Redirect to the protected page
            window.location.href = '/DutyTask';
            toast.success("welcome");
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
                onChange={handlemobileNumberChange} 
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
        <ToastContainer />
      </>
    );
}

export default Login;
