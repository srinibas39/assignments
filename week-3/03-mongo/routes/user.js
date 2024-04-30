const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
   
    try{
        const username = req.body.username;
        const password = req.body.password;

       const newUser = await User.create({
        username:username,
        password:password
       })

       res.status(200).json({
        message:"User created successfully"
       })

    }
    catch(err){
        res.status(403).json({
            message:"Error in server"
        })
    }
});

router.get('/courses', async(req, res) => {
    try{
       const allCourses = await Course.find({});
       res.status(200).json({
         courses:allCourses
       })
    }
    catch(err){
        res.status(404).json({
            msg:"Error in server"
        })
    }
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    try{
        const courseId = req.params.courseId;
        const username = rea.body.username;

       await User.updateOne({username:username},{
            
                '$push':{
                    purchasedCourses:courseId
                }
            
       })

       res.status(200).json({
         message:'Course purchased successfully'
       })
    }
    catch(err){
        res.status(403).json({
            message:"Error in server"
        })
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    
    try{
        const username = req.headers.username;

        const user = await User.findOne({username})
        
        const purchasedCourses = await Course.findById({
            _id:{
                '$in':user.purchasedCourses
            }
        })

        res.status(200).json({
            purchasedCourses:purchasedCourses
        })
    }
    catch(err){
        res.status(403).json({
            message:"Error in the server"
        })
    }
    
});

module.exports = router