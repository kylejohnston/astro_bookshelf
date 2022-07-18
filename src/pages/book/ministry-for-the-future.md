---
setup: |
  import Layout from '../../layouts/BookLayout.astro'
  import BuyBook from '../../components/BuyBook.astro'
  import ReadingTime from '../../components/ReadingTime.astro'
title: The Ministry for the Future
author: Kim Stanley Robinson
startDate: 2021 Dec 24
finishDate: 2022 Jan 05
coverImage: /images/test.jpg
library: https://www.google.com
bookshelf: https://www.bookshelf.org
amazon: https://www.amazon.com
value: 22
---

Do exercitation nisi nulla. Occaecat aliqua consectetur excepteur in irure ut sit laborum. Proident ad incididunt excepteur tempor ut laborum tempor. Do elit dolore commodo anim veniam sint. Ipsum duis ut elit ea amet qui cillum aliqua non occaecat quis et. Enim eu officia in laboris ea eiusmod sunt ullamco. Anim excepteur in dolore laboris ea id do consectetur est consequat eu sint velit. Cillum ad dolore do ea ea culpa non amet officia dolor officia labore. Ut labore laborum irure reprehenderit consequat labore. Adipisicing occaecat aliqua minim anim laborum tempor Lorem cupidatat incididunt minim.

Voluptate nulla veniam cupidatat labore ad culpa voluptate sint labore consequat duis proident. Tempor sunt ad consectetur ipsum proident irure. Sunt quis ad amet laboris magna minim in eiusmod. Irure excepteur nulla in id magna consequat nisi dolor voluptate in eiusmod incididunt. Aliquip adipisicing occaecat commodo culpa tempor aute ea duis id consequat eu sint duis. Nisi aliquip pariatur labore cupidatat eiusmod ex incididunt ad cupidatat pariatur ea ex. Laborum deserunt nulla voluptate duis nisi voluptate aute consectetur. Tempor amet dolore labore duis et dolor consectetur nulla in culpa occaecat ullamco fugiat qui. Consectetur minim sit exercitation dolor pariatur. Excepteur pariatur culpa eiusmod esse dolore ex ex Lorem nulla cupidatat tempor.
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
    amazon    = {frontmatter.amazon}
    library   = {frontmatter.library}
    bookshelf = {frontmatter.bookshelf}
  />
</Fragment>
