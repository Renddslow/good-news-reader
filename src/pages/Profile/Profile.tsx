import React from 'react';
import { Info, BookmarkSimple } from 'phosphor-react';
import styled from 'styled-components';
import { default as ColorHash } from 'color-hash';

import { useProgress } from '../../providers/Authentication';
import { FadeInWrapper } from '../Items';
import { Header } from '../ReadHeader';
import Home from '../Home';
import withData from '../Items/withData';
import CompletionTag from '../../components/CompletionTag';

const GridHeader = styled.div``;

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 24px 24px;
`;

const Information = styled.p`
  position: relative;
  margin: 12px 0 24px;

  svg {
    position: relative;
    margin-right: 4px;
    bottom: -3px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 8px;
`;

const Card = styled.div`
  --shadow-color: 0deg 0% 73%;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-gap: 24px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 1.4px hsl(var(--shadow-color) / 0.04),
    0 4px 5.8px -0.1px hsl(var(--shadow-color) / 0.14),
    0 8.1px 11.7px -0.2px hsl(var(--shadow-color) / 0.25),
    0 16.7px 24.2px -0.4px hsl(var(--shadow-color) / 0.36);
  padding: 8px;

  svg {
    margin: 0 auto;
  }

  h3 {
    text-align: center;
  }
`;

const isComplete = (completions, movement: number, page: number) =>
  completions.find((p) => p.movement === movement && p.page === page);

const Profile = ({ loading, data }) => {
  const { completions, links } = useProgress();

  const color = new ColorHash.default();

  return (
    <>
      <Header>
        <Home />
      </Header>
      <Wrapper>
        {!loading && (
          <FadeInWrapper>
            <GridHeader>
              <h2>Links</h2>
              <Information>
                <Info weight="bold" />
                These are all the links you've collected from the readings so far. If you missed
                one, head back into that reading and look for the missing link so you can experience
                the Bible as unified, meditation literature.
              </Information>
            </GridHeader>
            <Grid />
            <GridHeader>
              <h2>Pages</h2>
              <Information>
                <Info weight="bold" />
                All of the pages you've completed are kept here. Don't be afraid to revisit a
                Scripture reading in order to{' '}
                <a
                  href="https://www.youtube.com/watch?v=VhmlJBUIoLk"
                  target="_blank"
                  rel="noreferrer"
                >
                  meditate
                </a>{' '}
                on it.
              </Information>
            </GridHeader>
            <Grid>
              {[{ title: 'Introduction', movement: 0, item: 0 }, ...data]
                .filter((item) => isComplete(completions, item.movement, item.item))
                .map((asset) => (
                  <Card key={`${asset.movement}-${asset.item}`}>
                    <BookmarkSimple
                      weight="duotone"
                      size={48}
                      color={color.hex(JSON.stringify(asset))}
                    />
                    <div>
                      <h3>{asset.title || ''}</h3>
                      <CompletionTag
                        completedAt={isComplete(completions, asset.movement, asset.item).read_at}
                      />
                    </div>
                  </Card>
                ))}
            </Grid>
          </FadeInWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default withData(Profile, true);
