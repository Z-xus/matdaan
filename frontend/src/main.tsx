import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import './index.css';
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AnonAadhaarProvider _useTestAadhaar={true}>
      <App />
    </AnonAadhaarProvider>
  </React.StrictMode>
); 