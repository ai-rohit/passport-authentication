const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const initializePassport = require("../config/passport");

initializePassport(passport, email=>users.find(user=> user.email === email));

const users = []; 

router.get("/login", (req, res)=>{
    res.render("login.ejs");
});

router.get("/register", (req,res)=>{
    res.render("register.ejs");
});

router.post("/login", passport.authenticate('local', {
    successRedirect:"/auth/login",
    failureRedirect:"/auth/login",
    failureFlash: true
}));

router.post("/register", async (req,res)=>{
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