const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken'); // if using JWT
const User = require('../models/User');
const Subscription = require('../models/Subscription');

// ✅ Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Hardcoded admin credentials
  if (email === 'admin@site.com' && password === 'admin123') {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1d' });
    return res.json({ message: 'Admin login successful', token });
  }

  res.status(401).json({ message: 'Invalid admin credentials' });
});

// ----- Existing routes below -----
const auth = require('../middleware/auth');

// Admin-only middleware
const adminOnly = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Auth required' });
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
};

router.get('/users', auth, adminOnly, async (req,res) => {
  const users = await User.find().populate('subscription').select('-password');
  res.json(users);
});

router.get('/subscriptions', auth, adminOnly, async (req,res) => {
  const subs = await Subscription.find().populate('user');
  res.json(subs);
});

router.put('/subscription/:id', auth, adminOnly, async (req,res) => {
  const { status } = req.body;
  const sub = await Subscription.findById(req.params.id);
  if (!sub) return res.status(404).json({ message: 'Not found' });
  sub.status = status;
  await sub.save();
  res.json(sub);
});

module.exports = router;
