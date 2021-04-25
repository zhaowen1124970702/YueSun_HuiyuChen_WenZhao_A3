const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'build')));

app.use(cors({
    origin: '*',
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require('./controller/user.controller');
app.use('/api/login', userRouter);

const CommentRouter = require('./controller/comment.controller');
app.use('/api/comment', CommentRouter);

const postRouter = require('./controller/post.controller');
app.use('/api/post', postRouter);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});

const mongoose = require('mongoose');
// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = "mongodb+srv://ashleyok1024:chygwm19911024@db3.4q1j0.mongodb.net/db3?retryWrites=true&w=majority";
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));