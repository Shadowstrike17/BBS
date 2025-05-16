
    import { useState, useCallback } from 'react';
    import useAppContext from '@/hooks/useAppContext.jsx';

    const useCanvasDnD = (siteId, pageId, refreshSiteState) => {
      const { reorderElements } = useAppContext();
      const [draggedItemId, setDraggedItemId] = useState(null);
      const [isDraggingOverCanvas, setIsDraggingOverCanvas] = useState(false);

      const handleDragStart = useCallback((e, id) => {
        setDraggedItemId(id);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", id);
      }, []);

      const handleDragOverElement = useCallback((e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }, []);
      
      const handleCanvasDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDraggingOverCanvas(true);
        e.dataTransfer.dropEffect = "move"; 
      }, []);

      const handleDropOnElement = useCallback((e, targetId) => {
        e.preventDefault();
        setIsDraggingOverCanvas(false);
        if (!draggedItemId || draggedItemId === targetId) {
          setDraggedItemId(null);
          return;
        }
        reorderElements(siteId, pageId, draggedItemId, targetId);
        setDraggedItemId(null);
        if(refreshSiteState) refreshSiteState();
      }, [draggedItemId, siteId, pageId, reorderElements, refreshSiteState]);

      const handleDragEnd = useCallback(() => {
        setDraggedItemId(null);
        setIsDraggingOverCanvas(false);
      }, []);

      const handleCanvasDrop = useCallback((e) => {
        e.preventDefault();
        handleDragEnd();
      }, [handleDragEnd]);

      return {
        draggedItemId,
        isDraggingOverCanvas,
        handleDragStart,
        handleDragOverElement,
        handleCanvasDragOver,
        handleDropOnElement,
        handleDragEnd,
        handleCanvasDrop
      };
    };

    export default useCanvasDnD;
  