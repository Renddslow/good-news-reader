import React, { useEffect, useRef } from 'react';

import drawHero from './utils/drawHero';
import { GameKeyframe, Hero } from './types';
import makeInitialMap from './utils/makeInitialMap';
import update from './update';

const Canvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let then = performance.now();
    const ctx = ref.current?.getContext('2d');
    ref.current.width = 896;
    ref.current.height = 1216;

    const heroSheet = new Image();
    const tileSheet = new Image();

    const bg = {
      ready: false,
      tiles: makeInitialMap(),
    };

    const hero: Hero = {
      speed: 256,
      x: 448 + 4,
      y: 1216 - 96,
      direction: 'down',
      ready: false,
      sprite: {
        rendersOnSprite: 0,
        current: 0,
      },
    };

    heroSheet.src = '/walker.png';
    tileSheet.src = '/tiles.png';

    heroSheet.onload = () => {
      hero.ready = true;
    };

    tileSheet.onload = () => {
      bg.ready = true;
    };

    const render = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (bg.ready) {
        bg.tiles.forEach((row, y) => {
          row.forEach((tile, x) => {
            ctx.drawImage(
              tileSheet,
              tile.sx,
              tile.sy,
              tile.sw,
              tile.sh,
              x * 64,
              y * 64,
              tile.dw,
              tile.dh,
            );
          });
        });
      }

      if (hero.ready) {
        drawHero(ctx, heroSheet, hero);
      }
    };

    let nextKeyframe: GameKeyframe = 'up';
    let atSign = false;
    let walkingTheWrongWay = false;

    // trigger question
    // go direction the question asked
    // react if wrong

    const notifyForQuestion = () => {
      const event = new CustomEvent('ask-question');
      window.dispatchEvent(event);
    };

    window.addEventListener('give-direction', (e: CustomEvent) => {
      console.log(e);
      nextKeyframe = e.detail.keyframe;
      walkingTheWrongWay = e.detail.wrong;
    });

    const main = (ts: DOMHighResTimeStamp) => {
      const delta = ts - then;
      update(hero, nextKeyframe, ctx.canvas, delta / 1000);
      if (hero.y < 240 && !atSign) {
        nextKeyframe = 'idle';
        atSign = true;
        notifyForQuestion();
      }

      if ((nextKeyframe === 'left' || nextKeyframe === 'right') && walkingTheWrongWay) {
        console.log('🦑');
      }

      render();
      then = ts;
      window.requestAnimationFrame(main);
    };

    main(0);
  }, []);

  return <canvas ref={ref} />;
};

export default Canvas;
