import React from 'react';
import styled from 'styled-components';

import OceanBackground from './OceanBackground';
import HUD from './HUD';
import Sprite from './sprites/Sprite';

const SpriteLayer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 50;
  top: 100px;
  bottom: 0;
  left: 0;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  margin: 0 auto;
`;

const Game = () => {
  return (
    <Wrapper>
      <HUD livesRemaining={2} />
      <OceanBackground>
        <SpriteLayer>
          <Sprite word="chay" />
        </SpriteLayer>
      </OceanBackground>
    </Wrapper>
  );
};

export default Game;
