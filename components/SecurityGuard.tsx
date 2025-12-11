
import React, { useEffect } from 'react';

const SecurityGuard: React.FC = () => {
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable Keyboard Shortcuts for Inspect/DevTools
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Windows/Linux: Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Inspector)
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
        e.preventDefault();
        return false;
      }

      // Windows/Linux: Ctrl+U (View Source)
      if (e.ctrlKey && ['U', 'u'].includes(e.key)) {
        e.preventDefault();
        return false;
      }

      // Windows/Linux: Ctrl+S (Save Page)
      if (e.ctrlKey && ['S', 's'].includes(e.key)) {
        e.preventDefault();
        return false;
      }

      // MacOS: Cmd+Option+I (DevTools), Cmd+Option+J (Console), Cmd+Option+U (View Source)
      if (e.metaKey && e.altKey && ['I', 'J', 'U', 'i', 'j', 'u'].includes(e.key)) {
         e.preventDefault();
         return false;
      }
      
      // MacOS: Cmd+Shift+C (Inspect Element)
      if (e.metaKey && e.shiftKey && ['C', 'c'].includes(e.key)) {
         e.preventDefault();
         return false;
      }

      // MacOS: Cmd+S (Save)
      if (e.metaKey && ['S', 's'].includes(e.key)) {
         e.preventDefault();
         return false;
      }
    };

    // 3. DevTools "Trap"
    // This constantly clears console and triggers debugger if devtools are open
    const devToolsCheck = setInterval(() => {
        // Clear console to hide logs if they manage to open it
        // console.clear(); 
        
        // Triggers a debugger breakpoint loop which freezes the app if DevTools is open.
        debugger; 
    }, 1000);

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(devToolsCheck);
    };
  }, []);

  return null;
};

export default SecurityGuard;
