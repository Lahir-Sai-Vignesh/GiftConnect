import express from "express";
import connectToDatabase from "../models/db";


const router = express.Router()

router.get('/',async(req,res)=>{
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
            query.age_years = req.query.age_years;
        }

        const gifts = await collection.find(query).toArray();
        res.json(gifts);
    }
    catch(err){
        console.err(err)
    }
});

export default router;