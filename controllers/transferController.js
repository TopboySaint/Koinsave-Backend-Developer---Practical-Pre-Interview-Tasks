const userModel = require('../models/userModel');

const transfer = async (req, res) => {
  try {
    const { senderAccountNumber, recipientAccountNumber, amount } = req.body;
    const transferAmount = Number(amount);

    if (!senderAccountNumber || !recipientAccountNumber || !transferAmount) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields are required.' 
      });
    }

    if (transferAmount <= 0) {
      return res.status(400).json({ 
        success: false,
        message: 'Amount must be greater than zero.' 
      });
    }

    const sender = await userModel.findOne({ accountNumber: senderAccountNumber });
    const recipient = await userModel.findOne({ accountNumber: recipientAccountNumber });

    if (!sender) {
      return res.status(404).json({ 
        success: false,
        message: 'Sender account not found.' 
      });
    }

    if (!recipient) {
      return res.status(404).json({ 
        success: false,
        message: 'Recipient account not found.' 
      });
    }

    if (sender.accountNumber === recipient.accountNumber) {
      return res.status(400).json({ 
        success: false,
        message: 'Cannot send money to your own account.' 
      });
    }

    if (sender.balance < transferAmount) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient balance.' 
      });
    }

    sender.balance -= transferAmount;
    recipient.balance += transferAmount;

    sender.notifications.unshift({
      message: `You sent ₦${transferAmount.toLocaleString()} to account ${recipientAccountNumber}`,
      type: 'debit'
    });
    recipient.notifications.unshift({
      message: `You received ₦${transferAmount.toLocaleString()} from account ${senderAccountNumber}`,
      type: 'credit'
    });

    await sender.save();
    await recipient.save();

    return res.status(200).json({
      message: `₦${transferAmount.toLocaleString()} sent to account ${recipientAccountNumber}`,
      senderBalance: sender.balance
    });
  } catch (err) {
    console.log('Send money error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

module.exports = {
  transfer
};