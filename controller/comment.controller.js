const express = require('express');
const router = express.Router();

const CommentModel = require('../model/comment.model');

router.post('/', (req, res) => {
    
    if(!req.body.postID || !req.body.editorUsername || !req.body.content) {
        return res.status(404).send({message: " Comment cant be empty"});
    }
    return CommentModel.addComment(req.body)
        .then((success) => res.status(200).send(success),
            (error) => res.status(500).send(error));
});


router.get('/', (req, res) => {
    CommentModel.getAllComment()
    .then(comment => res.status(200).send(comment))
});

router.get('/:postID', (req, res) => {
    CommentModel.getAllCommentByPostID(req.params.postID)
    .then(comment => res.status(200).send(comment))

});

router.get('/single/:id', (req, res) => {
    CommentModel.getCommentByID(req.params.id)
    .then((success) => res.status(200).send(success),
            (error) => res.status(404).send(error));

});

router.put('/', (req, res) => {
    return CommentModel.updateComment(req.body)
        .then((success) => res.status(200).send(success),
            (error) => res.status(500).send(error));
});

router.delete('/single/:id', (req, res) => {
    CommentModel.deleteComment(req.params.id)
        .then(res.status(200).send("Delete success"));
});

router.delete('/:postID', (req, res) => {
    CommentModel.deleteAllCommentByPostID(req.params.postID)
        .then(res.status(200).send("Delete success"));
});


module.exports = router;