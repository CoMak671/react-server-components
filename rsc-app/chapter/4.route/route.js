import { readFile, readdir } from 'fs/promises';
import sanitizeFilename from 'sanitize-filename';
import { BlogLayout, BlogIndexPage, BlogPostPage } from './page.js';

const blacklist = ['favicon.ico', 'tool.js'];

export async function matchRoute(url) {
  let page;
  if (blacklist.includes(url.pathname.slice(1))) {
    return null;
  }
  if (url.pathname === '/') {
    const postFiles = await readdir('./posts');
    const postSlugs = postFiles.map((file) =>
      file.slice(0, file.lastIndexOf('.'))
    );
    const postContents = await Promise.all(
      postSlugs.map((postSlug) =>
        readFile('./posts/' + postSlug + '.txt', 'utf8')
      )
    );
    page = <BlogIndexPage postSlugs={postSlugs} postContents={postContents} />;
  } else {
    const postSlug = sanitizeFilename(url.pathname.slice(1));

    const postContent = await readFile('./posts/' + postSlug + '.txt', 'utf8');
    page = <BlogPostPage postSlug={postSlug} postContent={postContent} />;
  }
  return <BlogLayout>{page}</BlogLayout>;
}
