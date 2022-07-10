import styled, { keyframes } from 'styled-components';

const propulsion = keyframes` 
  0% {
    transform: scaleX(1) scaleY(1) translateX(0);
  }
  
  10% {
    transform: scaleX(1) scaleY(1) translateX(0);
  }
  
  20% {
    transform: scaleX(0.5) scaleY(1.8) translateX(0);
  }
  
  30% {
    transform: scaleX(1.3) scaleY(0.7) translateX(20px);
  }
  
  40% {
    transform: scaleX(1.1) scaleY(0.9) translateX(30px);
    transform-origin: 0 50%;
  }
`;

const Squid = styled.img.attrs({
  src: '/sprites/animal_006.png',
})`
  position: relative;
  width: 200px;
  transform-origin: 0 50%;
  animation-name: ${propulsion};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export default Squid;
