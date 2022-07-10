import styled, { keyframes } from 'styled-components';

const fly = keyframes`
    0% {
        transform: translateY(0);
    }
  
  50% {
        transform: translateY(10px);
  }
  
  100% {
    transform: translateY(0);
  }
`;

const Flier = styled.img.attrs({
  src: '/sprites/animal_002.png',
})`
  position: relative;
  width: 180px;
  margin: 8px;
  animation-name: ${fly};
  animation-duration: 2s;
  animation-iteration-count: infinite;
`;

export default Flier;
