
    import React from 'react';
    import { motion } from 'framer-motion';

    const EmptyCanvasMessage = ({ siteTheme }) => {
      const themeMode = siteTheme?.mode || 'light';
      const textColorClass = themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500';
      const subTextColorClass = themeMode === 'dark' ? 'text-slate-500' : 'text-slate-400';

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10 sm:py-20"
          onClick={(e) => e.stopPropagation()} 
        >
          <img  alt="Empty canvas creative illustration" class="mx-auto mb-4 w-48 h-48 sm:w-64 sm:h-64 opacity-60" src="https://images.unsplash.com/photo-1651774394011-11fc8a7d0bb0" />
          <p className={`text-lg sm:text-xl ${textColorClass} mb-2`}>Your portfolio page is ready to shine.</p>
          <p className={`${subTextColorClass} text-sm sm:text-base`}>Use the sidebar to add text, images, and more! You can also paste images from your clipboard.</p>
        </motion.div>
      );
    };
    export default EmptyCanvasMessage;
  