import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Heart, HeartBreak, CaretLeft } from 'phosphor-react';
import { Link } from 'react-router-dom';

type Props = {
  livesRemaining?: number;
};

const LifeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4px;

  svg {
    filter: drop-shadow(1px 1px #fff) drop-shadow(-1px -1px #fff) drop-shadow(-1px 1px #fff)
      drop-shadow(1px -1px #fff);
  }
`;

const Container = styled.div`
  padding: 24px;
  width: 100%;
  margin: 0 auto;
  position: absolute;
  z-index: 60;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: space-between;
  align-items: center;
`;

const BackButton = styled(Link)`
  color: #000;
  font-family: var(--sans-serif);
  background: #fff;
  border-radius: 8px;
  padding: 6px 12px 6px 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 8px;
  border: 2px solid #000;
`;

const flash = keyframes`
  0% {
    opacity: 0;
  }
  
  50% {
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`;

const WrappedHeartBreak = styled(HeartBreak)`
  position: relative;
  animation: ${flash} 1s linear;
  animation-fill-mode: forwards;
`;

const HUD = ({ livesRemaining = 3 }: Props) => (
  <Container>
    <BackButton to="/read">
      <CaretLeft weight="bold" /> Home
    </BackButton>
    <LifeContainer>
      {[...Array(3 - livesRemaining)].map((_, i) => (
        <WrappedHeartBreak key={i} weight="fill" size={48} fill="#bf4060" />
      ))}
      {[...Array(livesRemaining)].map((_, i) => (
        <Heart key={i} weight="fill" size={48} fill="#ff0040" />
      ))}
    </LifeContainer>
  </Container>
);

export default HUD;
