const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const AppProjection = async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("app_projection");

    const config = await collection.findOne({
      _id: new ObjectId("68654a0bbf4bed9054bef0e8")
    });

    if (!config) {
      return res.status(404).json({ message: "Config not found" });
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  } finally {
    await client.close();
  }
};

module.exports = { AppProjection };
