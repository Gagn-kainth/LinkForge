const express = require('express');
const router = express.Router();
const { handleSignup, handleLogin, handleMe } = require('../controllers/auth');
const { requireAuth } = require('../middleware/auth');

router.post('/signup', handleSignup);
router.post('/login', handleLogin);
router.get('/me', requireAuth, handleMe);

module.exports = router;
