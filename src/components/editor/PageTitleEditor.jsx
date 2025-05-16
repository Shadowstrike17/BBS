
    import React, { useState, useEffect, useRef } from 'react';
    import { Input } from '@/components/ui/input.jsx';

    const PageTitleEditor = ({ initialTitle, onSave, siteTheme }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [title, setTitle] = useState(initialTitle);
      const inputRef = useRef(null);
      
      const themeMode = siteTheme?.mode || 'light';
      const titleColorClass = themeMode === 'dark' ? 'text-slate-100' : 'text-slate-800';
      const hoverBgClass = themeMode === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-slate-100';
      const inputBgClass = themeMode === 'dark' ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900';


      useEffect(() => {
        setTitle(initialTitle);
      }, [initialTitle]);

      useEffect(() => {
        if (isEditing && inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, [isEditing]);

      const handleTitleChange = (e) => {
        setTitle(e.target.value);
      };

      const handleSaveTitle = () => {
        if (initialTitle !== title && title.trim() !== "") {
          onSave(title.trim());
        } else if (title.trim() === "") {
            setTitle(initialTitle); // Revert if empty
        }
        setIsEditing(false);
      };

      const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSaveTitle();
        } else if (e.key === 'Escape') {
          setTitle(initialTitle);
          setIsEditing(false);
        }
      };

      if (isEditing) {
        return (
          <Input
            ref={inputRef}
            value={title}
            onChange={handleTitleChange}
            onBlur={handleSaveTitle}
            onKeyDown={handleKeyDown}
            className={`text-3xl sm:text-4xl font-bold ${titleColorClass} mb-6 border-b-2 border-blue-500 focus:border-blue-500 pb-3 w-full ${inputBgClass}`}
          />
        );
      }

      return (
        <h1 
          className={`text-3xl sm:text-4xl font-bold ${titleColorClass} mb-6 border-b border-slate-200 dark:border-slate-700 pb-4 cursor-pointer ${hoverBgClass} p-2 rounded-md transition-colors`}
          onDoubleClick={() => setIsEditing(true)}
          title="Double-click to edit page title"
        >
          {title}
        </h1>
      );
    };

    export default PageTitleEditor;
  