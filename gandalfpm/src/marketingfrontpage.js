import React from 'react';
import './MarketingFrontPage.css';

function MarketingFrontPage() {
  return (
    <div className="marketing-page">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to Gandalf Password Manager</h1>
        <p>Your ultimate password management solution.</p>
        <button className="cta-button">Get Started</button>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        {[
          { title: 'Secure Encryption', description: 'Protect your data with our military-grade encryption.' },
          { title: 'Easy Access', description: 'Sync your passwords across all your devices.' },
          { title: 'Password Generator', description: 'Create strong, unique passwords with just a click.' }
        ].map((feature, index) => (
          <div className="feature-card" key={index}>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Security Section */}
      <section className="security">
        <h2>Why Choose Us?</h2>
        <ul>
          {['AES-256 bit encryption', 'Two-factor authentication', 'Data breach monitoring'].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MarketingFrontPage;
