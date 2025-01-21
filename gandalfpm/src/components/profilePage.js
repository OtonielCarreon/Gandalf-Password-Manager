import React from 'react';
import styles from './profilePage.css';
import CircleImg from './circleImg.js';
import './backgroundocean.webp';
import './gandalflogo.jpg';

function ProfilePage() {
  return (
    <div className="profileContainer">
      <div className="profileCard">
      <h1 className="profileName">Otoniel Carreon</h1>
        <CircleImg />
        <p className="profileBio">
          A passionate software developer with experience in React and Node.js.
        </p>
        <input type="text" className="contactInfo">
          {/* <p>Email: ocarreon21@apu.edu</p>
          <p>Phone: +1 234 567 890</p>
          <p>Location: California, USA</p> */}
        </input>
      </div>
      <img class="backgroundImg" />
      {/* <img class= */}
    </div>
  );
};

export default ProfilePage;