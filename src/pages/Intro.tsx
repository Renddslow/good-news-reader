import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Markdown, { ContentWrapper } from './Items/Markdown/Markdown';
import { FadeInWrapper } from './Items';
import Scripture from './Items/Scripture';
import Video from './Items/Video';
import Footer from './Footer';

const Wrapper = styled.div`
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 24px 24px;
`;

const Footnotes = styled.div`
  width: 100%;
  border-top: 1px solid #ccc;
  display: block;
  margin-top: 24px;
  padding-top: 18px;
  font-size: 14px;
  line-height: 1.6;

  p {
    background: transparent;
    padding: 4px;
    margin: -4px;
    border-radius: 4px;
    transition: background-color 0.3s ease-out;
  }

  p:target {
    background: var(--light-purple);
  }
`;

const Intro = () => {
  const [loading, setLoading] = useState(true);
  const [verse, setVerse] = useState(null);

  useEffect(() => {
    fetch('/assets/psa1.json')
      .then((d) => d.json())
      .then((d) => setVerse(d))
      .then(() => setLoading(false));
  }, []);

  return (
    <Wrapper>
      <FadeInWrapper>
        {!loading && (
          <>
            <ContentWrapper>
              <p>Welcome to our reader.</p>
              <p>
                Throughout this sermon series we'll read through the book of Revelation slowly,
                movement by movement.
              </p>
              <p>
                In this introduction we want to introduce to a few concepts that have informed the
                way this reader will work. You'll watch a few videos and read a little bit about how
                we put this together and what we hope for you to learn.
              </p>
              <p>
                Fundamentally, the Bible is already a complex and often hard-to-read book.
                Revelation takes all of the challenges with the Bible, ratchets them up, and then
                throws them in a blender. One of the major reasons for that is that the book of
                Revelation draws heavily from the rest of the Scriptures that came before it in the
                canon.
              </p>
              <p>
                We want to help you read the book of Revelation just a little bit closer to the way
                a persecuted, first century Christian may have read it. And that starts by
                understanding the Bible as a unique form of literature.
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
            <h2 style={{ marginTop: '32px' }}>Psalm 1</h2>
            <Scripture data={{ content: verse }} includeTitle={false} />
            <Video
              data={{
                title: 'The Book of Revelation has 4 Literary Movements',
                src: 'https://www.youtube.com/embed/xTk9w9J9yKo',
                description:
                  'Each book of the Bible is intentionally designed by a human author in concert with the Holy Spirit. The design of a book is often first identified by its literary movements. Watch the short video from BibleProject below to learn more about literary in the Bible.',
              }}
              titleSize="h2"
            />
            <Markdown
              data={{
                content:
                  '<p>The book of Revelation has four primary movements which are surrounded by a short prologue and a short epilogue. We can identify them in the text by the use of the repeated phrase "in the Spirit" (Revelation 1:10, 4:2, 17:3, 21:10).<a href="#ref1" class="has-sup"><sup id="ref1_fn">1</sup></a> These give us helpful markers to see that John is hinting at how he wants us to think about the structure of this book.</p><p>We\'ll follow this structure, reading a movement over the course of one to two weeks and seeing how each movement contributes to the unified vision of both the book of Revelation and that of the whole Bible.</p>',
              }}
            />
            <Footnotes>
              <p id="ref1">
                <a href="#ref1_fn">[1]</a>: This was first identified by Richard Bauckham in his
                book{' '}
                <a href="https://www.logos.com/product/168132/climax-of-prophecy-studies-on-the-book-of-revelation">
                  Climax of Prophecy: Studies on the Book of Revelation
                </a>
                . You can find his discussion of the structure of Revelation starting on page 4 of
                that book.
              </p>
            </Footnotes>
            <Footer />
          </>
        )}
      </FadeInWrapper>
    </Wrapper>
  );
};

export default Intro;
