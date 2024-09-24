import { createServer } from 'http';
import { sendHtmlWithJsx } from './tool.js';
import { page } from './page.js';

// 渲染jsx
createServer(async (req, res) => {
  sendHtmlWithJsx(res, page);
}).listen(8080);
