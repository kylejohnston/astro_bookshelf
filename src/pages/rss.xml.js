// import rss from '@astrojs/rss';

// const postImportResult = import.meta.glob("./**/*.md", { eager: true });
// const posts = Object.values(postImportResult)
//   posts.sort((a, b) => {
//     const aDate = new Date(b.frontmatter.added);
//     const bDate = new Date(a.frontmatter.added);
//   })
//   // .slice(0, 5);

// async function getPosts() {
//   const unresolved = posts.map(async (post) => {
//     const slug = post.frontmatter.url || post.file.split("/")[post.file.split("/").length - 1];

//     return {
//       link: slug,
//       title: post.frontmatter.title,
//       description: post.frontmatter.description,
//       added: post.frontmatter.added,
//       customData: `<content:encoded><![CDATA[${await post.compiledContent()}]]></content:encoded>`,
//   };
// });

// return await Promise.all(unresolved);

// }

// export const get = async () => rss({
//   title: 'Kyle Johnston\s Bookshelf',
//   site: 'https://bookshelf.kylewjohnston.com',
//   description: 'A running list of the books I\'ve read',
//   // SITE will use "site" from your project's astro.config.
//   // list of `<item>`s in output xml
//   // simple example: generate items for every md file in /src/pages
//   // see "Generating items" section for required frontmatter and advanced use cases
//   items: await getPosts(),
//   xmlns: {
//     content: "http://purl.org/rss/1.0/modules/content/",
//   },
//   // (optional) inject custom xml
//   customData: `<language>en-us</language>`,
// });


import rss from '@astrojs/rss';

const postImportResult = import.meta.glob('../**/*.md', { eager: true });
const posts = Object.values(postImportResult);

export const get = () => rss({
  title: 'Kyle Johnston’s Bookshelf',
  description: 'A running list of the books I’ve read',
  site: import.meta.env.SITE,
  items: posts.map((post) => ({
    link: post.url,
    title: post.frontmatter.title,
    pubDate: post.frontmatter.added,
  }))
});
