import styled from 'styled-components';

const IntroCard = styled.div`
  width: 100%;
  padding: 24px;
  background: var(--green);
  color: #fff;
  display: block;

  a {
    font-size: 14px;
    width: fit-content;
    padding: 12px 14px;
    border-radius: 4px;
    background: #fff;
    color: #001b2e;
    font-family: var(--sans-serif);
    text-decoration: none;
    font-weight: 500;
    margin-top: 12px;
    display: flex;
    align-items: center;
    grid-gap: 4px;
  }
`;

export default IntroCard;
