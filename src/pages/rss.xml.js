// import rss from '@astrojs/rss';

// const postImportResult = import.meta.glob('../posts/**/*.md', { eager: true });
// const posts = Object.values(postImportResult);

// export const get = () => rss({
//   title: 'Buzz’s Blog',
//   description: 'A humble Astronaut’s guide to the stars',
//   site: import.meta.env.SITE,
//   items: posts.map((post) => ({
//     link: post.url,
//     title: post.frontmatter.title,
//     pubDate: post.frontmatter.pubDate,
//   }))
// });



import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('../**/*.md', { eager: true });
const posts = Object.values(postImportResult);

async function getPosts() {
  const unresolved = posts.map(async (post) => {
    const slug = post.url || post.file.split("/")[post.file.split("/").length - 2];

    return {
      link: slug,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: post.frontmatter.added,
      customData: `<content:encoded><![CDATA[${await post.compiledContent()}]]></content:encoded>`,
  };
});

return await Promise.all(unresolved);

}

export const get = async () => rss({
  title: 'Kyle Johnston’s Bookshelf',
  site: 'https://bookshelf.kylewjohnston.com',
  description: 'A running list of the books I’e read',
  // SITE will use "site" from your project's astro.config.
  // list of `<item>`s in output xml
  // simple example: generate items for every md file in /src/pages
  // see "Generating items" section for required frontmatter and advanced use cases
  items: await getPosts(),
  xmlns: {
    content: "http://purl.org/rss/1.0/modules/content/",
  },
  // (optional) inject custom xml
  customData: `<language>en-us</language>`,
});
