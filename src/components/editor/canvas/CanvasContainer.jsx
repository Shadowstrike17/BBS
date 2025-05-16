
    import React from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import PageTitleEditor from '@/components/editor/PageTitleEditor.jsx';
    import EditableElement from '@/components/editor/EditableElement.jsx';
    import EmptyCanvasMessage from '@/components/editor/EmptyCanvasMessage.jsx';

    const CanvasContainer = ({ 
        page, 
        siteTheme, 
        handleSavePageTitle, 
        selectedElementId, 
        setSelectedElementId,
        siteId, 
        refreshSiteState,
        handleDragStart,
        handleDragOver,
        handleDrop
    }) => {
      
      const pageBg = siteTheme.mode === 'dark' ? 'bg-slate-800 shadow-2xl' : 'bg-white shadow-2xl';

      if (!page) {
        return (
          <div className="flex-1 p-8 flex items-center justify-center">
            <p className={`text-xl ${siteTheme.mode === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Select a page to start editing.
            </p>
          </div>
        );
      }

      return (
        <div className={`max-w-3xl mx-auto ${pageBg} rounded-lg p-6 sm:p-10 min-h-[calc(100vh-150px)]`}>
          <PageTitleEditor initialTitle={page.name} onSave={handleSavePageTitle} siteTheme={siteTheme} />
          <AnimatePresence>
            {(page.elements || []).map(element => (
              <EditableElement 
                key={element.id} 
                element={element} 
                siteId={siteId} 
                pageId={page.id}
                refreshSiteState={refreshSiteState}
                isSelected={selectedElementId === element.id}
                onSelect={setSelectedElementId}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragging={false} 
                siteTheme={siteTheme}
              />
            ))}
          </AnimatePresence>
          {(!page.elements || page.elements.length === 0) && <EmptyCanvasMessage siteTheme={siteTheme} />}
        </div>
      );
    };

    export default CanvasContainer;
  