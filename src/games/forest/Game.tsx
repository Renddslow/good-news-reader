import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { MapPin, CaretLeft, CaretRight } from 'phosphor-react';

import Canvas from './Canvas';

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  margin: 0 auto;
  font-family: var(--sans-serif);
  height: 100%;
  background: #000;
  overflow: hidden;

  canvas {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
  }
`;

const Stars = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, max-content));
  grid-gap: 4px;
  width: max-content;
  position: absolute;
  top: 12px;
  right: 12px;
`;

const fadein = keyframes`
    from {
        opacity: 0;
    }
  
    to {
        opacity: 1;
    }
`;

const ButtonRow = styled.div`
  opacity: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  grid-gap: 8px;
  margin: 75px auto 0;
  width: max-content;
  animation: ${fadein} 0.7s ease-in-out forwards;
  animation-delay: 0.7s;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  gap: 8px;
  appearance: none;
  border: 0;
`;

const popin = keyframes`
  from {
    transform: scale(0);
  }
  
    to {
        transform: scale(1);
    }
`;

const Modal = styled.div`
  position: absolute;
  top: 60%;
  width: 95%;
  left: 2.5%;
  z-index: 1000;
  background: #fff;
  font-size: 32px;
  border-radius: 4px;
  font-weight: 700;
  font-family: var(--sans-serif);
  padding: 24px;
  text-align: center;
  border: 4px solid #000;
  animation: ${popin} 0.3s ease-in forwards;
`;

const Game = () => {
  const [pins, setPins] = useState(2);
  const [showButtons, setShowButtons] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [key, setKey] = useState('');

  useEffect(() => {
    window.addEventListener('ask-question', () => {
      setShowButtons(true);
      setShowPrompt(true);
    });
  }, []);

  const handleClick = (direction: 'left' | 'right') => () => {
    // Handle interaction first, then animate
    const event = new CustomEvent('give-direction', {
      detail: {
        keyframe: direction,
        wrong: false,
      },
    });
    window.dispatchEvent(event);
  };

  return (
    <Wrapper>
      <Stars>
        {Array.from({ length: pins }, (_, i) => (
          <MapPin key={i} weight="fill" color="#F1D302" size={24} />
        ))}
        {Array.from({ length: 5 - pins }, (_, i) => (
          <MapPin key={i} weight="bold" color="#ccc" size={24} />
        ))}
      </Stars>
      {showButtons && (
        <ButtonRow>
          <Button onClick={handleClick('left')}>
            <CaretLeft size={24} weight="bold" />
            Dam
          </Button>
          <Button onClick={handleClick('right')}>
            Zoopoeio <CaretRight size={24} weight="bold" />
          </Button>
        </ButtonRow>
      )}

      <Canvas />
      {showPrompt && <Modal>Ahavah</Modal>}
    </Wrapper>
  );
};

export default Game;
