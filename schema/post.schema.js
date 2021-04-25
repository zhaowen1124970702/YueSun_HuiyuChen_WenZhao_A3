const Schema = require('mongoose').Schema;

module.exports = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    username: {type:String, require: true},
    title:{type:String, require: true},
    postTime: {
        type: Date,
        default: Date.now,
    },
    content: String,
    URL: String
// this explicitly declares what collection we're using
}, { collection : 'posts'});