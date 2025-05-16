
    import React from 'react';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'; // Assuming you'll create this
    import { User, Settings, LogOut } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast.jsx';

    const UserAccountNav = ({ themeMode = 'dark' }) => {
      const { toast } = useToast();

      const handlePlaceholderAction = (actionName) => {
        toast({
          title: "Feature Coming Soon!",
          description: `${actionName} functionality is not yet implemented.`,
        });
      };
      
      const triggerButtonClass = themeMode === 'dark' 
        ? 'text-slate-300 hover:bg-slate-700 hover:text-white' 
        : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900';

      const contentClass = themeMode === 'dark'
        ? 'bg-slate-800 border-slate-700 text-slate-200'
        : 'bg-white border-slate-200 text-slate-800';
      
      const itemClass = themeMode === 'dark'
        ? 'hover:bg-slate-700 focus:bg-slate-700'
        : 'hover:bg-slate-100 focus:bg-slate-100';


      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className={`rounded-full ${triggerButtonClass}`}>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" alt="User Avatar" />
                <AvatarFallback className="bg-purple-500 text-white">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`w-56 ${contentClass}`} align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">BBS User</p>
                <p className={`text-xs leading-none ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  student@bbs.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className={`${themeMode === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <DropdownMenuItem onClick={() => handlePlaceholderAction('Account Settings')} className={itemClass}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className={`${themeMode === 'dark' ? 'bg-slate-700' : 'bg-slate-200'}`} />
            <DropdownMenuItem onClick={() => handlePlaceholderAction('Sign Out')} className={itemClass}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    export default UserAccountNav;
  