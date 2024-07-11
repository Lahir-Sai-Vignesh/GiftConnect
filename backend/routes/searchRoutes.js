import express from "express";
import connectToDatabase from "../models/db.js";


const router = express.Router()

router.get('/',async(req,res,next)=>{
    try{
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const query = {}

        // ensuring name exists and also name is not a whitespace
        if(req.query.name && req.query.name.trim()!==''){
            query.name = {$regex:req.query.name,$options:"i"}
            // https://www.mongodb.com/docs/v2.2/reference/operator/query/regex/ (visit this link for syntax reference)
        }

        if (req.query.category){
            query.category = req.query.category;
        }
        if (req.query.condition){
            query.condition = req.query.condition;
        }
        if (req.query.age_years){
            query.age_years = { $lte: parseInt(req.query.age_years) }; // less than or equal to the age (converted to Int)
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    }
    catch(err){
        next(err)
    }
});

export default router;