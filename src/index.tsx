import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import mixpanel from 'mixpanel-browser'

import App from './App';
import AuthenticationProvider from './providers/Authentication';

const root = createRoot(document.getElementById('root'));
mixpanel.init('64a867b2bd64cda6e6c4460d3af4c05d');

root.render(
  <BrowserRouter>
    <AuthenticationProvider>
      <App />
    </AuthenticationProvider>
  </BrowserRouter>,
);
