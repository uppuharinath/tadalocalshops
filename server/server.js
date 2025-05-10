// server.mjs or server.js if you update package.json
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import twilio from 'twilio';

dotenv.config();

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
    console.log('OTP Sent:', verification.sid);
    res.status(200).send('OTP sent');
  } catch (error) {
    console.error('Twilio Send OTP Error:', error.message, error.code);
    res.status(500).send('Failed to send OTP: ' + error.message);
  }
});

// Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: phone, code });
    console.log('OTP Verification Status:', verificationCheck.status);
    if (verificationCheck.status === 'approved') {
      res.status(200).send('OTP verified');
    } else {
      res.status(400).send('Invalid OTP');
    }
  } catch (error) {
    console.error('Twilio Verify OTP Error:', error.message, error.code);
    res.status(500).send('Verification failed: ' + error.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
