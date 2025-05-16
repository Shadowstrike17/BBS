
    import React, { useRef, useState, useCallback } from 'react';
    import { motion } from 'framer-motion';
    import useAppContext from '@/hooks/useAppContext.jsx';

    const ResizableElement = ({ children, element, siteId, pageId, isSelected, siteTheme }) => {
      const { updateElement } = useAppContext();
      const [isResizing, setIsResizing] = useState(false);
      const elementRef = useRef(null);

      const handleResize = useCallback((event, info) => {
        if (!elementRef.current) return;
        
        const newWidth = Math.max(50, elementRef.current.offsetWidth + info.delta.x); 
        const newHeight = Math.max(50, elementRef.current.offsetHeight + info.delta.y);

        updateElement(siteId, pageId, element.id, {
          styles: {
            ...element.styles,
            width: `${newWidth}px`,
            height: `${newHeight}px`,
          },
        });
      }, [element.id, element.styles, pageId, siteId, updateElement]);

      const handleResizeStart = () => setIsResizing(true);
      const handleResizeEnd = () => setIsResizing(false);

      const themeMode = siteTheme?.mode || 'light';
      const handleColor = themeMode === 'dark' ? 'bg-purple-400 border-slate-900' : 'bg-purple-500 border-white';

      return (
        <div ref={elementRef} style={{ width: element.styles?.width || 'auto', height: element.styles?.height || 'auto', position: 'relative' }}>
          {children}
          {isSelected && (
            <>
              <motion.div
                className={`absolute -right-1.5 -bottom-1.5 w-3 h-3 rounded-full cursor-se-resize ${handleColor} shadow-md z-20`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={handleResizeStart}
                onDrag={handleResize}
                onDragEnd={handleResizeEnd}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 1.2 }}
              />
               <motion.div
                className={`absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full cursor-e-resize ${handleColor} shadow-md z-20`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={handleResizeStart}
                onDrag={(event, info) => {
                    if (!elementRef.current) return;
                    const newWidth = Math.max(50, elementRef.current.offsetWidth + info.delta.x);
                    updateElement(siteId, pageId, element.id, { styles: { ...element.styles, width: `${newWidth}px` } });
                }}
                onDragEnd={handleResizeEnd}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 1.2 }}
              />
              <motion.div
                className={`absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rounded-full cursor-s-resize ${handleColor} shadow-md z-20`}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={handleResizeStart}
                onDrag={(event, info) => {
                    if (!elementRef.current) return;
                    const newHeight = Math.max(50, elementRef.current.offsetHeight + info.delta.y);
                    updateElement(siteId, pageId, element.id, { styles: { ...element.styles, height: `${newHeight}px` } });
                }}
                onDragEnd={handleResizeEnd}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 1.2 }}
              />
            </>
          )}
        </div>
      );
    };

    export default ResizableElement;
  