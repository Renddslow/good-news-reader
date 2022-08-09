import { Hero } from '../types';

const drawHero = (ctx: CanvasRenderingContext2D, sheet: HTMLImageElement, hero: Hero) => {
  const sx = hero.sprite.current * 65;
  const sy = 0;
  const spriteWidth = 64;
  const spriteHeight = 64;

  ctx.save();
  ctx.drawImage(
    sheet,
    sx,
    sy,
    spriteWidth,
    spriteHeight,
    hero.x,
    hero.y,
    spriteWidth,
    spriteHeight,
  );
  // @ts-ignore
  if (window.bounding) {
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.strokeRect(hero.x, hero.y, spriteWidth, spriteHeight);
    ctx.strokeStyle = 'pink';
    ctx.strokeRect(hero.x + 16, hero.y + 5, 32, spriteHeight - 5);
    ctx.restore();
  }
  ctx.restore();
};

export default drawHero;
