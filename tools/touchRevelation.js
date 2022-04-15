import { execSync } from 'child_process';
import path from 'path';

const touchRevelation = () => {
  const names = Array(22)
    .fill(null)
    .map((_, idx) => `rev${idx + 1}.md`);
  process.chdir(path.join(process.cwd(), 'data/raw'));
  execSync(`touch ${names.join(' ')}`);
};

(() => {
  touchRevelation();
})();
