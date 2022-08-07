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
  `God's love to his people his echoed back by his people, a harmony to his melody. As we saw in the previous reading, this is first expressed through obedience to God's commandments. We don't follow the Lord's teaching out of compulsion or obligation. Sometimes it may feel that way as the Spirit trains our spirits and leads us through dry seasons. But rather than an obligation, our obedience is an expression of our own love to God. 

As we move into the New Testament and to the writings of the Apostles, we find that more than just obedience, but conscious practice of loving God, loving our siblings in Christ, and loving our neighbor. In these next three chapters we'll read about our commitment to love one another. And we'll see how this love flows from our being in the Spirit and having the mind of Christ.`,
  `Once again we find ourselves at this strange story in Genesis 22. At the so-called binding of Isaac. (You might wish to think of it as a sacrifice, but of course, Isaac is not the one sacrificed in this story). Remember, the Bible is [meditation literature](https://bibleproject.com/explore/video/bible-jewish-meditation-literature-h2r/), which means we will find ourselves moving back and forth, marinating on certain texts as their meanings are enhanced by other texts.

In this case, the story of the binding of Isaac will be illuminated in light of the famous John 3:16 chapter. John 3:16 marks the first appearance in John of the Greek work _agapao_, which is a verb meaning "to love." (You should have encountered it yesterday during your reading of the Epistles).

The key connection here is between Genesis 22:2 and John 3:16. You'll read them in context in a moment. As you read them, pay attention to the words "love" and "only son." Meditate on this connection. What additional meaning does this bring to the binding of Isaac. What additional meaning does this bring to John 3:16.`,
  `John 1 is our home-base for this reader. We'll read and re-read it each week as we build our vocabulary and experience the Good News. 

As we noted in the pre-read in the previous reading however, the word "love" doesn't appear until John 3. This means that for this week, you won't utilize your new vocabulary words in John 1. However, remember that the narrative of John 1 is of the incarnation of Jesus. Of God sending his one and only son. While the _word_ love is not present, God's love is.

Meditate on the love God demonstrates in John 1, and as you do, consider how you might harmonize with God's love, echoing God's love back to him, and radiating it out to the world.`,
  `Everyone has a name (in Hebrew, a _shem_). You may not think much about your name now, or it has some meaning. Perhaps it’s a family name or a symbolic name. Or maybe it meant nothing at all – your parents just liked it. 

In the Bible, names were often packed with meaning. Consider Noah whose name meant "rest." His father said of his name, "This one will give us comfort from our work and from the hard labor of our hands caused by the ground which YHWH has cursed." Or Abraham, who received his name from God because he would "become the father of many nations."

Names were also something to be made. They were more than just a word packed with meaning that identified you, they were a unique marker, something that you were known by. Your reputation. Your glory.

After the tragedy in the garden, humans began a project of self-aggrandizement and "making a name" for themselves. Interwoven within this spiral of self-exultation is another name: YHWH. YHWH is The Divine Name, the name which no other being has. It's not just a name, but a unique marker. Something God is known by. His reputation. His glory.

As you read, pay attention to the places where humans try to exalt themselves by building a name. Alongside those places, consider the nature of God's Name, especially in the Exodus reading.`,
  `As we started to see, God's _Shem_ (Name) is unique. When the 10 Commandments are given on Mount Sinai, God begins the covenant relationship with his people by affirming his own Name. "I am YHWH your God, who brought you out of Egypt, out of the land of slavery."

What comes after that statement is the terms by which his now chosen and liberated people will participate in ongoing feality to him. In two places in this set of readings, we'll encounter this idea of "profaning" or "taking the Name in vain." If you've grown up in church, you probably expect that this means you shouldn't use God or Jesus' name as a swear word (and in general, you shouldn't). But this has more than mere blasphemy in mind.

What we see on Sinai is the establishment of a divine-human partnership where God is acting as sort of a king over nation filled with princes. God is the established and reigning power, and he will come to aid those who swear fealty to him. In this case, it is the Israelites who swear fealty. In exchange, there are covenant obligations that they are taught to follow – things like don't worship other gods and don't steal. But the nature of this relationship is unique. The people of Israel will carry the Name of YHWH with them. When they interact with their neighbors, they will do so as YHWH's representatives. The task they have before them is to uphold the reputation of God's Name and to bring it ever more glory.`,
  `As the Israelites were preparing to enter the land YHWH had promised them, he began to speak of a place where his Name would dwell. This again captures the important association of YHWH's Name with his glory, reputation, and even himself. God had outlined the plans for a tabernacle – a dwelling place. It was a sort of elaborate tent where he could dwell among his people as they journeyed through an arid wilderness. Think of it like a cross between a church and a king's palace. 

This place was central to the worship and community of God's people, and when they entered the promised land and took up permanent homes, the tabernacle was meant to take up a permanent home among them too.

What we see in this reading is the development of a place for God to dwell among his people in the promised land. Note as you read how central YHWH's Name is in all of this.`,
  `God's _Shem_ (Name) is given a place to dwell among Israel, but very quickly the people of Israel begin to profane it. The _Shem_ of YHWH falls into disrepute as his people wed themselves to other gods, mixing in foreign – and deeply immoral – religious practices into the worship of YHWH. They also start to enslave their own people to build large palaces, abuse the poor, and ignore the plight of the widow and the orphan. 

As a result, YHWH spits his people out of the land for 70 years. They become exiles, fourth world citizens of foreign world super powers. 

But there is a promise of restoration. That somehow a faithful Israelite might bear YHWH's _Shem_ for the sake of Israel and the world. 

It is fitting then that the first time the Greek word for name (_onoma_) is used in the New Testament is used to give Jesus his name. Jesus's name literally means "YHWH saves." Not only will Jesus be the faithful Israelite who bears God's _Onoma_ in a representative sense, he _literally_ bears the _onoma_ of YHWH in his very name.

In this reading we'll encounter Jesus, and see how he glorifies the Name (_onoma_) and how as a result, he is given YHWH's _onoma_: the _onoma_ above every _onoma_.`,
  `We return again to John 1. We'll arrive at this cycle of reading armed with a new word, _onoma_ (name). 
  
  In John 1, we only see two occurrences of _onoma_. The first time is simply to identify John the Baptist. A rather mundane use – though we should always remember that names have profound meaning in the Bible (see Luke 1 for the story behind John's name).

The second time draws us into the vision of YHWH's name that we've been exploring in our readings this week. God's name is holy, worthy of honor, and is something that Jesus uniquely bears as the new Israel. Now we are told that those who believe in his Name will be given the right to be called children of God.

As you meditate on this text for the third time, remember that Jesus is bearing the Name of YHWH, and that everytime you encounter the word name ("shem"/"onoma") in the context of God, you are encountering the divine Name. That name which is above all other names.`,
  `It might be surprising to think that ancient humans thought of blood in much the same way that we do. They may not have known about blood types. They may not have performed transfusions. They probably didn't know that blood was a delivery system for oxygen in your body. However, ancient humans did know that blood makes you alive, and when your blood was spilled, often you died.

The first time we encounter blood in the Bible is after Cain kills his brother Abel. The narrative Scripture paints is startling, but not graphic. Cain strikes his brother down in the field in what feels like a PG-rated description. When YHWH confronts Cain, we as readers encounter the real violence that Cain has unleashed. "The voice of your brother's blood (_dam_) cries out to me from the ground."

This single murderous event launches a cascade of human violence. Even after God reboots humanity with Noah, he realizes that humanity's violence will just get more dark and more inventive. So he paints a picture of the consequences of human violence. 

This week's readings will be bloody (though often not violent). But don't dismiss them on account of the discomfort they might bring you. Draw yourself in to the moment, and meditate on the visceral reality of human evil.`,
  `We've seen now that human evil and violence tends to result in the spilling of the blood (_dam_) of the innocent. We won't spend the whole week tracing the spilling of innocent blood though. Rather, we're going to follow the word _dam_ through the Scriptures to see that hope actually springs from the same word.

We begin with a number of peculiar stories in which blood is used to make a sort of covering. In the first, Moses' wife performs a circumcision on Moses' son as a proxy for Moses himself. In the second, the blood of an innocent animal provides a covering so that the angel of death will pass over the homes of the faithful. And finally, we encounter our first ritual using blood, declaring that a new covenant is being forged in blood.

All of this feels quite strange. Perhaps it isn't violent, but it's still grisly. Settle into the discomfort for now. Reflect as your meditate on these texts how the same substance that has been spilled in acts of violence and evil is now a means of salvation.`,
  `We mentioned before that blood (_dam_) was not viewed very different to ancient humans compared to ourselves. That is mostly true. There is one way, however, that we view blood (_dam_) crucially different. For us blood is a necessary component of life. A bodily fluid that is needed in order to function properly. To the ancients, it was that, but it was also so much more. Blood was a physical symbol of an even deeper, spiritual reality. Blood was life (see Leviticus 17:11).

As the blood came out of a sacrificial animal, the community was reminded of the darkness of sin and death. The life of the animal then acts like a cleansing agent – like laundry detergant – to cover and clean the sin and death from the surrounding area. Its important to understand that this is a symbol, but that doesn't mean that it isn't real. Symbols are powerful, and many times in the Scriptures physical symbols are outwards signs of something real and spiritual that was happening.

As you read, think on the ways in which blood is uniquely used to cover and atone for sin and death. Meditate on this in light of the death of innocents that we observed in previous readings. And consider that God means what he says, that when these rituals were practiced that something real in time and space was affected.`,
  `As we reach the New Testament our word for blood (Hebrew _dam_) now becomes _haima_. In John _haima_ only appears a few times, but each time it does appear, it is intentional and eye opening.

We'll look at two occurrence of it, both will feel a little off putting. Yet as we observed in the last reading, blood is a powerful symbol of life. And remember, symbols are not make believe. Often times in Scripture – and in life – they are outward and physical signs of something very real and spiritual.

Jesus poured out his life for us in order that the sin and death of our world and our own project of evil would be covered. It is telling then that John makes a specific – and literal – callout to Jesus' blood being spilt on the cross.

Meditate on Jesus' instruction that his people eat his flesh and drink his blood. And then sit in quiet contemplation as you encounter his passion narrative from John's Gospel. Consider the love that Jesus had for you that he poured out his _haima_ (blood) for you.`,
  `As we return to John 1 we come to it with all of the knowledge and experience we've just gained on the role of blood (_haima_) in the Bible. It is life itself. And when used sacrificially, it becomes a cleansing agent on the sin and death that humans spill into the world. Jesus offered his _haima_ (blood) as the ultimate sacrifice, the ultimate cleansing.

Now as we come to John 1, we see one final notion of blood. We see the way in which blood brings about new life. In a very real and clinical sense, babies come into the world in blood and water. In a symbolic sense, the life of the baby is in its blood. But in John 1, we see that the people of God – those who put their belief and allegiance in King Jesus – experience a new birth. This birth is not one of human will or of _haima_ but of the will of God.

Meditate on what it is to be born anew from the will of God.`,
  `Genesis 15 is an important checkpoint in the Abraham story (Gen 12-25). The covenant which was initiated in Genesis 12 is well underway. God had promised Abraham an heir who would launch a great nation, a land for his family to dwell in, and that through his family would come a blessing for the whole world. Abraham's possessions had grown large. He had built a community of servants and friends. Surely it was no great nation, but it had just contended with kings.

Now Abraham is becoming increasingly old and is wondering if YHWH will truly give him an heir, or if he will need to choose a successor from among his servants. But God gives Abraham a sign and Abraham believes (_aman_) God.

This is the notion we will track in this reading. God demonstrates his glory and faithfulness (_emuna_) through signs and wonders, and in response, his people _aman_ (believe) him. You may have noticed if you tried saying the words _emuna_ and _aman_ that they sound sort of similar. That's because _aman_ is the *root* of the word _emuna_. This just means that the verb for "to believe" or "to be faithful" sets the basis for the noun "faithfulness" or "belief." 

Looking at _aman_ and _emuna_ together, we are able to see that "belief" is more than thinking that something is true. Rather, "belief" encompasses faithfulness, allegiance, and trust, all alongside thinking that something is true. As you read this week and you encounter "believe" or "trust" in the text, consider the range of actions which the text may well be describing.`,
  `In our last reading we explored examples of times when YHWH performed a sign or great deed and his people _aman_ (believed). But as often as the people believe, it seems they do not believe. This must perplex us as the people of God living some 3,000 years on from them. Surely, we think, if we had been there we would've _aman_ (believed). We had seen the walls of water and defeat of Pharaoh's armies. We had seen water and mana and quail brought forth in the desert. We had seen YHWH defend us at every turn. How could we not believe?

It is helpful at times like these to pause our thoughts. Take inventory of your life. Where have you struggled to _aman_ (to trust, to believe, to be faithful)? What signs has God shown you throughout your life, whether through the Scriptures, through friends and family, through a minister, or through the quiet promptings of the Holy Spirit? We remember that we are often counted among the Israelites in the desert, not apart from them. We too struggle with our unbelief. 

As you meditate on these readings, consider praying this little prayer from Mark 9:24 each time you encounter the word _aman_, "I do believe; help my unbelief!"`,
  `If you haven't had the opportunity to read Isaiah, you simply must [take the time](https://isaiah.flatland.church). This reading is a sinlge chapter from the book of Isaiah. It comes directly on the heels of Isaiah's first servant song, a beautiful poem about the coming Messiah. Both chapters are connected through some parallel imagery, which reminds us that the thread of the Messiah and of YHWH's salvation is still in the atmosphere.

In this chapter, YHWH calls to mind his many deeds of old, stylizing and elaborating on his victory over Egypt and his provision in the desert. In the middle of the poem, he calls the people of Israel to be his witnesses so that they might believe (_aman_). Belief and witness are deeply intertwined. As we explored in our previous reading, _aman_ has a range of meanings, often times all present in a single use of the word. It seems here that witness becomes a natural outworking of _aman_ (belief).

What does your _aman_ stir in you as a response?`,
  `The cycle of saving and believing has always seemed to run in sequence. Humans are in need of saving, whether they are under oppression by an empire (as in Egypt or Babylon) or whether there own evil has grown into an oppression that they are burdened by themselves (as in the case of Ninevah we will explore in this reading). Sometimes, the saving is from hunger or thirst or malady.

God begins by initiating a salvation. Sometimes he topples empires and crushes armies, other times he brings water from rocks or food for multitudes from a meager individual's meal. Whatever the act, God is the one who initiates it. Notice that the recipients have never seemed merited God's effort. Sometimes they cried for help, sometimes they didn't. God engaged regardless.

So what is the response to this work of God? The call is one of _aman_, or as we transition into the New Testament and Greek, _pisteou_. Just like _aman_, _pisteou_ carries with it a range of meanings that include belief (mental ascent), trust, faithfulness, and allegiance. Our job is not to pick on definition that suits us, but to consider that the whole range of meaning is what we are called to. 

In this reading, we'll explore that call to _aman_ and _pisteou_, remembering that the work of saving has already been initiated.`,
  `In our penultimate visit to John 1, we come equipped with _pisteou_ with it's range of meaning (belief, trust, faithfulness, and allegiance). You will notice quickly that _pisteou_ is paired with _onoma_ in this chapter. Not only do we _pisteou_ in Jesus or in his kingship or saving work, but in the _onoma_ (the Name).

This should draw you back to the readings we did for _shem_ and _onoma_ (name). What does it mean to believe in the _Onoma_? What does it mean to trust in the _Onoma_? What does it mean to be faithful to the _Onoma_? What does it mean to have allegiance to the _Onoma_?

Meditate on how you are called to _pisteou_ in light of John 1.`,
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
