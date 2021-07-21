const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const initializePassport = require("../config/passport");
const isNotAuthenticated = require("../middlewares/isNotAuthenticated");

initializePassport(passport, email=>users.find(user=> user.email === email), id=>users.find(user=>user.id===id));

const users = []; 

router.get("/login",isNotAuthenticated,(req, res)=>{
    res.render("login.ejs");
});

router.get("/register",isNotAuthenticated,(req,res)=>{
    res.render("register.ejs");
});

router.post("/login",isNotAuthenticated, passport.authenticate('local', {
    successRedirect:"/",
    failureRedirect:"/auth/login",
    failureFlash: true
}));

router.post("/register",isNotAuthenticated, async (req,res)=>{
    try{
        const hashedPw = await bcrypt.hash(req.body.password, 10);
        users.push({id:Date.now().toString(), name:req.body.name, email:req.body.email, password:hashedPw});
        res.redirect("/auth/login");
    }catch(ex){
        res.redirect("/auth/register")
    }
    console.log(users);
});

module.exports = router;