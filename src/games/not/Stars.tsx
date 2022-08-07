import React from 'react';
import { Star } from 'phosphor-react';
import styled from 'styled-components';

const Row = styled.div`
  width: max-content;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, max-content));
  grid-gap: 4px;
`;

const Stars = ({ score }) => {
  return (
    <Row>
      {[...Array(score)].map((_, i) => (
        <Star key={i} weight="fill" color="#523af2" size={24} />
      ))}
      {[...Array(5 - score)].map((_, i) => (
        <Star key={i} weight="fill" color="#bac2cd" size={24} />
      ))}
    </Row>
  );
};

export default Stars;
