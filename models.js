'use strict'

const mongoose = require('mongoose');

//here's the schema to represent a client prototype

const clientProtoSchema = mongoose.Schema({
    shortDesc: {type: String, required: true},
    longDesc: {type: String, required: true},
    //userStories will be an array of strings
    userStories: [String],
    //screen will be an array of subarrays of strings
    screens: [[String]],
    user_id: {type: String, required: true},
    email: {type: String, required: true},
    published: {type: Boolean, default: false} 
});

//instance method to expose some of the data

clientProtoSchema.methods.serialize = function() {
    return {
        id: this.id,
        shortDesc: this.shortDesc,
        longDesc: this.longDesc,
        userStories: this.userStories,
        screens: this.screens,
        user_id: this.user_id,
        email: this.email,
        published: this.published
    };
}


//now that everything above is defined we make the call to model 

const clientProto = mongoose.model('clientProto', clientProtoSchema);

module.exports = {clientProto};

