var express = require('express');
var router = express.Router();

const visitsController = require('../controllers/VisitsController');
const placesController = require('../controllers/PlacesController');
const authenticateOwner = require('../middlewares/authenticateOwner');


/* GET users listing. */
router.route('/:id/visits')
    .get(placesController.find,visitsController.index)
    .post(placesController.find,visitsController.create);

router.route('/:id/visits/:visit_id')
    .delete(visitsController.find,authenticateOwner,visitsController.destroy)

module.exports = router;
