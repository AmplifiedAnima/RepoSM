import { MongoClient } from "mongodb";

class FileOperations {
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

  async findFilesByUserId(userId: string) {
    try {
      await this.client.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      const files = await collection.find({ userId }).toArray();
      return files;
    } catch (err) {
      console.error("Error finding files:", err);
    } finally {
      await this.client.close();
    }
  }

  async findOneFileToDownload(userId: string, fileName: string) {
    try {
      await this.client.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection(this.collectionName);
      const file = await collection.findOne({ userId, filename: fileName });
      return file;
    } catch (err) {
      console.error("Error finding file:", err);
    } finally {
      await this.client.close();
    }
  }
}

export default FileOperations;
