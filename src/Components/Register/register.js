import React, { useState, useEffect } from 'react';
import { auth } from '../../../src/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

function Register() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    // Ensure reCAPTCHA is set up only once when the component mounts
    setupRecaptcha();
  }, []);

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      return;
    }

    // Set up reCAPTCHA verifier
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('reCAPTCHA solved', response);
      },
    });
  };

  const sendOtp = async () => {
    if (!phone) {
      alert('Please enter a phone number');
      return;
    }

    // Remove country code if it's entered by the user (keep only the local number)
    const phoneNumber = `+91${phone.replace(/^(\+91|\d{1,4})/, '')}`;

    // Set up reCAPTCHA before OTP request
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      // Send OTP to the entered phone number
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmation(confirmationResult);
      alert('OTP sent');
    } catch (error) {
      console.error('Error sending OTP', error);
      alert('Failed to send OTP. Make sure the phone number is correct and reCAPTCHA is solved.');
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert('Please enter the OTP you received');
      return;
    }

    try {
      await confirmation.confirm(otp);
      alert('Phone number verified successfully!');
      // You can now register the user or navigate to the next step.
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  return (
    <div className='container col-8'>
      <div className="row">
        <h2>Phone Verification</h2>
        <input
          type="text"
          placeholder="Enter phone number without country code"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={sendOtp}>Send OTP</button>
        <br /><br />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={verifyOtp}>Verify OTP</button>

        {/* Invisible reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

export default Register;
