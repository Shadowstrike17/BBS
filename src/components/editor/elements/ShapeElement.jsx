
    import React from 'react';

    const ShapeElement = ({ element, themeMode }) => {
      const { shapeType, styles, content } = element;
      const defaultFillColor = themeMode === 'dark' ? '#4A5568' : '#E2E8F0'; 
      const defaultStrokeColor = themeMode === 'dark' ? '#718096' : '#A0AEC0'; 

      const baseStyles = {
        width: styles?.width || '100%', 
        height: styles?.height || '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: styles?.backgroundImage || 'none',
        backgroundSize: styles?.backgroundSize || 'cover',
        backgroundPosition: styles?.backgroundPosition || 'center',
        border: styles?.border || `1px solid ${defaultStrokeColor}`,
        overflow: 'hidden',
      };

      const renderContent = () => {
        if (styles?.backgroundImage && styles.backgroundImage !== 'none') {
          return null; 
        }
        return <span className={`text-xs ${themeMode === 'dark' ? 'text-slate-300' : 'text-slate-600'} p-1 text-center break-words`}>{content}</span>;
      };

      if (shapeType === 'square') {
        return (
          <div style={{ ...baseStyles, backgroundColor: styles?.backgroundImage !== 'none' ? 'transparent' : (styles?.backgroundColor || defaultFillColor) }}>
            {renderContent()}
          </div>
        );
      }

      if (shapeType === 'circle') {
        return (
          <div style={{ ...baseStyles, borderRadius: '50%', backgroundColor: styles?.backgroundImage !== 'none' ? 'transparent' : (styles?.backgroundColor || defaultFillColor) }}>
            {renderContent()}
          </div>
        );
      }

      if (shapeType === 'triangle') {
        const triColor = styles?.backgroundImage !== 'none' ? 'transparent' : (styles?.backgroundColor || defaultFillColor);
        
        return (
          <div style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundImage: styles?.backgroundImage || 'none',
            backgroundSize: styles?.backgroundSize || 'cover',
            backgroundPosition: styles?.backgroundPosition || 'center',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            backgroundColor: triColor,
            border: styles?.border, 
          }}>
            {renderContent()}
          </div>
        );
      }
      
      return <div style={baseStyles}>Unsupported shape: {shapeType}</div>;
    };

    export default ShapeElement;
  