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
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post;
    const post = await result.findById(req.params.id);
    if(!post) res.status(404).json({ post: 'Not found' });
    else res.json(post);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
