import { Link, useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { CaretLeft } from 'phosphor-react';

import { useProgress } from '../providers/Authentication';

const Footer = styled.footer`
  padding: 24px 0;
`;

const Copyright = styled.p`
  font-size: 14px;
  font-family: var(--sans-serif);
  margin-top: 16px;
`;

export const LinkButton = styled(Link)`
  font-size: 14px;
  padding: 12px 16px;
  font-weight: 600;
  font-family: var(--sans-serif);
  text-decoration: none;
  background: var(--green);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 0;
  appearance: none;
  cursor: pointer;
  width: max-content;
  margin-left: auto;
`;

const CloseButton = styled(LinkButton)`
  background: transparent;
  color: var(--green);
  border: 1px solid var(--green);
  border-radius: 8px;
  margin-left: 0;
`;

const Row = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  grid-gap: 4px;
`;

const NextTitle = styled.p`
  font-family: var(--sans-serif);
  font-size: 14px;
  color: #000;
  font-weight: 600;
  text-align: right;
  margin-top: 8px;
`;

const NextReference = styled.p`
  color: #666;
  font-size: 14px;
  font-weight: 400;
  margin-top: 4px;
  font-family: var(--sans-serif);
  text-align: right;
`;

const isComplete = (completions, page) => {
  const record = completions.find((c) => c.page === page.page);
  return !!record;
};

const AppFooter = ({ data }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { completions, completePage } = useProgress();

  // Do not add to the index as the pages are not zero-indexed
  const nextPage =
    Number.isInteger(parseInt(params.page, 10)) && data?.plan?.pages[parseInt(params.page, 10)];

  const handlePageCompletion = async () => {
    const payload = {
      page: window.location.pathname.includes('intro') ? 0 : parseInt(params.item, 10),
    };

    if (!isComplete(completions, payload)) {
      return completePage(payload.page);
    }

    return Promise.resolve();
  };

  const completeAndRoute = () => {
    handlePageCompletion().then(() => {
      navigate('/read');
    });
  };

  return (
    <Footer>
      {!window.location.pathname.includes('intro') ? (
        <Row>
          {!window.location.pathname.includes('background') ? (
            <CloseButton to="/read">Done for now</CloseButton>
          ) : (
            <div />
          )}
          {parseInt(params.page) % 5 !== 0 ? (
            <div>
              <LinkButton to={`/read/${parseInt(params.page) + 1}`} onClick={handlePageCompletion}>
                Keep going
              </LinkButton>
              <NextTitle>{nextPage?.title}</NextTitle>
              <NextReference>{nextPage?.titleReference}</NextReference>
            </div>
          ) : (
            <LinkButton as="button" onClick={completeAndRoute}>
              Finish this week
            </LinkButton>
          )}
        </Row>
      ) : (
        <Row>
          <div />
          <LinkButton as="button" onClick={completeAndRoute}>
            {isComplete(completions, {
              page: 0,
            })
              ? 'Return Home'
              : 'Mark as Read'}
          </LinkButton>
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
