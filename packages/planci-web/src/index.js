import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css'; // Ensure this import is present
import App from './App';

import { Analytics } from "@vercel/analytics/react";

const container = document.getElementById('root');
const root = createRoot(container); // Create a root
root.render(
  <React.StrictMode>
    <Analytics/>
    <App />
  </React.StrictMode>
);
