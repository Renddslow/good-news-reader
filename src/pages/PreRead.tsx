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
  `What is the source of _chay_ (life)? How do we sustain a long and good _chay_ (life)? As we continue to follow chay throughout the Hebrew Bible – and now into the New Testament as it becomes zoe – we have seen the tragic story of a good life turned sour. Living things are punished because of the rebellion of two humans and a beast.
  
  Now they are cut off from the tree of _chayyim_ (life). But how do they still live if they are cut off from the source of life? We find that through the rest of the Hebrew Bible we are given a taste of YHWH as the source of life, despite the continued rebellion of humanity. The promise of the Gospel of John is that this life would blossom into eternal life. And this is where we're introduced to our next word: _zoe_. This is the Greek word for life, and we'll become acquainted with it in this reading and the next.`,
  `We've encountered the source of _chay_ and _zoe_. It can only come from God. But we're still left with the curse of death. Now comes Jesus, claiming to be the _zoe_ himself. But does that undo death? Will we be restored to the good life we found in the garden?
  
  In this reading we'll discover that there is a new promise offered. It isn't quite the life in the garden. It's something new. It's an eternal life mixed in with this concept of "resurrection."
  
  As you engage these next readings, meditate on the enhanced meaning that eternal life has in light of our previous readings. How do our Genesis 3 and 8 readings bring compare in light of 1 Corinthians 15?
  
  As always, let these passages become part of you and go back to earlier readings to see how the meaning evolves as you continue to meditate on the Scriptures.`,
  `"John offers one of the most beautiful and complex openings to any Gospel account, even to any of the books of the New Testament. In a sweep of imagery and hyperlinked language, John takes us from creation to the incarnation of Jesus and his baptism. The promise of John 1 is that new life is found in Jesus and that he will preserve his people even through death.
  
  This stirring portrait will conclude all but one of our weekly readings. As we read this week, we'll encounter the occurrences of the word _zoe_ and think about all the other occurrences of _zoe_, _chayyim_, and _chay_ we encountered this week throughout Scripture. We'll remember that God is the source of life, and that the correction for humanity's rebellion is found in Jesus. 
  
  Meditate on this passage slowly and consider looking back at some of our previous readings as you ponder the mystery of the incarnation and what it means for your own _zoe_ (life)."`,
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
