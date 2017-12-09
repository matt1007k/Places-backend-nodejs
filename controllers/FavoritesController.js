const FavoritePlace = require('../models/FavoritePlace');
const buildParams = require('./helpers').buildParams;

const User = require('../models/User');

const validParams = ['_place'];

function find(req, res, next) {
	FavoritePlace.findById(req.params.id).then(fav=>{
		req.mainObj = fav;
		req.favorite = fav;
		next();
	}).catch(next);
}

function index(req, res) {
	if(!req.fullUser) return res.json({});
	req.fullUser.favorites.then(places=>{
		res.json(places);
	}).catch(error=>{
		console.log(error);
		res.json(error);
	});	
}

function create(req, res) {
	let params = buildParams(validParams, req.body);
	params['_user'] = req.user.id;


	FavoritePlace.create(params).then(favorite=>{
		res.json(favorite);
	}).catch(error=>{
		res.status(422).json({error})
	});
}

function destroy(req, res) {
	req.favorite.remove().then(doc=>{
		res.json({});
	}).catch(error=>{
		res.status(500).json({error});
	});
}

module.exports = {find,create,destroy,index};