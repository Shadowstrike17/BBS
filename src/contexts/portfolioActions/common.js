
    import React from 'react';

    export const saveSitesToLocalStorage = (currentSites, toast) => {
      try {
        localStorage.setItem('bbs_portfolios', JSON.stringify(currentSites));
      } catch (error) {
        console.error("Failed to save sites to localStorage:", error);
        if (toast) {
          toast({
            title: "Error",
            description: "Could not save your changes.",
            variant: "destructive",
          });
        }
      }
    };
    
    export const loadSitesFromLocalStorage = (setSites, setIsLoading, toast) => {
      setIsLoading(true);
      try {
        const storedSites = localStorage.getItem('bbs_portfolios');
        if (storedSites) {
          setSites(JSON.parse(storedSites));
        } else {
          setSites([]);
        }
      } catch (error) {
        console.error("Failed to load sites from localStorage:", error);
        if (toast) {
          toast({
            title: "Error",
            description: "Could not load your saved sites.",
            variant: "destructive",
          });
        }
        setSites([]);
      } finally {
        setIsLoading(false);
      }
    };
  