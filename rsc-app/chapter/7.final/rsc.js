import { createServer } from 'http';
import { sendJSX } from './tool.js';
import { Router } from './route.js';

// 路由切换通过jsx渲染
createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  await sendJSX(res, <Router url={url} />);
}).listen(8081);
