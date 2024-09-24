import { createServer } from 'http';
import { sendHtmlWithJsx } from './tool.js';
import { matchRoute } from './route.js';

// 渲染路由
createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const page = await matchRoute(url);
  sendHtmlWithJsx(res, page);
}).listen(8080);
