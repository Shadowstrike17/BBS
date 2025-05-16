
    import React from 'react';
    import { Separator } from '@/components/ui/separator.jsx';
    import ShapeElement from '@/components/editor/elements/ShapeElement.jsx';

    const RenderElementPublic = ({ element, siteTheme }) => {
      const themeMode = siteTheme?.mode || 'light';
      const defaultTextColor = themeMode === 'dark' ? 'text-slate-200' : 'text-slate-700';
      const mutedTextColor = themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500';
      const borderColor = themeMode === 'dark' ? 'border-slate-600' : 'border-slate-300';
      const separatorColor = themeMode === 'dark' ? 'bg-slate-600' : 'bg-slate-300';

      const getProcessedStyles = (el) => {
        const styles = { ...el.styles };
        
        // Handle theme primary color replacement
        const primaryColor = siteTheme.primaryColor || (themeMode === 'dark' ? '#A3BFFA' : '#3B82F6');
        if (styles.color === 'var(--primary-color)') {
            styles.color = primaryColor;
        }
        if (styles.borderColor === 'var(--primary-color)') {
            styles.borderColor = primaryColor;
        }
        if (styles.border?.includes('var(--primary-color)')) { 
            styles.border = styles.border.replace('var(--primary-color)', primaryColor);
        }
        if (styles.backgroundColor === 'var(--primary-color)') {
            styles.backgroundColor = primaryColor;
        }

        // Default text color if not specified
        if (el.type === 'text' && !styles.color) {
            styles.color = defaultTextColor;
        }
        
        // Ensure width/height defaults for layout
        if (!styles.width) styles.width = '100%';
        if (!styles.height && el.type !== 'divider') styles.height = 'auto';
        if (el.type === 'image' && !styles.height) styles.height = 'auto';
        if (el.type === 'image' && !styles.objectFit) styles.objectFit = 'contain';

        return styles;
      };

      const processedStyles = getProcessedStyles(element);
      
      const imgStyles = {
        maxWidth: '100%',
        maxHeight: '100%',
        width: processedStyles.width || 'auto',
        height: processedStyles.height || 'auto',
        objectFit: processedStyles.objectFit || 'contain',
        borderRadius: processedStyles.borderRadius || '0.375rem', 
        boxShadow: processedStyles.boxShadow, // Use directly from processedStyles
        border: processedStyles.border, // Use directly from processedStyles
        margin: processedStyles.margin, // Use directly from processedStyles
        display: processedStyles.display, // Use directly from processedStyles
      };


      switch (element.type) {
        case 'text':
          return (
            <div style={{width: processedStyles.width, height: processedStyles.height, overflow: 'hidden', margin: processedStyles.margin}}>
              <p className={`text-base my-2 whitespace-pre-wrap`} style={processedStyles}>{element.content}</p>
            </div>
          );
        case 'image':
          return (
            <div className="my-4 flex justify-center items-center" style={{width: processedStyles.width, height: processedStyles.height, ...processedStyles?.container}}>
              <img  
                alt={element.content || "Portfolio image"} 
                src={element.imageUrl || "https://images.unsplash.com/photo-1495224814653-94f36c0a31ea"} 
                style={imgStyles}
              />
              {element.imageUrl && element.content && element.content !== "Pasted Image" && element.content !== "Image Placeholder" && (
                <p className={`text-xs italic mt-1 ${mutedTextColor}`}>{element.content}</p>
              )}
            </div>
          );
        case 'shape':
            return <div style={{width: processedStyles.width, height: processedStyles.height, margin: processedStyles.margin}}><ShapeElement element={{...element, styles: processedStyles}} themeMode={themeMode} /></div>;
        case 'divider':
          return <Separator className={`my-6 ${separatorColor}`} style={processedStyles} />;
        case 'section':
           return (
            <div className={`my-4 p-4 border ${borderColor} rounded min-h-[80px]`} style={processedStyles}>
              <p className={`text-center ${mutedTextColor}`}>{element.content || "Section"}</p>
            </div>
          );
        default:
          return <p className={`text-sm text-red-500 my-2`}>Unsupported element type: {element.type}</p>;
      }
    };

    export default RenderElementPublic;
  