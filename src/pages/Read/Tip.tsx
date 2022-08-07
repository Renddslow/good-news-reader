import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import { useProgress } from '../../providers/Authentication';

const PracticeLink = styled(Link)`
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
  text-decoration: none;
  width: max-content;
  font-family: var(--sans-serif);
`;

const CloseButton = styled.button`
  background: transparent;
  color: #523af2;
  appearance: none;
  border: 1px solid #523af2;
  border-radius: 4px;
  font-size: inherit;
  padding: 12px 24px;
  margin: 0 auto;
  font-weight: 600;
  display: block;
  cursor: pointer;
  text-decoration: none;
  width: max-content;
  font-family: var(--sans-serif);
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  grid-gap: 8px;
  align-items: center;
  margin: 24px auto 0;

  @media screen and (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const popIn = keyframes`
    from {
        transform: scale(0);
    }
  
    to {
        transform: scale(1);
    }
`;

const Modal = styled.dialog`
  font-family: var(--sans-serif);
  border-radius: 4px;
  top: 30%;
  width: 90%;
  left: 5%;
  animation: ${popIn} 0.5s ease-in-out forwards;
  padding: 24px;
  border: 4px dashed #f8b10c;
  background: #fffdfa;

  p {
    font-size: 16px;
    line-height: 1.5;

    :not(:first-child) {
      margin-top: 12px;
    }
  }
`;

const Tip = ({ onClose }) => {
  const { words } = useProgress();

  return (
    <Modal open>
      <h1>Tip</h1>
      <p>You're doing a great job. You've collected {words.length} words so far. Keep it up!</p>
      <p>
        Did you know you can <strong>practice the words</strong> you're learning through
        intentionally designed <strong>mini-games</strong> and activities?
      </p>
      <Row>
        <CloseButton onClick={onClose}>I'm good for now</CloseButton>
        <PracticeLink to="/practice">Practice words</PracticeLink>
      </Row>
    </Modal>
  );
};

export default Tip;
