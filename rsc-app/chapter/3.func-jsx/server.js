import { createServer } from 'http';
import { sendHtmlWithJsx } from './tool.js';
import { App } from './page.js';

// 渲染函数组件
createServer(async (req, res) => {
  sendHtmlWithJsx(res, <App />);
}).listen(8080);
