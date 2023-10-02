import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './config/firebase-config';
import './config/axiosConfig';
import './App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
