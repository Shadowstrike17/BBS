
    import React from 'react';

    export const addElementToPageAction = (currentSites, saveSitesFn, toast, siteId, pageId, elementType, initialProps = {}) => {
      let content;
      let defaultStyles = { width: 'auto', height: 'auto' }; 
      switch (elementType) {
        case 'text':
          content = 'New Text Block - Click to edit';
          defaultStyles = { width: '100%', height: 'auto', minHeight: '50px' };
          break;
        case 'image':
          content = initialProps.content || 'Image Placeholder';
          defaultStyles = { width: '200px', height: '150px', objectFit: 'contain' };
          break;
        case 'divider':
          content = 'Divider';
          defaultStyles = { width: '100%', height: '2px' };
          break;
        case 'section':
          content = 'New Section';
          defaultStyles = { width: '100%', height: '200px', border: '1px dashed #ccc', padding: '10px' };
          break;
        case 'shape':
          content = initialProps.shapeType ? `${initialProps.shapeType.charAt(0).toUpperCase() + initialProps.shapeType.slice(1)} Shape` : 'Shape';
          defaultStyles = { width: '100px', height: '100px', backgroundColor: '#cccccc' };
          if (initialProps.shapeType === 'triangle') {
            defaultStyles = { ...defaultStyles, backgroundColor: 'transparent' }; // Triangle handles its own color via border
          }
          break;
        default:
          content = 'New Element';
      }

      const newElement = {
        id: crypto.randomUUID(),
        type: elementType,
        shapeType: initialProps.shapeType || undefined,
        content: content,
        styles: { ...defaultStyles, ...initialProps.styles },
        imageUrl: initialProps.imageUrl || (elementType === 'image' ? '' : undefined),
      };

      let elementAdded = false;
      const updatedSites = currentSites.map(site => {
        if (site.id === siteId) {
          const updatedPages = site.pages.map(page => {
            if (page.id === pageId) {
              elementAdded = true;
              const newElements = [...(page.elements || []), newElement];
              return { ...page, elements: newElements };
            }
            return page;
          });
          if (elementAdded) {
            return { ...site, pages: updatedPages, updatedAt: new Date().toISOString() };
          }
        }
        return site;
      });

      if (elementAdded) {
        saveSitesFn(updatedSites);
      }
    };
    
    export const updateElementAction = (currentSites, saveSitesFn, toast, siteId, pageId, elementId, elementUpdates) => {
      let elementUpdated = false;
      const updatedSites = currentSites.map(site => {
        if (site.id === siteId) {
          const updatedPages = site.pages.map(page => {
            if (page.id === pageId) {
              const updatedElements = page.elements.map(el => 
                el.id === elementId ? { ...el, ...elementUpdates, styles: {...el.styles, ...elementUpdates.styles} } : el
              );
              if (JSON.stringify(page.elements) !== JSON.stringify(updatedElements)) {
                elementUpdated = true;
                return { ...page, elements: updatedElements };
              }
            }
            return page;
          });
          if (elementUpdated) {
            return { ...site, pages: updatedPages, updatedAt: new Date().toISOString() };
          }
        }
        return site;
      });

      if (elementUpdated) {
        saveSitesFn(updatedSites);
      }
    };
    
    export const deleteElementAction = (currentSites, saveSitesFn, toast, siteId, pageId, elementId) => {
      let elementDeleted = false;
      const updatedSites = currentSites.map(site => {
        if (site.id === siteId) {
          const updatedPages = site.pages.map(page => {
            if (page.id === pageId) {
              const originalLength = page.elements.length;
              const filteredElements = page.elements.filter(el => el.id !== elementId);
              if (originalLength > filteredElements.length) {
                elementDeleted = true;
                return { ...page, elements: filteredElements };
              }
            }
            return page;
          });
          if (elementDeleted) {
            return { ...site, pages: updatedPages, updatedAt: new Date().toISOString() };
          }
        }
        return site;
      });
      
      if (elementDeleted) {
        saveSitesFn(updatedSites);
        toast({
          title: "Element Deleted",
          description: `Element has been removed.`,
        });
      }
    };

    export const reorderElementsAction = (currentSites, saveSitesFn, toast, siteId, pageId, draggedElementId, targetElementId) => {
      let elementsReordered = false;
      const updatedSites = currentSites.map(site => {
        if (site.id === siteId) {
          const updatedPages = site.pages.map(page => {
            if (page.id === pageId) {
              const elements = [...page.elements];
              const draggedIndex = elements.findIndex(el => el.id === draggedElementId);
              const targetIndex = elements.findIndex(el => el.id === targetElementId);

              if (draggedIndex === -1 || targetIndex === -1 || draggedIndex === targetIndex) {
                return page; 
              }

              const [draggedItem] = elements.splice(draggedIndex, 1);
              elements.splice(targetIndex, 0, draggedItem);
              
              elementsReordered = true;
              return { ...page, elements };
            }
            return page;
          });
          if (elementsReordered) {
            return { ...site, pages: updatedPages, updatedAt: new Date().toISOString() };
          }
        }
        return site;
      });

      if (elementsReordered) {
        saveSitesFn(updatedSites);
      }
    };
  