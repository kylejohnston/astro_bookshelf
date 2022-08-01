---
setup: |
  import Layout from '../../layouts/BookLayout.astro'
  import BuyBook from '../../components/BuyBook.astro'
  import ReadingTime from '../../components/ReadingTime.astro'
title: "Rosemary's Baby"
author: Ira Levin
startDate: 2022 May 15
finishDate: 2022 May 22
coverImage: /covers/rosmarys-baby.jpeg
library: https://share.libbyapp.com/title/3043791
bookshelf: https://bookshop.org/books/rosemarys-baby/9788711834404
amazon: https://www.amazon.com/Rosemarys-Baby-Ira-Levin/dp/1605981109/
---
### Description
Rosemary Woodhouse and her struggling actor husband Guy move into the Bramford, an old New York City apartment building with an ominous reputation and mostly elderly residents. Neighbors Roman and Minnie Castavet soon come nosing around to welcome the Woodhouses to the building, and despite Rosemary's reservations about their eccentricity and the weird noises that she keeps hearing, her husband takes a special shine to them. Shortly after Guy lands a plum Broadway role, Rosemary becomes pregnant, and the Castavets start taking a special interest in her welfare. As the sickened Rosemary becomes increasingly isolated, she begins to suspect that the Castavets' circle is not what it seems…
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