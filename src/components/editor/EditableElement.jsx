
    import React, { useState, useEffect, useRef } from 'react';
    import { motion } from 'framer-motion';
    import useAppContext from '@/hooks/useAppContext.jsx';
    import { Button } from '@/components/ui/button.jsx';
    import { Trash2, Edit3, GripVertical } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast.jsx';
    import CanvasElementRenderer from '@/components/editor/canvas/CanvasElementRenderer.jsx';
    import ResizableElement from '@/components/editor/elements/ResizableElement.jsx';
    import TextToolbar from '@/components/editor/elements/TextToolbar.jsx';

    const EditableElement = ({ element, siteId, pageId, refreshSiteState, isSelected, onSelect, onDragStart, onDragOver, onDrop, isDragging, siteTheme }) => {
      const { updateElement, deleteElement } = useAppContext();
      const [isEditing, setIsEditing] = useState(false);
      const [currentContent, setCurrentContent] = useState(element.content);
      const [currentStyles, setCurrentStyles] = useState(element.styles || {});
      const textInputRef = useRef(null);
      const fileInputRef = useRef(null);
      const wrapperRef = useRef(null);
      const { toast } = useToast();

      useEffect(() => {
        setCurrentContent(element.content);
        setCurrentStyles(element.styles || {});
      }, [element.content, element.styles]);

      useEffect(() => {
        if (isEditing && element.type === 'text' && textInputRef.current) {
          textInputRef.current.focus();
          textInputRef.current.select();
        }
      }, [isEditing, element.type]);
      
      const handleContentChange = (e) => {
        setCurrentContent(e.target.value);
      };

      const handleSaveContentAndStyles = () => {
        const updates = {};
        if (element.content !== currentContent) {
          updates.content = currentContent;
        }
        if (JSON.stringify(element.styles) !== JSON.stringify(currentStyles)) {
          updates.styles = currentStyles;
        }
        if (Object.keys(updates).length > 0) {
          updateElement(siteId, pageId, element.id, updates);
        }
        setIsEditing(false);
        if(refreshSiteState) refreshSiteState();
      };
      
      const handleTextStyleChange = (styleKey, value) => {
        const newStyles = { ...currentStyles, [styleKey]: value };
        setCurrentStyles(newStyles);
        updateElement(siteId, pageId, element.id, { styles: newStyles });
        if(refreshSiteState) refreshSiteState();
      };


      const handleTextKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { 
          e.preventDefault();
          handleSaveContentAndStyles();
        } else if (e.key === 'Escape') {
          setCurrentContent(element.content); 
          setCurrentStyles(element.styles || {});
          setIsEditing(false);
        }
      };
      
      const handleDelete = (e) => {
        e.stopPropagation();
        deleteElement(siteId, pageId, element.id);
        if(refreshSiteState) refreshSiteState();
      };

      const handleImagePlaceholderClick = (e) => {
        e.stopPropagation();
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };

      const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            updateElement(siteId, pageId, element.id, { imageUrl: reader.result, content: file.name });
            if(refreshSiteState) refreshSiteState();
            toast({ title: "Image Uploaded!", description: `${file.name} has been added.` });
          };
          reader.readAsDataURL(file);
        }
      };
      
      const handleElementClick = (e) => {
        e.stopPropagation();
        onSelect(element.id);
      };

      const handleWrapperDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (element.type !== 'shape') return;

        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateElement(siteId, pageId, element.id, { 
                    styles: { 
                        ...currentStyles, 
                        backgroundImage: `url(${reader.result})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }
                });
                if(refreshSiteState) refreshSiteState();
                toast({ title: "Image Dropped!", description: `${file.name} set as shape background.`});
            };
            reader.readAsDataURL(file);
        }
      };

      const handleWrapperDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (element.type === 'shape') {
            e.dataTransfer.dropEffect = "copy";
        } else {
            e.dataTransfer.dropEffect = "none";
        }
      };

      const themeMode = siteTheme?.mode || 'light';
      const borderClass = isSelected ? 'border-blue-500 ring-2 ring-blue-500 dark:ring-blue-400' : (themeMode === 'dark' ? 'border-slate-600 hover:border-purple-500' : 'border-slate-300 hover:border-purple-400');
      const baseBgClass = isEditing && element.type === 'text' ? (themeMode === 'dark' ? 'bg-slate-800' : 'bg-slate-50') : (themeMode === 'dark' ? 'bg-slate-700' : 'bg-white');
      const elementBaseClass = `relative group my-3 p-3 border rounded transition-colors duration-150 cursor-grab ${baseBgClass} ${borderClass} ${isDragging ? 'opacity-50 shadow-2xl' : 'shadow-md'}`;
      const textColorClass = themeMode === 'dark' ? "text-slate-300" : "text-slate-600";

      return (
        <ResizableElement element={{...element, styles: currentStyles}} siteId={siteId} pageId={pageId} isSelected={isSelected} siteTheme={siteTheme}>
          <motion.div
            ref={wrapperRef}
            layout="position" 
            draggable="true"
            onDragStart={(e) => onDragStart(e, element.id)}
            onDragOver={(e) => {
              onDragOver(e, element.id); 
              handleWrapperDragOver(e); 
            }}
            onDrop={(e) => {
              onDrop(e, element.id); 
              handleWrapperDrop(e); 
            }}
            data-element-id={element.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${elementBaseClass} w-full h-full`} 
            style={{ 
              minHeight: element.type === 'text' ? '50px' : (currentStyles?.height || 'auto'),
              minWidth: '50px',
            }}
            onClick={handleElementClick}
          >
            <div className={`absolute left-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity cursor-grab p-1 ${textColorClass}`}>
              <GripVertical size={18}/>
            </div>
            <div className="ml-6 h-full">
              <CanvasElementRenderer
                element={{...element, styles: currentStyles}}
                isSelected={isSelected}
                isEditing={isEditing}
                textInputRef={textInputRef}
                currentContent={currentContent}
                handleContentChange={handleContentChange}
                handleSaveContent={handleSaveContentAndStyles}
                handleTextKeyDown={handleTextKeyDown}
                handleImagePlaceholderClick={handleImagePlaceholderClick}
                fileInputRef={fileInputRef}
                handleImageUpload={handleImageUpload}
                siteTheme={siteTheme}
              />
            </div>

            {isSelected && (
              <div className={`absolute -top-3 -right-3 opacity-100 group-hover:opacity-100 transition-opacity flex items-center gap-1 p-1 rounded shadow-lg border z-10 ${themeMode === 'dark' ? 'bg-slate-800 border-blue-400' : 'bg-white border-blue-500'}`}>
                {element.type === 'text' && isEditing && (
                  <TextToolbar styles={currentStyles} onStyleChange={handleTextStyleChange} siteTheme={siteTheme} />
                )}
                {element.type === 'text' && !isEditing && (
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className={`h-7 w-7 ${themeMode === 'dark' ? 'text-slate-300 hover:text-blue-400' : 'text-slate-600 hover:text-blue-700'}`}>
                    <Edit3 size={16} />
                  </Button>
                )}
                 {(element.type === 'image' || element.type === 'shape') && !isEditing && (
                   <Button variant="ghost" size="icon" onClick={handleImagePlaceholderClick} className={`h-7 w-7 ${themeMode === 'dark' ? 'text-slate-300 hover:text-green-400' : 'text-slate-600 hover:text-green-700'}`}>
                      <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                      <Edit3 size={16} />
                   </Button>
                 )}
                {!isEditing && (
                  <Button variant="ghost" size="icon" onClick={handleDelete} className={`h-7 w-7 ${themeMode === 'dark' ? 'text-slate-300 hover:text-red-400' : 'text-slate-600 hover:text-red-700'}`}>
                    <Trash2 size={16} />
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </ResizableElement>
      );
    };

    export default EditableElement;
  