'use client'
// src/components/CustomCursor.tsx
import { createContext, useState, useContext, ReactNode } from 'react';

// Definir el tipo para el valor del contexto
interface CursorContextType {
  initialCursorVariant: string;
  setInitialCursorVariant: (variant: string) => void;
  animateCursorVariant: string;
  setAnimateCursorVariant: (variant: string) => void;
  animateCursor: (variant: string) => void;
}

// Crear el contexto con un valor por defecto tipado
const CursorContext = createContext<CursorContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useCursorContext = (): CursorContextType => {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursorContext debe ser usado dentro de un CursorContextProvider');
  }
  return context;
};

// Props para el provider
interface CursorContextProviderProps {
  children: ReactNode;
}

// Componente provider
export const CursorContextProvider = ({ children }: CursorContextProviderProps) => {
  const [initialCursorVariant, setInitialCursorVariant] = useState<string>('');
  const [animateCursorVariant, setAnimateCursorVariant] = useState<string>('');

  // Función para animar el cursor con transiciones suaves
  const animateCursor = (variant: string): void => {
    setInitialCursorVariant(animateCursorVariant);
    setAnimateCursorVariant(variant);
  };

  return (
    <CursorContext.Provider
      value={{
        initialCursorVariant,
        setInitialCursorVariant,
        animateCursorVariant,
        setAnimateCursorVariant,
        animateCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};