const mongoose = require('mongoose');
const dbName = 'places_facilito';
module.exports = {
    connect: ()=> mongoose.connect('mongodb://localhost/'+dbName,{ useMongoClient: true}),
    dbName,
    connection: ()=> {
        if (mongoose.connection)
            return mongoose.connection;
        return mongoose.connect();
    }
}