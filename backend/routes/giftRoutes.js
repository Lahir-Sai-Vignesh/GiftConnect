import express from "express";
import connectToDatabase from "../models/db.js";


 const router = express.Router()

router.get('/', async (req, res) => {
    console.log('/ called');
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts', e)
        
    }
});

router.get('/:id',async (req,res)=>{
    try{
        const db= await connectToDatabase();
        const collection = db.collection('gifts');
        const gift_id = req.params.id;
        const gift = await collection.findOne({id:gift_id}).toArray();
        res.json(gift);
    }
    catch(err){
        res.status(404).send("Gift Not Found");
    }
});


router.post('/',async (req,res)=>{
    try{
        const db= await connectToDatabase();
        const collection = db.collection('gifts');
        const gift = await collection.insertOne(req.body);

        res.send(gift);
    }
    catch(err){
        console.log("Error Inserting Item")
    }
})

export default router;

