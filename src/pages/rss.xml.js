import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

const postImportResult = import.meta.glob('../**/*.md', { eager: true });
const posts = Object.values(postImportResult);

export const get = async () => rss({
  title: 'Kyle Johnston’s Bookshelf',
  description: 'A running list of the books I’ve read',
  site: import.meta.env.SITE,
  items: posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.added,
    image: post.frontmatter.coverImage,
    content: sanitizeHtml(post.compiledContent()),
  })),
  customData: `<language>en-us</language>`,
  xmlns: {
    content: "http://purl.org/rss/1.0/modules/content/",
  },
});
