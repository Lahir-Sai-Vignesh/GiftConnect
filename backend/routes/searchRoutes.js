import express from "express";

const router = express.Router()

router.get('/',(req,res)=>{
    res.send("Inside SearchRoutes");
});

export default router;