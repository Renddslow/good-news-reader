import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import OceanBackground from './OceanBackground';
import HUD from './HUD';
import Sprite from './sprites/Sprite';
import { useProgress, Word } from '../../providers/Authentication';
import Instructions from './Instructions';

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

const Game = () => {
  const { words } = useProgress();
  const [instructionsOpen, setInstructionsOpen] = useState(true);

  const correctWords = collectWords([
    addWordOrNull(words, 'chay'),
    addWordOrNull(words, 'chayyim'),
    addWordOrNull(words, 'zoe'),
    addWordOrNull(words, 'zao'),
    addWordOrNull(words, 'zoopoieo'),
  ]);

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
                <h2>Score: 1</h2>
              </Score>
              <LanesContainer>
                <div>
                  <Sprite
                    correct
                    id={uuid()}
                    word="chay"
                    onClick={console.log}
                    onExit={(word, id) => console.log(word, id)}
                  />
                </div>
                <div>
                  <Sprite
                    correct
                    id={uuid()}
                    word="chay"
                    onClick={console.log}
                    onExit={(word, id) => console.log(word, id)}
                  />
                </div>
                <div>
                  <Sprite
                    correct
                    id={uuid()}
                    word="chay"
                    onClick={console.log}
                    onExit={(word, id) => console.log(word, id)}
                  />
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
