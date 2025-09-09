// src/components/AnimatedButton.tsx
'use client';

import { useCursor } from "@/hook/useCursor";
import { ReactNode } from "react";

const AnimatedButton = ({children} : {children: ReactNode}) => {
  const { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp } = useCursor();

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;