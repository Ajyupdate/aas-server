
const express = require('express')
const dotenv = require("dotenv")
// const sequelize = require("./connection/db")
const app = express();
const Employee = require("../models/Employee")
const Sponsor = require('../models/Sponsor')
const SponsorRoute = require("../routes/sponsor")
const Task = require("../models/Task")
const StudentRoute = require("../routes/student")
// import db from "../models"
// import UserModel from '../models/User'
app.use(express.json());
// const db = require("../models")
dotenv.config();
const port = 3001


app.get('/task', async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  
app.use("/sponsors", SponsorRoute)
app.use("/students", StudentRoute)
// Get all employees
app.get('/employees', async (req, res) => {
    try {
      const employees = await Employee.findAll();
      res.json(employees);
    } catch (error) {
      console.error('Error getting employees:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// sequelize()
app.get("/", (req, res) =>{
    
    res.send({message: "success"})
})

// UserModel.sequelize.sync().then((req) => {
    app.listen(port, () => console.log(`app listening on port ${port}`) )
// })
