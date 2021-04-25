const express = require('express');
const router = express.Router();

const PostModel = require('../model/post.model');
const cookie_middleware = require('../cookie/cookie_middleware');

router.post('/', cookie_middleware,(req, res) => {
    const post = req.body;
    const username = req.username;
    post.username = username;
    
    if(!post.username) {
        return res.status(404).send({message: " post's username cant be empty"});
    }
    if(!post.title) {
        return res.status(404).send({message: " post's titile cant be empty"});
    }
    if((!post.URL && !post.content) ||(post.URL && post.content)){
        return res.status(404).send({message: " Only URL or content"});

    }

    return PostModel.addPost(post)
        .then((success) => res.status(200).send(success),
            (error) => res.status(500).send(error));
});


router.get('/', (req, res) => {
    PostModel.getAllPost()
    .then(post => res.status(200).send(post))
});

router.get('/:postID', (req, res) => {
    PostModel.getOneByID(req.params.postID)
    .then(post => res.status(200).send(post))

});

router.put('/', cookie_middleware,(req, res) => {
    const post = req.body;
    const username = req.username;
    post.username = username;

    return PostModel.updatePost(post)
        .then((success) => res.status(200).send(success),
            (error) => res.status(500).send(error));
});

router.delete('/:postID', (req, res) => {
    PostModel.deletePost(req.params.postID)
        .then(res.status(200).send("Delete success"));
});


module.exports = router;