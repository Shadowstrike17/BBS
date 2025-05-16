
    import React from 'react';
    import { Button } from '@/components/ui/button.jsx';
    import { Bold, Italic, Palette } from 'lucide-react';

    const TextToolbar = ({ styles, onStyleChange, siteTheme }) => {
      const handleToggleStyle = (styleKey, defaultValue, activeValue) => {
        const currentVal = styles[styleKey];
        if (currentVal === activeValue) {
          onStyleChange(styleKey, defaultValue);
        } else {
          onStyleChange(styleKey, activeValue);
        }
      };

      const handleColorChange = (color) => {
        onStyleChange('color', color);
      };

      const predefinedTextColors = [
        siteTheme?.mode === 'dark' ? '#E5E7EB' : '#1F2937', // Default text
        '#EF4444', // Red
        '#3B82F6', // Blue
        '#22C55E', // Green
        '#EAB308', // Yellow
        '#A855F7', // Purple
        siteTheme?.primaryColor || (siteTheme?.mode === 'dark' ? '#A3BFFA' : '#3B82F6') // Theme primary
      ];
      
      const themeMode = siteTheme?.mode || 'light';
      const baseButtonClass = themeMode === 'dark' ? 'text-slate-300 hover:bg-slate-600 hover:text-white' : 'text-slate-700 hover:bg-slate-200 hover:text-slate-900';
      const activeButtonClass = themeMode === 'dark' ? 'bg-purple-700 text-white' : 'bg-purple-200 text-purple-700';


      return (
        <div className={`flex items-center gap-1 p-1.5 rounded-md shadow-md border ${themeMode === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleToggleStyle('fontWeight', 'normal', 'bold')}
            className={`${baseButtonClass} ${styles.fontWeight === 'bold' ? activeButtonClass : ''} px-2 py-1 h-auto`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleToggleStyle('fontStyle', 'normal', 'italic')}
            className={`${baseButtonClass} ${styles.fontStyle === 'italic' ? activeButtonClass : ''} px-2 py-1 h-auto`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1 ml-1 pl-1 border-l border-slate-500/50">
            <Palette className={`h-4 w-4 ${themeMode === 'dark' ? 'text-slate-400' : 'text-slate-500'}`} />
            {predefinedTextColors.map((color) => (
              <button
                key={color}
                title={color}
                onClick={() => handleColorChange(color)}
                className={`w-5 h-5 rounded-full border-2 transition-all ${styles.color === color ? 'ring-2 ring-offset-1 ring-offset-current border-white dark:border-black' : 'border-transparent hover:border-slate-400'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      );
    };

    export default TextToolbar;
  