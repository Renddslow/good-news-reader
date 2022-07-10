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
            Throughout this sermon series we'll read through the book of Revelation slowly, movement
            by movement.
          </p>
          <p>
            In this introduction we want to introduce to a few concepts that have informed the way
            this reader will work. You'll watch a few videos and read a little bit about how we put
            this together and what we hope for you to learn.
          </p>
          <p>
            Fundamentally, the Bible is already a complex and often hard-to-read book. Revelation
            takes all of the challenges with the Bible, ratchets them up, and then throws them in a
            blender. One of the major reasons for that is that the book of Revelation draws heavily
            from the rest of the Scriptures that came before it in the canon.
          </p>
          <p>
            We want to help you read the book of Revelation just a little bit closer to the way a
            persecuted, first century Christian may have read it. And that starts by understanding
            the Bible as a unique form of literature.
          </p>
        </ContentWrapper>
        <Video
          data={{
            title: 'The Bible is Ancient Jewish Meditation Literature',
            src: 'https://www.youtube.com/embed/VhmlJBUIoLk',
            description:
              "The Bible isn't like a novel, a textbook, or a secret magical tome. It's literature designed for a lifetime of reading and study. Check out this video from BibleProject on just what it means for the Bible to be meditation literature.",
          }}
          titleSize="h2"
        />
        <Markdown
          data={{
            content:
              '<p>The book of Revelation has four primary movements which are surrounded by a short prologue and a short epilogue. We can identify them in the text by the use of the repeated phrase "in the Spirit" (Revelation 1:10, 4:2, 17:3, 21:10).<a href="#ref1" class="has-sup"><sup id="ref1_fn">1</sup></a> These give us helpful markers to see that John is hinting at how he wants us to think about the structure of this book.</p><p>We\'ll follow this structure, reading a movement over the course of one to two weeks and seeing how each movement contributes to the unified vision of both the book of Revelation and that of the whole Bible.</p>',
          }}
        />
        <Markdown
          data={{
            title: 'Links and Progress',
            content: `<p>As you go you'll be rewarded with <strong>progress</strong> markers and <strong>links</strong>.</p><p>Progress markers indicate that you've read or otherwise engaged with one of the pages in the reader. Some pages have videos, some have a short explainer essay, and most have the words of Scripture (it is a Bible reader, after all). There are 22 pages in total, and you'll be able to track your progress in the header at the top of each page.</p><p>Links are a new feature to Flatland's Bible readers. We mentioned above that the book of Revelation is <em>filled</em> with references, allusions, themes, and literary patterns that show up throughout the rest of Scripture. Keep an eye out for these links as you read.</p><p>If you click them, we'll give you a short explainer about that link. When it's a reference, you'll be able to read the passage or passages John is referencing. By clicking them, you'll also add them to your overall link count.</p><p>Remember, the goal isn't just to collect progress markers or links, but to actively read the Bible as a unified story that leads to Jesus in an unhurried and thoughtful way.</p><p>We hope that this will help you on the journey.</p>`,
          }}
          titleSize="h2"
        />
        <Footer data={{}} />
      </FadeInWrapper>
    </Wrapper>
  );
};

export default Intro;
