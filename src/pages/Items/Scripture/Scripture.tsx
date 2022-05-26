import React from 'react';

import { ContentWrapper } from '../Markdown/Markdown';

type ChapterRef = `rev${number}`;
type Ref = {
  chapter: ChapterRef;
  verse: number;
};

const getChapter = (ref: ChapterRef) => {
  const [, ch] = /(\d+)$/.exec(ref);
  return ch;
};

const getReference = (ref: Ref) => {
  return `${getChapter(ref.chapter)}:${ref.verse}`;
};

const Scripture = ({ data, includeTitle = true }) => {
  const title = includeTitle
    ? `Revelation ${getReference(data.start)}-${getReference(data.end)}`
    : '';

  return (
    <>
      {title && <h1>{title}</h1>}
      <ContentWrapper>Hello</ContentWrapper>
    </>
  );
};

export default Scripture;
