import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import Squid from './Squid';
import Starfish from './Starfish';
import Puffer from './Puffer';
import Jelly from './Jelly';
import Flier from './Flier';
import Angler from './Angler';

type Props = {
  id: string;
  correct?: boolean;
  word: string;
  onClick: (word: string) => void;
  onExit: (word: string, id: string) => void;
};

const swim = keyframes`
  0% {
    left: -200px;
  }

  100% {
    left: calc(100% + 200px);
  }
`;

const SpriteContainer = styled.div`
  position: absolute;
  width: max-content;
  display: block;
  animation: ${swim} 6s linear infinite;
  cursor: pointer;
`;

const wordColor = keyframes`  
  63% {
    border-color: #000;
    background-color: #fff;
  }
  
  64% {
    border-color: #ff0040;
    background-color: #ff0040;
  }
  
  100% {
    border-color: #ff0040;
    background-color: #ff0040;
  }
`;

const WordBox = styled.div<{ correct: boolean }>`
  padding: 12px 24px;
  border: 2px solid #000;
  color: #000;
  font-family: var(--sans-serif);
  background: #fff;
  width: max-content;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 1.02px;
  display: block;
  margin: 0 auto 12px;
  animation: ${(props) => props.correct && wordColor} 6s ease-in-out infinite;
`;

const getRandomSprite = (sprite: React.ReactElement[], weights: number[]) => {
  const total = weights.reduce((acc, cur) => acc + cur, 0);
  const random = Math.floor(Math.random() * total);
  let sum = 0;
  for (let i = 0; i < sprite.length; i++) {
    sum += weights[i];
    if (random < sum) {
      return sprite[i];
    }
  }
};

const Sprite = (props: Props) => {
  useEffect(() => {
    setTimeout(() => {
      props.onExit(props.word, props.id);
    }, 1000 * 4.7);
  }, []);

  return (
    <SpriteContainer onClick={() => props.onClick(props.word)}>
      <WordBox correct={props.correct}>{props.word}</WordBox>
      {getRandomSprite(
        [<Squid />, <Starfish />, <Puffer />, <Jelly />, <Flier />, <Angler />],
        [1, 1.2, 1.5, 1, 2, 10],
      )}
    </SpriteContainer>
  );
};

export default Sprite;
