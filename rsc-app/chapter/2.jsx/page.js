import { author, postContent } from '../../data.js';

export const page = (
  <html>
    <head>
      <title>My blog</title>
    </head>
    <body>
      <nav>
        <a href="/">Home</a>
        <hr />
      </nav>
      <article>{postContent}</article>
      <footer>
        <hr />
        <p>
          <i>
            (c) {author} {new Date().getFullYear()}
          </i>
        </p>
      </footer>
    </body>
  </html>
);
