import React, { useState } from 'react';
import styled from 'styled-components';

import SignUpForm, { SignUpPayload } from './SignUpForm';
import LoginForm from './LoginForm';
import Container from './styled/Container';
import FormWrapper from './styled/FormWrapper';
import Jumbotron from './styled/Jumbotron';

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
  const [showSignUp, setShowSignUp] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (payload: SignUpPayload) => {
    setSubmitting(true);

    await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    setSubmitted(true);
    setSubmitting(false);
  };

  const handleLogin = async (email: string) => {
    setSubmitting(true);
    await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <Container>
      <Jumbotron
        role="img"
        aria-label="A woodcut illustration of the Baptism of Jesus"
      />
      <FormWrapper>
        <Wrapper>
          <Header>
            <p>Flatland Church</p>
            <h1>Good News Reader</h1>
            <p>
              Read along with us on a six-week journey through the Bible as we discover 6 words (and their Greek and Hebrew roots) that point us to the Good News of Jesus Christ.
            </p>
          </Header>
          {showSignUp ? (
            <SignUpForm
              onSwapForm={() => setShowSignUp(false)}
              onSubmit={handleCreate}
              submitting={submitting}
              submitted={submitted}
            />
          ) : (
            <LoginForm
              onSwapForm={() => setShowSignUp(true)}
              onSubmit={handleLogin}
              submitting={submitting}
              submitted={submitted}
            />
          )}
        </Wrapper>
      </FormWrapper>
    </Container>
  );
};

export default Login;
