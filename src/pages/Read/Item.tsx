import React from 'react';
import styled from 'styled-components';
import {
  BookOpen,
  ArticleMedium,
  YoutubeLogo,
  CaretRight,
  CheckCircle,
  Gift,
} from 'phosphor-react';

const icons = {
  read: BookOpen,
  video: YoutubeLogo,
  essay: ArticleMedium,
  bonus: Gift,
};

const ItemStyled = styled.div<{ complete: boolean; isNext: boolean }>`
  color: #fff;
  margin-left: calc(60px + 12px);
  display: grid;
  grid-template-columns: minmax(0, max-content) minmax(0, 1fr) minmax(0, max-content);
  grid-gap: 12px;
  align-items: center;
  padding: 32px 0;
  font-size: 16px;
  font-weight: ${(props) => (props.complete ? 300 : 500)};

  &:not(:last-child) {
    border-bottom: 1px solid hsl(240deg, 14%, 75%);
  }

  p {
    color: ${(props) => (props.complete ? '#dfdfef' : '#fff')};
  }

  svg {
    opacity: ${(props) => (props.isNext ? 1 : 0.8)};
  }
`;

type Props = {
  title: string;
  type: 'read' | 'video' | 'essay' | 'bonus';
  complete?: boolean;
  isNext?: boolean;
};

const Item = ({ title, type, complete = false, isNext = false }: Props) => {
  const Icon = icons[type];

  return (
    <ItemStyled complete={complete} isNext={isNext}>
      {complete ? <CheckCircle size={24} color="#47FFE7" /> : <Icon size={24} />}
      <p>{title}</p>
      <CaretRight size={24} weight={isNext ? 'bold' : 'regular'} />
    </ItemStyled>
  );
};

export default Item;
