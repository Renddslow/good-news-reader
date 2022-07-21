import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Introduction from './Introduction';
import Screen from './Screen';
import Interactive from './Interactive';

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  margin: 0 auto;
  font-family: var(--sans-serif);
  height: 100%;
`;

const Recall = () => {
  const [usedHint, setUsedHint] = useState(false);
  const [used5050, setUsed5050] = useState(false);
  const [skipsUsed, setSkipsUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [time, setTime] = useState(60);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [skippedAnswers, setSkippedAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [show5050, setShow5050] = useState(false);

  useEffect(() => {
    if (!showIntroduction) {
      const timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time, showIntroduction]);

  useEffect(() => {
    if (time === 0) {
      setGameIsOver(true);
    }
  }, [time]);

  const onHelp = (type) => () => {
    if (type === 'hint') {
      setUsedHint(true);
      setShowHint(true);
    }

    if (type === '50') {
      setUsed5050(true);
      setShow5050(true);
    }
  };

  return (
    <Wrapper>
      {showIntroduction && <Introduction onClick={() => setShowIntroduction(false)} />}
      {!showIntroduction && !gameIsOver && (
        <div>
          <Screen
            currentTime={time}
            score={score}
            isAnswered
            showHint={showHint}
            word={{
              word: 'Ahavah',
              definition: 'A word that means "to be in a state of mind"',
              hint: 'It is a verb',
            }}
          />
          <Interactive
            onHelp={onHelp}
            word={{
              word: 'Ahavah',
              definition: 'to love',
              hint: 'It is a verb',
            }}
            onChoose={(isCorrect) => {}}
            usedHint={usedHint}
            showing5050={show5050}
            used5050={used5050}
          />
        </div>
      )}
      {gameIsOver && <div />}
    </Wrapper>
  );
};

export default Recall;
