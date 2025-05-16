
    import React, { useEffect, useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import useAppContext from '@/hooks/useAppContext.jsx';
    import { motion } from 'framer-motion';
    import RenderElementPublic from '@/components/common/RenderElementPublic.jsx';

    const PreviewPage = () => {
      const { siteId, pageId: pageIdFromParams } = useParams();
      const { getSiteById, isLoading } = useAppContext();
      const navigate = useNavigate();
      const [siteData, setSiteData] = useState(null);
      const [pageData, setPageData] = useState(null);

      useEffect(() => {
        if (!isLoading) {
          const currentSite = getSiteById(siteId);
          if (currentSite) {
            setSiteData(currentSite);
            const targetPageId = pageIdFromParams || (currentSite.pages.length > 0 ? currentSite.pages[0].id : null);
            if (targetPageId) {
              const currentPage = currentSite.pages.find(p => p.id === targetPageId);
              if (currentPage) {
                setPageData(currentPage);
              } else {
                navigate('/dashboard'); 
              }
            } else if (currentSite.pages.length > 0) { 
                 setPageData(currentSite.pages[0]);
            }
             else {
              setPageData(null); // Site exists but has no pages
            }
          } else {
            navigate('/dashboard'); 
          }
        }
      }, [siteId, pageIdFromParams, getSiteById, isLoading, navigate]);

      if (isLoading || !siteData ) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
            <p className="text-2xl text-slate-600 dark:text-slate-300">Loading Preview...</p>
          </div>
        );
      }
      
      const siteTheme = siteData.theme || { mode: 'light', primaryColor: '#3b82f6', fontFamily: 'Inter, sans-serif' };
      const themeMode = siteTheme.mode;
      const bodyBg = themeMode === 'dark' ? 'bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200';
      const headerTitleColor = themeMode === 'dark' ? 'text-slate-100' : 'text-slate-800';
      const headerSubtitleColor = themeMode === 'dark' ? 'text-slate-300' : 'text-slate-600';
      const mainBg = themeMode === 'dark' ? 'bg-slate-800' : 'bg-white';
      const footerTextColor = themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500';
      const footerBorderColor = themeMode === 'dark' ? 'border-slate-700' : 'border-slate-300';

      const dynamicStyles = `
        body {
          font-family: ${siteTheme.fontFamily || 'Inter, sans-serif'};
        }
        :root {
          --primary-color: ${siteTheme.primaryColor || '#3b82f6'};
        }
        a { color: var(--primary-color); }
        .highlight { color: var(--primary-color); }
      `;

      return (
        <div className={`min-h-screen ${bodyBg} p-4 sm:p-8 ${themeMode}`}>
          <style>{dynamicStyles}</style>
          <motion.header 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-8 text-center"
          >
            <h1 className={`text-4xl sm:text-5xl font-bold ${headerTitleColor} mb-2`}>{siteData.name}</h1>
            {pageData && <p className={`text-xl ${headerSubtitleColor}`}>{pageData.name}</p>}
          </motion.header>
          
          <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`max-w-3xl mx-auto ${mainBg} shadow-xl rounded-lg p-6 sm:p-10`}
          >
            {pageData && pageData.elements && pageData.elements.length > 0 ? (
              pageData.elements.map(element => (
                <RenderElementPublic key={element.id} element={element} siteTheme={siteTheme} />
              ))
            ) : (
              <div className="text-center py-16">
                <img   alt="Empty page illustration" class="mx-auto mb-6 w-40 h-40 opacity-50" src="https://images.unsplash.com/photo-1663124178716-2078c384c24a" src="https://images.unsplash.com/photo-1684347417348-d261d03c60ef" />
                <p className={`text-xl ${headerSubtitleColor}`}>{pageData ? 'This page is currently empty.' : 'No pages in this site yet.'}</p>
              </div>
            )}
          </motion.main>

          <footer className={`text-center mt-12 py-6 border-t ${footerBorderColor}`}>
            <p className={`text-sm ${footerTextColor}`}>Powered by BBS Portfolio Builder</p>
          </footer>
        </div>
      );
    };

    export default PreviewPage;
  