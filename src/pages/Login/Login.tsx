import React from 'react';
import styled from 'styled-components';

import SignUpForm from './SignUpForm';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media screen and (max-width: 820px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, max-content) minmax(0, 1fr);
  }

  @media screen and (min-width: 1440px) {
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  }
`;

const FormWrapper = styled.div`
  h1,
  p {
    font-family: var(--sans-serif);
    z-index: 200;
    position: relative;
    font-size: 18px;
    text-align: center;
  }

  p {
    color: hsl(240deg, 14%, 45%);
  }

  h1 {
    font-weight: 800;
    font-size: 34px;
  }
`;

const Jumbotron = styled.div`
  width: 100%;
  height: 100%;
  display: block;
  background-color: var(--red);
  position: relative;
  background-blend-mode: multiply;
  background-image: url('/jumbo.png');
  background-size: cover;

  @media screen and (max-width: 820px) {
    height: 0;
    padding-bottom: 50%;
  }

  @media screen and (max-width: 480px) {
    padding-bottom: 100%;
  }
`;

const Wrapper = styled.div`
  margin: 96px auto 0;
  width: 75%;
  padding: 24px;

  @media screen and (max-width: 1024px) {
    width: 95%;
  }

  @media screen and (min-width: 1440px) {
    width: 60%;
  }
`;

const Header = styled.header`
  p:first-child {
    font-size: 14px;
    font-weight: 600;
  }

  h1 {
    margin: 8px 0 24px;
  }

  p:not(:first-child) {
    font-size: 18px;
    line-height: 1.5;
    text-align: center;

    @media screen and (max-width: 480px) {
      font-size: 16px;
    }
  }
`;

const Login = () => {
  return (
    <Container>
      <Jumbotron
        role="img"
        aria-label="A woodcut illustration by Albrecht Dürer of the woman of Revelation 12 being set upon by a dragon"
      />
      <FormWrapper>
        <Wrapper>
          <Header>
            <p>Flatland Church</p>
            <h1>Revelation Reader</h1>
            <p>
              Read along with us on a five-week journey through the book of Revelation and discover
              how Revelation concludes a unified story that leads to Jesus and provides
              encouragement for believers today.
            </p>
          </Header>
          <SignUpForm onSwapForm={() => {}} onSubmit={() => {}} />
        </Wrapper>
      </FormWrapper>
    </Container>
  );
};

export default Login;
