const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/sprint', require('./sprint'));
router.use('/project', require('./projects'));
router.use('/task', require('./task'));

module.exports = router;