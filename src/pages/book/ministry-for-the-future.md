---
setup: |
  import Layout from '../../layouts/BookLayout.astro'
  import BuyBook from '../../components/BuyBook.astro'
  import ReadingTime from '../../components/ReadingTime.astro'
title: The Ministry for the Future
author: Kim Stanley Robinson
startDate: 2021 Dec 24
finishDate: 2022 Jan 05
coverImage: /covers/the-ministry-for-the-future.jpg
library: https://share.libbyapp.com/title/5255196
bookshelf: https://bookshop.org/books/the-ministry-for-the-future/9780316300131
amazon: https://www.amazon.com/Ministry-Future-Kim-Stanley-Robinson/dp/0316300136
---
### Description
The Ministry for the Future is a masterpiece of the imagination, using fictional eyewitness accounts to tell the story of how climate change will affect us all. Its setting is not a desolate, postapocalyptic world, but a future that is almost upon us. Chosen by Barack Obama as one of his favorite books of the year, this extraordinary novel from visionary science fiction writer Kim Stanley Robinson will change the way you think about the climate crisis.

<Fragment slot="time">
  <ReadingTime
    startDate  = {frontmatter.startDate}
    finishDate = {frontmatter.finishDate}
  />
</Fragment>
<!-- <Fragment slot="notes">### Notes & Highlights</Fragment> -->
<Fragment slot="buy">
  <BuyBook
    library   = {frontmatter.library}
    bookshelf = {frontmatter.bookshelf}
    amazon    = {frontmatter.amazon}
  />
</Fragment>
