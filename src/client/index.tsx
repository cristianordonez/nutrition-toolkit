import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import { App } from './pages/App';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(
   <BrowserRouter>
      <App />
   </BrowserRouter>
);
