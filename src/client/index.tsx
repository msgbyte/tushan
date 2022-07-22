import 'vite/modulepreload-polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// TODO: ssr
const root = createRoot(document.getElementById('app')!);

root.render(<App />);
