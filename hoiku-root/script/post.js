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

// 記事アップロード後、リダイレクト処理を追加
async function uploadArticle() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const thumbnail = document.getElementById("thumbnail").files[0];

    const reader = new FileReader();
    reader.onloadend = async function () {
        const response = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                content: content,
                thumbnail: reader.result
            })
        });

        if (response.ok) {
            alert("記事がアップロードされました！");
            window.location.href = "index.html"; // 成功時にリダイレクト
        } else {
            alert("記事のアップロードに失敗しました。");
        }
    };

    if (thumbnail) {
        reader.readAsDataURL(thumbnail);
    }
}
