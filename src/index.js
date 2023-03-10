import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import './index.css';

import { createRoot } from 'react-dom/client';
import Vocabulary from './components/vocabulary/Vocabulary';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />

      <Route exact path="/:language" element={<Vocabulary language="{language}" />} />

    </Routes>
  </BrowserRouter>
);