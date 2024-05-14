const express = require('express');
const router = express.Router();
const SchoolInfo = require("../models/SchoolInfo")
const Student = require("../models/Students")
const {v4: uuidv4} = require("uuid")

router.get('', async (req, res) => {
    try {
      
      const schoolInfo = await SchoolInfo.findAll({
        include: [{
          model: Student,
          as: 'student',
        }],
      });
  
      // Return the posts in the response
      res.status(200).json(schoolInfo);
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get("/:id", async(req, res) => {
    const id = req.params.id
   
    try{
      const schoolInfo = await SchoolInfo.findByPk(id, {
        include: [{
          model: Student,
          as: 'student',
        }],
      })
      
      res.status(200).json(schoolInfo);
    }catch (error) {
      console.error('Error fetching information:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  module.exports = router

  