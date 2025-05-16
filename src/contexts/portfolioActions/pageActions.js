
    import React from 'react';

    export const addPageAction = (currentSites, saveSitesFn, toast, siteId, pageName) => {
      const newPage = {
        id: crypto.randomUUID(),
        name: pageName || `New Page ${Date.now()%1000}`,
        elements: [],
      };
      let pageAdded = false;
      const updatedSites = currentSites.map(site => {
        if (site.id === siteId) {
          pageAdded = true;
          return { ...site, pages: [...site.pages, newPage], updatedAt: new Date().toISOString() };
        }
        return site;
      });

      if (pageAdded) {
        saveSitesFn(updatedSites);
        toast({ title: "Page Added", description: `Page "${newPage.name}" created.` });
        return newPage.id;
      }
      return null;
    };

    export const deletePageAction = (currentSites, saveSitesFn, toast, siteId, pageIdToDelete) => {
      let pageName = "Unknown Page";
      let siteUpdated = false;
      const updatedSites = currentSites.map(site => {
        if (site.id === siteId) {
          if (site.pages.length <= 1) {
            toast({ title: "Error", description: "Cannot delete the last page.", variant: "destructive" });
            return site; 
          }
          const pageToDelete = site.pages.find(p => p.id === pageIdToDelete);
          if (pageToDelete) pageName = pageToDelete.name;
          siteUpdated = true;
          return { ...site, pages: site.pages.filter(p => p.id !== pageIdToDelete), updatedAt: new Date().toISOString() };
        }
        return site;
      });
      
      if (siteUpdated) {
        saveSitesFn(updatedSites);
        toast({ title: "Page Deleted", description: `Page "${pageName}" has been deleted.` });
      }
    };
    
    export const updatePageDataAction = (currentSites, saveSitesFn, toast, siteId, pageId, pageUpdates) => {
      let pageUpdated = false;
      const updatedSites = currentSites.map(site => {
        if (site.id === siteId) {
          const updatedPages = site.pages.map(page => {
            if (page.id === pageId) {
              pageUpdated = true;
              return { ...page, ...pageUpdates };
            }
            return page;
          });
          if (pageUpdated) {
            return { ...site, pages: updatedPages, updatedAt: new Date().toISOString() };
          }
        }
        return site;
      });

      if (pageUpdated) {
        saveSitesFn(updatedSites);
        if (pageUpdates.name) {
          toast({
            title: "Page Updated",
            description: `Page name changed to "${pageUpdates.name}".`,
          });
        }
      }
    };
  