'use strict'

const mongoose = require('mongoose');

//here's the schema to represent a client prototype

const clientProtoSchema = mongoose.Schema({
    shortDesc: {type: String, required: true},
    longDesc: {type: String, required: true},
    //userStories will be an array of strings
    userStories: [String],
    //screen will be an array of subarrays of strings
    screens: [[String]]  
});

//instance method to expose some of the data

clientProtoSchema.methods.serialize = function() {
    return {
        tagline: this.shortDesc    
    };
}

//now that everything above is defined we make the call to model 

const clientProto = mongoose.model('clientProto', clientProtoSchema);

module.exports = {clientProto};

