import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Progress from './Progress';
import Home from './Home';
import Links from './Links';

export const Header = styled.header`
  display: flex;
  justify-content: end;
  align-items: center;
  grid-gap: 12px;
  padding: 12px 8px;
`;

const ReadHeader = () => {
  return (
    <>
      <Header>
        <Home />
        <Links />
        <Progress />
      </Header>
      <Outlet />
    </>
  );
};

export default ReadHeader;
