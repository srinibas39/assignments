const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    try{
        const username = req.headers.username;
        const password = req.headers.password;

       const admin =  await Admin.findOne({
            username:username,
            password:password
        })

        if(admin){
            next()
        }
        else{
            res.status(403).json({
                message:"User does not exist"
            })
        }
    }
    catch(err){
        res.status(404);
    }
}

module.exports = adminMiddleware;