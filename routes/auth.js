const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {User} = require("../models");
const initializePassport = require("../config-system/passport");
const isNotAuthenticated = require("../middlewares/isNotAuthenticated");


initializePassport(passport);

const users = []; 

router.get("/login",isNotAuthenticated,(req, res)=>{
    res.render("login.ejs");
});

router.get("/register",isNotAuthenticated,(req,res)=>{
    res.render("register.ejs");
});
router.get("/users",(req,res)=>{
    User.findAll({}).then(response=>res.send(response)).catch(err=>console.error(err));
})
router.post("/login",isNotAuthenticated, passport.authenticate('local', {
    successRedirect:"/",
    failureRedirect:"/auth/login",
    failureFlash: true
}));

router.post("/register",isNotAuthenticated, async (req,res)=>{
    try{
        User.findOne({where:{email:req.body.email}, raw:true}).then(async user=>{
            if(user){
                return res.send("User already registered")
            }
            const hashedPw = await bcrypt.hash(req.body.password, 10);
            User.create({firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email, password:hashedPw, created_at:new Date(), updated_at:new Date()})
            .then(createdUser=> res.redirect("/auth/login"))
            .catch(error=>console.error(error))
        }).catch(err=>console.error(err))
        // users.push({id:Date.now().toString(), name:req.body.name, email:req.body.email, password:hashedPw});
        // res.redirect("/auth/login");
    }catch(ex){
        res.redirect("/auth/register")
    }
    // console.log(users);
});

module.exports = router;