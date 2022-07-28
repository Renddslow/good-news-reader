import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import words from '../../pages/Items/words';
import { House } from 'phosphor-react';
import { Link } from 'react-router-dom';

const Button = styled.button<{ color?: string; fullWidth?: boolean }>`
  background: ${(props) => props.color};
  color: #fff;
  border-radius: 4px;
  font-size: 18px;
  padding: 8px 16px;
  border: 0;
  appearance: none;
  display: block;
  cursor: pointer;
  margin: 0 auto 12px;
  width: ${(props) => (props.fullWidth ? '75%' : 'auto')};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const reducer = (acc, word) => {
  if (!acc[word]) {
    acc[word] = {
      word,
      count: 1,
      definition: words[word.toLowerCase()].definition,
    };
  } else {
    acc[word].count++;
  }
  return acc;
};

const Screen = styled.div`
  text-align: center;

  h1 {
    margin-bottom: 24px;
  }
`;

const Words = styled.div`
  margin: 24px 0;
  line-height: 2;
  font-weight: 600;
`;

const HomeButton = styled(Link)`
  display: flex;
  width: max-content;
  padding: 12px 14px;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  font-family: var(--sans-serif);
  background: #fff;
  text-decoration: none;
  margin: 24px auto;
`;

const GameOver = ({ score, skips, correctAnswers = [], skippedAnswers = [] }) => {
  const [showScore, setShowScore] = useState(false);

  const correct = correctAnswers.reduce(reducer, {});
  const skipped = skippedAnswers.reduce(reducer, {});

  useEffect(() => {
    setTimeout(() => {
      setShowScore(true);
    }, 2000);
  }, []);

  return (
    <Screen>
      <h1>Time’s up!</h1>
      <p>Let’s see how many words you defined:</p>
      {showScore && (
        <div>
          <p>
            Overall, you scored {score} points, and used {skips} skips.
          </p>
          <Words>
            {Object.keys(correct).map((word) => (
              <p key={word}>
                {word} - {correct[word].definition} +{correct[word].count}
              </p>
            ))}
            {Object.keys(skipped).length && <h3>Skipped</h3>}
            {Object.keys(skipped).map((word) => (
              <p key={word}>
                {word} - {skipped[word].definition} +{skipped[word].count}
              </p>
            ))}
          </Words>
          {/* TODO: Helpful? */}
          <Button onClick={() => window.location.reload()} color="#523af2">
            Play Again
          </Button>
          <HomeButton to="/read">
            <House weight="fill" size={18} /> Go Home
          </HomeButton>
        </div>
      )}
    </Screen>
  );
};

export default GameOver;
