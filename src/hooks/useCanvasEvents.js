
    import { useEffect, useCallback } from 'react';

    const useCanvasEvents = (canvasRef, page, siteId, selectedElementId, addElementToPage, deleteElement, refreshSiteState, toast, setSelectedElementId) => {
      
      const handlePaste = useCallback(async (event) => {
        if (!page || !page.id) return;

        const items = event.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
          if (item.type.startsWith("image/")) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                addElementToPage(siteId, page.id, 'image', { imageUrl: reader.result, content: "Pasted Image" });
                if(refreshSiteState) refreshSiteState();
                toast({ title: "Image Pasted!", description: "Image added to your page." });
              };
              reader.readAsDataURL(file);
            }
            return; 
          }
        }
      }, [siteId, page, addElementToPage, refreshSiteState, toast]);

      const handleKeyDown = useCallback((event) => {
        if (selectedElementId && (event.key === 'Backspace' || event.key === 'Delete')) {
          
          const activeElement = document.activeElement;
          if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            return; 
          }
          
          event.preventDefault();
          deleteElement(siteId, page.id, selectedElementId);
          setSelectedElementId(null); 
          if(refreshSiteState) refreshSiteState();
        }
      }, [selectedElementId, siteId, page, deleteElement, refreshSiteState, setSelectedElementId]);

      useEffect(() => {
        const canvasElement = canvasRef.current;
        if (canvasElement) {
          canvasElement.addEventListener('paste', handlePaste);
          canvasElement.addEventListener('keydown', handleKeyDown);
          
          return () => {
            canvasElement.removeEventListener('paste', handlePaste);
            canvasElement.removeEventListener('keydown', handleKeyDown);
          };
        }
      }, [canvasRef, handlePaste, handleKeyDown]);
    };

    export default useCanvasEvents;
  