const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  plan: { type: String, enum: ['basic','intermediate','medium','advanced'], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending','active','cancelled','failed'], default: 'pending' },
  paidAt: { type: Date },
  payerDetails: { type: Object }, // holds bank/account info user entered
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
