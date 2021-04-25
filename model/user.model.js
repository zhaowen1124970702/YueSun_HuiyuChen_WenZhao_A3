const mongoose = require("mongoose");
// Recall how exports work in Node.js?
const UserSchema = require('../schema/user.schema');

const UserModel = mongoose.model("User", UserSchema);

function addUser(user) {
    return UserModel.create(user);
}

function getUseByUserName(username) {
    return UserModel.findOne({username: username}).exec();
}

function getAllUsers() {
    return UserModel.find().exec();
}

// Make sure to export a function after you create it!
module.exports = {
    addUser,
    getUseByUserName,
    getAllUsers,
};