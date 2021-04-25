const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const PostSchema = require('../schema/post.schema');

const PostModel = mongoose.model("Post", PostSchema);

function addPost(post) {
    return PostModel.create(post);
}

function getAllPost() {
    return PostModel.find().exec();
}

function getOneByID(id){
    return PostModel.findById(id).exec();

}

function updatePost(post){
    return PostModel.findByIdAndUpdate(post._id, post).exec();

}

function deletePost(id){
    return PostModel.findByIdAndDelete(id).exec();
}


// Make sure to export a function after you create it!
module.exports = {
    addPost,
    getAllPost,
    updatePost,
    deletePost,
    getOneByID
};