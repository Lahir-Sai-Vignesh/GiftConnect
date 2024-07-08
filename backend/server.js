import express from "express";
import connectToDatabase from "./models/db.js";

const app = express();
const port = 5000;

connectToDatabase().then(() => {
    console.log("Connected to Database")
})
    .catch((err) => { console.error(err) });


app.get('/', (req, res) => {
    res.send("Inside server");
});
app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
});