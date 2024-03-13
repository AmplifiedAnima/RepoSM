import mongoose, { Schema, Document } from "mongoose";
import { MongoClient, ObjectId } from "mongodb";

export const urlOfDb = "mongodb://localhost:27017";
export const client = new MongoClient(urlOfDb);
export const dbName = "szukajprawnikadb";
export const collectionName = "userFilesCollection";

export const insertFile = async (file: {
  filename: string;
  originalname: string;
  mimetype: string;
  userId: string;
  url: string;
}) => {
  try {
    await client.connect();
    console.log("Connected to database");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(file);
    return result;
  } catch (err) {
    console.error("Error inserting file:", err);
  } finally {
    await client.close();
  }
};

export const findFilesByUserId = async (userId: string) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const files = await collection.find({ userId }).toArray();
    return files;
  } catch (err) {
    console.error("Error finding files:", err);
  } finally {
    await client.close();
  }
};

export const findOneFileToDownload = async (
  userId: string,
  fileName: string
) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const file = await collection.findOne({ userId, filename: fileName });
    return file;
  } catch (err) {
    console.error("Error finding file:", err);
  } finally {
    await client.close();
  }
};
