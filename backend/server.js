import express from "express";
import connectToDatabase from "./models/db.js";
import giftRoutes from './routes/giftRoutes.js' ;
import searchRoutes from './routes/searchRoutes.js'
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

connectToDatabase().then(() => {
    console.log("Connected to Database")
})
    .catch((err) => { console.error(err) });

app.use(express.json());

app.use('/gifts',giftRoutes);
app.use('/search',searchRoutes);
app.use('/auth',authRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
    res.send("Inside server");
});
app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`);
});
