
const express = require('express')
const dotenv = require("dotenv")
const sequelize = require("./connection/db")
const app = express();
const Employee = require("../models/Employee")
// import db from "../models"
// import UserModel from '../models/User'
app.use(express.json());
// const db = require("../models")
dotenv.config();
const port = 3001

const database = process.env.PROD_DATABASE;
const user = process.env.PROD_USERNAME;
const password = process.env.PROD_PASSWORD;
const host = process.env.PROD_HOST;
const name = process.env.name


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
