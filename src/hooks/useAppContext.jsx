
    import React, { useContext } from 'react';
    import { PortfolioContext } from '@/contexts/PortfolioContext.jsx';

    const useAppContext = () => {
      const context = useContext(PortfolioContext);
      if (!context) {
        throw new Error('useAppContext must be used within a PortfolioProvider');
      }
      return context;
    };

    export default useAppContext;
  