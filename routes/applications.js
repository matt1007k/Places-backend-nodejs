var express = require('express');
var router = express.Router();

const applicationsController = require('../controllers/ApplicationsController');
//const authenticateOwner = require('../middlewares/authenticateOwner');
const authenticateAdmin = require('../middlewares/authenticateAdmin');
const findUser = require('../middlewares/findUser');

const jwtMiddleware = require('express-jwt');
const secrets = require('../config/secrets');

router.all('*', jwtMiddleware({secret: secrets.jwtSecret}), findUser,authenticateAdmin);
/* GET Application listing. */
router.route('/')
    .get(applicationsController.index)
    .post(applicationsController.create);

router.route('/:id')
    .delete(applicationsController.find,applicationsController.destroy)

module.exports = router;
