import React, { useState } from 'react';
import styled from 'styled-components';

const Hyperlink = styled.button`
  appearance: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  text-decoration: none;
  position: relative;
  box-sizing: border-box;
  padding: 0 6px;
  border-radius: 4px;
  width: fit-content;
  background: linear-gradient(0deg, var(--light-purple) 50%, #fff0);
  display: inline-block;
  cursor: pointer;
  font-weight: 400;
  color: #000;

  &::after {
    content: '';
    width: calc(100% - 12px);
    height: 0;
    border-bottom: 3px dashed var(--green);
    position: absolute;
    bottom: 3px;
    left: 6px;
  }
`;

type Props = {
  word: string;
  collected: boolean;
  transliterated: string;
  id: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default ({ collected, transliterated, word, ...props }: Props) => {
  const [showTransliteration, setShowTransliteration] = useState(true);

  const handleClick = (e) => {
    if (collected) {
      setShowTransliteration((s) => !s);
    }
    props.onClick(e);
  };

  if (transliterated === 'chayyim') {
    transliterated = transliterated.replace('yyim', 'yiym');
  }

  return (
    <Hyperlink {...props} onClick={handleClick}>
      {collected && showTransliteration ? transliterated : word}
    </Hyperlink>
  );
};
