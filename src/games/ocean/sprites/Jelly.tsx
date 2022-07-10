import styled, { keyframes } from 'styled-components';

const swim = keyframes`
  0% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
  
  10% {
    transform: translateY(5px) translateX(2px) rotate(30deg);
  }

  15% {
    transform: translateY(25px) translateX(10px) rotate(30deg);
  }
  
  20% {
    transform: translateY(35px) translateX(10px) rotate(0deg);
  }
  
  50% {
    transform: translateY(35px) translateX(0) rotate(0deg);
  }
  
  80% {
    transform: translateY(35px) translateX(-10px) rotate(0deg);
  }

  90% {
    transform: translateY(25px) translateX(-10px) rotate(-30deg);
  }
  
  95% {
    transform: translateY(5px) translateX(-2px) rotate(-30deg);
  }
  
  100% {
    transform: translateY(0) translateX(0) rotate(0deg);
  }
`;

const Jelly = styled.img.attrs({
  src: '/sprites/animal_001.png',
})`
  position: relative;
  width: 100px;
  margin: 8px 28px;
  animation-name: ${swim};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

export default Jelly;
