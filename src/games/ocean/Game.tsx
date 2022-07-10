import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import OceanBackground from './OceanBackground';
import HUD from './HUD';
import Sprite from './sprites/Sprite';
import { useProgress, Word } from '../../providers/Authentication';
import Instructions from './Instructions';

import Squid from './sprites/Squid';
import Starfish from './sprites/Starfish';
import Puffer from './sprites/Puffer';
import Jelly from './sprites/Jelly';
import Flier from './sprites/Flier';
import Angler from './sprites/Angler';

const SpriteLayer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 50;
  top: 100px;
  bottom: 0;
  left: 0;
`;

const LanesContainer = styled.div`
  height: calc(100% - 100px);
  width: 100%;
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
`;

const Score = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--sans-serif);

  h2 {
    padding: 12px 24px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(#3d3b41, #555862);
    border-radius: 24px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  margin: 0 auto;
`;

const chayBucket = [
  'chai',
  'chayil',
  'chalal',
  'chazone',
  'calzone',
  'charis',
  'charisma',
  'chapter',
  'chavah',
  'nachash',
];

const zoeBucket = [
  'zap',
  'oz',
  'zerah',
  'zeroa',
  'zoo',
  'zamar',
  'zone',
  'zoom',
  'zinc',
  'xylophone',
  'ozone',
  'ooze',
  'oxygen',
  'zo',
  'zeh',
  'zohar',
  'zu',
];

const collectWords = (words) => words.filter((w) => w);
const addWordOrNull = (words: Word[], word: string) => {
  if (words.find((w) => w.word === word)) {
    return word;
  }
  return null;
};

const pickRandom = (bucket: any[]) => {
  const index = Math.floor(Math.random() * bucket.length);
  return bucket[index];
};

const Game = () => {
  const { words } = useProgress();
  const [instructionsOpen, setInstructionsOpen] = useState(true);
  const [laneOneStack, setLaneOneStack] = useState([]);
  const [laneTwoStack, setLaneTwoStack] = useState([]);
  const [laneThreeStack, setLaneThreeStack] = useState([]);
  const [tick, setTick] = useState(0);
  const [score, setScore] = useState(0);

  const setters = [setLaneOneStack, setLaneTwoStack, setLaneThreeStack];

  const correctWords = collectWords([
    addWordOrNull(words, 'chay'),
    addWordOrNull(words, 'chayyim'),
    addWordOrNull(words, 'zoe'),
    addWordOrNull(words, 'zao'),
    addWordOrNull(words, 'zoopoieo'),
  ]);

  const RandomSprites = [Squid, Starfish, Puffer, Jelly, Flier, ...Array(10).fill(Angler)];

  useEffect(() => {
    if (!instructionsOpen) {
      setTick(performance.now());
    }
  }, [instructionsOpen]);

  useEffect(() => {
    if (!tick) return;

    const cancel = setTimeout(() => {
      setLaneOneStack((s) => [
        ...s,
        {
          word: 'chay',
          id: uuid(),
          Component: RandomSprites[Math.floor(Math.random() * RandomSprites.length)],
        },
      ]);
      setTick(performance.now());
    }, 2000);
    return () => clearTimeout(cancel);
  }, [tick, setTick]);

  const removeWord = (word: string, id: string) => {};

  return (
    <Wrapper>
      <HUD livesRemaining={2} />
      {instructionsOpen ? (
        <Instructions onClose={() => setInstructionsOpen(false)} />
      ) : (
        <OceanBackground>
          <>
            <SpriteLayer>
              <Score>
                <h2>Score: {score}</h2>
              </Score>
              <LanesContainer>
                <div>
                  {laneOneStack.map(({ id, word, Component }) => (
                    <Sprite
                      key={id}
                      id={id}
                      word={word}
                      correct={correctWords.includes(word)}
                      onClick={() => {}}
                      onExit={removeWord}
                    >
                      <Component />
                    </Sprite>
                  ))}
                </div>
                <div>
                  {laneTwoStack.map(({ id, word, Component }) => (
                    <Sprite
                      key={id}
                      id={id}
                      word={word}
                      correct={correctWords.includes(word)}
                      onClick={() => {}}
                      onExit={removeWord}
                    >
                      <Component />
                    </Sprite>
                  ))}
                </div>
                <div>
                  {laneThreeStack.map(({ id, word, Component }) => (
                    <Sprite
                      key={id}
                      id={id}
                      word={word}
                      correct={correctWords.includes(word)}
                      onClick={() => {}}
                      onExit={removeWord}
                    >
                      <Component />
                    </Sprite>
                  ))}
                </div>
              </LanesContainer>
            </SpriteLayer>
          </>
        </OceanBackground>
      )}
    </Wrapper>
  );
};

export default Game;
