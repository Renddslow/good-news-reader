import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import snarkdown from 'snarkdown';

import Markdown from './Items/Markdown/Markdown';
import { FadeInWrapper } from './Items';
import withData from './Items/withData';
import Footer from './Footer';

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 24px 24px;
  background: linear-gradient(var(--red) 50%, #fff 100%);
`;

const Padding = styled.div`
  padding-bottom: 56px;
  //color: #fff;
  p {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.85 !important;
    letter-spacing: 1.01px;
  }
`;

const enhancedSnarkdown = (markdown) =>
  markdown
    .split(/(?:\r?\n){2,}/)
    .map((l) =>
      [' ', '\t', '#', '-', '*', '>'].some((char) => l.startsWith(char))
        ? snarkdown(l)
        : `<p>${snarkdown(l)}</p>`,
    )
    .join('\n')
    .replace(/(?:<(a href="(.+?)")>)/g, '<$1 target="_blank">');

const content = [
  `When our story begins, God is beginning to create the world. Everything that he creates is good and purpose made for the flourishing of his creation. God then creates humans to dwell in his good world and gives them a unique placement among all the other creatures. They are designed to be his royal representatives – his image bearers, ruling over the fish of the sea, and the birds of the air, and the beasts of the field. In Genesis 2:7, God fills the humans with the breath of life and makes them living beings. God sets the humans in a beautiful garden called Eden (or delight in Hebrew). There they are given the special task of tending God's good world as farmers and gardeners.
  
  
  In this short introduction to the Scriptures, we're introduced to an important concept: human beings were designed to be living beings sustained by God's abundant life. Meditate on this passage deeply. Pay attention to the repeated words relating to "life" or "living." This whole week we'll track the word for life/living throughout the Scriptures, and meditate on how that word finds its fulfillment in Jesus and the Gospel of John.`,
  `Adam (which in Hebrew means "human") and Eve (which in Hebrew is another word for "life") are placed in the garden of Eden. Here we really experience the good _chay_ (life). Human and Life are placed atop a garden mountain tasked with caring for all the _chay_ (living creatures).
  
  
  But suddenly, and we don't know why, a new _chay_ (living creature) enters the picture. And this _chay_ is crafty. More crafty than all the other _chay_. The _chay_ – a serpent – deceives Human and Life into rebelling against God, into defining good and evil for themselves. In this new world, the good _chay_ (life) that God designed for the pair is shatterred.
  
  
  The tragic result as we follow the _chay_/_chayiym_ through Genesis is not only the exile of Human and Life from the garden, but the destruction of all _chay_ (living creatures).
  
  
  In the midst of judgement and destruction however, we see the mercy of God, saving a remnant and providing a hope for a future where new, abundant _chay_ (life) might be found.`,
  `What is the source of _chay_ (life)? How do we sustain a long and good _chay_ (life)? As we continue to follow chay throughout the Hebrew Bible – and now into the New Testament as it becomes zoe – we have seen the tragic story of a good life turned sour. Living things are punished because of the rebellion of two humans and a beast.
  
  
  Now they are cut off from the tree of _chayiym_ (life). But how do they still live if they are cut off from the source of life? We find that through the rest of the Hebrew Bible we are given a taste of YHWH as the source of life, despite the continued rebellion of humanity. The promise of the Gospel of John is that this life would blossom into eternal life. And this is where we're introduced to our next word: _zoe_. This is the Greek word for life, and we'll become acquainted with it in this reading and the next.`,
  `We've encountered the source of _chay_ and _zoe_. It can only come from God. But we're still left with the curse of death. Now comes Jesus, claiming to be the _zoe_ himself. But does that undo death? Will we be restored to the good life we found in the garden?
  
  
  In this reading we'll discover that there is a new promise offered. It isn't quite the life in the garden. It's something new. It's an eternal life mixed in with this concept of "resurrection."
  
  
  As you engage these next readings, meditate on the enhanced meaning that eternal life has in light of our previous readings. How do our Genesis 3 and 8 readings bring compare in light of 1 Corinthians 15?
  
  
  As always, let these passages become part of you and go back to earlier readings to see how the meaning evolves as you continue to meditate on the Scriptures.`,
  `"John offers one of the most beautiful and complex openings to any Gospel account, even to any of the books of the New Testament. In a sweep of imagery and hyperlinked language, John takes us from creation to the incarnation of Jesus and his baptism. The promise of John 1 is that new life is found in Jesus and that he will preserve his people even through death.
  
  
  This stirring portrait will conclude all but one of our weekly readings. As we read this week, we'll encounter the occurrences of the word _zoe_ and think about all the other occurrences of _zoe_, _chayiym_, and _chay_ we encountered this week throughout Scripture. We'll remember that God is the source of life, and that the correction for humanity's rebellion is found in Jesus.
  
  
  Meditate on this passage slowly and consider looking back at some of our previous readings as you ponder the mystery of the incarnation and what it means for your own _zoe_ (life)."`,
  `We begin our reading this week with a peculiar story. If you've ever read the book of Genesis before (and if you haven't, you ought to), you'll recall the character named Abraham. Abraham was a man called out of Babylon to be the start of a new nation that God would use to bless the whole world. God made a particularly special promise to Abraham, despite he and his wife's advanced age, they would have a son who would launch their new nation.

The story of Abraham is mixed tale of some obedience and allegiance towards YHWH mixed with a consistent theme of Abraham hellbent on seizing the promise for himself. At first he tries to pass the inheritance to a servant, than he abuses and oppresses a slave girl to try to gain an heir. His wife, with whom Abraham is meant to start this new nation, is twice bardered off to a powerful ruler _by Abraham_. All to save his own skin.

Nevertheless, YHWH's promises never fail. Abraham and his wife are blessed with a boy they name Isaac. 

In this story however, YHWH seems to ask for the boy back. Interestingly, Abraham is described as loving (_ahav_) the boy, which is the first instance of the verb form of "love" in the Hebrew Bible.`,
  `The epic narrative of Torah (and indeed the whole Hebrew Bible) is the loving, faithfulness of YHWH. It seems that God does not tire of loving his people, even when their responce is apostasy, synchetism, and rebellion. But God isn't a doormat or like a punching bag. In fact, God seeks what can seem like an exacting response from his people. He asks that his people love (_ahav_) YHWH, keep his teachings and obey them, and love (_ahav_) their fellow humans.

Often we can get caught up in the minutia of the Torah instructions. We can feel like those commands and instructions have nothing to do with us (and to be fair, we don't have to kill a bull once a year or have Pastor Bart inspect our house when there's mold). But the heartbeat of the instructions is love. Jesus affirms this when he says that the Law and the Prophets hang on this notion.

Meditate on what God expects our response to be to his loving, faithfulness.`,
  `God's love to his people his echoed back by his people, a harmony to his melody. As we saw in the previous reading, this is first expressed through obedienece to God's commandments. We don't follow the Lord's teaching out of compulsion or obligation. Sometimes it may feel that way as the Spirit trains our spirits and leads us through dry seasons. But rather than an obligation, our obedience is an expression of our own love to God. 

As we move into the New Testament and to the writings of the Apostles, we find that more than just obedience, but conscious practice of loving God, loving our siblings in Christ, and loving our neighbor. In these next three chapters we'll read about our commitment to love one another. And we'll see how this love flows from our being in the Spirit and having the mind of Christ.`,
  `Once again we find ourselves at this strange story in Genesis 22. At the so-called binding of Isaac. (You might wish to think of it as a sacrifice, but of course, Isaac is not the one sacrificed in this story). Remember, the Bible is [meditation literature](https://bibleproject.com/explore/video/bible-jewish-meditation-literature-h2r/), which means we will find ourselves moving back and forth, marinating on certain texts as their meanings are enhanced by other texts.

In this case, the story of the binding of Isaac will be illuminated in light of the famous John 3:16 chapter. John 3:16 marks the first appearance in John of the Greek work _agapao_, which is a verb meaning "to love." (You should have encountered it yesterday during your reading of the Epistles).

The key connection here is between Genesis 22:2 and John 3:16. You'll read them in context in a moment. As you read them, pay attention to the words "love" and "only son." Meditate on this connection. What additional meaning does this bring to the binding of Isaac. What additional meaning does this bring to John 3:16.`,
  `John 1 is our home-base for this reader. We'll read and re-read it each week as we build our vocabulary and experience the Good News. 

As we noted in the pre-read in the previous reading however, the word "love" doesn't appear until John 3. This means that for this week, you won't utilize your new vocabulary words in John 1. However, remember that the narrative of John 1 is of the incarnation of Jesus. Of God sending his one and only son. While the _word_ love is not present, God's love is.

Meditate on the love God demonstrates in John 1, and as you do, consider how you might harmonize with God's love, echoing God's love back to him, and radiating it out to the world.`,
];

const PreRead = ({ data }) => {
  const params = useParams();

  return (
    <Wrapper>
      <FadeInWrapper>
        <h2>Pre-Read</h2>
        <Padding>
          <Markdown
            preread
            data={{
              content: enhancedSnarkdown(content[parseInt(params.page, 10) - 1]),
            }}
          />
        </Padding>
        <Footer data={data} />
      </FadeInWrapper>
    </Wrapper>
  );
};

export default withData(PreRead);
