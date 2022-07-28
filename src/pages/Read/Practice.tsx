import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Stack } from 'phosphor-react';
import styled from 'styled-components';

const PracticeWrapper = styled.div`
  margin-left: calc(60px + 12px);
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(0, 1fr) minmax(0, max-content);
  grid-gap: 12px;
  align-items: center;
  padding: 32px 0;
  font-size: 16px;

  a {
    font-size: 14px;
    width: fit-content;
    padding: 12px 14px;
    border-radius: 4px;
    color: #fff;
    font-family: var(--sans-serif);
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    grid-gap: 4px;
    background: var(--green);
  }
`;

const IconWrapper = styled.div`
  align-self: start;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const Collection = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-top: 4px;
  color: #666;
`;

const Practice = ({ word, total, collected, first = false }) => {
  const games = ['/games/recall'];

  const getRandomGame = () => {
    const index = Math.floor(Math.random() * games.length);
    return games[index];
  };

  return (
    <PracticeWrapper>
      <IconWrapper>
        <Star weight="fill" size={32} />
      </IconWrapper>
      <div>
        <Title>"{word}" words</Title>
        <Collection>
          {collected}/{total} collected
        </Collection>
      </div>
      <Link to={first ? `/games/ocean` : getRandomGame()}>
        <Stack weight="bold" /> Review
      </Link>
    </PracticeWrapper>
  );
};

export default Practice;
