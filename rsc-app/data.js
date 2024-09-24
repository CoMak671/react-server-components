import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const author = 'John Doe';
export const postContent = await readFile(
  resolve(__dirname, 'posts/hello-world.txt'),
  'utf8'
);
