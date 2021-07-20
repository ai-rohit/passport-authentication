const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view-engine", "ejs");
app.get("/", (req, res)=>{
    res.render("index.ejs", {name:"rohit"})
})
app.use(flash());
app.use(session({
    secret: "asdasdasdasdhahusdnaisdnadioasdi00123ksa",
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));

const port = process.env.PORT || 4000;

app.listen(port, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Listening to port ", port);
    }
})