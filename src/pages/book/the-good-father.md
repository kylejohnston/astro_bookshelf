---
setup: |
  import Layout from '../../layouts/BookLayout.astro'
  import BuyBook from '../../components/BuyBook.astro'
  import ReadingTime from '../../components/ReadingTime.astro'
title: "The Good Father"
author: Noah Hawley
startDate: 2022 Jun 26
finishDate: 2022 Jul 12
coverImage: /covers/the-good-father.jpeg
library: https://share.libbyapp.com/title/647378
bookshelf: https://bookshop.org/books/the-good-father-f27526a7-a941-48ce-a8a0-5d9e14946760/9780307947918
amazon: https://www.amazon.com/Good-Father-Noah-Hawley/dp/0307947912/
---
### Description
As a rheumatologist, Dr. Paul Allen's specialty is diagnosing patients other doctors have given up on. His son, Daniel Allen has always been a good kid but, as a child of divorce, he is also something of a drifter. Which may be why, at the age of nineteen, he quietly drops out of Vassar and begins an aimless journey across the United States, shedding his former skin and eventually even changing his name. One night, Paul is home with his family when a televised news report announces that the Democratic candidate for president has been shot, and Daniel is the lead suspect. Convinced of his son's innocence Paul begins to trace his sons steps to see where Daniel, or perhaps Paul, went wrong, beginning a harrowing journey--about the responsibilities of being a parent and the capacity for unconditional love in the face of an unthinkable situation--that keeps one guessing until the very end.
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
