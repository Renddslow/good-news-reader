import React from 'react';
import styled from 'styled-components';
import { CaretRight, CheckCircle } from 'phosphor-react';
import { Link } from 'react-router-dom';

const ItemStyled = styled.div<{ complete: boolean; isNext: boolean }>`
  color: #000;
  margin-left: calc(60px + 12px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, max-content);
  grid-gap: 12px;
  align-items: center;
  padding: 32px 0;
  font-size: 16px;
  font-weight: ${(props) => (props.complete ? 300 : 500)};

  &:not(:last-child) {
    border-bottom: 1px solid hsl(240deg, 14%, 75%);
  }

  p:first-child {
    color: ${(props) => (props.complete ? '#666' : '#000')};
    text-decoration: none !important;
  }

  p:last-child {
    color: #666;
    font-size: 12px;
    font-weight: 400;
    margin-top: 4px;
  }

  svg {
    opacity: ${(props) => (props.isNext ? 1 : 0.8)};
  }
`;

const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 4px;
  justify-content: start;
  align-items: center;

  p {
    font-size: 14px;
    font-weight: 300;
  }
`;

type Props = {
  title: string;
  reference: string;
  words: string;
  complete?: boolean;
  isNext?: boolean;
  id: number;
};

const Item = ({ title, complete = false, isNext = false, id, words, reference }: Props) => {
  return (
    <Link to={`/read/${id}/preread`} style={{ textDecoration: 'none' }}>
      <ItemStyled complete={complete} isNext={isNext}>
        {complete && <CheckCircle size={24} color="#47FFE7" />}
        <div>
          <p>{title}</p>
          <p>{reference}</p>
        </div>
        <Row>
          <p>{words}</p>
          <CaretRight size={24} weight={isNext ? 'bold' : 'regular'} />
        </Row>
      </ItemStyled>
    </Link>
  );
};

export default Item;
