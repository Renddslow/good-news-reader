import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import FuzzyMatching from 'fuzzy-matching';

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

const Row = styled.div`
  width: max-content;
  grid-template-columns: repeat(3, minmax(0, max-content));
  margin: 24px auto 0;
  grid-gap: 8px;
  display: grid;
`;

const Input = styled.input`
  width: 240px;
  display: block;
  appearance: none;
  border: 1px solid #b8c4ce;
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
  margin: 24px auto 0;

  &::placeholder {
    color: #b8c4ce;
  }

  &:focus {
    outline-color: #523af2;
  }
`;

const Interactive = ({
  showing5050 = false,
  onHelp,
  alt = '',
  word,
  onChoose,
  usedHint,
  used5050,
}) => {
  const [answer, setAnswer] = useState('');
  const showCorrectFirst = useRef(Math.random() > 0.5);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fm = new FuzzyMatching([word.definition]);
    onChoose(fm.get(answer) > 0.5);
  };

  return (
    <div>
      {showing5050 ? (
        <div>
          <Button onClick={onChoose(showCorrectFirst.current)} color="#1fa08e" fullWidth>
            {showCorrectFirst.current ? word.definition : alt}
          </Button>
          <Button onClick={onChoose(!showCorrectFirst.current)} color="#1fa08e" fullWidth>
            {showCorrectFirst.current ? alt : word.definition}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input onChange={(e) => setAnswer(e.target.value)} value={answer} />
        </form>
      )}
      <Row>
        <Button onClick={onHelp('hint')} color="#c72f4a" disabled={usedHint}>
          Hint
        </Button>
        <Button onClick={onHelp('50')} color="#1fa08e" disabled={used5050}>
          50/50
        </Button>
        <Button onClick={onHelp('skip')} color="#e06f2d">
          Skip
        </Button>
      </Row>
    </div>
  );
};

export default Interactive;
