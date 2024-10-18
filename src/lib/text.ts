const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });

/**
 * Split text into grapheme clusters.
 * @param text
 * @returns
 */
export function segment(text: string): string[] {
  return [...segmenter.segment(text)].map(({ segment }) => segment);
}

export function codePoints(text: string): string[] {
  return [...text]
    .map((char) => char.codePointAt(0)?.toString(16).padStart(4, '0').toUpperCase())
    .filter(Boolean) as string[];
}
