import express from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import "dotenv/config";
import connectToDatabase from "../models/db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register",async(req,res)=>{
    try{
        const db = await connectToDatabase();
        const collection = db.collection("users");
        const existingEmail = await collection.findOne({email:req.body.email});
        
        if(existingEmail){
            console.log("Email already exists");
            return res.status(400).json({error:"Email already exists"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hashSync(req.body.password,salt);//hashed password
        const email = req.body.email;
        const newUser = await collection.insertOne({
            email:req.body.email,
            firstName:req.body.firstName,
            lastName : req.body.lastName,
            password:hash,
            createdAt : new Date()
        });

        // newUser is a json with {acknowledged: promise Acknowledgement Status , insertedId : new ObjectId('MongoDb Id object id')}
        const payload = {
            user:{
                id:newUser.insertedId
            }
        }
        const firstName = req.body.firstName;
        // console.log(firstName);
        const token = jwt.sign(payload,JWT_SECRET);
        res.json({token,email,firstName});
    }
    catch(err){
        return res.status(500).send("Internal Server Error");
    }
});
router.post("/login",async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const db = await connectToDatabase();
        const collection = db.collection('users');
        const User = await collection.findOne({email:req.body.email});
        
        if(User){
            const result = await bcryptjs.compare(password,User.password);
            if(!result){
                return res.status(404).json({error:"Wrong password"});
            }
            const firstName = User.firstName;
            // need to send token if passwords match
            const payload={
                user:{
                    id:User._id.toString()
                }
            }
            const token = jwt.sign(payload,JWT_SECRET);
            return res.status(200).json({token,email,firstName});
        }
        else{
            return res.status(404).json({error: "User Not Found"});
        }
    }
    catch(err){
        return res.status(500).send({error:"Internal Server Error",details:err.message});
    }
});
router.put("/update",async(req,res)=>{
    try {
        const email = req.headers.email;
        if(!email){
            return res.status(400).json({error:"Email Not Found In The Request Headers"});
        }
        const db = await connectToDatabase();
        const collection = db.collection("users");
        const User = await collection.findOne({email : email});
        if(!User){
            return res.status(404).json({error : "User Not Found"});
        }
        User.firstName = req.body.firstName;
        User.updatedAt = new Date();

        const updatedUser = await collection.findOneAndUpdate({email},{$set:User},{return:'after'})

        if(updatedUser){
            return res.status(200).json({message:"User updated succesfully"});
        }
    } catch (error) {
        res.status(500).send({error:"Internal Server Error",details:err.message})
    }
});
export default router
