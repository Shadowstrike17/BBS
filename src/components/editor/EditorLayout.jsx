
    import React, { useState, useEffect } from 'react';
    import TopBar from '@/components/editor/TopBar.jsx';
    import Sidebar from '@/components/editor/Sidebar.jsx';
    import Canvas from '@/components/editor/Canvas.jsx';
    import useAppContext from '@/hooks/useAppContext.jsx';

    const EditorLayout = ({ site: initialSite }) => {
      const { getSiteById } = useAppContext();
      const [currentSite, setCurrentSite] = useState(initialSite);
      const [activePageId, setActivePageId] = useState(initialSite?.pages?.[0]?.id || null);

      useEffect(() => {
        const updatedSiteFromContext = getSiteById(initialSite.id);
        if (updatedSiteFromContext) {
          setCurrentSite(updatedSiteFromContext);
          // Ensure activePageId is valid, default to first page if not or if current page was deleted
          const pageExists = updatedSiteFromContext.pages.some(p => p.id === activePageId);
          if (!pageExists && updatedSiteFromContext.pages.length > 0) {
            setActivePageId(updatedSiteFromContext.pages[0].id);
          } else if (updatedSiteFromContext.pages.length === 0) {
            // This case should ideally be handled by adding a default page if all are deleted
            // For now, set to null, Canvas should handle this
            setActivePageId(null);
          }
        }
      }, [initialSite.id, getSiteById, activePageId]); // Rerun when context updates initialSite or activePageId changes

      const handlePageChange = (pageId) => {
        setActivePageId(pageId);
      };
      
      // This function is primarily for child components to signal that context data might have changed
      // and this component (EditorLayout) should re-fetch and update its local `currentSite` state.
      const refreshSiteState = () => {
        const updatedSiteFromContext = getSiteById(initialSite.id);
         if (updatedSiteFromContext) {
          setCurrentSite(updatedSiteFromContext);
        }
      }

      if (!currentSite || !activePageId && currentSite.pages.length > 0) {
         // If currentSite exists but activePageId is somehow null (e.g. after page deletion and no default set)
         // try to set to first page.
         if (currentSite && currentSite.pages.length > 0 && !activePageId) {
            setActivePageId(currentSite.pages[0].id);
         }
        return <div className="flex items-center justify-center h-screen bg-slate-900 text-white">Loading editor data...</div>;
      }
      
      const themeClass = currentSite.theme?.mode === 'dark' ? 'dark' : '';

      return (
        <div className={`flex flex-col h-screen ${themeClass}`}>
          <TopBar siteName={currentSite.name} siteId={currentSite.id} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar 
              site={currentSite} 
              activePageId={activePageId}
              onPageChange={handlePageChange}
              refreshSiteState={refreshSiteState} 
            />
            <Canvas 
              site={currentSite} 
              pageId={activePageId} 
              refreshSiteState={refreshSiteState}
            />
          </div>
        </div>
      );
    };

    export default EditorLayout;
  