import styled from 'styled-components';

const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;

  h1 {
    font-family: var(--sans-serif);
    font-size: 18px;
    font-weight: 900;
  }
`;

export default Header;
