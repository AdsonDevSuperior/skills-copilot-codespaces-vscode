//Create web server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require("fs");
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = require('./models/Comment.js');
var Post = require('./models/Post.js');
var User = require('./models/User.js');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/comments');

//Get all comments
router.route('/comments').get(function (req, res) {
    Comment.find(function (err, comments) {
        if (err) {
            return res.send(err);
        }
        res.json(comments);
    });
});

//Get comments by post id
router.route('/comments/:id').get(function (req, res) {
    Comment.find({postID: req.params.id}, function(err, comments) {
        if (err) {
            return res.send(err);
        }
        res.json(comments);
    });
});

//Post a comment
router.route('/comments').post(function (req, res) {
    var comment = new Comment(req.body);
    comment.save(function (err) {
        if (err) {
            return res.send(err);
        }
        res.send({ message: 'Comment Added' });
    });
});

//Update a comment
router.route('/comments/:id').put(function(req, res) {
    Comment.findOne({ _id: req.params.id }, function (err, comment) {
        if (err) {
            return res.send(err);
        }
        for (prop in req.body) {
            comment[prop] = req.body[prop];
        }
        comment.save(function(err) {
            if (err) {
                return res.send(err);
            }
            res.json({ message: 'Comment updated!' });
        });
    });
});

//Delete a comment
router.route('/comments/:id').delete(function(req, res) {
    Comment.remove({
        _id: req.params.id
    }, function(err, comment) {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });
});

//Get all posts
router.route('/posts').get(function (req, res) {
    Post.find(function (err, posts) {
