const userModel = require('../models/userModel');

const getNotifications = async (req, res) => {
  try {
    const user = await userModel.findOne({ accountNumber: req.params.accountNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.notifications || []);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ accountNumber: req.params.accountNumber }).select('-password -__v');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.log('Fetch user error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getNotifications,
  getUser
};