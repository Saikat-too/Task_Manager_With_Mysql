// Register and login Functionality
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User(username, password);
    const insertedId = await user.save();
    res.status(201).json({ id: insertedId, username });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username);

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

module.exports = {
  register,
  login
};