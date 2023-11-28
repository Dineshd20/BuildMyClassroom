const mongoose = require('mongoose')



const postmodel = new mongoose.Schema({
    
    itemname: {
        type: String,
        trim: true,
    },    
    description: {
        type: String,
        trim: true,
    }, 
    quantity: {
        type: String,
        trim: true,
    }, 
    preferredDate: {
        type: String,
        trim: true,
    }, 
   
    location: {
        type: String,
        trim: true,
    }, 
   
    contact:{
        type: String,
        trim: true,

    }, author:{
        type: String,
        trim: true,

    }, date:{
        type: Date,
        

    },
    file:{
        type: String
    },tag:{
        type: String
    }
},);

const request = mongoose.model('post', postmodel);

module.exports = request;