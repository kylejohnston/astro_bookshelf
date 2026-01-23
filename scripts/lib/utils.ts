/**
 * Utility functions for the CLI admin tool
 */

/**
 * Generate a URL-friendly slug from a book title
 * - Converts to lowercase
 * - Replaces spaces and special characters with hyphens
 * - Removes consecutive hyphens
 * - Trims hyphens from start/end
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')          // Replace spaces with hyphens
    .replace(/-+/g, '-')           // Remove consecutive hyphens
    .replace(/^-|-$/g, '');        // Trim hyphens from ends
}

/**
 * Format a date for frontmatter
 * Uses ISO 8601 format: YYYY-MM-DD
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Get today's date formatted for frontmatter
 */
export function today(): string {
  return formatDate(new Date());
}
