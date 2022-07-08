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

const outputJson = (o, page) => {
  const filepath = path.join(process.cwd(), 'public/assets', `${page}.json`);
  return fs
    .writeFile(filepath, JSON.stringify(o))
    .then(() => console.log(`${kleur.gray('Created JSON asset at')} ${filepath}`));
};

const getStringFromFile = async (p) => (await fs.readFile(path.join(process.cwd(), p))).toString();

const compileAssets = async () => {
  await makeDir(path.join(process.cwd(), 'public/assets'));

  const assets = JSON.parse(await getStringFromFile('assets.json'));

  await Promise.all(
    assets.pages.map(async (page) => {
      const chapters = await Promise.all(
        page.chapters.map(async (chapter) => {
          chapter.content = JSON.parse(await getStringFromFile(`data/final/${chapter.id}.json`));
          return chapter;
        }),
      );

      await outputJson({ ...page, chapters }, page.page);
    }),
  );
};

compileAssets().then(() => console.log('Assets compiled'));
