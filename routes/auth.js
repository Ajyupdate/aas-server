const router = require('express').Router();

const passport = require("passport")
//auth login
router.get('/login', (req, res) =>{
    res.render('login')
})

router.get('/logout', (req, res) => {
    // handle with passport
    res.send("logging out")

})

router.get('/google', (req, res, next) => {
    console.log("Before passport.authenticate middleware");
    next(); // Call next to proceed to the next middleware
},
 passport.authenticate('google', {
    scope:['profile', 'email']
}), 
(req, res) => {
    console.log("After passport.authenticate middleware");
   res.send()
});




module.exports = router;
