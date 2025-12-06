/**
 * Extracts the first H1 title from a markdown string.
 * Returns null if no H1 title is found.
 */
export function extractH1(markdown: string): string | null {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1] : null;
}
