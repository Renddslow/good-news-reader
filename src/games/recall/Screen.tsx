import React from 'react';
import { Clock } from 'phosphor-react';
import styled from 'styled-components';

const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  padding: 24px;
`;

const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: end;
  align-items: center;
  grid-gap: 8px;
`;

const Word = styled.section<{ correct: boolean; incorrect: boolean }>`
  width: 100%;

  h1 {
    font-size: 42px;
    text-align: center;
    color: ${(props) => {
      if (props.correct) return '#1d6656';
      if (props.incorrect) return '#c72f4a';
      return '#1f2b36';
    }};
    font-weight: ${(props) => (props.correct || props.incorrect ? '900' : '400')};
  }

  p {
    font-size: 18px;
    line-height: 1.8;
    padding: 0 24px;
    margin-top: 12px;
    color: #242f3b;
  }
`;

const HintBox = styled.section`
  padding: 0 24px;
  font-size: 18px;
  line-height: 1.8;
  color: #242f3b;
  margin-bottom: 12px;
  margin-top: 96px;
  text-align: center;
`;

const Screen = ({
  currentTime,
  score,
  word,
  isAnswered = false,
  showHint = false,
  isCorrect = false,
}) => {
  const minutes = Math.floor(currentTime / 60);
  const seconds = (currentTime % 60).toString().padStart(2, '0');

  return (
    <div>
      <Header>
        <p>{score}</p>
        <Row>
          <p>
            {minutes}:{seconds}
          </p>
          <Clock weight="bold" size={24} />
        </Row>
      </Header>
      <HintBox>{showHint ? `Hint: ${word.hint}` : '\u00A0'}</HintBox>
      <Word correct={isAnswered && isCorrect} incorrect={isAnswered && !isCorrect}>
        <h1>{word.word}</h1>
        <p>{isAnswered ? `means "${word.definition}"` : ' '}</p>
      </Word>
    </div>
  );
};

export default Screen;
