---
setup: |
  import Layout from '../../layouts/BookLayout.astro'
  import BuyBook from '../../components/BuyBook.astro'
  import ReadingTime from '../../components/ReadingTime.astro'
title: Zone One
author: Colson Whitehead
startDate: 2022 Mar 26
finishDate: 2022 Apr 10
coverImage: /covers/zone-one.jpeg
library: https://share.libbyapp.com/title/567409
bookshelf: https://bookshop.org/books/zone-one/9780307455178
amazon: https://www.amazon.com/Zone-One-Colson-Whitehead/dp/0307455173
---
### Description
After the worst of the plague is over, armed forces stationed in Chinatown's Fort Wonton have successfully reclaimed the island south of Canal Street--aka Zone One. Mark Spitz is a member of one of the three-person civilian sweeper units tasked with clearing lower Manhattan of the remaining feral zombies. Zone One unfolds over three surreal days in which Spitz is occupied with the mundane mission of straggler removal, the rigors of Post-Apocalyptic Stress Disorder (PASD), and the impossible task of coming to terms with a fallen world. And then things start to go terribly wrong...

At once a chilling horror story and a literary novel by a contemporary master, Zone One is a dazzling portrait of modern civilization in all its wretched, shambling glory.
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