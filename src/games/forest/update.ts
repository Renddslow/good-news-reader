import { Hero, GameKeyframe } from './types';

const update = (hero: Hero, keyframe: GameKeyframe, canvas: HTMLCanvasElement, mod: number = 1) => {
  const stagedState: Partial<Hero> = {};

  if (keyframe === 'up') {
    stagedState.y = hero.y - hero.speed * mod;
    stagedState.direction = 'up';
  }

  if (keyframe === 'right') {
    stagedState.x = hero.x + hero.speed * mod;
    stagedState.direction = 'right';
  }

  if (keyframe === 'left') {
    stagedState.x = hero.x - hero.speed * mod;
    stagedState.direction = 'left';
  }

  if (Object.keys(stagedState).length) {
    Object.keys(stagedState).forEach((k) => {
      hero[k] = stagedState[k];
    });
    hero.sprite.rendersOnSprite++;
  }

  if (hero.sprite.rendersOnSprite === 4) {
    hero.sprite.current = (hero.sprite.current + 1) % 3;
    hero.sprite.rendersOnSprite = 0;
  }

  if (keyframe === 'idle') {
    hero.sprite.current = 1;
    hero.sprite.rendersOnSprite = 0;
  }
};

export default update;
