import React, { useEffect, useRef, useState } from 'react';

import drawHero from './utils/drawHero';
import { Hero } from './types';
import makeInitialMap from './utils/makeInitialMap';

const Canvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<CanvasRenderingContext2D | null>(null);

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
      x: 157,
      y: 216,
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

    const keyCodes: Set<string> = new Set();
    window.addEventListener('keydown', (e) => {
      keyCodes.add(e.code);
    });

    window.addEventListener('keyup', (e) => {
      keyCodes.delete(e.code);
    });

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

    const main = (ts: DOMHighResTimeStamp) => {
      const delta = ts - then;
      // update
      render();
      then = ts;
      window.requestAnimationFrame(main);
    };

    main(0);
  }, []);

  return <canvas ref={ref} />;
};

export default Canvas;
