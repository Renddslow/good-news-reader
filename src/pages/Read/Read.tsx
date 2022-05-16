import React from 'react';

import { useAuthenticatedUser } from '../../providers/Authentication';

const Read = () => {
  const { user } = useAuthenticatedUser();

  return <div>{user?.firstName}</div>;
};

export default Read;
