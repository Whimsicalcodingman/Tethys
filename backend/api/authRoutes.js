import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

// Register a new user
router.post('/register', async (req, res) => {
  console.log('Register endpoint hit');
  try {
    const { email, password } = req.body;
    console.log('Request body received:', req.body);

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    console.log('Existing user check result:', existingUser);

    if (existingUser) {
      console.log('User already exists!');
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create and save the new user (pre-save middleware hashes password)
    const newUser = new User({ email, password });
    const savedUser = await newUser.save();
    console.log('Saved user:', savedUser);

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error in /register:', error.message, error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login an existing user
router.post('/login', async (req, res) => {
  console.log('Login endpoint hit');
  try {
    const { email, password } = req.body;
    console.log('Request body:', req.body);

    // Check if a user exists
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password.trim(), user.password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error('Error in /login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
