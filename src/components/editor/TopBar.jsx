
    import React, { useState, useEffect } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Save, Eye, ArrowLeft, Share2 } from 'lucide-react';
    import useAppContext from '@/hooks/useAppContext.jsx';
    import { toast } from '@/components/ui/use-toast.jsx';
    import { motion } from 'framer-motion';
    import UserAccountNav from '@/components/common/UserAccountNav.jsx';

    const TopBar = ({ siteName: initialSiteName, siteId }) => {
      const [siteName, setSiteName] = useState(initialSiteName);
      const { updateSite, getSiteById } = useAppContext();
      const navigate = useNavigate();
      const currentSite = getSiteById(siteId);
      const siteTheme = currentSite?.theme || { mode: 'dark' };

      useEffect(() => {
        setSiteName(initialSiteName);
      }, [initialSiteName]);

      const handleSaveSiteName = () => {
        if (currentSite && currentSite.name !== siteName && siteName.trim() !== "") {
          updateSite(siteId, { ...currentSite, name: siteName });
           toast({
            title: "Name Saved!",
            description: `Portfolio name updated to "${siteName}".`,
          });
        } else if (siteName.trim() === "") {
          setSiteName(currentSite?.name || "Untitled Site"); 
           toast({
            title: "Error",
            description: "Site name cannot be empty.",
            variant: "destructive",
          });
        }
      };
      
      const handleSaveSite = () => {
        if (currentSite) {
          updateSite(siteId, { ...currentSite, name: siteName.trim() || currentSite.name });
          toast({
            title: "Portfolio Saved!",
            description: `"${siteName}" has been successfully saved. A shareable link is now available.`,
          });
        }
      };

      const handlePreview = () => {
        if (currentSite && currentSite.pages.length > 0) {
          const firstPageId = currentSite.pages[0].id;
          window.open(`/preview/${siteId}/${firstPageId}`, '_blank');
        } else if (currentSite) {
           window.open(`/preview/${siteId}`, '_blank');
        } else {
          toast({
            title: "Error",
            description: "Could not find site data to preview.",
            variant: "destructive",
          });
        }
      };
      
      const handleShareLink = () => {
        if (!currentSite?.publicId) {
            toast({
                title: "Save to Share",
                description: "Please save your portfolio first to generate a shareable link.",
                variant: "default"
            });
            return;
        }
        const viewUrl = `${window.location.origin}/view/${currentSite.publicId}`;
        navigator.clipboard.writeText(viewUrl);
        toast({
          title: "Site Link Copied!",
          description: "The sharable link for your site has been copied to your clipboard.",
          duration: 5000, 
        });
      };

      return (
        <motion.div 
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          className="flex items-center justify-between p-3 bg-slate-800 border-b border-slate-700 shadow-md"
        >
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-slate-300 hover:bg-slate-700 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Input 
              value={siteName} 
              onChange={(e) => setSiteName(e.target.value)} 
              className="text-base sm:text-lg font-semibold bg-transparent border-none focus:ring-0 p-0 h-auto text-white w-auto min-w-[120px] max-w-[200px] sm:min-w-[150px] sm:max-w-[300px]"
              onBlur={handleSaveSiteName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveSiteName()}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handlePreview} variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 h-auto">
              <Eye className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Preview
            </Button>
            <Button onClick={handleSaveSite} className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 h-auto">
              <Save className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Save
            </Button>
             <Button onClick={handleShareLink} className="bg-green-500 hover:bg-green-600 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 h-auto">
              <Share2 className="mr-1 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" /> Share
            </Button>
            <UserAccountNav themeMode={siteTheme.mode} />
          </div>
        </motion.div>
      );
    };

    export default TopBar;
  