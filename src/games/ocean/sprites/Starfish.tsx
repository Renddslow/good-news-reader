import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  
  35% {
    transform: rotate(126deg) scale(1);
  }
  
  50% {
    transform: rotate(180deg) scale(1.2);
  }

  65% {
    transform: rotate(234deg) scale(1);
  }
  
  100% {
    transform: rotate(360deg) scale(1);
  }
`;

const Starfish = styled.img.attrs({
  src: '/sprites/animal_005.png',
})`
  position: relative;
  width: 100px;
  margin: 8px;
  animation-name: ${spin};
  animation-duration: 4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 55% 55%;
`;

export default Starfish;
