import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import mixpanel from 'mixpanel-browser';

import dictionary from '../../pages/Items/words';

import Introduction from './Introduction';
import Screen from './Screen';
import Interactive from './Interactive';
import { useAuthenticatedUser, useProgress } from '../../providers/Authentication';
import GameOver from './GameOver';

const Wrapper = styled.div`
  width: 100%;
  max-width: 480px;
  position: relative;
  margin: 0 auto;
  font-family: var(--sans-serif);
  height: 100%;
`;

const Recall = () => {
  const { words } = useProgress();
  const { user } = useAuthenticatedUser();

  // Helps State
  const [usedHint, setUsedHint] = useState(false);
  const [used5050, setUsed5050] = useState(false);
  const [skipsUsed, setSkipsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [show5050, setShow5050] = useState(false);

  // General Game State
  const [score, setScore] = useState(0);
  const [showIntroduction, setShowIntroduction] = useState(true);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [time, setTime] = useState(60);
  const [answerIsSubmitted, setAnswerIsSubmitted] = useState(false);
  const [currentAnswerIsCorrect, setCurrentAnswerIsCorrect] = useState(false);

  // Answer Tracking
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [skippedAnswers, setSkippedAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentAlternate, setCurrentAlternate] = useState('');
  const [answerHistory, setAnswerHistory] = useState([]);

  useEffect(() => {
    if (!showIntroduction) {
      getNextWord();
    }
  }, [showIntroduction]);

  useEffect(() => {
    if (answerIsSubmitted) {
      setTimeout(() => {
        setAnswerIsSubmitted(false);
        setCurrentAnswerIsCorrect(false);
        setShowHint(false);
        setShow5050(false);
        getNextWord();
      }, 2500);
    }
  }, [answerIsSubmitted]);

  useEffect(() => {
    if (!showIntroduction) {
      mixpanel.track('game-started', {
        game: 'recall',
        distinct_id: user.id,
      });
      const timer = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time, showIntroduction]);

  useEffect(() => {
    if (time === 0) {
      setGameIsOver(true);
    }
  }, [time]);

  useEffect(() => {
    if (gameIsOver) {
      mixpanel.track('game-completed', {
        game: 'recall',
        score,
        incorrectAnswers,
        correctAnswers,
        skippedAnswers,
        skipsUsed,
        distinct_id: user.id,
      });
    }
  }, [gameIsOver, incorrectAnswers, correctAnswers, skippedAnswers, score]);

  const onHelp = (type) => () => {
    if (type === 'hint') {
      setUsedHint(true);
      setShowHint(true);
    }

    if (type === '50') {
      setUsed5050(true);
      setShow5050(true);
    }

    if (type === 'skip') {
      setSkipsUsed(skipsUsed + 1);
      setSkippedAnswers([...skippedAnswers, currentQuestion.word]);
      getNextWord();
    }
  };

  const getNextWord = () => {
    // don't allow the last word to be repeated
    const filteredNextAnswerCandidates = words.filter(
      ({ word }) => answerHistory[answerHistory.length - 1] !== word,
    );
    const word =
      filteredNextAnswerCandidates[Math.floor(Math.random() * filteredNextAnswerCandidates.length)];
    const filteredAlternateCandidates = words.filter((w) => w.word !== word.word);
    const alternate = words[Math.floor(Math.random() * filteredAlternateCandidates.length)].word;

    const wordRef = dictionary[word.word];
    const altRef = dictionary[alternate];
    setAnswerHistory([...answerHistory, word.word]);
    wordRef.word = word.word[0].toUpperCase() + word.word.slice(1);
    setCurrentQuestion(wordRef);
    setCurrentAlternate(altRef.definition);
  };

  const handleChoose = (isCorrect) => {
    setAnswerIsSubmitted(true);
    setCurrentAnswerIsCorrect(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, currentQuestion.word]);
    }

    if (!isCorrect) {
      setIncorrectAnswers([...incorrectAnswers, currentQuestion.word]);
    }
  };

  return (
    <Wrapper>
      {showIntroduction && <Introduction onClick={() => setShowIntroduction(false)} />}
      {!showIntroduction && !gameIsOver && currentQuestion && (
        <div>
          <Screen
            currentTime={time}
            score={score}
            isAnswered={answerIsSubmitted}
            isCorrect={currentAnswerIsCorrect}
            showHint={showHint}
            word={currentQuestion}
          />
          <Interactive
            key={currentQuestion.word}
            onHelp={onHelp}
            word={currentQuestion}
            onChoose={handleChoose}
            isAnswered={answerIsSubmitted}
            usedHint={usedHint}
            showing5050={show5050}
            alt={currentAlternate}
            used5050={used5050}
          />
        </div>
      )}
      {gameIsOver && <GameOver score={score} skips={skipsUsed} />}
    </Wrapper>
  );
};

export default Recall;
