import 'vite/modulepreload-polyfill';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import '@arco-design/web-react/dist/css/arco.css';
import './index.css';

import('source-ref-runtime').then((m) => m.start());

// TODO: ssr
const root = createRoot(document.getElementById('app')!);

root.render(<App />);
