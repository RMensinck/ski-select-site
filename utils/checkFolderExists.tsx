import fs from 'fs';
import path from 'path';

export const checkFolderExists = (brand, model) => {
  const brandPath = path.join(process.cwd(), 'public', 'skis', brand);
  const modelPath = path.join(brandPath, model);

  return fs.existsSync(modelPath);
};