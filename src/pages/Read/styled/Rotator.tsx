import styled from 'styled-components';

const Rotator = styled.div<{ up: boolean }>`
  transition: 0.3s ease-out;
  transform-origin: center;
  height: max-content;
  line-height: 0;
  ${(props) => props.up && 'transform: rotate(180deg);'}
`;

export default Rotator;
