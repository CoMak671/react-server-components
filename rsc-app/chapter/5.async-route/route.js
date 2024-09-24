import sanitizeFilename from 'sanitize-filename';
import { BlogLayout } from '../4.route/page.js';
import { AsyncBlogIndexPage, AsyncBlogPostPage } from './page.js';

const blacklist = ['favicon.ico', 'tool.js'];

export function Router({ url }) {
  let page;
  if (blacklist.includes(url.pathname.slice(1))) {
    return null;
  }
  if (url.pathname === '/') {
    page = <AsyncBlogIndexPage />;
  } else {
    const postSlug = sanitizeFilename(url.pathname.slice(1));
    page = <AsyncBlogPostPage postSlug={postSlug} />;
  }
  return <BlogLayout>{page}</BlogLayout>;
}
