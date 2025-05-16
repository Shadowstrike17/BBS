
    import React from 'react';
    import { Separator } from '@/components/ui/separator.jsx';
    import { ImagePlus } from 'lucide-react';
    import ShapeElement from '@/components/editor/elements/ShapeElement.jsx';

    const CanvasElementRenderer = ({ element, isSelected, isEditing, textInputRef, currentContent, handleContentChange, handleSaveContent, handleTextKeyDown, handleImagePlaceholderClick, fileInputRef, handleImageUpload, siteTheme }) => {
      const themeMode = siteTheme?.mode || 'light';
      const defaultTextColor = themeMode === 'dark' ? "text-slate-200" : "text-slate-700";
      const placeholderTextColorClass = themeMode === 'dark' ? "text-slate-400" : "text-slate-500";
      const placeholderBgClass = themeMode === 'dark' ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-50 hover:bg-slate-100";
      const separatorColor = themeMode === 'dark' ? "bg-slate-500" : "bg-slate-400";

      const elementStyles = {
        ...element.styles,
        width: '100%', 
        height: '100%', 
        minHeight: element.type === 'text' ? '30px' : 'auto',
        overflow: 'hidden',
        color: element.styles?.color || defaultTextColor,
      };
      
      const imageContainerStyles = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      };

      const imgStyles = {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: element.styles?.objectFit || 'contain', 
        borderRadius: element.styles?.borderRadius || '0.375rem', 
        boxShadow: element.styles?.boxShadow || '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
      };


      if (isEditing && element.type === 'text') {
        return (
          <textarea
            ref={textInputRef}
            value={currentContent}
            onChange={handleContentChange}
            onBlur={handleSaveContent}
            onKeyDown={handleTextKeyDown}
            className={`w-full h-full text-base p-2 resize-none border-0 focus:ring-0 bg-transparent`}
            style={{
              ...element.styles,
              minHeight: '30px',
              color: element.styles?.color || (themeMode === 'dark' ? 'text-slate-100' : 'text-slate-800'),
              fontWeight: element.styles?.fontWeight || 'normal',
              fontStyle: element.styles?.fontStyle || 'normal',
            }}
          />
        );
      }

      switch (element.type) {
        case 'text':
          return <p className={`text-base flex-grow whitespace-pre-wrap w-full h-full`} style={elementStyles}>{element.content}</p>;
        case 'image':
          return (
            <div className={`${placeholderTextColorClass} flex-grow w-full h-full`} style={imageContainerStyles}>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
              {element.imageUrl ? (
                <img  alt={element.content || "Uploaded image"} src={element.imageUrl} style={imgStyles} />
              ) : (
                <div 
                  className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded w-full h-full ${themeMode === 'dark' ? 'border-slate-500' : 'border-slate-300'} ${placeholderBgClass}`} 
                  onClick={handleImagePlaceholderClick}
                >
                  <ImagePlus className={`h-12 w-12 ${placeholderTextColorClass} mb-2`} />
                  <p className={`text-sm ${placeholderTextColorClass}`}>Click to upload image</p>
                </div>
              )}
              {element.imageUrl && element.content && element.content !== "Pasted Image" && element.content !== "Image Placeholder" && 
                <p className={`text-xs italic mt-1 ${themeMode === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{element.content}</p>
              }
            </div>
          );
        case 'shape':
          return <ShapeElement element={{...element, styles: elementStyles}} themeMode={themeMode} />;
        case 'section':
          return (
            <div className={`${placeholderTextColorClass} flex-grow border-2 border-dashed p-4 rounded w-full h-full ${themeMode === 'dark' ? 'border-slate-500' : 'border-slate-400'}`} style={elementStyles}>
              <p className={`text-center ${placeholderTextColorClass}`}>{element.content || "New Section"}</p>
            </div>
          );
        case 'divider':
          return <Separator className={`my-3 ${separatorColor}`} style={element.styles} />;
        default:
          return <p className="text-red-500">Unknown element type: {element.type}</p>;
      }
    };

    export default CanvasElementRenderer;
  