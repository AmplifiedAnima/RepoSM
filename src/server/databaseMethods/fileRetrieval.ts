import { MongoClient } from "mongodb";

class FileRetrieval {
  private client: MongoClient;
  private dbName: string;
  private collectionName: string;

  constructor(url: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(url);
    this.dbName = dbName;
    this.collectionName = collectionName;
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
}

export default FileRetrieval;
