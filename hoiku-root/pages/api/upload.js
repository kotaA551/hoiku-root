//post.htmlで入力した記事をMongoDBに登録
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, content, thumbnail } = req.body;

    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("blogDB");
    const articles = db.collection("articles");

    await articles.insertOne({ title, content, thumbnail });

    client.close();
    res.status(201).json({ message: "記事が保存されました！" });
  } else {
    res.status(405).json({ message: "POSTリクエストのみ許可されています。" });
  }
}
