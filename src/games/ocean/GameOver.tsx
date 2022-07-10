import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { House } from 'phosphor-react';

const Wrapper = styled.div`
  background: #245978;
  position: absolute;
  height: 100vh;
  width: 100%;
  display: block;
  top: 0;
  bottom: 0;
`;

const Container = styled.div`
  margin-top: 50px;
  padding: 24px;
  color: #fff;
  font-family: var(--sans-serif);
  font-size: 16px;
  line-height: 1.8;

  h2 {
    font-size: 18px;
  }

  h3 {
    font-size: 16px;
  }

  p:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const HomeButton = styled(Link)`
  display: flex;
  width: max-content;
  padding: 12px 14px;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  font-family: var(--sans-serif);
  background: #fff;
  text-decoration: none;
  margin: 24px auto;
`;

const GameOver = ({ survived, livesRemaining, score }) => {
  return (
    <Wrapper>
      <Container>
        <h2>Game Over!</h2>
        {survived ? (
          <>
            <h3>You survived!</h3>
            <p>
              Not only that, you managed to score <strong>{score}</strong> points.
            </p>
          </>
        ) : (
          <>
            <h3>You didn't quite make it.</h3>
            {score > 0 ? (
              <p>
                But you still managed to score <strong>{score}</strong> points
              </p>
            ) : (
              <p>
                This can be a bit tricky to get used to. Go ahead and try again and see how many
                words you can remember.
              </p>
            )}
          </>
        )}
        <p>Each time you practice you'll gain proficiency in these words.</p>
        <p>Come back tomorrow – and each time you collect a new word – to see how you can grow.</p>
        <HomeButton to="/read">
          <House weight="fill" size={18} /> Go Home
        </HomeButton>
      </Container>
    </Wrapper>
  );
};

export default GameOver;
