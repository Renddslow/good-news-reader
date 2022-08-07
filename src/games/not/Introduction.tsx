import React from 'react';
import styled from 'styled-components';

const IntroWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  h1 {
    font-weight: 900;
    margin-bottom: 48px;
  }

  p {
    font-size: 20px;
    line-height: 1.8;
    margin-bottom: 48px;
  }
`;

const PracticeButton = styled.button`
  background: #523af2;
  color: #fff;
  appearance: none;
  border: 0;
  border-radius: 4px;
  font-size: inherit;
  padding: 12px 24px;
  margin: 0 auto;
  font-weight: 600;
  display: block;
  cursor: pointer;
`;

const Introduction = ({ onClick }) => {
  return (
    <IntroWrapper>
      <h1>Instructions</h1>
      <p>
        You will be given a set of words. Some words will very similar in their definition, but one
        will not be like the others. Tap the word that doesn’t belong! Get 5 correct answers to
        finish the practice!
      </p>
      <PracticeButton onClick={onClick}>Practice</PracticeButton>
    </IntroWrapper>
  );
};

export default Introduction;
