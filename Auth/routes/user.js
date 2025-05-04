const express = require("express");
const router = express.Router();

const {login,signup} = require("../controllers/auth")
const {auth, isStudent, isAdmin} = require("../middlewares/auth")

router.post('/login',login)
router.post('/signup',signup)

//Testing protected routes for single middleware
router.get('/test', auth, (req,res)=>{
  res.json({
    success:true,
    message:"Welcome to the protected route for tests"
  })
})

//Protected Routes
router.get("/student", auth,isStudent, (req,res) => { //auth and isStudent are middlewares
  res.json({
    success:true,
    message:"Welcome to the protected route for students"
  })
});
router.get("/admin", auth,isAdmin, (req,res) => { //auth and isAdmin are middlewares
  res.json({
    success:true,
    message:"Welcome to the protected route for admin"
  })
});

module.exports = router;