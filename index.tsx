import React from 'react';
import ReactDOM from 'react-dom/client';
import posthog from 'posthog-js';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter } from "react-router-dom";

// Initialize PostHog
if (import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'always',
    capture_pageview: true 
  });

  // Global Error Tracking
  window.addEventListener('error', (event) => {
    posthog.capture('app_error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.stack || event.error?.message
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    posthog.capture('app_unhandled_rejection', {
      reason: event.reason?.stack || event.reason?.message || event.reason
    });
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
    <Analytics />
  </React.StrictMode>
);