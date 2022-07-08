import React from 'react';
import { Link } from 'react-router-dom';
import isBefore from 'date-fns/isBefore';
import { Star } from 'phosphor-react';

import Header from './styled/Header';
import IntroCard from './styled/IntroCard';
import Row from './styled/Row';
import Wrapper from './styled/Wrapper';

import { useAuthenticatedUser, useProgress } from '../../providers/Authentication';
import Movement from './Movement';
import Item from './Item';
import ProfileButton from './ProfileButton';
import Text from '../../components/Text';
import Practice from './Practice';

const isComplete = (completions, movement: number, page: number) =>
  completions.find((p) => p.movement === movement && p.page === page);

const WEEKS = [
  {
    illustration: '/cherubim.png',
    title: 'Life',
    subtitle: 'Week 1 • July 10th – 16th',
    unlocks: new Date(2022, 6, 10),
  },
  {
    illustration: '/cherubim.png',
    title: 'Love',
    subtitle: 'Week 2 • July 17th – 23rd',
    unlocks: new Date(2022, 6, 17),
  },
  {
    illustration: '/cherubim.png',
    title: 'Name',
    subtitle: 'Week 3 • July 24th – 30th',
    unlocks: new Date(2022, 6, 24),
  },
  {
    illustration: '/cherubim.png',
    title: 'Blood',
    subtitle: 'Week 4 • July 31st – 6th',
    unlocks: new Date(2022, 6, 31),
  },
  {
    illustration: '/cherubim.png',
    title: 'Believe',
    subtitle: 'Week 5 • July 7th – 13th',
    unlocks: new Date(2022, 7, 7),
  },
  {
    illustration: '/cherubim.png',
    title: 'Witness',
    subtitle: 'Week 6 • July 14th – 20th',
    unlocks: new Date(2022, 7, 14),
  },
];

const Read = () => {
  const { user } = useAuthenticatedUser();
  const { completions } = useProgress();

  const today = new Date();

  return (
    <Wrapper>
      <Header>
        <h1>Good News Reader</h1>
        <ProfileButton />
      </Header>
      <div>
        <IntroCard>
          <div>
            <Text>
              Study the native meaning of specific words to help uncover and interpret the Good
              News.
            </Text>
            <Row>
              <Link to="/read/intro">Learn More</Link>
              <Link to="/practice">
                <Star weight="fill" size="16" />
                Practice Words (24/28)
              </Link>
            </Row>
          </div>
        </IntroCard>
        <div className="movements">
          {WEEKS.map((week, idx) => (
            <Movement
              key={week.title}
              illustration={week.illustration}
              title={week.title}
              subtitle={week.subtitle}
              first={idx === 0}
              locked={isBefore(today, week.unlocks)}
              unlocks={week.unlocks}
            >
              <Item
                title="The Throne Room of Heaven"
                reference="Genesis 1-2"
                words="Chayyim/Chay"
                id={0}
                complete={isComplete(completions, 1, 0)}
              />
              <Item
                reference="Genesis 3"
                words="Chay"
                title="The Throne Room of Heaven"
                id={0}
                complete={isComplete(completions, 1, 0)}
              />
              <Practice word="Life" total={6} collected={4} />
            </Movement>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Read;
