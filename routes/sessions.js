var express = require('express');
var router = express.Router();

const sessionsController = require('../controllers/sessionsController');

/* GET users listing. */
router.route('/')
	.post(sessionsController.authenticate,
		sessionsController.generateToken,
		sessionsController.sendToken);

module.exports = router;
