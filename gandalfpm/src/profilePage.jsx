import React from 'react';
import circleImg from './components/circleImg';
import styles from './src/ProfilePage.module.css';

const profilePage = () => {
  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <circleImg/>
        <img
          src=""
          alt="Profile"
        />
        <h1 className={styles.profileName}>John Doe</h1>
        <p className={styles.profileBio}>
          A passionate software developer with experience in React and Node.js.
        </p>
        <div className={styles.contactInfo}>
          <p>Email: johndoe@example.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Location: New York, USA</p>
        </div>
      </div>
    </div>
  );
};

export default profilePage;