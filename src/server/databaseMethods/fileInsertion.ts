import { MongoClient } from "mongodb";

class FileInsertion {
  private client: MongoClient;
  private dbName: string;
  private collectionName: string;

  constructor(url: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(url);
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  async insertFile(file: {
    filename: string;
    originalname: string;
    mimetype: string;
    userId: string;
    url: string;
  }) {
    try {
      await this.client.connect();
      console.log("Connected to database");
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      const result = await collection.insertOne(file);
      return result;
    } catch (err) {
      console.error("Error inserting file:", err);
    } finally {
      await this.client.close();
    }
  }
}

export default FileInsertion;
