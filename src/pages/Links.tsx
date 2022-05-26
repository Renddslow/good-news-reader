import React, { createRef, useEffect, useState } from 'react';
import { Triangle } from 'phosphor-react';

import ProgressWrapper from './styles/ProgressWrapper';
import ProgressContainer from './styles/ProgressContainer';
import ProgressTooltip from './styles/ProgressTooltip';

const Progress = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const ref = createRef();

  useEffect(() => {
    let cancel;
    if (showTooltip) {
      cancel = setTimeout(() => setShowTooltip(false), 5000);
    }

    return () => clearTimeout(cancel);
  }, [showTooltip]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      // @ts-ignore
      if (ref.current && !ref.current?.contains(e.target)) {
        setShowTooltip(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [ref]);

  return (
    <ProgressContainer>
      <ProgressWrapper
        // @ts-ignore
        ref={ref}
        role="button"
        aria-label="Tap to display current links collected count"
        onClick={() => setShowTooltip(true)}
      >
        <Triangle weight="bold" size="16" />
        <span>0/50</span>
      </ProgressWrapper>
      {showTooltip && <ProgressTooltip>You have collected 12 links.</ProgressTooltip>}
    </ProgressContainer>
  );
};

export default Progress;
