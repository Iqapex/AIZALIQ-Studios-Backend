const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getUsers, getSubscriptions, updateSubscription } = require("../controllers/adminController");

// all admin routes require auth
router.get("/users", authMiddleware, getUsers);
router.get("/subscriptions", authMiddleware, getSubscriptions);
router.put("/subscription/:id", authMiddleware, updateSubscription);

module.exports = router;
