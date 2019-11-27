const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/project', require('./projects'));
router.use('/sprint', require('./sprint'));

module.exports = router;