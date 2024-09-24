import { createServer } from 'http';
import { sendHtmlWithJsx, sendScript } from './tool.js';

// 路由切换通过jsx渲染
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === '/client.js') {
      await sendScript(res, './chapter/7.final/client.js');
      return;
    }
    const response = await fetch('http://127.0.0.1:8081' + url.pathname);
    if (!response.ok) {
      res.statusCode = response.status;
      res.end();
      return;
    }
    const clientJSXString = await response.text();
    if (url.searchParams.has('jsx')) {
      res.setHeader('Content-Type', 'application/json');
      res.end(clientJSXString);
    } else {
      sendHtmlWithJsx(res, clientJSXString);
    }
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode ?? 500;
    res.end();
  }
}).listen(8080);
