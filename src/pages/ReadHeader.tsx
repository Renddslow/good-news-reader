import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: end;
  align-items: center;
  grid-gap: 12px;
  padding: 12px 8px;
`;

const Footer = styled.footer`
  padding: 0 24px;
`;

const Copyright = styled.p`
  font-size: 14px;
  font-family: var(--sans-serif);
  margin-top: 16px;
`;

const MOVEMENT_MAX = {
  1: 4,
  2: 6,
  3: 3,
  4: 4,
};

const ReadHeader = () => {
  const params = useParams();
  console.log(params);
  return (
    <>
      <Header>Hello</Header>
      <Outlet />
      <Footer>
        <div>
          {parseInt(params.item) !== 0 ? (
            <Link to={`/read/movement/${params.movement}/${parseInt(params.item) - 1}`}>
              Previous Page
            </Link>
          ) : (
            <div />
          )}
          {MOVEMENT_MAX[parseInt(params.movement)] !== parseInt(params.item) && (
            <Link to={`/read/movement/${params.movement}/${parseInt(params.item) + 1}`}>
              Next Page
            </Link>
          )}
        </div>
        <Copyright>
          Scripture quotations taken from the (NASB®) New American Standard Bible®, Copyright ©
          1960, 1971, 1977, 1995, 2020 by The Lockman Foundation. Used by permission. All rights
          reserved.{' '}
          <a href="https://www.lockman.org" target="_blank" rel="noreferrer">
            www.lockman.org
          </a>
        </Copyright>
      </Footer>
    </>
  );
};

export default ReadHeader;
