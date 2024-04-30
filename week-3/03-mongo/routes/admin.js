const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
       
     const username = req.body.username;
     const password = req.body.password;

      await Admin.create({
        username:username,
        password:password
     })

     res.status(200).json({
        message:"Admin created successfully"
     })


        
});

router.post('/courses', adminMiddleware, async(req, res) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;;
    const imageLink = req.body.imageLink;

    const newCourse = await Course.create({
        title,
        description,
        price,
        imageLink
    })

    res.status.json({
        message:'Course created successfully',
        courseId:newCourse._id
    })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    try{
        const allCourses = await Course.find({});
        res.status(200).json({
            courses:allCourses
        })
    }
    catch(err){
        res.status(404)
    }
});

module.exports = router;