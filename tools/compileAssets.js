import fs from 'fs/promises';
import path from 'path';
import makeDir from 'make-dir';
import snarkdown from 'snarkdown';
import kleur from 'kleur';

const enhancedSnarkdown = (markdown) =>
  markdown
    .split(/(?:\r?\n){2,}/)
    .map((l) =>
      [' ', '\t', '#', '-', '*', '>'].some((char) => l.startsWith(char))
        ? snarkdown(l)
        : `<p>${snarkdown(l)}</p>`,
    )
    .join('\n');

const outputJson = (o, movement, item) => {
  const filepath = path.join(process.cwd(), 'public/assets', `movement.${movement}.${item}.json`);
  return fs
    .writeFile(filepath, JSON.stringify(o))
    .then(() => console.log(`${kleur.gray('Created JSON asset at')} ${filepath}`));
};

const trimStartVerse = (ch, info) => {
  if (info.verse === 1) return ch;
  const startIdx = ch.findIndex((c) => c.type === 'verse' && c.reference.verse === info.verse);
  const trimmed = ch.slice(startIdx);
  const lastStyleType = ch
    .slice(0, startIdx)
    .reverse()
    .find((ch) => ch.type.endsWith('_start'));
  return [lastStyleType, ...trimmed];
};
const trimEndVerse = (ch, info) => {
  const verseIdx = ch.findIndex((c) => c.type === 'verse' && c.reference.verse === info.verse);
  const nextVerseIdx = ch.slice(verseIdx + 1).findIndex((c) => c.type === 'verse');

  // There is no next verse so the verse must be the last verse available
  if (!nextVerseIdx) return ch;

  const nextStyleType = ch.slice(verseIdx).find((c) => c.type.endsWith('_end'));

  return [...ch.slice(0, verseIdx + nextVerseIdx), nextStyleType];
};
const trim = (ch, start, end) => trimEndVerse(trimStartVerse(ch, start), end);

const getStringFromFile = async (p) => (await fs.readFile(path.join(process.cwd(), p))).toString();

const compileAssets = async () => {
  await makeDir(path.join(process.cwd(), 'public/assets'));

  const assets = JSON.parse(await getStringFromFile('asset-plan.json'));

  await Promise.all(
    assets.map(async (asset) => {
      if (asset.type === 'video') {
        asset.src = asset.src.replace('watch?v=', 'embed/');
        if (asset.descriptionSrc) {
          asset.description = enhancedSnarkdown(await getStringFromFile(asset.descriptionSrc));
        }

        return outputJson(asset, asset.movement, asset.item);
      }

      if (asset.type === 'markdown') {
        asset.content = enhancedSnarkdown(await getStringFromFile(asset.src));
        return outputJson(asset, asset.movement, asset.item);
      }

      if (asset.type === 'scripture') {
        const [, startCh] = /(\d+)$/.exec(asset.start.chapter);
        const [, endCh] = /(\d+)$/.exec(asset.end.chapter);
        const chapters = Array(parseInt(endCh) - parseInt(startCh) + 1)
          .fill()
          .map((_, i) => parseInt(startCh) + i);

        const jsonChapters = (
          await Promise.all(
            chapters.map(async (ch) =>
              JSON.parse(await getStringFromFile(`data/final/rev${ch}.json`)),
            ),
          )
        ).reduce((acc, ch) => [...acc, ...ch], []);

        asset.content = trim(jsonChapters, asset.start, asset.end);

        await outputJson(asset, asset.movement, asset.item);
      }
    }),
  );
};

compileAssets().then(() => console.log('Assets compiled'));
