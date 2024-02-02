// pages/api/article.ts
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'articles', req.query.articleFileName);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  res.status(200).json({ data: fileContent });
}