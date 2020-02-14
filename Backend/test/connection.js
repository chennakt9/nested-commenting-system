const mongoose = require('mongoose');

mongoose.Promise = global.Promise;



    mongoose.connect('mongodb://localhost/comments');

    mongoose.connection.once('open',() => {
        console.log("connection successfull");
        
    }).on('error',() => {
        console.log("Error connecting database...");
    });












