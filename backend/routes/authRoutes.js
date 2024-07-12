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
        const token = jwt.sign(payload,JWT_SECRET);
        res.json({token,email});
    }
    catch(err){
        return res.status(500).send("Internal Server Error");
    }
});
router.post("/login",(req,res)=>{
    res.send("login page")
});
router.put("/update",(req,res)=>{
    res.send("update page")
});
export default router
