import React, { useState } from 'react';
import styled from 'styled-components';
import Introduction from '../recall/Introduction';

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  margin: 0 auto;
  font-family: var(--sans-serif);
  height: 100%;
`;

const Game = () => {
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [gameIsOver, setGameIsOver] = useState(false);

  return (
    <Wrapper>
      {showIntroduction && <Introduction onClick={() => setShowIntroduction(false)} />}
    </Wrapper>
  );
};

export default Game;
