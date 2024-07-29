import React from 'react';
import './Footer.css';
import Logo from '../../assets/Logo.png';
import dpLogo from '../../assets/dpLogo.png';
import copQR from '../../assets/copQR.png';

export default function Footer() {
return (
    <footer className="footer">
        <div className="footer-bottom">
            <div className="img-wrapper">
                <img src={dpLogo} alt="policeLogo" border="0"  className='dpflogo'/>
                <img src={Logo} alt="Logo" border="0" className='flogo'/>
            </div>
            <div className='qr-wrapper'>
                <div className='app-available'>
                    APP AVAILABLE ON IOS AND ANDROID
                </div>
                <img src={copQR} className='qr'/>
            </div>
        </div>
        <div className="footer-top">
            <div className="links-wrapper">
                <a href="/" className="link">HOME</a>
                <a href="/#aboutUs" className="link">ABOUT US</a>
                <a href="/#contact" className="link">CONTACT US</a>
                <a href="/#faqs" className="link">FAQs</a>
                <a href="/#team" className="link">DEVELOPMENT TEAM</a>
                <a href="/privacy" className="link">PRIVACY POLICY</a>
                <a href="/tnc" className="link">TERMS & CONDITIONS</a>
            </div>
        </div>
        <div className='footer-rights'>© 2024 Delhi Police. All Rights Reserved </div>
    </footer>
);
}