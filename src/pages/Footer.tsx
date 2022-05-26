import { Link, useParams } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { CaretLeft } from 'phosphor-react';

const Footer = styled.footer`
  padding: 24px 0;
`;

const Copyright = styled.p`
  font-size: 14px;
  font-family: var(--sans-serif);
  margin-top: 16px;
`;

const LinkButton = styled(Link)`
  font-size: 14px;
  padding: 12px 16px;
  font-weight: 600;
  font-family: var(--sans-serif);
  text-decoration: none;
  background: var(--purple);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 0;
  appearance: none;

  &:first-child {
    opacity: 0.8;
    background: var(--light-purple);
    padding: 12px 12px;
    color: #111;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  grid-gap: 4px;
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
      {!window.location.pathname.includes('intro') ? (
        <Row>
          {parseInt(params.item) !== 0 ? (
            <LinkButton to={`/read/movement/${params.movement}/${parseInt(params.item) - 1}`}>
              <CaretLeft weight="bold" size={18} />
            </LinkButton>
          ) : (
            <div />
          )}
          {/* TODO: Mark complete if not already completed otherwise, next page */}
          {MOVEMENT_MAX[parseInt(params.movement)] !== parseInt(params.item) ? (
            <LinkButton to={`/read/movement/${params.movement}/${parseInt(params.item) + 1}`}>
              Next Page
            </LinkButton>
          ) : (
            <LinkButton as="button">
              Complete{' '}
              <>
                {parseInt(params.movement) < 4
                  ? `Movement ${params.movement}`
                  : `the Last Movement`}
              </>
            </LinkButton>
          )}
        </Row>
      ) : (
        <Row>
          <div />
          <LinkButton as="button">Mark as Read</LinkButton>{' '}
        </Row>
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
