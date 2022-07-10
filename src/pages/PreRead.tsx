import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import snarkdown from 'snarkdown';

import Markdown, { ContentWrapper } from './Items/Markdown/Markdown';
import { FadeInWrapper } from './Items';
import withData from './Items/withData';
import Footer from './Footer';

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 24px 24px;
`;

const enhancedSnarkdown = (markdown) =>
  markdown
    .split(/(?:\r?\n){2,}/)
    .map((l) =>
      [' ', '\t', '#', '-', '*', '>'].some((char) => l.startsWith(char))
        ? snarkdown(l)
        : `<p>${snarkdown(l)}</p>`,
    )
    .join('\n');

const content = [
  `When our story begins, God is beginning to create the world. Everything that he creates is good and purpose made for the flourishing of his creation. God then creates humans to dwell in his good world and gives them a unique placement among all the other creatures. They are designed to be his royal representatives – his image bearers, ruling over the fish of the sea, and the birds of the air, and the beasts of the field. In Genesis 2:7, God fills the humans with the breath of life and makes them living beings. God sets the humans in a beautiful garden called Eden (or delight in Hebrew). There they are given the special task of tending God's good world as farmers and gardeners. 
  
  In this short introduction to the Scriptures, we're introduced to an important concept: human beings were designed to be living beings sustained by God's abundant life. Meditate on this passage deeply. Pay attention to the repeated words relating to "life" or "living." This whole week we'll track the word for life/living throughout the Scriptures, and meditate on how that word finds its fulfillment in Jesus and the Gospel of John.`,
  `Adam (which in Hebrew means "human") and Eve (which in Hebrew is another word for "life") are placed in the garden of Eden. Here we really experience the good _chay_ (life). Human and Life are placed atop a garden mountain tasked with caring for all the _chay_ (living creatures).
  
  But suddenly, and we don't know why, a new _chay_ (living creature) enters the picture. And this _chay_ is crafty. More crafty than all the other _chay_. The _chay_ – a serpent – deceives Human and Life into rebelling against God, into defining good and evil for themselves. In this new world, the good _chay_ (life) that God designed for the pair is shatterred. 
  
  The tragic result as we follow the _chay_/_chayyim_ through Genesis is the exile of Human and Life from the garden, but the destruction of all _chay_ (living creatures). 
  
  In the midst of judgement and destruction however, we see the mercy of God, saving a remnant and providing a hope for a future where new, abundant _chay_ (life) might be found.`,
];

const PreRead = ({ data }) => {
  const params = useParams();

  return (
    <Wrapper>
      <FadeInWrapper>
        <ContentWrapper>
          <Markdown
            data={{
              content: enhancedSnarkdown(content[parseInt(params.page, 10) - 1]),
            }}
          />
        </ContentWrapper>
        <Footer data={data} />
      </FadeInWrapper>
    </Wrapper>
  );
};

export default withData(PreRead);