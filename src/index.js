import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import Vocabulary from './components/vocabulary/Vocabulary';
import MemoryCards from './containers/memoryCards/MemoryCards.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/vocabulary" element={<Vocabulary />} />
      <Route exact path="/memory-cards" element={<MemoryCards />} />
    </Routes>
  </HashRouter>
);