import styled, { keyframes } from 'styled-components';

const wiggle = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  
  50% {
    transform: rotateY(20deg);
  }

  100% {
    transform: rotateY(0deg);
  }
`;

const Angler = styled.img.attrs({
  src: '/sprites/animal_004.png',
})`
  position: relative;
  width: 120px;
  margin: 8px;
  animation-name: ${wiggle};
  animation-duration: 0.4s;
  animation-iteration-count: infinite;
  transform-style: preserve-3d;
`;

export default Angler;
