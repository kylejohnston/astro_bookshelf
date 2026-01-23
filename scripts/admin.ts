#!/usr/bin/env tsx
/**
 * CLI Admin Tool for managing the book collection
 *
 * Usage:
 *   npm run admin           # Interactive menu
 *   npm run admin create    # Add a new book
 *   npm run admin finish    # Mark a book as finished
 *   npm run admin edit      # Open a book in editor
 */

import * as p from '@clack/prompts';
import { execSync } from 'node:child_process';
import {
  getAllBooks,
  getCurrentlyReading,
  createBook,
  finishBook,
  slugExists,
  type BookFrontmatter,
} from './lib/books.js';
import { generateSlug, today } from './lib/utils.js';

// Editor command
const EDITOR = 'code';

type Command = 'create' | 'finish' | 'edit' | 'list';

async function main() {
  p.intro('📚 Book Collection Admin');

  // Get command from args or prompt
  let command = process.argv[2] as Command | undefined;

  if (!command) {
    const selected = await p.select({
      message: 'What would you like to do?',
      options: [
        { value: 'create', label: 'Add a new book', hint: 'start reading' },
        { value: 'finish', label: 'Finish a book', hint: 'mark as complete' },
        { value: 'edit', label: 'Edit a book', hint: 'open in editor' },
        { value: 'list', label: 'List books', hint: 'view collection stats' },
      ],
    });

    if (p.isCancel(selected)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }

    command = selected as Command;
  }

  switch (command) {
    case 'create':
      await handleCreate();
      break;
    case 'finish':
      await handleFinish();
      break;
    case 'edit':
      await handleEdit();
      break;
    case 'list':
      await handleList();
      break;
    default:
      p.log.error(`Unknown command: ${command}`);
      process.exit(1);
  }

  p.outro('Done!');
}

async function handleCreate() {
  const title = await p.text({
    message: 'Book title:',
    placeholder: 'The Great Gatsby',
    validate: (value) => {
      if (!value.trim()) return 'Title is required';
    },
  });

  if (p.isCancel(title)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Generate and validate slug
  let slug = generateSlug(title);
  if (slugExists(slug)) {
    const newSlug = await p.text({
      message: `Slug "${slug}" already exists. Enter a different slug:`,
      placeholder: slug + '-2',
      validate: (value) => {
        if (!value.trim()) return 'Slug is required';
        if (slugExists(value)) return 'This slug also exists';
      },
    });

    if (p.isCancel(newSlug)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }
    slug = newSlug;
  }

  const author = await p.text({
    message: 'Author:',
    placeholder: 'F. Scott Fitzgerald',
    validate: (value) => {
      if (!value.trim()) return 'Author is required';
    },
  });

  if (p.isCancel(author)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const coverImage = await p.text({
    message: 'Cover image filename:',
    placeholder: `${slug}.webp`,
    defaultValue: `${slug}.webp`,
  });

  if (p.isCancel(coverImage)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  // Optional URLs
  const addLinks = await p.confirm({
    message: 'Add purchase/library links?',
    initialValue: false,
  });

  if (p.isCancel(addLinks)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  let library: string | undefined;
  let bookshop: string | undefined;
  let amazon: string | undefined;

  if (addLinks) {
    const libraryInput = await p.text({
      message: 'Library URL (Libby/OverDrive):',
      placeholder: 'https://share.libbyapp.com/title/...',
    });
    if (!p.isCancel(libraryInput) && libraryInput) {
      library = libraryInput;
    }

    const bookshopInput = await p.text({
      message: 'Bookshop.org URL:',
      placeholder: 'https://bookshop.org/book/...',
    });
    if (!p.isCancel(bookshopInput) && bookshopInput) {
      bookshop = bookshopInput;
    }

    const amazonInput = await p.text({
      message: 'Amazon URL:',
      placeholder: 'https://amazon.com/dp/...',
    });
    if (!p.isCancel(amazonInput) && amazonInput) {
      amazon = amazonInput;
    }
  }

  // Create the book
  const frontmatter: BookFrontmatter = {
    title,
    author,
    coverImage: coverImage || `${slug}.webp`,
    currentlyReading: true,
    startDate: today(),
    added: today(),
    notes: false,
    library,
    bookshop,
    amazon,
  };

  const filepath = createBook(slug, frontmatter);

  p.log.success(`Created: ${filepath}`);

  // Offer to open in editor
  const openEditor = await p.confirm({
    message: `Open in ${EDITOR}?`,
    initialValue: true,
  });

  if (!p.isCancel(openEditor) && openEditor) {
    execSync(`${EDITOR} "${filepath}"`);
  }
}

async function handleFinish() {
  const currentlyReading = getCurrentlyReading();

  if (currentlyReading.length === 0) {
    p.log.warn('No books currently being read.');
    return;
  }

  const selected = await p.select({
    message: 'Which book did you finish?',
    options: currentlyReading.map((book) => ({
      value: book.slug,
      label: book.frontmatter.title,
      hint: book.frontmatter.author,
    })),
  });

  if (p.isCancel(selected)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const finishDate = await p.text({
    message: 'Finish date:',
    placeholder: today(),
    defaultValue: today(),
    validate: (value) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return 'Use YYYY-MM-DD format';
      }
    },
  });

  if (p.isCancel(finishDate)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const filepath = finishBook(selected, finishDate);
  p.log.success(`Marked as finished: ${filepath}`);
}

async function handleEdit() {
  const allBooks = getAllBooks().sort((a, b) =>
    a.frontmatter.title.localeCompare(b.frontmatter.title)
  );

  if (allBooks.length === 0) {
    p.log.warn('No books found.');
    return;
  }

  // Search/filter functionality
  const searchTerm = await p.text({
    message: 'Search by title (or press Enter to browse all):',
    placeholder: 'Leave empty to see all',
  });

  if (p.isCancel(searchTerm)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  let filteredBooks = allBooks;
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredBooks = allBooks.filter(
      (book) =>
        book.frontmatter.title.toLowerCase().includes(term) ||
        book.frontmatter.author.toLowerCase().includes(term)
    );
  }

  if (filteredBooks.length === 0) {
    p.log.warn('No books match your search.');
    return;
  }

  const selected = await p.select({
    message: 'Select a book to edit:',
    options: filteredBooks.slice(0, 20).map((book) => ({
      value: book.filepath,
      label: book.frontmatter.title,
      hint: book.frontmatter.author,
    })),
  });

  if (p.isCancel(selected)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  execSync(`${EDITOR} "${selected}"`);
  p.log.success('Opened in editor.');
}

async function handleList() {
  const allBooks = getAllBooks();
  const currentlyReading = allBooks.filter((b) => b.frontmatter.currentlyReading);
  const favorites = allBooks.filter((b) => b.frontmatter.favorite);
  const withNotes = allBooks.filter((b) => b.frontmatter.notes);

  p.log.info(`📚 Total books: ${allBooks.length}`);
  p.log.info(`📖 Currently reading: ${currentlyReading.length}`);
  p.log.info(`⭐ Favorites: ${favorites.length}`);
  p.log.info(`📝 With notes: ${withNotes.length}`);

  if (currentlyReading.length > 0) {
    p.log.step('Currently reading:');
    currentlyReading.forEach((book) => {
      console.log(`   • ${book.frontmatter.title} by ${book.frontmatter.author}`);
    });
  }
}

main().catch((err) => {
  p.log.error(err.message);
  process.exit(1);
});
