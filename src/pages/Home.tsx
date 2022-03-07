import { VFC } from 'react';
import { getAuth } from 'firebase/auth';

import useAuthState from 'hooks/useAuthState';
import { NavLink } from 'react-router-dom';

const Home: VFC = () => {
  const { isLoading, isSignedIn, email } = useAuthState();

  if (isLoading) {
    return <p>Loadiing...</p>;
  }

  return <></>;
};

export default Home;
