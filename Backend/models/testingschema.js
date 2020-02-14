const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name:String,
    weight:Number
});


const test = mongoose.model('test',Schema);

module.exports = test;

