const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
const uploader = require('./Uploader');
const slugity = require('../plugins/slugity');
const Visit = require('./Visit');

let placeSchema = new mongoose.Schema({
    title:{
      type: String,
        require: true
    },
    address: String,
    slug:{
        type: String,
        unique: true
    },
    description: String,
    acceptsCreditCard: {
        type: Boolean,
        default: false
    },
    coverImage: String,
    avatarImage: String,
    openHour: Number,
    closeHour: Number,
    _user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
});



placeSchema.methods.updateImage =  function (path,imageType) {
    return uploader(path)
        .then(secure_url => this.saveImageUrl(secure_url, imageType));
}

placeSchema.methods.saveImageUrl = function(secure_url, imageType) {
    this[imageType + 'Image'] = secure_url;
    return this.save();    
}


//slogs anter de guardarse

placeSchema.pre('save', function(next) {
   if (this.slug) return next();

   generateSlugAndContinue.call(this,0, next);
})

placeSchema.statics.validateSlugCount = function(slug){
    return Place.count({slug: slug}).then(count =>{
        if (count > 0) return false;
        return true;
    })
}


function generateSlugAndContinue(count, next){
   this.slug = slugity(this.title);

   if (count != 0) 
     this.slug = this.slug + "-" +count;
     

   Place.validateSlugCount(this.slug).then(isValid => {
     if (!isValid)
         return generateSlugAndContinue.call(this,count + 1, next);

     next(); 
   }) 
}
placeSchema.virtual('visits').get(function () {
   return Visit.find({'_place': this._id}).sort('-id');
});
placeSchema.plugin(mongoosePaginate);

let Place = mongoose.model('Place', placeSchema);

module.exports = Place;