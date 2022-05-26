import { Link, useParams } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  padding: 24px 0;
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

const AppFooter = () => {
  const params = useParams();

  return (
    <Footer>
      {!window.location.pathname.includes('intro') && (
        <div>
          {parseInt(params.item) !== 0 ? (
            <Link to={`/read/movement/${params.movement}/${parseInt(params.item) - 1}`}>
              Previous Page
            </Link>
          ) : (
            <div />
          )}
          {/* TODO: Mark complete if not already completed otherwise, next page */}
          {MOVEMENT_MAX[parseInt(params.movement)] !== parseInt(params.item) && (
            <Link to={`/read/movement/${params.movement}/${parseInt(params.item) + 1}`}>
              Next Page
            </Link>
          )}
        </div>
      )}
      <Copyright>
        Scripture quotations taken from the (NASB®) New American Standard Bible®, Copyright © 1960,
        1971, 1977, 1995, 2020 by The Lockman Foundation. Used by permission. All rights reserved.{' '}
        <a href="https://www.lockman.org" target="_blank" rel="noreferrer">
          www.lockman.org
        </a>
      </Copyright>
    </Footer>
  );
};

export default AppFooter;
