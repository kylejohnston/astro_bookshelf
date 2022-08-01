---
setup: |
  import Layout from '../../layouts/BookLayout.astro'
  import BuyBook from '../../components/BuyBook.astro'
  import ReadingTime from '../../components/ReadingTime.astro'
title: "The Dawn of Everything: A New History of Humanity"
author: David Graeber and David Wengrow
startDate: 2022 Feb 03
finishDate: 2022 Feb 22
coverImage: /covers/dawn-of-everything.jpeg
library: https://share.libbyapp.com/title/5982188
bookshelf: https://bookshop.org/books/the-dawn-of-everything-a-new-history-of-humanity/9780374157357
amazon: https://www.amazon.com/Dawn-Everything-New-History-Humanity/dp/0374157359
---
### Description
For generations, our remote ancestors have been cast as primitive and childlike--either free and equal innocents, or thuggish and warlike. Civilization, we are told, could be achieved only by sacrificing those original freedoms or, alternatively, by taming our baser instincts. David Graeber and David Wengrow show how such theories first emerged in the eighteenth century as a conservative reaction to powerful critiques of European society posed by Indigenous observers and intellectuals. Revisiting this encounter has startling implications for how we make sense of human history today, including the origins of farming, property, cities, democracy, slavery, and civilization itself.

Drawing on pathbreaking research in archaeology and anthropology, the authors show how history becomes a far more interesting place once we learn to throw off our conceptual shackles and perceive what's really there. If humans did not spend 95 percent of their evolutionary past in tiny bands of hunter-gatherers, what were they doing all that time? If agriculture, and cities, did not mean a plunge into hierarchy and domination, then what kinds of social and economic organization did they lead to? The answers are often unexpected, and suggest that the course of human history may be less set in stone, and more full of playful, hopeful possibilities, than we tend to assume.

The Dawn of Everything fundamentally transforms our understanding of the human past and offers a path toward imagining new forms of freedom, new ways of organizing society. This is a monumental book of formidable intellectual range, animated by curiosity, moral vision, and a faith in the power of direct action.
<Fragment slot="time">
  <ReadingTime
    startDate  = {frontmatter.startDate}
    finishDate = {frontmatter.finishDate}
  />
</Fragment>
<Fragment slot="notes">
**This is a named slot.** Tempor sunt culpa ut aute aute non sit nulla non proident esse quis irure do deserunt. Mollit aliquip est excepteur commodo voluptate labore proident officia et consectetur sunt tempor fugiat eiusmod. Ipsum et duis deserunt anim. Id adipisicing non labore anim consequat. In amet labore anim cupidatat. Nostrud voluptate ut commodo nostrud velit fugiat et consequat exercitation eu. Amet sunt duis magna excepteur labore voluptate minim eiusmod laborum labore ea labore. Sunt veniam enim incididunt commodo do eu excepteur adipisicing cillum labore. Sit anim officia pariatur do ea non exercitation magna cillum qui fugiat do ut ut et. Adipisicing laboris do velit et aliqua fugiat fugiat aliqua cillum tempor officia veniam.
</Fragment>
<Fragment slot="buy">
  <BuyBook
    library   = {frontmatter.library}
    bookshelf = {frontmatter.bookshelf}
    amazon    = {frontmatter.amazon}
  />
</Fragment>
