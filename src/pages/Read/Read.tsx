import React, { useEffect, useState } from 'react';
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
import { FadeInWrapper } from '../Items';

const isComplete = (completions, page: number) => completions.find((p) => p.page === page);

type Week = {
  illustration: string;
  title: string;
  subtitle: string;
  unlocks: [year: number, month: number, day: number];
  totalWords: number;
  words: string[];
  pages: number[];
};

type Page = {
  page: number;
  title: string;
  chapters: { id: string; reference: string }[];
  titleReference: string;
  words: string[];
};

type Assets = {
  weeks: Week[];
  pages: Page[];
};

const Read = () => {
  const { user } = useAuthenticatedUser();
  const { completions, words } = useProgress();
  const [assets, setAssets] = useState<Assets>({} as Assets);
  const [loading, setLoading] = useState(false);

  const today = new Date();

  useEffect(() => {
    setLoading(true);
    fetch('/assets/assets.json')
      .then((d) => d.json())
      .then((d) => setAssets(d))
      .then(() => setLoading(false));
  }, []);

  const allUniqueWords = new Set();
  assets?.weeks?.forEach((week) => {
    week?.words?.forEach((word) => allUniqueWords.add(word));
  });

  return (
    <Wrapper>
      <Header>
        <h1>Good News Reader</h1>
        {/*<ProfileButton />*/}
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
              {/* TODO: week 2 unlock */}
              {/*<Link to="/practice">*/}
              {/*  <Star weight="fill" size="16" />*/}
              {/*  Practice Words (0/{allUniqueWords.size})*/}
              {/*</Link>*/}
            </Row>
          </div>
        </IntroCard>
        {!loading && (
          <FadeInWrapper>
            <div className="movements">
              {(assets?.weeks || []).map((week, idx) => {
                const [y, m, d] = week.unlocks;
                const unlocks = new Date(y, m, d);
                const thisWeeksWords = words.filter((word) => {
                  return week.words.includes(word.word);
                });

                return (
                  <Movement
                    key={week.title}
                    illustration={week.illustration}
                    title={week.title}
                    subtitle={week.subtitle}
                    first={idx === 0}
                    locked={isBefore(today, unlocks)}
                    unlocks={unlocks}
                  >
                    <>
                      {week.pages.map((id) => {
                        const page = assets?.pages.find((p) => p.page === id);
                        return (
                          <Item
                            key={id}
                            title={page.title}
                            reference={page.titleReference}
                            words={page.words.join(', ')}
                            id={id}
                            complete={isComplete(completions, page.page)}
                          />
                        );
                      })}
                      {!!thisWeeksWords.length && (
                        <Practice
                          word={week.title}
                          total={week?.words?.length}
                          collected={thisWeeksWords.length}
                        />
                      )}
                    </>
                  </Movement>
                );
              })}
            </div>
          </FadeInWrapper>
        )}
      </div>
    </Wrapper>
  );
};

export default Read;
