import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/2FACode.css';
import HeaderN from '../components/login/HeaderN';
import Footer from '../components/main/Footer';

const Verify2FA = () => {
  const email = localStorage.getItem('emailFor2FA'); // ✅ Retrieve stored email
  const [code, setCode] = useState(''); // ✅ This was missing
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token); // Store JWT token
        localStorage.removeItem('emailFor2FA');    // Optional: clean up
        setMessage('Success! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage(data.message || 'Invalid code');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="screen">
      <HeaderN />
      <div className="content-area3">
        <div className="login-container">
          <h2>We've sent a code to your email</h2>
          <p>If you can't find it - check your spam folder</p>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength="6"
            />

            <button className="btnL" type="submit">
              Verify
            </button>

            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Verify2FA;
