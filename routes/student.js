const express = require('express');
const router = express.Router();
const Student  = require('../models/Students'); // Replace with the actual path to your Sequelize models
const {v4: uuidv4} = require("uuid")
// GET route to fetch all students
router.get("", async (req, res) => {
  try {
    // Fetch all students from the database
    const allStudents = await Student.findAll();

    // Return the list of students in the response
    res.status(200).json(allStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('', async (req, res) => {
 
  try {
    const {
      first_name,
      last_name,
      date_of_birth,
      gender,
      email,
      address,
      phone_number,
      username,
      password,
      profile_picture_url,
      school,
      matric_no,
      faculty,
      department,
    } = req.body;

    const student_id = uuidv4();
    // Create a new student using Sequelize's create method
    const newStudent = await Student.create({
      student_id,
      first_name,
      last_name,
      date_of_birth,
      gender,
      email,
      address,
      phone_number,
      username,
      password,
      profile_picture_url,
      school,
      matric_no,
      faculty,
      department,
    });

    // Return the created student in the response
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find the student by ID
    const existingStudent = await Student.findByPk(studentId);

    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Update the student with the new data from the request body
    await existingStudent.update(req.body);

    // Return the updated student in the response
    res.status(200).json({ message: 'Student updated successfully', updatedStudent: existingStudent });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find the student by ID
    const existingStudent = await Student.findByPk(studentId);

    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Delete the student
    await existingStudent.destroy();

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
