const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000; // Render対応

// 静的ファイルを公開（publicディレクトリ）
app.use(express.static('public'));

// 画像アップロード設定
const storage = multer.diskStorage({
  destination: 'public/images/uploads',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// 投稿データの保存先ファイル
const POSTS_FILE = path.join(__dirname, 'posts.json');
if (!fs.existsSync(POSTS_FILE)) {
  fs.writeFileSync(POSTS_FILE, '[]', 'utf-8');
}

// JSONのパース
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API: 投稿データの受け取り（画像含む）
app.post('/api/posts', upload.single('thumbnail'), (req, res) => {
  const { title, body } = req.body;
  const filePath = req.file ? `/images/uploads/${req.file.filename}` : '';

  const newPost = {
    id: Date.now().toString(),
    title,
    body,
    thumbnail: filePath,
    date: new Date().toISOString()
  };

  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
  posts.push(newPost);
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));

  res.json({ message: '投稿完了', post: newPost });
});

// API: 投稿一覧の取得
app.get('/api/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
  res.json(posts.reverse()); // 新しい順に並び替え
});

// ルートにアクセスされたときに index.html を表示
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Renderやローカルでの起動
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
