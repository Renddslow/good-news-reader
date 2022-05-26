import React from 'react';
import styled from 'styled-components';

export const ContentWrapper = styled.div`
  font-size: 18px;
  line-height: 1.5;
  margin-top: 32px;

  p {
    margin-top: 14px;
  }

  img {
    display: block;
    width: calc(100% + 24px);
    margin: 24px -24px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
`;

const Markdown = ({ data }) => (
  <>
    <h1>{data.title}</h1>
    <ContentWrapper dangerouslySetInnerHTML={{ __html: data.content }} />
  </>
);

export default Markdown;
