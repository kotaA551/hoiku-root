//MongoDBから記事一覧を取得するAPI
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db("blogDB");
    const articles = db.collection("articles");

    const articleList = await articles.find().toArray();
    client.close();

    res.status(200).json(articleList);
  } else {
    res.status(405).json({ message: "GETリクエストのみ許可されています。" });
  }
}
