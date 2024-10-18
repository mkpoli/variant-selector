import unifiedIdeographs from '$data/unified-ideographs.json';

export function isCJKUnifiedIdeograph(codePoint: number): boolean {
  return unifiedIdeographs.some((range: string) => {
    const [start, end] = range.includes('..')
      ? range.split('..').map((x: string) => Number.parseInt(x, 16))
      : [Number.parseInt(range, 16), Number.parseInt(range, 16)];
    return codePoint >= start && codePoint <= end;
  });
}
