// src/hooks/useCursor.ts
import { useCursorContext } from "@/app/ui/motion/CustomCursorContext";

export const useCursor = () => {
  const { animateCursor } = useCursorContext();

  const onMouseEnter = () => animateCursor('hover');
  const onMouseLeave = () => animateCursor('default');
  const onMouseDown = () => animateCursor('click');
  const onMouseUp = () => animateCursor('hover');

  return {
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    animateCursor
  };
};