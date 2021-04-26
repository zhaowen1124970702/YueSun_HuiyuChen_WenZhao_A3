const express = require('express');
const router = express.Router();

const UserModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const cookie_middleware = require('../cookie/cookie_middleware');

router.post('/register', (req, res) => {

    const username = req.body.username;
    const password = String(req.body.password);

    if(!username || !password) {
        return res.status(404).send({message: "Must include username AND password"});
    }

    const user = {
        username: username,
        password: password, 
    }

    return UserModel.addUser(user)
        .then((response) => {
            const token = jwt.sign(response.username, 'salty_salt')
            res.cookie('webdevtoken', token).status(200).send(response);
        },(error) => res.status(500).send("Failed to add user: \n"+ error));
});


router.post('/verify', (req, res) => {

    if(!req.body.username || !req.body.password) {
        return res.status(400).send( "Must include username AND password");
    }
    return UserModel.getUseByUserName(req.body.username)
        .then((response) => {
            if(response.password !== req.body.password){
                return res.status(402).send("Password failed to verify")
            }
            const token = jwt.sign(response.username, 'salty_salt')
            res.cookie('webdevtoken', token).status(200).send(response)
        },(error) => res.status(500).send("Failed to verify user: \n"+ error));
});


router.get('/cookie',cookie_middleware, (req, res) => {
    return res.status(200).send(req.username);
})


router.post('/logOut', (req, res) => {
    res.clearCookie('webdevtoken');
    res.sendStatus(200).redirect('/');
})


router.get('/', (req, res) => UserModel.getAllUsers()
    .then(users => res.send(users)));


module.exports = router;