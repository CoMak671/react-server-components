import { readFile, readdir } from 'fs/promises';

async function Post({ slug }) {
  let content;
  try {
    content = await readFile('./posts/' + slug + '.txt', 'utf8');
  } catch (err) {
    console.error(err);
  }
  return (
    <section>
      <h2>
        <a href={'/' + slug}>{slug}</a>
      </h2>
      <article>{content}</article>
    </section>
  );
}

export async function AsyncBlogIndexPage() {
  const postFiles = await readdir('./posts');
  const postSlugs = postFiles.map((file) =>
    file.slice(0, file.lastIndexOf('.'))
  );
  return (
    <section>
      <h1>Welcome to my blog</h1>
      <div>
        {postSlugs.map((slug) => (
          <Post key={slug} slug={slug} />
        ))}
      </div>
    </section>
  );
}

export function AsyncBlogPostPage({ postSlug }) {
  return <Post slug={postSlug} />;
}
