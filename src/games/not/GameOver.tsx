import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Stars from './Stars';

const PracticeButton = styled(Link)`
  background: #523af2;
  color: #fff;
  appearance: none;
  border: 0;
  border-radius: 4px;
  font-size: inherit;
  padding: 12px 24px;
  margin: 48px auto 0;
  font-weight: 600;
  display: block;
  cursor: pointer;
  text-decoration: none;
  width: max-content;
`;

const GameOver = () => {
  return (
    <>
      <Stars score={5} />
      <div>
        <h1>Great work!</h1>
        <p>To review these words more, keep practicing and using the flashcards!</p>
      </div>
      <PracticeButton to="/read">Return home</PracticeButton>
    </>
  );
};

export default GameOver;
