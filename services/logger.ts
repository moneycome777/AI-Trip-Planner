import { track } from '@vercel/analytics/react';

export const logger = {
  info: (message: string, payload?: Record<string, any>) => {
    console.log(`[INFO] ${message}`, payload);
    try {
      track(message, payload);
    } catch (err) {
      console.warn("Analytics tracking failed", err);
    }
  },
  error: (message: string, payload?: Record<string, any>) => {
    console.error(`[ERROR] ${message}`, payload);
    try {
      // Vercel Analytics handles properties natively
      const errorStr = payload?.error instanceof Error 
        ? payload.error.message 
        : typeof payload?.error === 'string' 
            ? payload.error 
            : JSON.stringify(payload || {});
            
      track('Application Error', { 
         message, 
         details: errorStr
      });
    } catch (err) {
      console.warn("Analytics error tracking failed", err);
    }
  }
};
