
    import React from 'react';
    import { studentPortfolioTemplate } from '@/lib/templates.jsx';

    export const addSiteAction = (currentSites, saveSitesFn, toast, name, useTemplate = false) => {
      const newSiteId = crypto.randomUUID();
      let newSite;

      if (useTemplate) {
        newSite = {
          ...JSON.parse(JSON.stringify(studentPortfolioTemplate)), 
          id: newSiteId,
          name: name || studentPortfolioTemplate.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publicId: null, 
        };
        newSite.pages = newSite.pages.map(page => ({
          ...page,
          id: crypto.randomUUID(),
          elements: page.elements.map(el => ({...el, id: crypto.randomUUID()}))
        }));
      } else {
        const firstPageId = crypto.randomUUID();
        newSite = {
          id: newSiteId,
          name: name || "Untitled Portfolio",
          theme: { mode: 'light', primaryColor: '#3B82F6', fontFamily: 'Arial, sans-serif' },
          pages: [
            {
              id: firstPageId,
              name: "Home",
              elements: [
                {
                  id: crypto.randomUUID(),
                  type: "text",
                  content: "Welcome to your new page!",
                  styles: { fontSize: "2em", textAlign: "center", margin: "20px 0" }
                }
              ],
            },
          ],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          publicId: null, 
        };
      }
      
      const updatedSites = [...currentSites, newSite];
      saveSitesFn(updatedSites);
      toast({
        title: "Portfolio Created!",
        description: `"${newSite.name}" has been successfully created.`,
      });
      return newSite.id; 
    };

    export const updateSiteAction = (currentSites, saveSitesFn, toast, siteId, updatedData) => {
      let siteUpdated = false;
      const updatedSites = currentSites.map(site => {
        if (site.id === siteId) {
          siteUpdated = true;
          const newPublicId = site.publicId || crypto.randomUUID().slice(0, 8);
          return { ...site, ...updatedData, publicId: newPublicId, updatedAt: new Date().toISOString() };
        }
        return site;
      });

      if (siteUpdated) {
        saveSitesFn(updatedSites);
      } else {
        toast({
          title: "Error",
          description: "Could not find the site to update.",
          variant: "destructive",
        });
      }
    };

    export const deleteSiteAction = (currentSites, saveSitesFn, toast, siteId) => {
      const siteToDelete = currentSites.find(site => site.id === siteId);
      if (!siteToDelete) {
        toast({
          title: "Error",
          description: "Could not find the site to delete.",
          variant: "destructive",
        });
        return;
      }
      const updatedSites = currentSites.filter(site => site.id !== siteId);
      saveSitesFn(updatedSites);
      toast({
        title: "Portfolio Deleted",
        description: `"${siteToDelete.name}" has been removed.`,
      });
    };
  