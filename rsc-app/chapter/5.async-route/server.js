import { createServer } from 'http';
import { sendHtmlWithJsx } from './tool.js';
import { Router } from './route.js';

// 渲染路由(异步组件)
createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  await sendHtmlWithJsx(res, <Router url={url} />);
}).listen(8080);
