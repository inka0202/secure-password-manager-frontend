import React from "react";
import "../../styles/InfoSection.css";
const InfoSection = () => {
  return (
    <div className="ConteinerIs">
      <h1 className="iSh">
        About Us — Building Your Digital Security with Care
      </h1>
      <div className="contentIs">
        <p id="cont1">
          At "Secure", we are passionate about protecting your digital life. Our
          password manager helps you create, store, and manage your passwords
          securely, giving you peace of mind. We use cutting-edge encryption and
          multi-layer authentication to keep your data safe.
          <br />
          <br />
          We built the app using modern, trusted technologies: React.js ensures
          a seamless and intuitive user experience, while Node.js with
          Express.js powers a robust and secure backend. Your passwords are
          protected with AES-256 encryption, and two-factor authentication via
          email adds an extra layer of security against unauthorized access.
          <br />
          <br />
          Security and privacy are our top priorities. We follow the highest
          standards, including GDPR compliance and OWASP recommendations, to
          guarantee that your data remains confidential and secure. Our project
          reflects rigorous planning, development, and testing, aimed at
          providing a reliable and user-friendly password management solution.
          <br />
          <br />
          <br />
          <br />
          Thank you for trusting us to safeguard your online presence. Together,
          we're making the web a safer place - one password at a time.
        </p>
      </div>
    </div>
  );
};
export default InfoSection;