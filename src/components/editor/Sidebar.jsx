
    import React, { useState } from 'react';
    import { LayoutGrid, FileText, Settings, Palette, Type, FileImage as ImageIcon, Combine, Minus, PlusSquare, Trash2, Square, Circle as CircleIcon, Triangle, ArrowRight } from 'lucide-react';
    import { motion } from 'framer-motion';
    import useAppContext from '@/hooks/useAppContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.jsx";
    import { toast } from '@/components/ui/use-toast.jsx';

    const SidebarItem = ({ icon: Icon, label, onClick, isActive }) => (
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "rgba(192, 132, 252, 0.1)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-3 space-y-1 rounded-lg transition-colors duration-150 w-full ${
          isActive ? 'text-purple-400 bg-slate-700/50' : 'text-slate-300 hover:text-purple-400'
        }`}
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="text-xs">{label}</span>
      </motion.button>
    );
    
    const AddElementButton = ({ icon: Icon, label, type, siteId, pageId, refreshSiteState, elementType, shapeType }) => {
      const { addElementToPage } = useAppContext();

      const handleAddElement = () => {
        if (!pageId) {
          toast({ title: "Error", description: "No page selected to add element.", variant: "destructive"});
          return;
        }
        const initialProps = elementType === 'shape' ? { shapeType } : {};
        addElementToPage(siteId, pageId, elementType, initialProps);
        if(refreshSiteState) refreshSiteState(); 
      };

      return (
        <Button
          variant="outline"
          className="w-full justify-start gap-2 p-3 border-slate-600 text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 hover:text-purple-300 transition-all duration-150 text-sm"
          onClick={handleAddElement}
          disabled={!pageId}
        >
          <Icon className="h-5 w-5 text-purple-400" />
          <span>Add {label}</span>
        </Button>
      );
    };

    const PagesPanel = ({ site, activePageId, onPageChange, refreshSiteState }) => {
      const { addPage, deletePage } = useAppContext();
      const [newPageName, setNewPageName] = useState('');

      const handleAddPage = () => {
        if (!newPageName.trim()) {
          toast({ title: "Error", description: "Page name cannot be empty.", variant: "destructive" });
          return;
        }
        const newId = addPage(site.id, newPageName);
        setNewPageName('');
        if (newId) onPageChange(newId);
        if(refreshSiteState) refreshSiteState();
      };

      const handleDeletePage = (pageIdToDelete) => {
        deletePage(site.id, pageIdToDelete);
        if (activePageId === pageIdToDelete) {
          const remainingPages = site.pages.filter(p => p.id !== pageIdToDelete);
          if (remainingPages.length > 0) {
            onPageChange(remainingPages[0].id);
          } else {
            onPageChange(null); 
          }
        }
        if(refreshSiteState) refreshSiteState();
      };

      return (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-1">Manage Pages</h3>
          <div className="flex gap-2">
            <Input 
              type="text" 
              placeholder="New page name" 
              value={newPageName} 
              onChange={(e) => setNewPageName(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-purple-500 flex-grow text-sm"
            />
            <Button onClick={handleAddPage} size="icon" className="bg-purple-600 hover:bg-purple-700 shrink-0">
              <PlusSquare size={18} />
            </Button>
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700/50 pr-1">
            {site.pages.map(page => (
              <div 
                key={page.id} 
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors text-sm ${activePageId === page.id ? 'bg-purple-500/30 text-purple-300' : 'hover:bg-slate-700/70 text-slate-300'}`}
                onClick={() => onPageChange(page.id)}
              >
                <span className="truncate">{page.name}</span>
                {site.pages.length > 1 && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-500" onClick={(e) => { e.stopPropagation(); handleDeletePage(page.id); }}>
                    <Trash2 size={14} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    };

    const ThemePanel = ({ site, refreshSiteState }) => {
        const { updateSite } = useAppContext();
        const currentTheme = site.theme || { mode: 'light', primaryColor: '#3b82f6' };

        const handleThemeModeChange = (value) => {
            updateSite(site.id, { theme: { ...currentTheme, mode: value } });
            if(refreshSiteState) refreshSiteState();
        };
        
        const handlePrimaryColorChange = (color) => {
             updateSite(site.id, { theme: { ...currentTheme, primaryColor: color } });
             if(refreshSiteState) refreshSiteState();
        };

        const predefinedColors = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#0EA5E9', '#6366F1', '#EC4899'];


        return (
            <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-1">Customize Theme</h3>
                <div>
                    <Label className="text-slate-300 mb-2 block text-sm">Mode</Label>
                    <RadioGroup defaultValue={currentTheme.mode} onValueChange={handleThemeModeChange} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="light" id="theme-light" className="border-slate-500 data-[state=checked]:border-purple-400 data-[state=checked]:text-purple-400"/>
                            <Label htmlFor="theme-light" className="text-slate-300 text-sm">Light</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="dark" id="theme-dark" className="border-slate-500 data-[state=checked]:border-purple-400 data-[state=checked]:text-purple-400"/>
                            <Label htmlFor="theme-dark" className="text-slate-300 text-sm">Dark</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div>
                    <Label className="text-slate-300 mb-2 block text-sm">Primary Color</Label>
                    <div className="flex gap-2 flex-wrap">
                        {predefinedColors.map(color => (
                            <button 
                                key={color}
                                onClick={() => handlePrimaryColorChange(color)}
                                className={`w-7 h-7 rounded-full border-2 transition-all ${currentTheme.primaryColor === color ? 'border-white ring-2 ring-offset-2 ring-offset-slate-800 ring-white' : 'border-transparent hover:border-slate-400'}`}
                                style={{ backgroundColor: color }}
                                title={color}
                            />
                        ))}
                         <input 
                            type="color" 
                            value={currentTheme.primaryColor} 
                            onChange={(e) => handlePrimaryColorChange(e.target.value)}
                            className="w-7 h-7 rounded-full border-2 border-slate-600 cursor-pointer p-0 bg-transparent appearance-none"
                            title="Custom color"
                        />
                    </div>
                </div>
            </div>
        );
    };


    const Sidebar = ({ site, activePageId, onPageChange, refreshSiteState }) => {
      const [activeTab, setActiveTab] = useState('elements');

      return (
        <motion.div 
          initial={{ x: -250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="w-64 sm:w-72 bg-slate-800 border-r border-slate-700 p-3 sm:p-4 flex flex-col space-y-3 sm:space-y-4 shadow-lg"
        >
          <div className="flex justify-around border-b border-slate-700 pb-2 gap-1">
             <SidebarItem icon={LayoutGrid} label="Elements" onClick={() => setActiveTab('elements')} isActive={activeTab === 'elements'} />
             <SidebarItem icon={FileText} label="Pages" onClick={() => setActiveTab('pages')} isActive={activeTab === 'pages'} />
             <SidebarItem icon={Palette} label="Theme" onClick={() => setActiveTab('theme')} isActive={activeTab === 'theme'} />
             <SidebarItem icon={Settings} label="Settings" onClick={() => setActiveTab('settings')} isActive={activeTab === 'settings'} />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 pr-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800">
            {activeTab === 'elements' && (
              <>
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider px-1">Add Elements</h3>
                <AddElementButton icon={Type} label="Text Block" elementType="text" siteId={site.id} pageId={activePageId} refreshSiteState={refreshSiteState} />
                <AddElementButton icon={ImageIcon} label="Image" elementType="image" siteId={site.id} pageId={activePageId} refreshSiteState={refreshSiteState} />
                <AddElementButton icon={Square} label="Square" elementType="shape" shapeType="square" siteId={site.id} pageId={activePageId} refreshSiteState={refreshSiteState} />
                <AddElementButton icon={CircleIcon} label="Circle" elementType="shape" shapeType="circle" siteId={site.id} pageId={activePageId} refreshSiteState={refreshSiteState} />
                <AddElementButton icon={Triangle} label="Triangle" elementType="shape" shapeType="triangle" siteId={site.id} pageId={activePageId} refreshSiteState={refreshSiteState} />
                {/* <AddElementButton icon={ArrowRight} label="Arrow" elementType="shape" shapeType="arrow" siteId={site.id} pageId={activePageId} refreshSiteState={refreshSiteState} /> */}
                <AddElementButton icon={Combine} label="Section" elementType="section" siteId={site.id} pageId={activePageId} refreshSiteState={refreshSiteState} />
                <AddElementButton icon={Minus} label="Divider" elementType="divider" siteId={site.id} pageId={activePageId} refreshSiteState={refreshSiteState} />
              </>
            )}
            {activeTab === 'pages' && <PagesPanel site={site} activePageId={activePageId} onPageChange={onPageChange} refreshSiteState={refreshSiteState} />}
            {activeTab === 'theme' && <ThemePanel site={site} refreshSiteState={refreshSiteState} />}
            {activeTab === 'settings' && <p className="text-slate-400 text-sm p-2">Site settings coming soon. Use the tabs above to navigate sections.</p>}
          </div>
        </motion.div>
      );
    };

    export default Sidebar;
  