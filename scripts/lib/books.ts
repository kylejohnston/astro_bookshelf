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
 * Normalize a date value to YYYY-MM-DD string.
 * gray-matter (js-yaml) coerces bare date strings to JS Date objects during
 * parsing, so we must handle both string and Date inputs.
 */
function normalizeDate(value: string | Date | undefined): string {
  if (!value) return '';
  if (value instanceof Date) return value.toISOString().split('T')[0];
  return String(value).split('T')[0];
}

/**
 * Serialize frontmatter to a YAML block that matches the project's
 * content guidelines: title quoted, dates as YYYY-MM-DD, URLs unquoted.
 */
function serializeFrontmatter(fm: BookFrontmatter): string {
  const startDate = normalizeDate(fm.startDate as string | Date) || normalizeDate(fm.added as string | Date);
  const finishDate = normalizeDate(fm.finishDate as string | Date) || normalizeDate(fm.added as string | Date);
  return [
    `title: "${fm.title}"`,
    `author: ${fm.author}`,
    `currentlyReading: ${fm.currentlyReading ?? false}`,
    `startDate: ${startDate}`,
    `finishDate: ${finishDate}`,
    `added: ${normalizeDate(fm.added as string | Date)}`,
    `notes: ${fm.notes ?? false}`,
    `favorite: ${fm.favorite ?? false}`,
    `coverImage: ${fm.coverImage}`,
    `library: ${fm.library || 'https://share.libbyapp.com/title/'}`,
    `bookshop: ${fm.bookshop || 'https://bookshop.org/book/[13-digit ISBN]'}`,
    `amazon: ${fm.amazon || 'https://amazon.com/dp/[10-digit ISBN]'}`,
  ].join('\n') + '\n';
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

  const fileContent = `---\n${serializeFrontmatter(frontmatter)}# other:\n---\n\n### Notes & Highlights\n`;

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

  const updatedFrontmatter = { ...data, ...updates } as BookFrontmatter;
  const fileContent = `---\n${serializeFrontmatter(updatedFrontmatter)}---\n${content}`;
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
