import React, { useState } from 'react';
import styled from 'styled-components';
import Angler from './sprites/Angler';

const Wrapper = styled.div`
  background: #245978;
  position: absolute;
  height: 100vh;
  width: 100%;
  display: block;
  top: 0;
  bottom: 0;
`;

const InstructionsContainer = styled.div`
  margin-top: 50px;
  padding: 24px;
  color: #fff;
  font-family: var(--sans-serif);
  font-size: 16px;
  line-height: 1.8;

  h2 {
    font-size: 18px;
  }
`;

const Word = styled.div`
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

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  grid-gap: 16px;
  width: max-content;
  margin: 24px auto 0;
`;

const WordContainer = styled.div`
  width: max-content;
  margin: 0 auto;
  display: block;
`;

const Instructions = ({ onClose }) => {
  const [badTap, setBadTap] = useState(false);

  return (
    <Wrapper>
      <InstructionsContainer>
        <h2>Instructions</h2>
        <p>
          Tap the fish (the living creature) that is carrying a word for “life” on its back. Be
          careful, if you tap the wrong fish or if you miss a fish, you lose a life! Make it to the
          ocean’s surface before losing all your lives to win!
        </p>
        {badTap && <p>Tap the word for “life” to get started!</p>}
      </InstructionsContainer>
      <WordContainer onClick={() => setBadTap(true)}>
        <Word>chat</Word>
        <Angler />
      </WordContainer>
      <Row>
        <WordContainer onClick={onClose}>
          <Word>chay</Word>
          <Angler />
        </WordContainer>
        <WordContainer onClick={() => setBadTap(true)}>
          <Word>chai</Word>
          <Angler />
        </WordContainer>
      </Row>
    </Wrapper>
  );
};

export default Instructions;
