
    import React from 'react';

    const CanvasMessage = ({ themeMode, message }) => {
      const canvasBg = themeMode === 'dark' ? 'bg-gradient-to-br from-slate-900 to-slate-950' : 'bg-gradient-to-br from-slate-200 to-slate-300';
      const textColor = themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600';

      return (
        <div className={`flex-1 p-8 ${canvasBg} flex items-center justify-center`}>
          <p className={`text-xl ${textColor}`}>
            {message}
          </p>
        </div>
      );
    };

    export default CanvasMessage;
  