import mapFiles from './mapFiles.js';

const parseJSON = (input) => {
  const content = JSON.parse(input);
  const cleanedBlocks = [];

  let i = 0;
  while (i < content.length) {
    const item = content[i];

    if (item.type === '_text') {
      const nextIdx = content.slice(i).findIndex((j) => j.type !== '_text') + i;
      cleanedBlocks.push({
        type: 'char',
        content: content
          .slice(i, nextIdx)
          .map(({ content }) => content)
          .join(' ')
          .trim(),
      });
      i = nextIdx;
      continue;
    }
    i++;
    cleanedBlocks.push(item);
  }

  return JSON.stringify(cleanedBlocks);
};

(async () => {
  await mapFiles('intermediate', 'json', 'final', 'json', parseJSON);
})();
