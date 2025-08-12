const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'User already exists'
      });
    }

    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      data: { id: user._id, name: user.name, email: user.email },
      message: 'User registered successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({
      success: true,
      data: { 
        token,
        user: { id: user._id, name: user.name, email: user.email }
      },
      message: 'Login successful'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: null,
      message: err.message
    });
  }
};