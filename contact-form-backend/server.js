const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Add this line

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Contact schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Contact model
const Contact = mongoose.model('Contact', contactSchema);

// Initialize Twilio client if environment variables are available
let twilioClient;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  const twilio = require('twilio');
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

// API endpoint to handle form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Create new contact entry
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });
    
    // Save to database
    await newContact.save();
    
    // Send SMS notification if Twilio is configured
    if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
      try {
        await twilioClient.messages.create({
          body: `New contact from ${name}: ${subject}`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: '+94713135443' // Your phone number
        });
        console.log('SMS notification sent');
      } catch (twilioError) {
        console.error('Error sending SMS notification:', twilioError);
        // Continue with the response even if SMS fails
      }
    }
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newContact
    });
  } catch (error) {
    console.error('Error handling contact:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// For any request that doesn't match an API route, send the React app
app.get('*', (req, res) => {
  console.log('Serving index.html from:', path.join(__dirname, 'build', 'index.html'));
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));