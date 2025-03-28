const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendSOSEmail } = require('../utils/emailService');
const { sendSOSSMS } = require('../utils/smsService'); // Add this import
const { makeEmergencyCalls } = require('../utils/callService'); // Add this import

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    // Create user
    const user = new User({
      name,
      email,
      password
    });
    
    await user.save();
    
    res.status(201).json({
      success: true,
      userId: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    res.json({
      success: true,
      userId: user._id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update user profile
router.put('/:userId', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update emergency contacts
router.put('/:userId/emergency-contacts', async (req, res) => {
  try {
    const { emergencyContacts } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { emergencyContacts },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Send SOS alert
router.post('/:userId/sos', async (req, res) => {
  try {
    const { location } = req.body;
    
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    if (!user.emergencyContacts || user.emergencyContacts.length === 0) {
      return res.status(400).json({ msg: 'No emergency contacts found' });
    }
    
    // Send all alerts in parallel
    const [emailResult, smsResult, callResult] = await Promise.all([
      sendSOSEmail(user, location, user.emergencyContacts),
      sendSOSSMS(user, location, user.emergencyContacts),
      makeEmergencyCalls(user, location, user.emergencyContacts)
    ]);
    
    // Return success if any method succeeds
    if (emailResult.success || smsResult.success || callResult.success) {
      return res.json({ 
        success: true, 
        emailSent: emailResult.success,
        smsSent: smsResult.success,
        callsMade: callResult.success,
        callDetails: callResult.calls,
        msg: 'SOS alerts sent successfully' 
      });
    } else {
      return res.status(500).json({ 
        msg: 'Failed to send SOS alerts', 
        emailError: emailResult.error,
        smsError: smsResult.error,
        callError: callResult.error
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
