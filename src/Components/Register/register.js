import React, { useState } from 'react';
// import Heading from '../../Pages/heading';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [userOtp, setUserOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const sendOtp = () => {
    const formattedPhone = `+91${formData.phoneNumber}`;
    fetch('http://localhost:5000/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: formattedPhone }), // Adding +91 prefix
    })
      .then((res) => res.text())
      .then((data) => {
        if (data.includes('OTP sent')) {
          setOtpSent(true);
          alert('OTP sent successfully to your phone!');
        } else {
          alert('Failed to send OTP. Please check the number.');
        }
      })
      .catch((err) => {
        console.error('Error sending OTP:', err);
        alert('Failed to send OTP. Please try again.');
      });
  };

  const verifyOtp = () => {
    if (!formData.phoneNumber || !userOtp) {
      alert('Please enter both phone number and OTP.');
      return;
    }

    fetch('http://localhost:5000/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: formData.phoneNumber, code: userOtp }),
    })
      .then((res) => res.text())
      .then((data) => {
        if (data.toLowerCase().includes('verified')) {
          setOtpVerified(true);
          alert('OTP Verified Successfully!');
        } else {
          alert('Incorrect OTP. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Error verifying OTP:', err);
        alert('Error verifying OTP. Please try again.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOtp();
  };

  return (
    <>
      {/* <Heading /> */}
      <div className="container">
        <h2 className="text-light font-mont">Register</h2>
        <div className="row col-12-ld text-center">
          {!otpSent && !otpVerified && (
            <form onSubmit={handleSubmit} className="flex flex-column jcsa">
              <div>
                <label>Name:</label>
                <br/>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <br />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Phone Number:</label>
                <br />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit">Register</button>
            </form>
          )}

          {otpSent && !otpVerified && (
            <div>
              <p>Enter the OTP sent to your phone:</p>
              <input
                type="text"
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
              />
              <button onClick={verifyOtp}>Verify OTP</button>
            </div>
          )}

          {otpVerified && (
            <div>
              <h3>OTP Verified!</h3>
              <p>You can now proceed with full registration or be redirected.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Register;
