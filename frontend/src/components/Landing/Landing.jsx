import React from "react";
import LandingHeader from "../landingHeader/landingHeader.jsx";
import "./Landing.css";
import Accordion from "../Accordion/Accordion.jsx";
import Logo from "../../assets/Logo.png";
import dpLogo from "../../assets/dpLogo.png";
import Carousel from "../webCarousel/Carousel.jsx";
import AppCarousel from "../appCarousel/Carousel.jsx";
import Faqs from "../faqs/Faqs.jsx";
import Footer from "../Footer/Footer.jsx";
import Simran from "../../assets/Simran.jpg";
import Ekansh from "../../assets/Ekansh.jpg";
import Ritik from "../../assets/Ritik.jpg";
import Gaurav from "../../assets/Gaurav.jpg";
import Kartik from "../../assets/Kartik.jpg";
import Devyansh from "../../assets/Devyansh.jpeg";
import Aaryan from "../../assets/Aaryan.jpg";
import Mohit from "../../assets/Mohit.jpg";
import Ashwani from "../../assets/Ashwani .jpg";
import Saksham from "../../assets/Saksham.jpg";
import Rudreshwar from "../../assets/Rudreshwar.jpg";
import Hemang from "../../assets/Hemang.jpg";
import Hitesh from "../../assets/Hitesh.jpg";

function Landing() {
    const [activeIndex1, setActiveIndex1] = React.useState(null);
    const [activeIndex2, setActiveIndex2] = React.useState(null);
    const [activeIndex3, setActiveIndex3] = React.useState(null);
    const handleAccordionClick1 = (index) => {
        setActiveIndex1((prevIndex) => (prevIndex === index ? null : index));
    };
    const handleAccordionClick2 = (index) => {
        setActiveIndex2((prevIndex) => (prevIndex === index ? null : index));
    };
    const handleAccordionClick3 = (index) => {
        setActiveIndex3((prevIndex) => (prevIndex === index ? null : index));
    };
    const content1 = [
        {
            id: 1,
            title: 'What is the Constable On Patrol (COP) App? ',
            description: 'The Constable On Patrol (COP) App is an Android application developed in collaboration with the Delhi Police to enhance foot patrolling effectiveness. It features real-time constable tracking, a dynamic crime map, jurisdiction-based crime monitoring, and public feedback mechanisms.'

        },
        {
            id: 2,
            title: 'Who developed the COP App? ',
            description: 'The COP App was developed by SKILLOP Society members in Delhi Technological University in collaboration with the Delhi Police. '
        },
        {
            id: 3,
            title: 'Who can use the COP App? ',
            description: 'The app is primarily intended for use by Delhi Police constables and SHOs (Station House Officers) and Top Official.'

        }
    ]
    const content2 = [
        {
            id: 1,
            title: 'How do I download the COP App? ',
            description: 'You can download the COP App from the link provided by the Developers. Search for "Constable On Patrol" and follow the instructions to install it on your Android device. '

        },
        {
            id: 2,
            title: 'What are the system requirements for the COP App? ',
            description: 'The COP App requires an Android device running Android version 5.0 (Lollipop) or higher with an active internet connection for real-time features.'

        },
        {
            id: 3,
            title: 'How do I create an account on the COP App? ',
            description: 'To create an account, download the app and follow the registration process. Provide accurate information during registration.'
        },
        {
            id: 4,
            title: 'How do I update my personal information in the app? ',
            description: 'You can update your personal information in the app\'s account settings section. '

        },
        {
            id: 5,
            title: 'How does the real-time tracking feature work? ',
            description: 'The real-time tracking feature uses GPS technology to track constable locations, facilitating coordinated patrolling efforts. '

        },
        {
            id: 6,
            title: 'What should I do if I encounter a bug or technical issue?',
            description: 'Report bugs or technical issues through the app&apos;s support section or contact us at ekanshbhushan@gmail.com or +91 9643654899. '

        }
    ]
    const content3 = [
        {
            id: 1,
            title: 'How is my data protected in the COP App? ',
            description: 'The COP App uses encryption and secure servers to protect user data. Refer to our Privacy Policy for detailed data protection measures. '

        },
        {
            id: 2,
            title: 'What data does the COP App collect? ',
            description: 'The app collects necessary data such as constable locations and crime reports. Detailed information is available in our Privacy Policy.  '
        },
        {
            id: 3,
            title: 'Can I opt out of data collection? ',
            description: 'Certain data collection is essential for app functionality. Manage privacy settings within the app; see our Privacy Policy for details.'

        }
    ]
  return (
    <div className="main-wrapper">
      <LandingHeader />
      <div className="wrapper">
        <div className="heading">Our aim is to make a crime free Delhi.</div>
        <div className="images-wrapper1">
          <img src={dpLogo} alt="policeLogo" className="policeLogo" />
          <div className="info">
            The Constable On Patrol (COP) is a cutting-edge Android application
            developed in collaboration with the Delhi Police to enhance foot
            patrolling and improve public safety in Delhi. The app is designed
            to provide comprehensive tools for constables and top officials,
            streamlining operations and enabling data-driven decision-making.
          </div>
          <img src={Logo} alt="Logo" className="Logo" />
        </div>
        <div className="images-wrapper2">
          <div className="img">
          <img src={dpLogo} alt="policeLogo" className="policeLogo" />
          <img src={Logo} alt="Logo" className="Logo" />
          </div>
          <div className="info">
            The Constable On Patrol (COP) is a cutting-edge Android application
            developed in collaboration with the Delhi Police to enhance foot
            patrolling and improve public safety in Delhi. The app is designed
            to provide comprehensive tools for constables and top officials,
            streamlining operations and enabling data-driven decision-making.
          </div>
        </div>
      </div>
      <div className="wrapper" id="aboutUs">
        <div className="heading">COP APP FEATURES</div>
        <div className="features-wrapper">
          <div className="feature">
            <div className="feature-name ">Real-Time Constable Tracking</div>
            <div className="feature-role">
              {" "}
              The app tracks the location of constables in real time, ensuring
              coordinated and efficient patrolling efforts across different
              areas of Delhi.
            </div>
          </div>
          <div className="feature">
            <div className="feature-name ">Dynamic Crime Mapping</div>
            <div className="feature-role">
              {" "}
              The crime map dynamically updates to show the frequency and types
              of crimes occurring in various zones. This feature helps
              constables focus their efforts on high-crime areas and enables top
              officials to monitor and analyze crime patterns effectively.
            </div>
          </div>
          <div className="feature">
            <div className="feature-name ">Detailed Map View</div>
            <div className="feature-role">
              {" "}
              Constables can view detailed maps that highlight the types and
              dates of crimes in specific areas. This allows for better
              situational awareness and strategic patrolling to control and
              reduce crime rates in Delhi.
            </div>
          </div>
          <div className="feature">
            <div className="feature-name ">Admin Panel for Top Officials</div>
            <div className="feature-role">
              {" "}
              The app includes an admin panel accessible only to top officials.
              This panel allows them to: <br />
              <ul className="feature-list">
                <li>Insert crime data </li>
                <li>Assign duties to constables and track their activities </li>
                <li> Add new police personnel to the system </li>
                <li>
                  Ensure effective patrolling and resource allocation based on
                  real-time data.{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="heading">SECURITY FEATURES</div>
        <div className="features-wrapper">
          <div className="feature">
            <div className="feature-name ">Secure Access</div>
            <div className="feature-role">
              {" "}
              Only specific users can access the admin panel through their mobile 
number and password. The password cannot be changed once created, and it is 
securely hidden during input on the login screen. 
            </div>
          </div>
          <div className="feature">
            <div className="feature-name ">Role-Based Access</div>
            <div className="feature-role">
              {" "}
              The backend supports OTP-based login and role-based access 
control, ensuring that only authorized personnel can use the app and access sensitive 
data. 
            </div>
          </div>
          <div className="feature">
            <div className="feature-name ">Data Protection</div>
            <div className="feature-role">
              {" "}
              The backend is designed to prevent any illegal changes to the 
database, ensuring that all data is kept secure. Without logging into the admin panel, 
no user can access the database in any form. 
            </div>
          </div>
          
        </div>
      </div>
      <div className="wrapper">
        <div className="heading views">COP WEBSITE VIEWS</div>
        <div className="subheading views">
          OFFICIAL WORK : ACTUAL DATA CAN’T BE DISPLAYED.
        </div>
        <Carousel className="carousel" />
      </div>
      <div className="wrapper">
        <div className="heading views">COP APP VIEWS</div>
        <div className="subheading views">
          OFFICIAL WORK : ACTUAL DATA CAN’T BE DISPLAYED.
        </div>
        <AppCarousel className="app-carousel" />
      </div>
      <div className="wrapper">
      <div className="heading" id="faqs">FAQs</div>
        <div className="info">General Questions</div>
        <Faqs content={content1} />
        {/* <div className="accordion">
        {content1.map((item, index) => (
          <Accordion
            key={index}
            title={item.title}
            content={item.description}
            index={index}
            activeIndex={activeIndex1}
            onAccordionClick={handleAccordionClick1}
          />
        ))}
      </div> */}
        <div className="info">Technical Questions</div>
        <Faqs content={content2} />
        {/* <div className="accordion">
        {content2.map((item, index) => (
          <Accordion
          key={index}
          title={item.title}
          content={item.description}
          index={index}
          activeIndex={activeIndex2}
          onAccordionClick={handleAccordionClick2}
          />
        ))}
      </div> */}
        <div className="info">Security and Privacy Questions</div>
        <Faqs content={content3} />
        {/* <div className="accordion">
        {content3.map((item, index) => (
          <Accordion
            key={index}
            title={item.title}
            content={item.description}
            index={index}
            activeIndex={activeIndex3}
            onAccordionClick={handleAccordionClick3}
          />
        ))}
      </div> */}
      </div> 
      <div className="wrapper" id="team">
        <div className="heading views">INITIATIVE BY</div>
        <div className="team-wrapper">
          <div className="team-member">
            <img src={Logo} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">ACP BAWANA</div>
            <div className="team-member-role">ACP</div>
            <div className="team-member-role">DP, OUTER N</div>
          </div>
          <div className="team-member">
            <img src={Logo} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">JAGUAR 2</div>
            <div className="team-member-role">DCP</div>
            <div className="team-member-role">DP, OUTER N</div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="heading views">UNDER THE GUIDANCE OF</div>
        <div className="team-wrapper">
          <div className="team-member">
            <img src={Logo} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Prof. Raghavendra Gautam</div>
            <div className="team-member-role"> </div>
            <div className="team-member-role">DTU</div>
          </div>
          <div className="team-member">
            <img src={Logo} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Prof. Prateek Sharma</div>
            <div className="team-member-role">VC</div>
            <div className="team-member-role">DTU</div>
          </div>
        </div>
      </div>
      <div className="wrapper">
      
        <div className="heading views">MEET THE DEVELOPMENT TEAM</div>
        <div className="team-wrapper">
          <div className="team-member">
            <img src={Ekansh} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Ekansh Bhushan</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              Web Developer <br /> App Developer
            </div>
          </div>
          <div className="team-member">
            <img src={Logo} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Mohd Faeez Ahmed</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              UI/UX Designer <br /> Web Developer{" "}
            </div>
          </div>
          <div className="team-member">
            <img src={Ritik} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Ritik Pal</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              Web Developer <br /> App Developer
            </div>
          </div>
          <div className="team-member">
            <img src={Gaurav} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Gaurav Pandey</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              App Developer <br /> Web Developer
            </div>
          </div>
          <div className="team-member">
            <img src={Logo} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Dhruv Dawar</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              Web Developer <br /> App Developer
            </div>
          </div>
          <div className="team-member">
            <img src={Logo} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Harsh</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">Web Developer</div>
          </div>
          <div className="team-member">
            <img src={Simran} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Simran Rojia</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">Web Developer</div>
          </div>
          <div className="team-member">
            <img src={Ashwani} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Ashwani Yaduwanshi</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">Web Developer </div>
          </div>
          <div className="team-member">
            <img src={Hemang} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Hemang Jain</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">Web Developer</div>
          </div>
          <div className="team-member">
            <img src={Kartik} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Kartik Bindra</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">Web Developer</div>
          </div>
          <div className="team-member">
            <img src={Devyansh} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Devyansh Bhattacharya</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              AI-ML Engineer <br /> Web Developer
            </div>
          </div>
          <div className="team-member">
            <img src={Hitesh} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Hitesh Gupta</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              AI-ML Engineer <br /> Web Developer
            </div>
          </div>
          <div className="team-member">
            <img src={Aaryan} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Aaryan Sachdeva</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              AI-ML Engineer <br /> Web Developer
            </div>
          </div>
          <div className="team-member">
            <img src={Mohit} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Mohit Bajpai</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              App Developer <br /> Web Developer
            </div>
          </div>
          <div className="team-member">
            <img src={Rudreshwar} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Rudreshwar Singh</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">
              Web Developer <br /> App Developer
            </div>
          </div>
          <div className="team-member">
            <img src={Logo} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Sneha Karna</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">Web Developer</div>
          </div>
          <div className="team-member">
            <img src={Saksham} alt="policeLogo" className="team-member-image" />
            <div className="team-member-name ">Saksham Jain</div>
            <div className="team-member-role">WORKED AS</div>
            <div className="team-member-role">Web Developer</div>
          </div>
        </div>
        
      <div className="wrapper bg-primary-1 border py-4 w-[90%]" id="contact">
        <div className="heading views contact-title">CONTACT US</div>
        <div className="contact-wrapper flex flex-col text-center">
          <div className="contact-info">
            <div className="contact-heading">For any queries, contact us at:</div>
            <div className="contact-details">
              <div className="contact-name">Ekansh Bhushan</div>
              <div className="contact-role">Email:</div>
              <div className="contact-role">
                <a href="mailto: ekanshbhushan@gmail.com" className="text-primary-11 font-bold " >ekanshbhushan@gmail.com</a>
              </div>
              <div className="contact-role">Phone:</div>
              <div className="contact-role">+91 9643654899</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
