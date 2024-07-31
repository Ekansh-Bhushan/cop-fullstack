import React from 'react';
import './privacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <h1>Privacy Policy for Constable On Patrol (COP) App</h1>
            <p>This Privacy Policy explains how SKILLOP Society ("we," "us," or "our") collects, uses, and discloses information from users ("you" or "your") of the Constable On Patrol (COP) App ("App"). By using the App, you agree to the collection and use of information in accordance with this policy.</p>

            <h2>1. Information We Collect</h2>

            <h3>1.1 Personal Information</h3>
            <ul>
                <li><strong>Account Information:</strong> When you create an account, we collect information such as your name, mobile number, and any other details you provide.</li>
                <li><strong>Location Data:</strong> We collect real-time location information from your device to provide location-based services for patrolling purposes.</li>
            </ul>

            <h3>1.2 Non-Personal Information</h3>
            <ul>
                <li><strong>Usage Data:</strong> We collect information on how the App is accessed and used, including your interactions within the App, IP address, and browser type.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>

            <h3>2.1 To Provide and Maintain the Service</h3>
            <ul>
                <li>To manage user accounts and provide access to the App’s features.</li>
                <li>To track constable locations for effective patrolling.</li>
            </ul>

            <h3>2.2 To Improve the App</h3>
            <ul>
                <li>To analyze usage patterns and improve the App’s functionality and user experience.</li>
                <li>To fix bugs and improve security.</li>
            </ul>

            <h3>2.3 To Communicate with You</h3>
            <ul>
                <li>To send updates, notifications, and administrative messages.</li>
            </ul>

            <h2>3. Sharing Your Information</h2>

            <h3>3.1 With Law Enforcement</h3>
            <p>We may share your information with law enforcement agencies as required by law or to protect the safety and security of the community.</p>

            <h3>3.2 With Service Providers</h3>
            <p>We may employ third-party companies and individuals to facilitate our service, perform service-related tasks, or assist us in analyzing how our service is used. These third parties have access to your information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

            <h2>4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, use, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>

            <h2>5. Your Data Rights</h2>

            <h3>5.1 Access and Update</h3>
            <p>You have the right to access and update your personal information stored in our system.</p>

            <h3>5.2 Deletion</h3>
            <p>You can request the deletion of your personal information. We will comply with such requests to the extent required by law.</p>

            <h2>6. Children’s Privacy</h2>
            <p>The App is not intended for use by anyone under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18 without verification of parental consent, we take steps to remove that information.</p>

            <h2>7. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
        </div>
    );
};

export default PrivacyPolicy;
