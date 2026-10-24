import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './style.css';

const initialLang = /\/en\/?$/.test(window.location.pathname) ? 'en' : 'zh';
const root = document.getElementById('root');
const app = <App initialLang={initialLang} />;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
