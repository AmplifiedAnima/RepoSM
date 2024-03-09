import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();

const dbMongoUrl = 'mongodb://localhost:27017/ExpressAppDatabase';


const client = new MongoClient(dbMongoUrl);

const db = async () => {
  try {
    await client.connect();
    console.log(`mongodb connected ${client.db().databaseName}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default db;
