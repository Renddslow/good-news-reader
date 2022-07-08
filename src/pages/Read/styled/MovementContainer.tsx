import styled, { keyframes } from 'styled-components';

const resize = keyframes`
  from {
    overflow-y: hidden;
  }
  
  to {
    overflow-y: auto;
  }
`;

const MovementContainer = styled.div<{ open: boolean }>`
  width: 100%;
  font-family: var(--sans-serif);
  font-size: var(--fz-body);
  position: relative;
  z-index: 300;
  transition: max-height 0.5s ease-out;
  max-height: ${(props) => (props.open ? '1000px' : '108px')};
  animation-duration: 0.5s;
  animation-name: ${(props) => (props.open ? resize : '')};
  cursor: pointer;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    width: 4px;
    left: calc(24px + 30px - 2px);
    top: calc(24px + 60px);
    bottom: -24px;
    display: block;
    background: var(--green);
    z-index: 1;
  }

  &:not(:last-child)::before {
    content: '';
    position: absolute;
    width: calc(100% - (60px + 24px + 24px + 12px));
    right: 24px;
    background: #c1c3c1;
    bottom: 0;
    height: ${(props) => (props.open ? 0 : '1px')};
    display: block;
  }
`;

export default MovementContainer;
