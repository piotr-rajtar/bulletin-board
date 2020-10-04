const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'active'})
      .select('author created title photo status')
      .sort({created: -1});

    if(!result) res.status(404).json({ post: 'Not found' });
    else {
      res.json(result);
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    const arrayResult = [];

    if(!result) res.status(404).json({ post: 'Not found' });
    else {
      arrayResult.push(result);
      res.json(arrayResult);
    }
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', async (req, res) => {
  try{
    //const { title, content, email } = req.fields;
    const file = req.files.photo;

    let fileName;
    if(!file) fileName = null;
    else fileName = file.path.split('/').slice(-1)[0];

    const newPost = new Post({ ...req.fields, photo: fileName  });

    await newPost.save();
    
    res.json(newPost);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
