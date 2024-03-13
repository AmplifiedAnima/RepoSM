import { MongoClient } from "mongodb";

class FileDownload {
  private client: MongoClient;
  private dbName: string;
  private collectionName: string;

  constructor(url: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(url);
    this.dbName = dbName;
    this.collectionName = collectionName;
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

export default FileDownload;
