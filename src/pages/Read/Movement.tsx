import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CaretDown, Lock } from 'phosphor-react';

import MovementWrapper from './styled/MovementWrapper';
import MovementContainer from './styled/MovementContainer';
import UnlockTag from './styled/UnlockTag';
import Illustration from './styled/Illustrations';
import Rotator from './styled/Rotator';
import Panel from './styled/Panel';

type Props = {
  illustration?: string; // TODO: remove optional before flight
  first?: boolean;
  subtitle: string;
  title: string;
  children: React.ReactElement[];
  locked?: boolean;
  unlocks: Date;
};

const Title = styled.p`
  font-weight: 600;
  margin-bottom: 6px;
`;

const Reference = styled.p`
  font-size: 16px;
`;

const fmt = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

const Movement = ({
  illustration,
  subtitle,
  title,
  children,
  first = false,
  locked = false,
  unlocks,
}: Props) => {
  const [open, setOpen] = useState(false);
  locked = !first && locked;

  const props = locked
    ? { tabIndex: -1 }
    : {
        role: 'button',
        'aria-label':
          'Click/tap to expand the movement to see activities and readings associated with this movement',
        onClick: () => setOpen((s) => !s),
        tabIndex: 0,
      };

  return (
    <MovementContainer open={open}>
      <MovementWrapper {...props} first={first}>
        <Illustration src={illustration} alt={`Week illustration of ${title}`} />
        <div>
          <Title>{title}</Title>
          <Reference>
            {locked ? <UnlockTag>Unlocks {fmt.format(unlocks)}</UnlockTag> : subtitle}
          </Reference>
        </div>
        <Rotator up={open}>{locked ? <Lock size={24} /> : <CaretDown size={24} />}</Rotator>
      </MovementWrapper>
      {open && <Panel>{children}</Panel>}
    </MovementContainer>
  );
};

export default Movement;
