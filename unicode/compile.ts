import fs from 'fs';

const PROP_LIST_URL = 'https://www.unicode.org/Public/UCD/latest/ucd/PropList.txt';

async function getUnifiedIdeographs(): Promise<Map<string, string[]>> {
  const res = await fetch(PROP_LIST_URL);
  const text = await res.text();
  const props: Map<string, string[]> = new Map();

  text.split('\n').forEach((line) => {
    if (!line || line.startsWith('#')) return;
    const [code, prop] = line.split('#')[0].split(';');
    props.set(prop.trim(), [...(props.get(prop.trim()) || []), code.trim()]);
  });
  return props;
}

const unifiedIdeographs = (async () => {
  const props = await getUnifiedIdeographs();
  console.log('props', props);
  return props.get('Unified_Ideograph') || [];
})();

unifiedIdeographs.then((codes) => {
  fs.writeFileSync('src/data/unified-ideographs.json', JSON.stringify(codes, null, 2));
});
