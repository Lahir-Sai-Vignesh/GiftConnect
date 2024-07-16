import 'dotenv/config';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.env.MONGODB_URL;
const fileName = path.join(__dirname, 'gifts.json');
const dbName = 'giftdb';
const collectionName = 'gifts';

//loading data from 'gifts.json'
const data = JSON.parse(fs.readFileSync(fileName,"utf8")).docs

async function loadData(){
    const client = new MongoClient(url);
    try{
        await client.connect();
        console.log("Connected Succesfully to the server");
        
        // db will be created if not present
        const db= client.db(dbName);

        //collection will be created if not present
        const collection = db.collection(collectionName);
        let cursor = await collection.find({}) // collection.find returns a cursor
        let documents = await cursor.toArray();

        if (documents.length == 0){
            const insertResult = await collection.insertMany(data);
            console.log('Inserted documents:', insertResult.insertedCount);
        }
        else {
            console.log("Gifts already exists in DB")
        }
    }
    catch(err){
        console.error(err)
    }
    finally{
        // Close the connection
        await client.close();
    }
}
loadData();