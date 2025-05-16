
    import React, { createContext, useState, useEffect, useCallback } from 'react';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import { loadSitesFromLocalStorage, saveSitesToLocalStorage } from '@/contexts/portfolioActions/common.js';
    import { addSiteAction, updateSiteAction, deleteSiteAction } from '@/contexts/portfolioActions/siteActions.js';
    import { addPageAction, deletePageAction, updatePageDataAction } from '@/contexts/portfolioActions/pageActions.js';
    import { addElementToPageAction, updateElementAction, deleteElementAction, reorderElementsAction } from '@/contexts/portfolioActions/elementActions.js';
    import { studentPortfolioTemplate } from '@/lib/templates.jsx';

    const PortfolioContext = createContext();

    const PortfolioProvider = ({ children }) => {
      const [sites, setSites] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const { toast } = useToast();

      useEffect(() => {
        loadSitesFromLocalStorage(setSites, setIsLoading, toast);
      }, [toast]);
      
      const contextSaveSites = useCallback((updatedSites) => {
        setSites(updatedSites);
        saveSitesToLocalStorage(updatedSites, toast);
      }, [toast]);

      const addSite = useCallback((name, useTemplate = false) => {
        return addSiteAction(sites, contextSaveSites, toast, name, useTemplate);
      }, [sites, contextSaveSites, toast]);

      const getSiteById = useCallback((siteId) => {
        return sites.find(site => site.id === siteId);
      }, [sites]);
      
      const getSiteByPublicId = useCallback((publicId) => {
        return sites.find(site => site.publicId === publicId);
      }, [sites]);

      const updateSite = useCallback((siteId, updatedData) => {
        updateSiteAction(sites, contextSaveSites, toast, siteId, updatedData);
      }, [sites, contextSaveSites, toast]);

      const deleteSite = useCallback((siteId) => {
        deleteSiteAction(sites, contextSaveSites, toast, siteId);
      }, [sites, contextSaveSites, toast]);
      
      const addPage = useCallback((siteId, pageName) => {
        return addPageAction(sites, contextSaveSites, toast, siteId, pageName);
      }, [sites, contextSaveSites, toast]);

      const deletePage = useCallback((siteId, pageIdToDelete) => {
        deletePageAction(sites, contextSaveSites, toast, siteId, pageIdToDelete);
      }, [sites, contextSaveSites, toast]);
      
      const updatePageData = useCallback((siteId, pageId, pageUpdates) => {
        updatePageDataAction(sites, contextSaveSites, toast, siteId, pageId, pageUpdates);
      }, [sites, contextSaveSites, toast]);

      const addElementToPage = useCallback((siteId, pageId, elementType, initialProps = {}) => {
        addElementToPageAction(sites, contextSaveSites, toast, siteId, pageId, elementType, initialProps);
      }, [sites, contextSaveSites, toast]);
      
      const updateElement = useCallback((siteId, pageId, elementId, elementUpdates) => {
        updateElementAction(sites, contextSaveSites, toast, siteId, pageId, elementId, elementUpdates);
      }, [sites, contextSaveSites, toast]);
      
      const deleteElement = useCallback((siteId, pageId, elementId) => {
        deleteElementAction(sites, contextSaveSites, toast, siteId, pageId, elementId);
      }, [sites, contextSaveSites, toast]);

      const reorderElements = useCallback((siteId, pageId, draggedElementId, targetElementId) => {
        reorderElementsAction(sites, contextSaveSites, toast, siteId, pageId, draggedElementId, targetElementId);
      }, [sites, contextSaveSites, toast]);

      return (
        <PortfolioContext.Provider value={{ 
          sites, 
          isLoading,
          addSite, 
          getSiteById,
          getSiteByPublicId, 
          updateSite, 
          deleteSite, 
          addPage,
          deletePage,
          updatePageData,
          addElementToPage,
          updateElement,
          deleteElement,
          reorderElements
        }}>
          {children}
        </PortfolioContext.Provider>
      );
    };

    export { PortfolioContext, PortfolioProvider };
  