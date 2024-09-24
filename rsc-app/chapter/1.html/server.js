import { createServer } from 'http';
import { sendHtml } from './tool.js';
import { page } from './page.js';

// 渲染html
createServer(async (req, res) => {
  sendHtml(res, page);
}).listen(8080);
