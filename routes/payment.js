const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

const PLANS = {
  basic: { amount: 99 },
  intermediate: { amount: 499 },
  medium: { amount: 799 },
  advanced: { amount: 999 }
};

/**
 * Bank payment page POST — create subscription with payer details
 * Body: { plan, payerName, accountNumber, bankName, note (optional) }
 * Returns: { subscriptionId }
 */
router.post('/bank', async (req, res) => {
  const { plan, payerName, accountNumber, bankName, note } = req.body;
  if (!PLANS[plan]) return res.status(400).json({ message: 'Invalid plan' });
  try {
    const sub = new Subscription({
      plan,
      amount: PLANS[plan].amount,
      status: 'active', // since user confirmed payment on bank page, mark active
      paidAt: new Date(),
      payerDetails: { payerName, accountNumber, bankName, note }
    });
    await sub.save();
    res.json({ subscriptionId: sub._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
