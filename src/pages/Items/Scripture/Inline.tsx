import React from 'react';
import { Inline as InlineType } from './types';
import styled from 'styled-components';

import hash from '../../../utils/hash';
import Hyperlink from '../../../components/Hyperlink';
import { useProgress } from '../../../providers/Authentication';

type Props = {
  content: InlineType[];
};

const Verse = styled.span`
  &:not(:first-child)::before {
    content: ' ';
  }
`;

const Inline = ({ content }: Props) => {
  const { words } = useProgress();

  return (
    <>
      {(content || []).map((char, idx) => {
        if (char.type === 'verse') {
          return <Verse key={char.reference.id} id={char.reference.id} />;
        }

        if (char.type === 'verse_end') {
          return null;
        }

        if (char.type === 'hyperlink') {
          return (
            <Hyperlink
              key={`${hash(JSON.stringify(char))}-${idx}`}
              onClick={(e) => {
                const event = new CustomEvent('word-click', {
                  detail: {
                    ...char,
                    target: e.target,
                  },
                });
                window.dispatchEvent(event);
              }}
              id={char.link}
              collected={!!words.find((w) => w.word === char.link)}
              transliterated={char.link}
              word={char.content}
            />
          );
        }

        if (char.type === 'char' && char.style === 'bold') {
          return (
            <span key={hash(JSON.stringify(char))}>
              <strong>{char.content}</strong>
            </span>
          );
        }

        if (char.type === 'char' && char.style === 'italic') {
          return (
            <span key={hash(JSON.stringify(char))}>
              <em>{char.content}</em>
            </span>
          );
        }

        return <span key={hash(JSON.stringify(char))}>{char.type === 'char' && char.content}</span>;
      })}
    </>
  );
};

export default Inline;
