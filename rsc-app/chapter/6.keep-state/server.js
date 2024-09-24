import { createServer } from 'http';
import { sendHtmlWithJsx, sendJSX, sendScript } from './tool.js';
import { Router } from './route.js';

// 路由切换通过jsx渲染
createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/client.js') {
    await sendScript(res, './chapter/6.keep-state/client.js');
  } else if (url.searchParams.has('jsx')) {
    url.searchParams.delete('jsx'); // Keep the url passed to the <Router> clean
    await sendJSX(res, <Router url={url} />);
  } else {
    await sendHtmlWithJsx(res, <Router url={url} />);
  }
}).listen(8080);
