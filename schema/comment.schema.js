const Schema = require('mongoose').Schema;

module.exports = new Schema({
    // mongoose automically gives this an _id attribute of ObjectId
    postID:{ type: String, index: true, require:true},
    editorUsername: String,
    postTime: {
        type: Date,
        default: Date.now,
    },
    content: String,
// this explicitly declares what collection we're using
}, { collection : 'comments'});
