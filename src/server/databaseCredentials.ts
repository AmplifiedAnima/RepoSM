import { MongoClient } from "mongodb";
// later to be moved to process.env
export const urlOfDb = "mongodb://localhost:27017";
export const client = new MongoClient(urlOfDb);
export const dbName = "szukajprawnikadb";
export const collectionName = "userFilesCollection";
