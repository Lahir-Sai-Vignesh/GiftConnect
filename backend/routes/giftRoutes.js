import express from "express";
import connectToDatabase from "../models/db.js";


 const router = express.Router()

router.get('/', async (req, res,next) => {
    console.log('/ called');
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (err) {
        console.error('Error fetching gifts', err)
        next(err)
    }
});

router.get('/:id',async (req,res,next)=>{
    try{
        const db= await connectToDatabase();
        const collection = db.collection('gifts');
        const gift_id = req.params.id;
        const gift = await collection.findOne({id:gift_id});
        if (!gift){
            res.status(404).send("Gift Not Found");
        }
        res.json(gift);
    }
    catch(err){   
        next(err)
    }
});


router.post('/',async (req,res,next)=>{
    try{
        const db= await connectToDatabase();
        const collection = db.collection('gifts');
        const gift = await collection.insertOne(req.body);

        res.send(gift);
    }
    catch(err){
        console.log("Error Inserting Item");
        next(err)
    }
})

export default router;

