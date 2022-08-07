import React from 'react';
import { Star } from 'phosphor-react';
import styled, { keyframes } from 'styled-components';

const Row = styled.div`
  width: max-content;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, max-content));
  grid-gap: 4px;
`;

const flash = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  
  35% {
    transform: scale(1.5);
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`;

const StarWrapper = styled.div`
  position: relative;

  ::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    background: #927af266;
    top: -3px;
    left: -3px;
    border-radius: 50%;
    opacity: 0;
    animation: ${flash} 0.7s ease-in-out forwards;
    transform-origin: center;
    z-index: -1;
  }
`;

const Stars = ({ score }) => {
  return (
    <Row>
      {[...Array(score)].map((_, i) => (
        <StarWrapper key={i}>
          <Star weight="fill" color="#523af2" size={24} />
        </StarWrapper>
      ))}
      {[...Array(5 - score)].map((_, i) => (
        <Star key={i} weight="fill" color="#bac2cd" size={24} />
      ))}
    </Row>
  );
};

export default Stars;
