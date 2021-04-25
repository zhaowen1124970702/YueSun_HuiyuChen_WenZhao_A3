const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const CommentSchema = require('../schema/comment.schema');

const CommentModel = mongoose.model("Comment", CommentSchema);

function addComment(comment) {
    return CommentModel.create(comment);
}

function getAllCommentByPostID(postID) {
    return CommentModel.find({postID:postID}).exec();
}

function getAllComment() {
    return CommentModel.find().exec();
}
function getCommentByID(id) {
    return CommentModel.findById(id).exec();
}

function updateComment(comment){

    return CommentModel.findByIdAndUpdate(comment._id, comment).exec();

}

function deleteComment(id){
    return CommentModel.findByIdAndDelete(id).exec();
}

function deleteAllCommentByPostID(postID) {
    return CommentModel.deleteMany({postID:postID}).exec();
}

// Make sure to export a function after you create it!
module.exports = {
    addComment,
    getAllCommentByPostID,
    getAllComment,
    updateComment,
    deleteComment,
    deleteAllCommentByPostID,
    getCommentByID
};