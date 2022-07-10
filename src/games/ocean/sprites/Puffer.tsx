import styled, { keyframes } from 'styled-components';

const puff = keyframes`
    0% {
        transform: scale(1);
    }
  
  50% {
        transform: scale(1.3);
  }
  
  100% {
    transform: scale(1);
  }
`;

const Puffer = styled.img.attrs({
  src: '/sprites/animal_003.png',
})`
  position: relative;
  width: 150px;
  margin: 8px;
  animation-name: ${puff};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

export default Puffer;
