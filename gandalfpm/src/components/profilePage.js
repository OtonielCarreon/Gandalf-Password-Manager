import React,  { useState } from 'react';
import styles from './profilePage.css';
import CircleImg from './circleImg.jsx';

function ProfilePage() {

  return (
    <div className="profileContainer">
      <div className="profileCard">
        <div className="profileInfo">
          <CircleImg />
          <label for="name">First name</label>
          <input type="text" id="name" name="fname" value='Otoniel Carreon'/>
          <button class="edit-button">Edit Profile</button>
        </div> 

        <div>
          <div className="contactInfo">
          <div class="email-content">
            <h2>Email Address</h2>
            <p>ocarreon24@gmail.com</p>
          </div>
        </div>
        <p>Password</p>
      </div>
    </div>
  </div>
  );
};

export default ProfilePage;