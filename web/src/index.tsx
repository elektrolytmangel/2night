import 'animate.css';
import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider as UserProvider } from './context/userContext';
import './custom.scss';
import './i18n/i18n';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
