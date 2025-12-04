import React, { Component, ErrorInfo, ReactNode } from 'react';
import emailjs from '@emailjs/browser';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  sentReport: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, sentReport: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, sentReport: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // CONFIGURATION: Replace these with your actual EmailJS keys
    const SERVICE_ID = 'service_q2f5gav';
    const TEMPLATE_ID = 'template_s9guskd';
    const PUBLIC_KEY = 'k9Wtzi7pVLF6sI3cV';

    // Only send if not already sent
    if (!this.state.sentReport) {
        
        // ALIGNMENT FIX: Matching {{name}}, {{time}}, {{error_message}}
        const templateParams = {
            name: "SYSTEM ALERT (TripGenie)",
            time: new Date().toLocaleString(),
            error_message: `CRITICAL APP CRASH:\n${error.toString()}\n\nSTACK TRACE:\n${errorInfo.componentStack}`,
            
            // Extra info
            user_agent: navigator.userAgent,
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                this.setState({ sentReport: true });
                console.log("Error report sent!");
            })
            .catch((err) => {
                console.error("Failed to send error report", err);
            });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-gray-600 mb-6">
              TripGenie encountered an unexpected error. Our team has been notified.
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg text-left mb-6 overflow-auto max-h-32">
                <p className="text-xs text-red-500 font-mono break-words">
                    {this.state.error?.toString()}
                </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
            >
              Reload Application
            </button>
            <a href="/" className="block mt-4 text-sm text-gray-400 hover:text-gray-600">
                Go to Homepage
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;