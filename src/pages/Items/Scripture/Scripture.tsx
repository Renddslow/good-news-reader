import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ContentWrapper } from '../Markdown/Markdown';
import Poetry from './Poetry';
import hash from '../../../utils/hash';
import Paragraph from './Paragraph';

const Scripture = ({ data }) => {
  const location = useLocation();

  useEffect(() => {
    let cancel;
    if (location.hash) {
      cancel = setTimeout(() => {
        document.getElementById(location.hash.replace('#', '')).scrollIntoView({
          block: 'center',
        });
      }, 400);
    }

    return () => clearTimeout(cancel);
  }, [location.hash]);

  return (
    <>
      <ContentWrapper>
        {data.content.map((block) =>
          block.type === 'poetry' ? (
            <Poetry key={hash(JSON.stringify(block))} content={block} />
          ) : (
            <Paragraph key={hash(JSON.stringify(block))} content={block} />
          ),
        )}
      </ContentWrapper>
    </>
  );
};

export default Scripture;
