
    import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button.jsx';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card.jsx';
    import { Input } from '@/components/ui/input.jsx';
    import { Label } from '@/components/ui/label.jsx';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog.jsx';
    import { PlusCircle, Edit, Trash2, Eye, Edit3, Copy } from 'lucide-react';
    import useAppContext from '@/hooks/useAppContext.jsx';
    import { motion, AnimatePresence } from 'framer-motion';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import UserAccountNav from '@/components/common/UserAccountNav.jsx';

    const DashboardPage = () => {
      const { sites, addSite, deleteSite, updateSite, isLoading } = useAppContext();
      const [newSiteName, setNewSiteName] = useState('');
      const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const [editingSite, setEditingSite] = useState(null);
      const [editingSiteName, setEditingSiteName] = useState('');
      const [useTemplate, setUseTemplate] = useState(false); 
      const { toast } = useToast();
      
      const logoUrl = "https://media.licdn.com/dms/image/v2/C510BAQFVN8zctlTmHw/company-logo_200_200/company-logo_200_200/0/1630600060771?e=2147483647&v=beta&t=vsdD8cfLASh0vlSQ8oNL7nUsDBwXb7km4vxoa6BnmYA";

      const handleCreateSite = () => {
        if (!newSiteName.trim()) {
          toast({
            title: "Uh oh!",
            description: "Please enter a name for your new portfolio.",
            variant: "destructive",
          });
          return;
        }
        addSite(newSiteName, useTemplate);
        setNewSiteName('');
        setIsCreateDialogOpen(false);
        setUseTemplate(false); 
      };

      const handleOpenEditDialog = (site) => {
        setEditingSite(site);
        setEditingSiteName(site.name);
        setIsEditDialogOpen(true);
      };

      const handleUpdateSiteName = () => {
        if (!editingSiteName.trim()) {
          toast({
            title: "Uh oh!",
            description: "Portfolio name cannot be empty.",
            variant: "destructive",
          });
          return;
        }
        if (editingSite) {
          updateSite(editingSite.id, { ...editingSite, name: editingSiteName });
        }
        setIsEditDialogOpen(false);
        setEditingSite(null);
      };

      const handleCopyLink = (publicId) => {
        if (!publicId) {
          toast({ title: "Link Not Available", description: "Save the portfolio in the editor to generate a shareable link.", variant: "default" });
          return;
        }
        const link = `${window.location.origin}/view/${publicId}`;
        navigator.clipboard.writeText(link);
        toast({ title: "Link Copied!", description: "Sharable link copied to clipboard." });
      };

      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
      };

      if (isLoading) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <p className="text-2xl text-white animate-pulse">Loading Portfolios...</p>
          </div>
        );
      }
      
      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
      };
      
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      };

      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-4 sm:p-8 text-white">
          <motion.header 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="flex flex-col sm:flex-row justify-between items-center mb-10 sm:mb-16"
          >
            <div className="flex items-center mb-4 sm:mb-0">
              <img src={logoUrl} alt="BBS Logo" className="h-10 w-auto mr-3 rounded-sm" />
              <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
                My Portfolios
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
                    <PlusCircle className="mr-2 h-5 w-5" /> Create New Portfolio
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-white rounded-lg shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-purple-400 text-xl">Create New Portfolio</DialogTitle>
                    <DialogDescription className="text-slate-400">
                      Give your new portfolio a name. You can change it later.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right text-slate-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newSiteName}
                        onChange={(e) => setNewSiteName(e.target.value)}
                        className="col-span-3 bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-purple-500 rounded-md"
                        placeholder="e.g., My Awesome Project"
                      />
                    </div>
                    <div className="flex items-center space-x-2 mt-2 col-span-4 justify-center">
                       <input type="checkbox" id="useTemplate" checked={useTemplate} onChange={(e) => setUseTemplate(e.target.checked)} className="form-checkbox h-5 w-5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 cursor-pointer" />
                       <Label htmlFor="useTemplate" className="text-slate-300 cursor-pointer">Use Student Portfolio Template</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => setIsCreateDialogOpen(false)} variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700 rounded-md">Cancel</Button>
                    <Button onClick={handleCreateSite} className="bg-purple-600 hover:bg-purple-700 rounded-md">Create Portfolio</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <UserAccountNav themeMode="dark" />
            </div>
          </motion.header>

          <AnimatePresence>
            {sites.length === 0 ? (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <img  alt="Creative illustration for empty state" className="mx-auto mb-8 w-56 h-56 sm:w-64 sm:h-64 opacity-70 filter grayscale brightness-75" src="https://images.unsplash.com/photo-1671043124535-342e36988247" />
                <h2 className="text-3xl font-semibold text-slate-300 mb-3">No Portfolios Yet!</h2>
                <p className="text-slate-400 mb-6">Click "Create New Portfolio" to get started and showcase your amazing work.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="sites-list"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {sites.map((site) => (
                  <motion.div
                    key={site.id}
                    variants={cardVariants}
                    className="h-full"
                  >
                    <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700/40 shadow-xl hover:shadow-purple-500/30 transition-all duration-300 flex flex-col h-full rounded-xl hover:border-purple-600/60">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl font-semibold text-purple-300">{site.name}</CardTitle>
                          <Button onClick={() => handleOpenEditDialog(site)} variant="ghost" size="icon" className="text-slate-400 hover:text-purple-300 -mt-2 -mr-2 h-8 w-8">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription className="text-xs text-slate-500">
                          Last updated: {formatDate(site.updatedAt)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow py-2">
                        <p className="text-sm text-slate-300 line-clamp-3">
                          {site.pages?.[0]?.elements?.find(el => el.type === 'text')?.content?.substring(0,100) || "This portfolio is ready for your content."}
                          {site.pages?.[0]?.elements?.find(el => el.type === 'text')?.content?.length > 100 && "..."}
                        </p>
                        {site.publicId && (
                          <div className="mt-3 pt-3 border-t border-slate-700/50">
                            <Label className="text-xs text-slate-400 block mb-1">Share Link:</Label>
                            <div className="flex items-center gap-2">
                              <Input 
                                readOnly 
                                value={`${window.location.origin}/view/${site.publicId}`} 
                                className="text-xs bg-slate-700/50 border-slate-600 text-slate-300 h-8 rounded-md truncate"
                              />
                              <Button onClick={() => handleCopyLink(site.publicId)} variant="ghost" size="icon" className="text-slate-400 hover:text-purple-300 h-8 w-8 shrink-0">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between items-center border-t border-slate-700/50 pt-4 pb-4">
                        <Link to={`/editor/${site.id}`}>
                          <Button variant="outline" className="text-purple-400 border-purple-500 hover:bg-purple-500/20 hover:text-purple-300 hover:border-purple-400 rounded-md text-sm px-3 py-1.5 h-auto">
                            <Edit className="mr-1.5 h-3.5 w-3.5" /> Edit
                          </Button>
                        </Link>
                        <div className="flex gap-1.5">
                           <Link to={site.publicId ? `/view/${site.publicId}` : `/preview/${site.id}/${site.pages[0].id}`} target="_blank" rel="noopener noreferrer">
                             <Button variant="ghost" size="icon" className="text-slate-400 hover:text-green-400 h-8 w-8">
                               <Eye className="h-4 w-4" />
                             </Button>
                           </Link>
                          <Button onClick={() => deleteSite(site.id)} variant="ghost" size="icon" className="text-slate-400 hover:text-red-500 h-8 w-8">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-white rounded-lg shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-purple-400 text-xl">Edit Portfolio Name</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Update the name of your portfolio.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-name" className="text-right text-slate-300">
                    Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={editingSiteName}
                    onChange={(e) => setEditingSiteName(e.target.value)}
                    className="col-span-3 bg-slate-700 border-slate-600 text-white placeholder-slate-500 focus:ring-purple-500 rounded-md"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setIsEditDialogOpen(false)} variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700 rounded-md">Cancel</Button>
                <Button onClick={handleUpdateSiteName} className="bg-purple-600 hover:bg-purple-700 rounded-md">Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      );
    };

    export default DashboardPage;
  