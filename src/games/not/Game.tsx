import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Introduction from './Introduction';
import Stars from './Stars';
import words from '../../pages/Items/words';
import OopsModal from './OopsModal';

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 24px;
  position: relative;
  margin: 0 auto;
  font-family: var(--sans-serif);
  height: 100%;
`;

const Instruction = styled.p`
  width: 100%;
  text-align: center;
  margin-bottom: 12px;
`;

const Column = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 64px;
  margin-top: 56px;
`;

const strike = keyframes`
  from {
    transform: scaleX(0);
  }
  
  to {
    transform: scale(1);
  }
`;

const Container = styled.div`
  width: max-content;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 8px;

  p {
    text-align: center;
    font-size: 24px;
  }
`;

const Button = styled.button<{ oops: boolean; strike: boolean }>`
  appearance: none;
  border: 0;
  background: transparent;
  padding: 12px 24px;
  font-size: 48px;
  text-align: center;
  display: block;
  font-weight: ${(props) => (props.oops ? '700' : '500')};
  color: ${(props) => (props.oops ? '#fff' : '#000')};
  border-radius: 4px;
  ${(props) => props.oops && 'border: 2px dashed #523af2; background: #a398f8;'}
  position: relative;
  font-weight: ${(props) => (props.strike ? '700' : '500')};

  ::before {
    content: ${(props) => props.strike && '""'};
    display: ${(props) => props.strike && 'block'};
    width: calc(100% - 48px);
    position: absolute;
    height: 4px;
    background: #000;
    left: 25px;
    top: 50%;
    animation-name: ${strike};
    animation-duration: 0.2s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    transform-origin: left;
  }
`;

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const Game = () => {
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [score, setScore] = useState(0);
  const [currentWords, setCurrentWords] = useState([]);
  const [wrongWord, setWrongWord] = useState('');
  const [showOops, setShowOops] = useState(false);
  const [oopsedWords, setOopsedWords] = useState([]);
  const [pointEarned, setPointEarned] = useState(false);

  const handleClick = (word) => () => {
    if (word === wrongWord) {
      setScore(score + 1);
      setPointEarned(true);
      setTimeout(() => {
        selectWords();
        setPointEarned(false);
        setOopsedWords([]);
      }, 2500);
    } else {
      setShowOops(true);
      setOopsedWords([...oopsedWords, word]);
    }
  };

  useEffect(() => {
    selectWords();
  }, []);

  useEffect(() => {
    let cancel;
    if (showOops === true) {
      cancel = setTimeout(() => {
        setShowOops(false);
      }, 4700);
    }
    return () => clearTimeout(cancel);
  }, [showOops]);

  const selectWords = () => {
    const families = new Set(Object.keys(words).map((key) => words[key].family));

    const randomFamily = Array.from(families.values())[Math.floor(Math.random() * families.size)];
    const wordsInFamily = Object.keys(words).filter((key) => words[key].family === randomFamily);

    const randomWordKey = wordsInFamily[Math.floor(Math.random() * wordsInFamily.length)];
    const wordsRemaining = wordsInFamily.filter((key) => key !== randomWordKey);
    const pairWordKey = wordsRemaining[Math.floor(Math.random() * wordsRemaining.length)];

    const remainingFamilies = Array.from(families.values()).filter((s) => s !== randomFamily);
    const randomOtherFamily =
      remainingFamilies[Math.floor(Math.random() * remainingFamilies.length)];
    const wordsInOtherFamily = Object.keys(words).filter(
      (key) => words[key].family === randomOtherFamily,
    );
    const otherWordKey = wordsInOtherFamily[Math.floor(Math.random() * wordsInOtherFamily.length)];

    setCurrentWords(shuffle([randomWordKey, pairWordKey, otherWordKey]));
    setWrongWord(otherWordKey);
  };

  return (
    <>
      <Wrapper>
        {showIntroduction && <Introduction onClick={() => setShowIntroduction(false)} />}
        {!showIntroduction && score < 5 && (
          <>
            <Instruction>Tap the word that doesn't belong below</Instruction>
            <Stars score={score} />
            <Column>
              {currentWords.map((word) => (
                <Container key={word}>
                  <Button
                    onClick={handleClick(word)}
                    oops={oopsedWords.includes(word)}
                    disabled={showOops || pointEarned}
                    strike={pointEarned && wrongWord === word}
                  >
                    {capitalize(word)}
                  </Button>
                  {pointEarned && wrongWord === word && <p>Definition: {words[word].definition}</p>}
                </Container>
              ))}
            </Column>
          </>
        )}
        {showOops && oopsedWords.length && (
          <OopsModal definition={words[oopsedWords[oopsedWords.length - 1]].definition} />
        )}
      </Wrapper>
    </>
  );
};

export default Game;
