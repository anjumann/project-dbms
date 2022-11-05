const router = require('express').Router();
const { getOTP } = require('../Controller/validController');


router.post('/sendotp', getOTP);

module.exports = router;