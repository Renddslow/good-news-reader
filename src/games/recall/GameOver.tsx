import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const GameOver = ({ score, skips }) => {
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowScore(true);
    }, 2000);
  }, []);

  return (
    <div>
      <h1>Time’s up!</h1>
      <p>Let’s see how many words you defined:</p>
      {showScore && (
        <div>
          <p>
            Overall, you scored {score} points, and used {skips} skips.
          </p>
          <Button onClick={() => window.location.reload()} color="#523af2">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameOver;
