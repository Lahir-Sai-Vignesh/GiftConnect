import {MongoClient} from "mongodb";
import 'dotenv/config';


let dbInstance = null;
const dbName = "giftsdb";
const url = `${process.env.MONGODB_URL}`;

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }
    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log("Connected to the 'GiftsDb'database");
        dbInstance = client.db(dbName);
        return dbInstance;
    }
    catch (err) {
        console.error(err)
    }

}

export default connectToDatabase;