const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 5000;

// Twilio credentials
const accountSid = 'your_account_sid'; // Get from your Twilio dashboard
const authToken = 'your_auth_token'; // Get from your Twilio dashboard
const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());

// Endpoint to send OTP
app.post('/send-otp', (req, res) => {
  const { phone } = req.body;

  // Generate a random OTP (you can replace this with a more secure OTP generation method)
  const otp = Math.floor(100000 + Math.random() * 900000); 

  // Send OTP using Twilio
  client.messages
    .create({
      body: `Your OTP code is: ${otp}`,
      from: '+1234567890', // Your Twilio phone number
      to: phone, // User's phone number
    })
    .then((message) => {
      // Save OTP in memory or database (just for demo purposes, it's stored in memory)
      req.app.locals.otp = otp;
      res.json({ success: true, message: 'OTP sent successfully.' });
    })
    .catch((err) => {
      console.error('Error sending OTP:', err);
      res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    });
});

// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
  const { phone, code } = req.body;

  // Compare the entered OTP with the one stored in memory
  if (code == req.app.locals.otp) {
    res.json({ success: true, message: 'OTP verified successfully.' });
  } else {
    res.json({ success: false, message: 'Incorrect OTP.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
