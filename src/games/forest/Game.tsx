import React from 'react';
import styled from 'styled-components';

import Canvas from './Canvas';

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  margin: 0 auto;
  font-family: var(--sans-serif);
  height: 100%;

  canvas {
    width: 100%;
    margin: 0 auto;
  }
`;

const Game = () => {
  return (
    <Wrapper>
      <Canvas />
    </Wrapper>
  );
};

export default Game;
