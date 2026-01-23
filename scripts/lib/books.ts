/**
 * Book content collection CRUD operations
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'src/content/book');

export interface BookFrontmatter {
  title: string;
  author: string;
  coverImage: string;
  added: string;
  startDate?: string;
  finishDate?: string;
  currentlyReading?: boolean;
  favorite?: boolean;
  notes?: boolean;
  library?: string;
  bookshop?: string;
  amazon?: string;
}

export interface Book {
  slug: string;
  filepath: string;
  frontmatter: BookFrontmatter;
  content: string;
}

/**
 * Read all books from the content directory
 */
export function getAllBooks(): Book[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

  return files.map(filename => {
    const filepath = path.join(CONTENT_DIR, filename);
    const raw = fs.readFileSync(filepath, 'utf-8');
    const { data, content } = matter(raw);

    return {
      slug: filename.replace('.md', ''),
      filepath,
      frontmatter: data as BookFrontmatter,
      content,
    };
  });
}

/**
 * Get books currently being read
 */
export function getCurrentlyReading(): Book[] {
  return getAllBooks().filter(book => book.frontmatter.currentlyReading === true);
}

/**
 * Get finished books (sorted by finishDate, newest first)
 */
export function getFinishedBooks(): Book[] {
  return getAllBooks()
    .filter(book => book.frontmatter.finishDate)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.finishDate!);
      const dateB = new Date(b.frontmatter.finishDate!);
      return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Get favorite books
 */
export function getFavorites(): Book[] {
  return getAllBooks().filter(book => book.frontmatter.favorite === true);
}

/**
 * Get unique authors from all books
 */
export function getExistingAuthors(): string[] {
  const authors = getAllBooks().map(book => book.frontmatter.author);
  return [...new Set(authors)].sort();
}

/**
 * Check if a slug already exists
 */
export function slugExists(slug: string): boolean {
  const filepath = path.join(CONTENT_DIR, `${slug}.md`);
  return fs.existsSync(filepath);
}

/**
 * Create a new book entry
 * Uses string template to match .template file structure exactly
 */
export function createBook(
  slug: string,
  frontmatter: BookFrontmatter,
): string {
  const filepath = path.join(CONTENT_DIR, `${slug}.md`);

  // Build file content matching .template structure
  const fileContent = `---
title: "${frontmatter.title}"
author: ${frontmatter.author}
currentlyReading: ${frontmatter.currentlyReading ?? true}
startDate: ${frontmatter.startDate || frontmatter.added}
finishDate: ${frontmatter.finishDate || frontmatter.added}
added: ${frontmatter.added}
notes: ${frontmatter.notes ?? false}
favorite: ${frontmatter.favorite ?? false}
coverImage: ${frontmatter.coverImage}
library: ${frontmatter.library || 'https://share.libbyapp.com/title/'}
bookshop: ${frontmatter.bookshop || 'https://bookshop.org/book/[13-digit ISBN]'}
amazon: ${frontmatter.amazon || 'https://amazon.com/dp/[10-digit ISBN]'}
# other:
---

### Notes & Highlights
`;

  fs.writeFileSync(filepath, fileContent);

  return filepath;
}

/**
 * Update an existing book entry
 */
export function updateBook(
  slug: string,
  updates: Partial<BookFrontmatter>
): string {
  const filepath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filepath, 'utf-8');
  const { data, content } = matter(raw);

  const updatedFrontmatter = { ...data, ...updates };
  const fileContent = matter.stringify(content, updatedFrontmatter);
  fs.writeFileSync(filepath, fileContent);

  return filepath;
}

/**
 * Mark a book as finished
 */
export function finishBook(slug: string, finishDate: string): string {
  return updateBook(slug, {
    currentlyReading: false,
    finishDate,
  });
}
