const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const Place = require('./Place');
const FavoritePlace = require('./FavoritePlace');
let userSchema = new mongoose.Schema({
	email:{
		type: String,
		require: true,
		unique: true
	},
	name: String,
	admin:{
		type: Boolean,
		default: false
	}
});

userSchema.post('save',function(user,next) {
	User.count({}).then(count =>{
		if (count == 1) {
			User.update({'_id':user._id},{admin:true}).then(result=>{
				next();
			})
		}else{
			next();
		}
	})
})
//para obtener los places del usuario
userSchema.virtual('places').get(function(){
	return Place.find({'_user': this._id});
})

//para obtener los places favoritos del usuario
userSchema.virtual('favorites').get(function() {
	//Retornar los _place del usuario
	return FavoritePlace.find({'_user': this._id},{'_place': true})
		.then(favs=>{
			let placeIds = favs.map(fav => fav._place);
			// Retornar los lugares favoritos
			return Place.find({'_id': {$in: placeIds}})
		})
})

userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;