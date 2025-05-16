
    import React from 'react';
    import { supabase } from '@/lib/supabaseClient.js';
    import { studentPortfolioTemplate } from '@/lib/templates.jsx';

    const PLACEHOLDER_USER_ID = '00000000-0000-0000-0000-000000000000'; // Placeholder for non-authenticated users

    const mapSupabaseToLocalSite = (supabaseSite) => {
      return {
        id: supabaseSite.id,
        name: supabaseSite.name,
        publicId: supabaseSite.public_id,
        theme: supabaseSite.theme_data,
        pages: supabaseSite.pages_data,
        createdAt: supabaseSite.created_at,
        updatedAt: supabaseSite.updated_at,
      };
    };

    const mapLocalToSupabaseSite = (localSite) => {
      return {
        id: localSite.id,
        user_id: PLACEHOLDER_USER_ID, 
        name: localSite.name,
        public_id: localSite.publicId,
        theme_data: localSite.theme,
        pages_data: localSite.pages,
        // created_at and updated_at are handled by Supabase
      };
    };
    
    export const loadSitesFromSupabase = async (setSites, setIsLoading, toast) => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) throw error;

        setSites(data.map(mapSupabaseToLocalSite));
      } catch (error) {
        console.error("Error loading sites from Supabase:", error);
        toast({
          title: "Error Loading Data",
          description: "Could not load portfolios from the cloud. Please try again.",
          variant: "destructive",
        });
        setSites([]); 
      } finally {
        setIsLoading(false);
      }
    };

    export const addSiteSupabase = async (toast, name, useTemplate = false) => {
      const newSiteId = crypto.randomUUID();
      let newSiteData;

      if (useTemplate) {
        const templateCopy = JSON.parse(JSON.stringify(studentPortfolioTemplate));
        newSiteData = {
          id: newSiteId,
          user_id: PLACEHOLDER_USER_ID,
          name: name || templateCopy.name,
          public_id: null,
          theme_data: templateCopy.theme,
          pages_data: templateCopy.pages.map(page => ({
            ...page,
            id: crypto.randomUUID(),
            elements: page.elements.map(el => ({ ...el, id: crypto.randomUUID() }))
          })),
        };
      } else {
        const firstPageId = crypto.randomUUID();
        newSiteData = {
          id: newSiteId,
          user_id: PLACEHOLDER_USER_ID,
          name: name || "Untitled Portfolio",
          public_id: null,
          theme_data: { mode: 'light', primaryColor: '#3B82F6', fontFamily: 'Arial, sans-serif' },
          pages_data: [
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
        };
      }

      const { data, error } = await supabase
        .from('portfolios')
        .insert([newSiteData])
        .select()
        .single();
      
      if (error) {
        console.error("Error adding site to Supabase:", error);
        toast({ title: "Error Creating Portfolio", description: error.message, variant: "destructive" });
        return null;
      }

      toast({ title: "Portfolio Created!", description: `"${data.name}" has been successfully created.` });
      return mapSupabaseToLocalSite(data);
    };

    export const updateSiteSupabase = async (toast, siteId, updatedLocalSiteData) => {
      const currentTimestamp = new Date().toISOString();
      const newPublicId = updatedLocalSiteData.publicId || crypto.randomUUID().slice(0, 8);
      
      const supabaseUpdateData = {
        name: updatedLocalSiteData.name,
        public_id: newPublicId,
        theme_data: updatedLocalSiteData.theme,
        pages_data: updatedLocalSiteData.pages,
        updated_at: currentTimestamp, 
      };

      const { data, error } = await supabase
        .from('portfolios')
        .update(supabaseUpdateData)
        .eq('id', siteId)
        .select()
        .single();

      if (error) {
        console.error("Error updating site in Supabase:", error);
        toast({ title: "Error Saving Portfolio", description: error.message, variant: "destructive" });
        return null;
      }
      if (!data) {
        toast({ title: "Error Saving Portfolio", description: "Portfolio not found or update failed.", variant: "destructive"});
        return null;
      }
      
      // Do not toast here for every small update, only for major saves like from TopBar
      // toast({ title: "Portfolio Saved!", description: `"${data.name}" has been successfully saved.`});
      return mapSupabaseToLocalSite(data);
    };

    export const deleteSiteSupabase = async (toast, siteId, siteName) => {
      const { error } = await supabase
        .from('portfolios')
        .delete()
        .eq('id', siteId);

      if (error) {
        console.error("Error deleting site from Supabase:", error);
        toast({ title: "Error Deleting Portfolio", description: error.message, variant: "destructive" });
        return false;
      }

      toast({ title: "Portfolio Deleted", description: `"${siteName}" has been removed.` });
      return true;
    };
  