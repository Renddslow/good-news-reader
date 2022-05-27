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

        asset.content = jsonChapters;

        await outputJson(asset, asset.movement, asset.item);
      }
    }),
  );
};

compileAssets().then(() => console.log('Assets compiled'));
