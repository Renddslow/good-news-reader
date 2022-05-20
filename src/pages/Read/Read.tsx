import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthenticatedUser } from '../../providers/Authentication';
import Movement from './Movement';
import Item from './Item';
import Text from '../../components/Text';
import ProfileButton from './ProfileButton';

const Wrapper = styled.div`
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
`;

const IntroCard = styled.div`
  width: 100%;
  padding: 24px;
  background: #001b2e;
  color: #fff;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  display: grid;
  grid-gap: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    bottom: -24px;
    right: -24px;
  }

  a {
    font-size: 16px;
    display: block;
    width: fit-content;
    padding: 4px 8px;
    border-radius: 4px;
    background: #fff;
    color: #001b2e;
    font-family: var(--sans-serif);
    text-decoration: none;
    font-weight: 500;
    margin-top: 12px;
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;

  h1 {
    font-size: 18px;
    font-weight: 900;
  }
`;

const Read = () => {
  const { user } = useAuthenticatedUser();

  return (
    <Wrapper>
      <Header>
        <h1>Revelation Reader</h1>
        <ProfileButton />
      </Header>
      <div>
        <IntroCard>
          <div>
            <Text>A new way of reading John's apocalypse</Text>
            <Link to="/intro">See How it Works</Link>
          </div>
          {/* PLACEHOLDER - DO NOT SHIP */}
          <img src="https://dma9sdczpu5q0.cloudfront.net/media/explore-v2/How%20to%20Read%20the%20Bible/Poetry/Apocalyptic%20Literature/poetry-apocolyptic_standard.png?q=65&fit=max&w=600" />
        </IntroCard>
        <div className="movements">
          <Movement title="Prologue + Movement 1" reference="1:1-3:22" first>
            <Item title="The Throne Room of Heaven" type="essay" />
            <Item title="Apocalyptic Literature" type="video" />
            <Item title="Revelation Overview, pt 1" type="video" />
            <Item title="1:1-1:8" type="read" />
            <Item title="1:9-3:22" type="read" />
            <Item title="Bonus Resources" type="bonus" />
          </Movement>
          <Movement title="Movement 2" reference="4:1-16:21">
            <Item title="The Judgement of Evil" type="essay" />
            <Item title="4:1-5:14" type="read" />
            <Item title="6:1-8:13" type="read" />
            <Item title="9:1-11:19" type="read" />
            <Item title="Revelation Overview, pt 2" type="video" />
            <Item title="12:1-14:20" type="read" />
            <Item title="15:1-16:21" type="read" />
            <Item title="Bonus Resources" type="bonus" />
          </Movement>
          <Movement title="Movement 3" reference="17:1-21:8">
            <Item title="The Day of the Lord" type="essay" />
            <Item title="Day of the Lord" type="video" />
            <Item title="17:1-19:10" type="read" />
            <Item title="19:11-21:8" type="read" />
            <Item title="Bonus Resources" type="bonus" />
          </Movement>
          <Movement title="Movement 4 + Epilogue" reference="21:9-22:21">
            <Item title="The Resurrection" type="essay" />
            <Item title="21:9-22:9" type="read" />
            <Item title="Heaven and Earth" type="video" />
            <Item title="22:10-22:21" type="read" />
            <Item title="Eternal Life" type="video" />
            <Item title="Bonus Resources" type="bonus" />
          </Movement>
        </div>
      </div>
    </Wrapper>
  );
};

export default Read;
