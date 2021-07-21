const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const {User} = require("../models");

function initialize(passport){
    const authenticateUser =async (email, password, done)=>{
        console.log(email);
        const user = await User.findOne({where:{email:email}});
        if(user==null){
            return done(null, false, {message:"No user with email"})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                console.log("Hello")
                return done(null, user);
            }else{
                return done(null, false, {message:"Password incorrect"});
            }
        }catch(ex){
            console.log(ex);
            return done(ex);
        }
      
    }
    passport.use(new LocalStrategy({usernameField: 'email', password:"password"}, authenticateUser))
    passport.serializeUser((user,done)=>done(null, user));
    passport.deserializeUser((user,done)=>{
        return done(null, user)
    });
}

module.exports = initialize;