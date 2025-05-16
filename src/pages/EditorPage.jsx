
    import React, { useEffect, useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import useAppContext from '@/hooks/useAppContext.jsx';
    import EditorLayout from '@/components/editor/EditorLayout.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { ArrowLeft } from 'lucide-react';

    const EditorPage = () => {
      const { siteId } = useParams();
      const { getSiteById, isLoading } = useAppContext();
      const navigate = useNavigate();
      const [currentSite, setCurrentSite] = useState(null);

      useEffect(() => {
        if (!isLoading) {
          const siteData = getSiteById(siteId);
          if (siteData) {
            setCurrentSite(siteData);
          } else {
            // Site not found, navigate back to dashboard or show error
            navigate('/'); 
          }
        }
      }, [siteId, getSiteById, isLoading, navigate]);

      if (isLoading || !currentSite) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <p className="text-2xl text-white">Loading Editor...</p>
            {/* Add a timeout redirect or a manual back button if stuck */}
          </div>
        );
      }

      return (
        <div className="flex flex-col h-screen bg-slate-900 text-white">
          <EditorLayout site={currentSite} />
        </div>
      );
    };

    export default EditorPage;
  