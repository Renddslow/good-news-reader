import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';

const scrollBackground = keyframes`
  from {
    background-position-x: 0;
  }
  
  to {
    background-position-x: -400%;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Jumbotron = styled.div`
  display: block;
  background-image: url('https://images.squarespace-cdn.com/content/v1/59ba9f2aa803bb442375d69c/1512053879069-AG22KCX4KLZS4PAQ5K6B/Second+panel+copy.jpg?format=1500w');
  background-position-y: 10%;
  filter: blur(10px);
  width: 200%;
  position: absolute;
  height: 200%;
  background-repeat: repeat-x;
  top: -15px;
  left: -15px;
  animation-name: ${scrollBackground};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 45s;

  @media (prefers-reduced-motion) {
    animation-name: none;
  }
`;

const Card = styled.div`
  --shadow-color: 0deg 0% 0%;
  background: #fff;
  display: block;
  width: 400px;
  max-width: 95%;
  margin: 0 auto;
  z-index: 100;
  border-radius: 8px;
  box-shadow: 0 0.9px 0.7px hsl(var(--shadow-color) / 0.24),
    0 1.7px 1.3px -1.6px hsl(var(--shadow-color) / 0.18),
    0 6.4px 5px -3.2px hsl(var(--shadow-color) / 0.13),
    0.1px 19px 15px -4.7px hsl(var(--shadow-color) / 0.07);
  overflow: hidden;
  position: relative;
  padding: 24px;
`;

const CardJumbo = styled.div`
  width: 100%;
  background-image: url('https://images.squarespace-cdn.com/content/v1/59ba9f2aa803bb442375d69c/1512053879069-AG22KCX4KLZS4PAQ5K6B/Second+panel+copy.jpg?format=1500w');
  background-size: 400%;
  background-position: center;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  padding: 12px;

  h1,
  p {
    color: #fff;
    font-family: var(--sans-serif);
    z-index: 200;
    position: relative;
    font-size: 18px;
  }

  h1 {
    font-weight: 800;
    font-size: 34px;
  }
`;

const CardOverlay = styled.div<{ opacity?: number; gradient?: boolean }>`
  position: absolute;
  z-index: 101;
  top: 0;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  opacity: ${({ opacity }) => opacity || 0.5};
  ${({ gradient }) =>
    gradient
      ? `background-image: linear-gradient(
    5deg,
    hsl(279deg 100% 20%) 0%,
    hsl(288deg 100% 20%) 15%,
    hsl(297deg 100% 21%) 22%,
    hsl(306deg 100% 23%) 28%,
    hsl(313deg 100% 26%) 33%,
    hsl(319deg 100% 29%) 37%,
    hsl(324deg 100% 32%) 42%,
    hsl(328deg 100% 34%) 46%,
    hsl(332deg 100% 37%) 50%,
    hsl(335deg 100% 39%) 54%,
    hsl(339deg 100% 42%) 58%,
    hsl(342deg 100% 44%) 63%,
    hsl(344deg 100% 45%) 67%,
    hsl(347deg 100% 47%) 72%,
    hsl(350deg 100% 48%) 78%,
    hsl(355deg 97% 50%) 85%,
    hsl(10deg 100% 50%) 100%
  );`
      : `background: hsl(332deg 100% 37%);`}
`;

const Login = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <Container>
      <Card>
        <CardJumbo>
          <p>Flatland Church</p>
          <h1>Revelation Leader</h1>
          <CardOverlay opacity={0.7} />
        </CardJumbo>
        <button onClick={loginWithPopup}>Login</button>
      </Card>
      <Jumbotron>
        <CardOverlay gradient />
      </Jumbotron>
    </Container>
  );
};

export default Login;
