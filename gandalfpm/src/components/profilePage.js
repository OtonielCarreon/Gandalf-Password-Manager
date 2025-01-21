import React from 'react';
import styles from './profilePage.css';
import CircleImg from './circleImg.js';

function ProfilePage() {
  return (
    <div className="profileContainer">
      <img
        class="backgroundImg"
        alt="ocean"
      />
      <div className="profileCard">
      <h1 className="profileName">Otoniel Carreon</h1>
        <CircleImg />
        <p className="profileBio">
          A passionate software developer with experience in React and Node.js.
        </p>
        <div className="contactInfo">
          <p>Email: ocarreon21@apu.edu</p>
          <p>Phone: +1 234 567 890</p>
          <p>Location: California, USA</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;