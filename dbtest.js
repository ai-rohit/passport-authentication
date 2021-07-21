const {User} = require("./models");
const { sequelize } = require("./models/index");
const {Op} = require("sequelize");

sequelize.authenticate().then(()=>console.log("postgres connected")).catch(err=>console.error(error));

async function getUser(){
    const user = await User.findAll({raw:true});
    console.log("all users ", user);
    console.log("selecting specific columns",await User.findAll({raw: true, attributes:["firstName", "email"]}));
    console.log("finding user by exculding a column", await User.findAll({raw:true, attributes:{exclude:["password"]}}));
    console.log("Selecting with condition ",await User.findAll({where:{firstName:"Rohit"}}))
    //or
    console.log("Selecting with condition ",await User.findAll({where:{firstName:{[Op.eq]:"Rohit"}}, raw:true}))

    //and 
    // console.log("Selecting with multiple condition ",await User.findAll({where:{firstName:"Rohit", password:"123rohit"}}))

    console.log("Selecting with multiple condition ",await User.findAll({where:{[Op.and]:[{firstName:"Rohit"}, {password:"123rohit"}]}}))

    console.log("Selecting with multiple condition or op", await User.findAll({where:{[Op.or]:[{firstName:"Rohit"},{password:"123rohit"}]}, raw:true}))

}
getUser();

// async function addUser(){
//     const user = await User.create({
//         firstName:"Rohit12",
//         lastName:"Shrestha",
//         email:"stha12@gmail.com",
//         password:"123rohit",
//         created_at:new Date(),
//         updated_at: new Date()
//     })
//     console.log(user.id);
// }
// addUser();