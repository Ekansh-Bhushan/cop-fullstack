// LoginScreen.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../global.css';
import '../index.css';
import usePasswordToggle from '../../hooks/usepasswordtoggle'; // Adjust the path as per your project structure
import logo from '../../assets/Logo.png'
import onlyLogo from '../../assets/policeLogo.png'

const LoginScreen = () => {
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
    <div className="login-screen">
      <section className="map"></section>
      <div className="login-screen-child"></div>
      <input 
        className="login-screen-item" 
        placeholder='Enter the Phone Number'
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      
      <input 
        className="login-screen-inner" 
        placeholder='Enter the Password'
        type={passwordInputType}
        value={password}
        onChange={handlePasswordChange}
      />

      <span className='password-toggle-icon'>{toggleIcon}</span>

      <button className="rectangle-button" onClick={handleSubmit}>Sign In</button>
      <div className="mobile-number">Mobile Number</div>
      <div className="password">Password</div>
      <div className="sign-in">Sign in</div>
      <h1 className="sign-in1">Sign In</h1>
      <div className="group-parent">
        <img className="group-icon" alt="" src={logo} />

        {/* <h1 className="constableonpatrol">ConstableOnPatrol</h1> */}
      </div>
      <div className="image-2-parent">
        <img className="image-2-icon" alt="" src={onlyLogo} />

        <h3 className="delhi-police">DELHI POLICE</h3>
        <div className="shanti-sewa-nyaya">SHANTI SEWA NYAYA</div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginScreen;
