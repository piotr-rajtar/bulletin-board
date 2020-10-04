const express = require('express');
const router = express.Router();

const posts = require('../controllers/posts.controller');

router.get('/posts', posts.getAllActive);

router.get('/posts/:id', posts.getSinglePost);

router.post('/posts', posts.addNewPost);

module.exports = router;
