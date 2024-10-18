const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });

/**
 * Split text into grapheme clusters.
 * @param text
 * @returns
 */
export function segment(text: string): string[] {
  return [...segmenter.segment(text)].map(({ segment }) => segment);
}
