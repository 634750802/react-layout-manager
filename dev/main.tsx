import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './style.scss'

createRoot(document.getElementById('app')!)
  .render((
    <StrictMode>
      <App />
    </StrictMode>
  ));
