import React from 'react';
import styled from 'styled-components';

import Squid from './Squid';

type Props = {
  word: string;
};

const SpriteContainer = styled.div`
  position: absolute;
  width: max-content;
  display: block;
`;

const WordBox = styled.div`
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
  return (
    <SpriteContainer onClick={() => console.log('Touched!')}>
      <WordBox>{props.word}</WordBox>
      {getRandomSprite([<Squid />], [1])}
    </SpriteContainer>
  );
};

export default Sprite;
