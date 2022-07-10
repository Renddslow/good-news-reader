import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Scripture from './Scripture';
import withData from './withData';
import AppFooter from '../Footer';
import dictionary from './words';

import { useProgress } from '../../providers/Authentication';
import WordModal from './WordModal';

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
  const { words, collectWord } = useProgress();
  const [showModal, setShowModal] = useState(false);
  const [activeWord, setActiveWord] = useState(null);
  const [collecting, setCollecting] = useState(false);

  useEffect(() => {
    const handleWords = (e) => {
      setShowModal(true);
      setActiveWord(e.detail.link);
    };
    window.addEventListener('word-click', handleWords);
    return () => window.removeEventListener('word-click', handleWords);
  }, []);

  const word = dictionary[activeWord];

  const handleWordCollection = async () => {
    setCollecting(true);
    await collectWord(activeWord, page.page);
    setCollecting(false);
    setShowModal(false);
    setActiveWord(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setActiveWord(null);
  };

  return (
    <Wrapper>
      <>
        {!loading && page && (
          <FadeInWrapper>
            <h1>{page.title}</h1>
            {page.chapters.map((chapter) => (
              <div key={chapter.id}>
                <h2 style={{ marginTop: 24 }}>{chapter.reference}</h2>
                <Scripture data={chapter} />
              </div>
            ))}
            <AppFooter data={data} />
          </FadeInWrapper>
        )}
        {showModal && activeWord && (
          <WordModal
            lang={word.lang}
            definition={word.definition}
            word={activeWord}
            collected={!!words.find((w) => w.word === activeWord)}
            onClose={handleClose}
            onClick={handleWordCollection}
          />
        )}
      </>
    </Wrapper>
  );
};

export default withData(Item, false);
