// LoginScreen.js
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../global.css';
import '../index.css';
import usePasswordToggle from '../../hooks/usepasswordtoggle'; // Adjust the path as per your project structure
import logo from '../../assets/Logo.png'
import onlyLogo from '../../assets/OnlyLogo.png'

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
      <div className="delhi-police-parent">
        <b className="delhi-police">DELHI POLICE</b>
        <div className="shanti-sewa-nyaya-wrapper">
          <div className="shanti-sewa-nyaya">SHANTI SEWA NYAYA</div>
        </div>
      </div>
      <main>
        <img className="group-icon" loading="lazy" alt="" src={logo} />
        <img className="image-2-icon" loading="lazy" alt="" src={onlyLogo} />
      </main>
      <div className="user-authentication-wrapper">
        <div className="user-authentication">
          <div className="constable-title">
            
          </div>
      
    <div className="credentials-form">
    <div className="credentials-form-child"></div>
    <h1 className="sign-in">Sign In</h1>
    <form className="input-fields">
      <div className="input-container">
      <input 
        className="input-container-child" 
        placeholder='Enter the Phone Number'
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      
      <input 
        className="input-container-item" 
        placeholder='Enter the Password'
        type={passwordInputType}
        value={password}
        onChange={handlePasswordChange}
      />

      <span className='password-toggle-icon'>{toggleIcon}</span>

       <button type="submit" className="submit-button">
       <div className="submit-button-child"></div>
       <div className="sign-in1">Sign In</div>
     </button>
   </div>
 </form>
 <ToastContainer />
</div>
</div>
</div>
</div>
);
}

export default LoginScreen;
