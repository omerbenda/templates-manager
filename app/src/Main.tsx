import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './Pages/MainPage/MainPage';
import './Main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>
);
