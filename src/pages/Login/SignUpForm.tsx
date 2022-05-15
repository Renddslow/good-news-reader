import React, { useState } from 'react';
import styled from 'styled-components';

import Input from '../../components/Input';
import Button from '../../components/Button';

const Form = styled.form`
  display: grid;
  width: 100%;
  margin-top: 72px;
  position: relative;
  padding-bottom: 48px;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 12px;

  &::before {
    content: '';
    width: 120px;
    margin: 0 auto;
    height: 1px;
    display: block;
    background: #000;
    position: absolute;
    left: calc(50% - 60px);
    top: -36px;
  }

  fieldset {
    appearance: none;
    border: 0;
    grid-template-columns: minmax(0, 1fr);
    grid-gap: 12px;
    display: grid;
  }
`;

const NameRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 12px;
`;

const LoginRow = styled.div`
  display: flex;
  margin-left: auto;

  button {
    margin-left: 8px;
    color: var(--purple);
    font-size: 18px;
    appearance: none;
    border: 0;
    background: transparent;
    padding: 0;
    cursor: pointer;
  }
`;

type SignUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
};

type Props = {
  onSwapForm: () => void;
  onSubmit: (payload: SignUpPayload) => void;
};

const SignUpForm = ({ onSwapForm, onSubmit }: Props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handle = (cb) => (e) => cb(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      firstName,
      lastName,
      email,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <fieldset>
        <NameRow>
          <Input
            required
            label="First Name"
            id="first-name"
            autoComplete="given-name"
            value={firstName}
            onChange={handle(setFirstName)}
          />
          <Input
            required
            label="Last Name"
            id="last-name"
            autoComplete="family-name"
            value={lastName}
            onChange={handle(setLastName)}
          />
        </NameRow>
        <Input
          required
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={handle(setEmail)}
        />
      </fieldset>
      <Button type="submit">Sign Up</Button>
      <LoginRow>
        <p>Already have an account?</p>
        <button type="button" onClick={onSwapForm}>
          Login
        </button>
      </LoginRow>
    </Form>
  );
};

export default SignUpForm;
