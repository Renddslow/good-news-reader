import React from 'react';
import styled, { keyframes } from 'styled-components';

import Scripture from './Scripture';
import Markdown from './Markdown';
import withData from './withData';
import AppFooter from '../Footer';
import Video from './Video';

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 24px 24px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`;

export const FadeInWrapper = styled.div`
  width: 100%;
  display: block;
  opacity: 0;
  animation-name: ${fadeIn};
  animation-duration: 1.2s;
  animation-fill-mode: forwards;
  animation-delay: 0.3s;
`;

const Item = ({ loading, data }) => {
  const { page } = data || {};

  return (
    <Wrapper>
      {!loading && page && (
        <FadeInWrapper>
          <h1>{page.title}</h1>
          {page.chapters.map((chapter) => (
            <>
              <h2 style={{ marginTop: 24 }}>{chapter.reference}</h2>
              <Scripture data={chapter} key={chapter.id} />
            </>
          ))}
          <AppFooter data={data} />
        </FadeInWrapper>
      )}
    </Wrapper>
  );
};

export default withData(Item, false);
