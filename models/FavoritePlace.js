const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
	_user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    _place:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
      required: true
    }
});

let FavoritePlace = mongoose.model('FavoritePlace', favoriteSchema);

module.exports = FavoritePlace;