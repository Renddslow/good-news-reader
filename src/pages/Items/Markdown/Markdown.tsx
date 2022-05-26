import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  font-size: 18px;
  line-height: 1.5;

  p {
    margin-top: 14px;
  }
`;

const Markdown = ({ data }) => (
  <>
    <h1>{data.title}</h1>
    <ContentWrapper dangerouslySetInnerHTML={{ __html: data.content }} />
  </>
);

export default Markdown;
