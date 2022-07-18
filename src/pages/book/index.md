---
setup: |
  import Layout from '../../layouts/BookLayout.astro'
  import BuyBook from '../../components/BuyBook.astro'
  import ReadingTime from '../../components/ReadingTime.astro'
title: Ten Arguments for Deleting Your Social Media Accounts Right Now
# startDate: 2020 Jan 01
finishDate: 2020 Jan 01
author: Jaron Lanier
value: 128
description: Just a Hello World Post!
library: https://www.flow14.com
bookshelf: https://www.bookshelf.org
amazon: https://www.amazon.com
coverImage: /images/test.jpg
---

This is just a test Veniam nostrud ad consequat ut anim excepteur tempor aute. Elit consectetur ullamco officia in eu culpa dolor consequat. Lorem deserunt nisi aliquip qui nostrud consectetur ut minim. Incididunt velit tempor qui velit tempor velit exercitation ad. Deserunt voluptate ullamco occaecat et mollit. Nisi mollit nulla ut sint officia esse pariatur veniam minim non pariatur cillum aute exercitation. Id sint laborum exercitation do laboris eiusmod fugiat incididunt deserunt aute ut amet. Aliquip ex eiusmod velit irure cillum in adipisicing est anim proident. Officia minim dolor anim elit voluptate irure aliquip cupidatat quis adipisicing elit eiusmod labore. Pariatur anim anim aute.
<Fragment slot="time">
  <ReadingTime
    startDate  = {frontmatter.startDate}
    finishDate = {frontmatter.finishDate}
  />
</Fragment>
<Fragment slot="notes">
  **This is a fragment.** Tempor sunt culpa ut aute aute non sit nulla non proident esse quis irure do deserunt. Mollit aliquip est excepteur commodo voluptate labore proident officia et consectetur sunt tempor fugiat eiusmod. Ipsum et duis deserunt anim. Id adipisicing non labore anim consequat. In amet labore anim cupidatat. Nostrud voluptate ut commodo nostrud velit fugiat et consequat exercitation eu. Amet sunt duis magna excepteur labore voluptate minim eiusmod laborum labore ea labore. Sunt veniam enim incididunt commodo do eu excepteur adipisicing cillum labore. Sit anim officia pariatur do ea non exercitation magna cillum qui fugiat do ut ut et. Adipisicing laboris do velit et aliqua fugiat fugiat aliqua cillum tempor officia veniam.
</Fragment>
<Fragment slot="buy">
  <BuyBook
    amazon    = {frontmatter.amazon}
    library   = {frontmatter.library}
    bookshelf = {frontmatter.bookshelf}
  />
</Fragment>
