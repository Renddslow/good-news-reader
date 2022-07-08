import styled from 'styled-components';

const MovementWrapper = styled.div<{ first: boolean }>`
  padding: 24px;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(0, 1fr) minmax(0, max-content);
  grid-gap: 12px;
  align-items: center;

  &::before {
    content: ${(props) => !props.first && '""'};
    top: 0;
    height: 24px;
    width: 4px;
    left: calc(24px + 30px - 2px);
    display: block;
    background: var(--green);
    position: absolute;
  }
`;

export default MovementWrapper;
