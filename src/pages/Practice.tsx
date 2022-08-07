import React from 'react';
import { Navigate } from 'react-router-dom';

import { useProgress } from '../providers/Authentication';

const Practice = () => {
  const { words } = useProgress();

  const onlyHasLifeWords = words.every((w) =>
    ['chay', 'chayyim', 'chayiym', 'zoe', 'zao', 'zoopoieo'].includes(w.word),
  );

  const games = ['/games/recall', '/games/ocean', '/games/not'];
  const game = games[Math.floor(Math.random() * games.length)];

  return onlyHasLifeWords ? <Navigate to="/games/ocean" replace /> : <Navigate to={game} replace />;
};

export default Practice;
