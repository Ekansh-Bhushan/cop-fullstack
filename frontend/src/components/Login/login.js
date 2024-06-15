import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePasswordToggle from '../../hooks/usepasswordtoggle'; // Adjust the path as per your project structure
import logo from '../../assets/Logo.png';
import policeLogo from '../../assets/policeLogo.png'
import './login.css';

function Login() { // Changed to capital "L" as React components should be capitalized
    const [passwordInputType, toggleIcon] = usePasswordToggle(); // Using custom hook
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
  
    const handlePhoneNumberChange = (e) => {
      const value = e.target.value;
      const regex = /^[0-9\b]+$/; // Regex for only numbers
  
      if (value === '' || (regex.test(value) && value.length <= 10)) {
        setPhoneNumber(value);
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('Form submitted:', phoneNumber, password);
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
                value={phoneNumber}
                onChange={handlePhoneNumberChange} 
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
    )
}

export default Login;
