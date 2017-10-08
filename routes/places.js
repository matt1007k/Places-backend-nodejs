
const express = require('express');
const placesController = require('../controllers/PlacesController');

let router = express.Router();

//para que el usuario dueño pueda  actualiza o eliminar el lugar, SOLO ËL
const authenticateOwner = require('../middlewares/authenticateOwner');

router.route('/')
	.get(placesController.index)
	.post(placesController.multerMiddleware(),
		placesController.create,
		placesController.saveImage)

router.route('/:id')
	.get(placesController.find,placesController.show)
	.put(placesController.find,authenticateOwner,placesController.update)
	.delete(placesController.find,authenticateOwner,placesController.destroy)


module.exports = router;

