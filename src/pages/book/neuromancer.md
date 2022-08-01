---
setup: |
  import Layout from '../../layouts/BookLayout.astro'
  import BuyBook from '../../components/BuyBook.astro'
  import ReadingTime from '../../components/ReadingTime.astro'
title: "Neuromancer"
author: William Gibson
startDate: 2022 May 22
finishDate: 2022 May 29
coverImage: /covers/neuromancer.jpeg
library: https://share.libbyapp.com/title/612607
bookshelf: https://bookshop.org/books/neuromancer/9780441007462
amazon: https://www.amazon.com/Neuromancer-William-Gibson/dp/0441007465/
---
### Description
Case was the sharpest data-thief in the matrix--until he crossed the wrong people and they crippled his nervous system, banishing him from cyberspace. Now a mysterious new employer has recruited him for a last-chance run at an unthinkably powerful artificial intelligence. With a dead man riding shotgun and Molly, a mirror-eyed street-samurai, to watch his back, Case is ready for the adventure that upped the ante on an entire genre of fiction.

Neuromancer was the first fully-realized glimpse of humankind's digital future--a shocking vision that has challenged our assumptions about technology and ourselves, reinvented the way we speak and think, and forever altered the landscape of our imaginations.
<Fragment slot="time">
  <ReadingTime
    startDate  = {frontmatter.startDate}
    finishDate = {frontmatter.finishDate}
  />
</Fragment>
<Fragment slot="notes"></Fragment>
<Fragment slot="buy">
  <BuyBook
    library   = {frontmatter.library}
    bookshelf = {frontmatter.bookshelf}
    amazon    = {frontmatter.amazon}
  />
</Fragment>