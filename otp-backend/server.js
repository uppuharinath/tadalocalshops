// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = twilio(accountSid, authToken);

// Send OTP
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2.services(verifySid)
      .verifications
      .create({ to: phone, channel: 'sms' });
    res.status(200).send('OTP sent');
  } catch (error) {
    res.status(500).send('Failed to send OTP');
  }
});

// Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: phone, code });
    if (verificationCheck.status === 'approved') {
      res.status(200).send('OTP verified');
    } else {
      res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    res.status(500).send('Verification failed');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
