import React, { useState } from 'react';
import { Question } from 'phosphor-react';
import styled from 'styled-components';

const IntroWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 24px;
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

const HelpRow = styled.div`
  width: 100%;
  position: absolute;
  bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;

const HelpButton = styled.button`
  background: #c72f4a;
  color: #fff;
  appearance: none;
  border: 0;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 500;
  display: block;
  font-size: 14px;
  cursor: pointer;
`;

const Dialog = styled.dialog`
  padding: 24px 12px 12px;
  top: 100px;
  border-radius: 4px;
  border: 2px dashed;
  background: #b7c5d1;
`;

const CloseDialog = styled.button`
  background: #7090b0;
  appearance: none;
  border: 0;
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 600;
  display: block;
  font-size: 14px;
  margin: 0 auto;
  cursor: pointer;
  color: #fff;
`;

const HelpModal = ({ onClose }) => {
  return (
    <Dialog open>
      <p>
        <strong>Hint</strong> - Use once per game to give you a nudge in the right direction. Does
        not affect your score.
      </p>
      <p>
        <strong>50/50</strong> - Use once per game to give you two options to choose the right
        answer from. Does not affect your score.
      </p>
      <p>
        <strong>
          <strong>Skip</strong> - Use as many times in a game as you need, but it will impact your
          score.
        </strong>
      </p>
      <CloseDialog onClick={onClose}>Close</CloseDialog>
    </Dialog>
  );
};

const Introduction = ({ onClick }) => {
  const [showHelpText, setShowHelpText] = useState(false);

  return (
    <IntroWrapper>
      <h1>Introduction</h1>
      <p>
        You will be given a set of words. Some words will very similar in their definition, but one
        will not be like the others. Tap the word that doesn’t belong! Get 5 correct answers to
        finish the practice!
      </p>
      <PracticeButton onClick={onClick}>Practice</PracticeButton>
      <HelpRow>
        <Question weight="bold" size={24} color="#c72f4a" onClick={() => setShowHelpText(true)} />
        <HelpButton onClick={() => setShowHelpText(true)}>
          What do the help buttons mean?
        </HelpButton>
      </HelpRow>
      {showHelpText && <HelpModal onClose={() => setShowHelpText(false)} />}
    </IntroWrapper>
  );
};

export default Introduction;
