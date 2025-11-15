const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 50000 },
  createdAt: { type: Date, default: Date.now },
  notifications: [
    {
      message: { type: String },
      date: { type: Date, default: Date.now },
      type: { type: String }
    }
  ]
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;