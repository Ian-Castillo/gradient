import React, { useState } from 'react';
import Countdown from './components/Countdown';
import './App.css';
import logoImage from './assets/logo.png';

const App = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formActionUrl = process.env.REACT_APP_MAILCHIMP_URL;
    const response = await fetch(formActionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    });
    if (response.ok) {
      setSubmitted(true);
    } else {
      alert('There was an error submitting your email. Please try again.');
    }
  };

  return (
    <div className="App">
      <div className="top-left">
        <div className="header">
          <img src={logoImage} alt="Logo" className="logo-image" />
          <div className="wordmark">GRADIENT</div>
        </div>
        <Countdown />

        <div className="subtitle">Introducing a new kind of bookstore.</div>
        <div className="subtitle2">A bookstore for creatives.</div>
        <div className="subtitle2">A bookstore for you.</div>
        <div className="early-access">
          {!showForm && (
            <button className="cta-button" onClick={handleClick}>
              early access: here
            </button>
          )}
          {showForm && !submitted && (
            <form onSubmit={handleSubmit} className="email-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <button type="submit">submit</button>
            </form>
          )}
          {submitted && <div className="welcome-message">You are on the early access list</div>}
        </div>
      </div>
      <div className="footer">made with love & profanities</div>
    </div>
  );
};

export default App;
