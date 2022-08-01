---
setup: |
  import Layout from '../../layouts/BookLayout.astro'
  import BuyBook from '../../components/BuyBook.astro'
  import ReadingTime from '../../components/ReadingTime.astro'
title: "Jurassic Park"
author: Michael Chrichton
startDate: 2022 May 29
finishDate: 2022 Jun 05
coverImage: /covers/jurassic-park.jpg
library: https://share.libbyapp.com/title/871092
bookshelf: https://bookshop.org/books/jurassic-park-ae2f2641-4b4a-4d33-85c7-6a2a16641248/9780345538987
amazon: https://www.amazon.com/Jurassic-Park-Michael-Crichton-audiobook/dp/B00U7TZZRM/
---
### Description
An astonishing technique for recovering and cloning dinosaur DNA has been discovered. Now humankind's most thrilling fantasies have come true. Creatures extinct for eons roam Jurassic Park with their awesome presence and profound mystery, and all the world can visit them--for a price.

Until something goes wrong…

In Jurassic Park, Michael Crichton taps all his mesmerizing talent and scientific brilliance to create his most electrifying technothriller.
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