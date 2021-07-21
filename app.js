const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const isLoggedIn = require("./middlewares/isLoggedIn");
const { sequelize } = require("./models/index");
const app = express();

require("dotenv").config();
// app.use(require("./models/index"));
app.set("view-engine", "ejs");
app.use(express.urlencoded({extended:false}));

sequelize.authenticate().then(()=>console.log("postgres connected")).catch(err=>console.error(error))
app.use(flash());
app.use(session({
    secret: "asdasdasdasdhahusdnaisdnadioasdi00123ksa",
    resave:false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));
app.get("/", isLoggedIn ,(req, res)=>{
    console.log(req.user);
    res.render("index.ejs", {name:req.user.firstName, data:[req.session.data]})
})
const port = process.env.PORT || 4000;


app.listen(port, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Listening to port ", port);
    }
})
