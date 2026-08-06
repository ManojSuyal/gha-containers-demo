import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;
const {
  MONGODB_CONNECTION_PROTOCOL: proto,
  MONGODB_CLUSTER_ADDRESS: addr,
  MONGODB_USERNAME: user,
  MONGODB_PASSWORD: pass,
  MONGODB_DB_NAME: dbName
} = process.env;

const uri = `${proto}://${user}:${pass}@${addr}/?authSource=admin`;

app.get("/health", async (_req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    res.json({ status: "ok", db: dbName });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => console.log(`listening on ${port}`));
