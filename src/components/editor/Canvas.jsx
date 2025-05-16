
    import React, { useState, useRef, useCallback } from 'react';
    import { motion } from 'framer-motion';
    import useAppContext from '@/hooks/useAppContext.jsx';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import useCanvasEvents from '@/hooks/useCanvasEvents.js';
    import CanvasContainer from '@/components/editor/canvas/CanvasContainer.jsx';
    import useCanvasDnD from '@/hooks/useCanvasDnD.js';
    import CanvasMessage from '@/components/editor/canvas/CanvasMessage.jsx';

    const Canvas = ({ site, pageId, refreshSiteState }) => {
      const { updatePageData, addElementToPage, deleteElement } = useAppContext();
      const { toast } = useToast();
      
      const page = site.pages && site.pages.find(p => p.id === pageId);
      const siteTheme = site.theme || { mode: 'light' };
      
      const canvasRef = useRef(null);
      const [selectedElementId, setSelectedElementId] = useState(null);

      const { 
        draggedItemId, 
        isDraggingOverCanvas,
        handleDragStart, 
        handleDragOverElement, 
        handleCanvasDragOver, 
        handleDropOnElement, 
        handleDragEnd,
        handleCanvasDrop // For dropping on canvas itself (e.g. to clear drag state)
      } = useCanvasDnD(site.id, pageId, refreshSiteState);
      

      useCanvasEvents(
        canvasRef,
        page,
        site.id,
        selectedElementId,
        addElementToPage,
        deleteElement,
        refreshSiteState,
        toast,
        setSelectedElementId 
      );

      const handleSavePageTitle = (newTitle) => {
        if (page && page.name !== newTitle) {
          updatePageData(site.id, page.id, { name: newTitle });
          if(refreshSiteState) refreshSiteState();
        }
      };
      
      const themeMode = siteTheme.mode;
      const canvasBg = themeMode === 'dark' ? 'bg-gradient-to-br from-slate-900 to-slate-950' : 'bg-gradient-to-br from-slate-200 to-slate-300';
      const canvasDragOverClass = isDraggingOverCanvas && draggedItemId ? 'border-2 border-dashed border-blue-500' : '';


      if (!page && site.pages.length > 0) {
         return <CanvasMessage themeMode={themeMode} message="Select a page to start editing." />;
      }
      if (!page && site.pages.length === 0) {
         return <CanvasMessage themeMode={themeMode} message="This site has no pages. Please add a page from the sidebar." />;
      }
      
      return (
        <motion.div 
          ref={canvasRef}
          tabIndex={-1} 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`flex-1 p-4 sm:p-8 ${canvasBg} overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800 focus:outline-none ${canvasDragOverClass}`}
          onClick={() => setSelectedElementId(null)} 
          onDragOver={handleCanvasDragOver} 
          onDragLeave={() => handleDragEnd()} // Simplified, useDragEnd handles isDraggingOverCanvas
          onDrop={handleCanvasDrop} 
          onDragEnd={handleDragEnd}
        >
          <CanvasContainer
            page={page}
            siteTheme={siteTheme}
            handleSavePageTitle={handleSavePageTitle}
            selectedElementId={selectedElementId}
            setSelectedElementId={setSelectedElementId}
            siteId={site.id}
            refreshSiteState={refreshSiteState}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOverElement}
            handleDrop={handleDropOnElement}
          />
        </motion.div>
      );
    };

    export default Canvas;
  