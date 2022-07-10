import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Markdown, { ContentWrapper } from './Items/Markdown/Markdown';
import { FadeInWrapper } from './Items';
import Video from './Items/Video';
import Footer from './Footer';

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 24px 24px;
`;

const Intro = () => {
  return (
    <Wrapper>
      <FadeInWrapper>
        <ContentWrapper>
          <p>Welcome to our reader.</p>
          <p>
            Throughout this sermon series we'll trace a path to the Good News of Jesus found in
            John's Gospel taking a somewhat unusual route.
          </p>
          <p>
            Throughout the Bible, the writers, under the guidance of the Holy Spirit, developed
            patterns of language that link thoughts and imagery over generations. We have explored
            some of these patterns in the past, which we call hyperlinks. In this series, we'll look
            below the surface of our English Bible translations to follow the words themselves to
            shed new light on the Good News of Jesus.
          </p>
        </ContentWrapper>
        <Video
          data={{
            title: 'The Bible is Ancient Jewish Meditation Literature',
            src: 'https://www.youtube.com/embed/VhmlJBUIoLk',
            description:
              "Remember, the Bible isn't like a novel, a textbook, or a secret magical tome. It's literature designed for a lifetime of reading and study. This series, we'll activate a new skill that you can use to meditate on the Scriptures. If the idea of the Bible as meditation literature is new to you, check out this video from BibleProject.",
          }}
          titleSize="h2"
        />
        <Markdown
          data={{
            title: 'Words and Progress',
            content: `<p>As you go you'll discover each one of our six key English words that we'll be studying this series. But underneath, you'll find at least two ancient words in Greek and Hebrew. Our goal with this reader is to help you become familiar with those words.</p><p>You'll find words highlighted in green. When you collect them, you'll unlock a fun review session to help solidify the words in your mind. Each week we'll add new styles of practice sessions to help you internalize all of thse words.</p><p>We believe that learning the ancient words of Scripture alongside a careful meditation of the Bible will help you remember that the Bible is contextually-rooted, and that by shaking off our own 21st century categories, we leave room for the Spirit to reveal something we'd never seen before.</p>`,
          }}
          titleSize="h2"
        />
        <Footer data={{}} />
      </FadeInWrapper>
    </Wrapper>
  );
};

export default Intro;
