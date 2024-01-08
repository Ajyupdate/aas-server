const express = require('express');
const router = express.Router();
const Post = require('../models/Posts'); 
const Student = require("../models/Students")
const {v4: uuidv4} = require("uuid")
// GET all posts
router.get('', async (req, res) => {
  try {
    // Retrieve all posts from the database
    const posts = await Post.findAll({
      include: [{
        model: Student,
        as: 'student',
      }],
    });

    // Return the posts in the response
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/:id", async(req, res) => {
  const id = req.params.id
 
  try{
    const post = await Post.findByPk(id, {
      include: [{
        model: Student,
        as: 'student',
      }],
    })
    
    res.status(200).json(post);
  }catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.post('', async (req, res) => {
    try {
      const {
        student_id,
        title,
        content,
        category,
        attachment_url,
      } = req.body;
  
      // Generate a new UUID for the post's id
      const post_id = uuidv4();
  
      // Create a new post using Sequelize's create method
      const newPost = await Post.create({
        post_id,
        student_id,
        title,
        content,
        category,
        attachment_url,
      });
  
      // Return the created post in the response
      res.status(201).json(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.patch('/:postId', async (req, res) => {
    const postId = req.params.postId;
  
    try {
      // Find the post by its ID
      const existingPost = await Post.findByPk(postId);
  
      // If the post doesn't exist, return a 404 Not Found response
      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Update the post with the new data
      const updatedPost = await existingPost.update(req.body);
  
      // Return the updated post in the response
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error('Error updating post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId;
  
    try {
      // Find the post by its ID
      const existingPost = await Post.findByPk(postId);
  
      // If the post doesn't exist, return a 404 Not Found response
      if (!existingPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Delete the post
      await existingPost.destroy();
  
      // Return a success message in the response
      res.status(204).json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
