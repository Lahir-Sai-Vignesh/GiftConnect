import express from "express";
import connectToDatabase from "../models/db.js";
import {ObjectId} from 'mongodb';

 const router = express.Router()

router.get('/', async (req, res,next) => {
    console.log('/all gifts');
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

router.get('/email/:email',async(req,res,next)=>{
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const email = req.params.email;
        //console.log(email);
        const gifts = await collection.find({posted_by:email}).toArray();
        if(!gifts){
            return res.status(404).send("No Gifts Posted from this email");
        }
        return res.status(200).send(gifts);
    } catch (error) {
        next(err);
    }
})

router.get('/id/:id',async (req,res,next)=>{
    console.log('/single gift')
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

        return res.status(200).send(gift);
    }
    catch(err){
        console.log("Error Inserting Item");
        next(err)
    }
})

router.put('/id/:id', async (req, res, next) => {
    console.log('/update gift route called')
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gift_id = req.params.id;
        const updatedGift = await collection.findOneAndUpdate(
            { id: gift_id },
            { $set: req.body },
            { returnOriginal: false }
        );
        if (!updatedGift) {
            return res.status(404).send("Gift Not Found");
        }
        return res.status(200).send(updatedGift);
    } catch (err) {
        console.log("Error Updating Item");
        next(err);
    }
});

// Delete a gift by ID
router.delete('/id/:id', async (req, res, next) => {
    console.log('/delete gift route called')
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gift_id = req.params.id;
        const deletedGift = await collection.findOneAndDelete({ id: gift_id });
        if (deletedGift == null) {
            return res.status(404).send("Gift Not Found");
        }
        return res.status(200).send("Gift Deleted Successfully");
        
    } catch (err) {
        console.log("Error Deleting Item");
        next(err);
    }
});

export default router;

