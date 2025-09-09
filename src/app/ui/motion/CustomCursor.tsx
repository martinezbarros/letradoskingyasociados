// src/components/CustomCursor.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursorContext } from './CustomCursorContext';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { animateCursorVariant } = useCursorContext();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  // Variantes para diferentes estados del cursor
  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 2,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as const,
    },
    click: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 0.8,
      backgroundColor: "#3b82f6",
    }
  };

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-[#BE9A42] rounded-full pointer-events-none z-50"
      variants={variants}
      animate={animateCursorVariant || "default"}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  );
};

export default CustomCursor;