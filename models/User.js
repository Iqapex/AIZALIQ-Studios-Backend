const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
