import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import { useAuthenticatedUser } from './providers/Authentication';
import Read from './pages/Read';
import Item from './pages/Items';
import ReadHeader from './pages/ReadHeader';
import Intro from './pages/Intro';
import Profile from './pages/Profile';

import OceanGame from './games/ocean';
import PreRead from './pages/PreRead';
import Recall from './games/recall';
import Not from './games/not';
import Forest from './games/forest';
import Practice from './pages/Practice';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuthenticatedUser();
  const location = useLocation();

  if (isLoading) {
    return <div />;
  }

  if (!isAuthenticated && !isLoading) {
    return <Navigate to="/login" state={{ next: location }} replace />;
  }

  return children;
};

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <div style={{ fontSize: 18 }}>Hello</div>
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/read"
          element={
            <RequireAuth>
              <Read />
            </RequireAuth>
          }
        />
        <Route
          path="/read"
          element={
            <RequireAuth>
              <ReadHeader />
            </RequireAuth>
          }
        >
          <Route
            path=":page"
            element={
              <RequireAuth>
                <Item />
              </RequireAuth>
            }
          />
          <Route
            path=":page/preread"
            element={
              <RequireAuth>
                <PreRead />
              </RequireAuth>
            }
          />
          <Route
            path="intro"
            element={
              <RequireAuth>
                <Intro />
              </RequireAuth>
            }
          />
        </Route>
        <Route
          path="/games/ocean"
          element={
            <RequireAuth>
              <OceanGame />
            </RequireAuth>
          }
        />
        <Route
          path="/games/recall"
          element={
            <RequireAuth>
              <Recall />
            </RequireAuth>
          }
        />
        <Route
          path="/games/not"
          element={
            <RequireAuth>
              <Not />
            </RequireAuth>
          }
        />
        <Route
          path="/games/forest"
          element={
            <RequireAuth>
              <Forest />
            </RequireAuth>
          }
        />
        <Route
          path="/practice"
          element={
            <RequireAuth>
              <Practice />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/read" />} />
      </Routes>
    </>
  );
};

export default App;
