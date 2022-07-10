import React from 'react';
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
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/read" />} />
      </Routes>
    </>
  );
};

export default App;
