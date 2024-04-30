const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
   try{
        const username = req.headers.username;
        const password = req.headers.password;

       const user =  User.find({
            username,password,
        })

        if(typeof user === "object" && user.length){
            next();
        }
        else{

            res.status(403).json({
                message:'User does not exist'
            })
        }
   }
   catch(err){
    res.status(404).json({
        message:"Error in the server "
    })
   }
    const username = req.headers.username;
    const password = req.headers.password;

    if(username && password){

    }

}

module.exports = userMiddleware;