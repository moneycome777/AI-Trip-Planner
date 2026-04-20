import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_q2f5gav';
const TEMPLATE_ID = 'template_s9guskd';
const PUBLIC_KEY = 'k9Wtzi7pVLF6sI3cV';

export interface LogContext {
  location: string;
  additionalData?: any;
}

let lastErrorHash = '';
let lastErrorTime = 0;

export const logError = async (error: any, context: LogContext) => {
  const timestamp = new Date().toISOString();
  const stack = error instanceof Error ? error.stack : 'No stack trace available';
  const message = error?.toString() || 'Unknown Error';
  
  // Deduplication Logic: Prevent multiple emails for the same error within 2 seconds
  const currentHash = `${message}-${stack.substring(0, 100)}`;
  const now = Date.now();
  const isDuplicate = currentHash === lastErrorHash && (now - lastErrorTime < 2000);
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'Unknown';
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';

  // Enhanced Console Logging - ALWAYS LOG TO CONSOLE (regardless of duplicates)
  console.group(`[DEBUG] ${context.location}${isDuplicate ? ' (Duplicate - No Email)' : ''}`);
  console.error("Timestamp:", timestamp);
  console.error("URL:", currentUrl);
  console.error("Error:", error);
  if (context.additionalData) {
    console.error("Context Data:", context.additionalData);
  }
  console.error("Stack Trace:", stack);
  console.groupEnd();

  if (isDuplicate) return; // Stop here if it's a burst of the same error

  lastErrorHash = currentHash;
  lastErrorTime = now;

  // Email Notification
  const templateParams = {
    name: `ERROR: ${context.location.toUpperCase()}`,
    time: new Date().toLocaleString(),
    error_message: `
LOCATION: ${context.location}
TIMESTAMP: ${timestamp}
URL: ${currentUrl}
USER AGENT: ${userAgent}

ERROR MESSAGE:
${error.toString()}

STACK TRACE:
${stack}

DATA CONTEXT:
${context.additionalData ? JSON.stringify(context.additionalData, null, 2) : 'No additional context provided'}
    `.trim(),
    message: `Technical alert triggered in ${context.location}. See details below for debugging.`
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log(`[DEBUG] Email alert triggered for: ${context.location}`);
  } catch (err) {
    console.error("[DEBUG] Failed to send email alert", err);
  }
};
