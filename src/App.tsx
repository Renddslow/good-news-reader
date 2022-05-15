import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Login from './pages/Login';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  if (!isAuthenticated) {
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
          path="/account"
          element={
            <RequireAuth>
              <div>Hello</div>
            </RequireAuth>
          }
        />
        {/* Login with Flatland Auth */}
        <Route
          path="/read"
          element={
            <RequireAuth>
              <div style={{ fontSize: `var(--fz-body)` }}>Hello</div>
            </RequireAuth>
          }
        >
          <Route path=":movement">
            <Route path="hyperlinks/:hyperlink" />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/read" />} />
      </Routes>
    </>
  );
};

export default App;
