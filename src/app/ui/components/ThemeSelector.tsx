// components/ThemeSelector.tsx
'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme, isDevelopment } = useTheme();

  // No renderizar en producción
  if (!isDevelopment) {
    return null;
  }

  const themes = [
    { id: 'blue', name: 'Azul', color: 'bg-blue-500' },
    { id: 'green', name: 'Verde', color: 'bg-green-500' },
    { id: 'purple', name: 'Morado', color: 'bg-purple-500' },
    { id: 'rose', name: 'Rosado', color: 'bg-rose-500' },
  ];

  return (
    <div className="flex items-center justify-center p-4 bg-gray-100 border-b">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">Selector de tema (solo desarrollo):</span>
        <div className="flex space-x-2">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as 'green')}
              className={`w-8 h-8 rounded-full ${t.color} border-2 ${
                theme === t.id ? 'border-white ring-2 ring-gray-400' : 'border-gray-200'
              }`}
              title={t.name}
              aria-label={`Cambiar a tema ${t.name}`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">Tema actual: {theme}</span>
      </div>
    </div>
  );
};

export default ThemeSelector;