import React from 'react';
import styles from './/profilePage.css';

function ProfilePage() {
  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileName}>John Doe</h1>
      <div className={styles.profileCard}>
        <img
          src=""
          alt="Profile"
        />
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

export default ProfilePage;