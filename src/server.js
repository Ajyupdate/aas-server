const cors = require("cors")
const express = require('express')
const dotenv = require("dotenv")
// const sequelize = require("./connection/db")
const app = express();
const Employee = require("../models/Employee")
const axios = require('axios');
const SponsorRoute = require("../routes/sponsor")
const Task = require("../models/Task")
const StudentRoute = require("../routes/student")
const AuthRoute = require("../routes/auth")
const PostRoute = require("../routes/posts")
const SchoolInfoRoute = require("../routes/school-info")

const keys = require("../config/keys")
const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy

// app.use(cors());
// const corsOptions = {
//   origin: "*",
// }
// app.use(cors(corsOptions))
app.use(express.json());
app.use(passport.initialize())

passport.use(
  new GoogleStrategy({
      callbackURL: '/auth/google/redirect',
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
  }, () => {
      
  })
)

dotenv.config();
const port = 3001
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended: false}))

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

const PAYSTACK_SECRET_KEY = 'sk_test_2c15b3a1cab333903e9b5dc97cbd199c81c9c745';

app.get('/auth/google',

(req, res, next) => {
    console.log("Before passport.authenticate middleware");
    next(); // Call next to proceed to the next middleware
},
  passport.authenticate('google', 
  
  { scope: ['profile', 'email'] }));

// Define route for handling authentication callback
app.get('/auth/google/callback',
(req, res, next) => {
  console.log("passport.authenticate middleware");
  next(); // Call next to proceed to the next middleware
},
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to a success page or user dashboard
    res.redirect('/dashboard');
  }
);


app.post('/initialize-payment', async (req, res) => {
  console.log(req.body.email)
  console.log(req.body.amount)
  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: req.body.email,
        amount: req.body.amount,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while initializing payment.' });
  }
});
app.get('/task', async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// app.use("/auth", AuthRoute)
app.use("/sponsors", SponsorRoute)
app.use("/students", StudentRoute)
app.use("/posts", PostRoute)
app.use("/school-info", SchoolInfoRoute)
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
