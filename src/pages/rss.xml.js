import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import siteMeta from '../site-meta.config';
const parser = new MarkdownIt();

export async function GET(context) {
  const book = (await getCollection("book")).sort((a, b) => {
    const dateA = new Date(a.data.reread ?? a.data.added);
    const dateB = new Date(b.data.reread ?? b.data.added);
    return dateB.valueOf() - dateA.valueOf();
  });
  return rss({
    title: siteMeta.title,
    description: siteMeta.description,
    site: context.site,
    items: book.map((post) => ({
      link:    `/book/${post.id.replace(/\.md$/, "")}/`,
      title:   post.data.title,
      pubDate: post.data.reread ?? post.data.added,
      content: sanitizeHtml(parser.render(post.body)),
    })),
  });
}
