// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Routes/AppRouter';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();