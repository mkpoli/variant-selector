const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });

/**
 * Split text into grapheme clusters.
 */
export function segment(text: string): string[] {
  return [...segmenter.segment(text)].map(({ segment }) => segment);
}

/**
 * Split text into code points.
 */
export function codePoints(text: string): number[] {
  return [...text].map((char) => char.codePointAt(0)).filter(Boolean) as number[];
}

/**
 * Format code point as a U+XXXX string.
 */
export function formatCodePoint(codePoint: number): string {
  return `U+${codePoint.toString(16).padStart(4, '0').toUpperCase()}`;
}
