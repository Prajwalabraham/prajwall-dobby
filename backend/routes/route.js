const multer = require('multer');
const Image = require('../models/imageModel.js');
const path = require('path');
const { application } = require('express')
const express = require('express')
const router = express.Router() 
const User = require('../models/signupmodels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');


router.post("/signup", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { username,
        password,
        email} = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
      
      
      
      // Create user in our database
      const user = await User.create({
        username,
        email: email.toLowerCase(), // sanitize: convert email to lowercase,
        password: encryptedPassword,
        
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
      res.redirect('http://localhost:3000/')
      // return new user
      
      
    } catch (err) {
      console.log(err);
    }

    
    // Our register logic ends here
  });




   router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      /*if (!(username && password)) {
        res.status(400).send("All input is required");
      }*/
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        res.status(200).json(user);
        //res.redirect('http://localhost:3000/')
      }
      //res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });
 
  
 router.post("/imageUpload", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { user, image } = req.body;
    const filter = {email: user}
    const options = {upsert: true}
    const updateDoc = {
      $set: {
        email: user, 
        image: image
    }}

    const result = await Image.update(filter, updateDoc, options);
    console.log(`Updated ${result} documents`);


  } catch (err) {
    console.log(err);
  }
});

router.post("/imageView", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { user } = req.body;
    const filter = {email: user}
    
    const options = {
      projection: { image: 1 },
    };

    const result = await Image.find(filter, options);
  
    console.log(`Updated ${result.modifiedCount} documents`);
    await result.forEach(console.dir);


  } catch (err) {
    console.log(err);
  }
});

/*const upload=multer({
  limits: {
      fileSize: 5000000 // max file size 1MB=1000000 bytes
  },
  fileFilter:(req,file,cb)=>{
      if(file.mimetype =="image/png" || file.mimetype =="image/jpg" || file.mimetype =="image/jpeg" || file.mimetype=="image/gif"){
          cb(null,true)
      }else{
          cb(null,false);
          return cb(new Error('Only upload .png .jpeg .jpg .gif format !'))
      }
  }
});

 
 router.post('/images/',upload.single('image'),async(req,res)=>{
     try{
         const image=new Image(req.body);
         const file=req.file.buffer;
         image.image=file;
         await image.save();
         return res.status(200).send({_id:image._id})
     }catch(err){
        res.status(500).send({
            error:'Error while upload file . Please try again later..'
        })
     }
     (err,req,res,next)=>{
         if(err){
             return res.status(500).send(err.message)
         }
     }
     
 });
 
 router.get('/images/',async (req,res)=>{
     try{
         const images=await Image.find({});
         res.status(200).send(images)
     }catch(err){
         res.status(400).send({
             error: 'Error while try to list photo'
         })
     }
 });
 
 router.get('/images/:id',async (req,res)=>{
     try{
         const result=await Image.findById(req.params.id);
         res.set({
             'Content-Type':'image/jpeg'
         });
         res.status(200).send(result.image);
     }catch(err){ 
         res.status(400).send(err)
     }
 })*/
  

module.exports = router