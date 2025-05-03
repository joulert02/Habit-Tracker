import { useRef } from 'react';

interface UseDrawerDragProps {
  drawerHeight: number | undefined;
  lastPosition: number;
  onPositionChange: (newPosition: number) => void;
  onClose?: () => void;
  previewOffset: number;
  onTransitionChange?: (isTransitioning: boolean) => void;
}

export const useDrawerDrag = ({
  drawerHeight,
  lastPosition,
  onPositionChange,
  onClose,
  previewOffset,
  onTransitionChange,
}: UseDrawerDragProps) => {
  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);
  const startPosition = useRef(0);

  const handleStart = (clientY: number) => {
    isDragging.current = true;
    startY.current = clientY;
    startPosition.current = lastPosition;
    onTransitionChange?.(false);
  };

  const handleMove = (clientY: number) => {
    if (!drawerHeight || !isDragging.current) return;
    currentY.current = clientY;
    const diff = currentY.current - startY.current;
    const percentage = diff / drawerHeight;
    const newPosition = startPosition.current + percentage * 100;
    
    // Only limit downward movement, allow unlimited upward movement
    const clampedPosition = Math.min(100 - previewOffset, newPosition);
    onPositionChange(clampedPosition);
  };

  const handleEnd = () => {
    if (!drawerHeight || !isDragging.current) return;
    isDragging.current = false;
    onTransitionChange?.(true);
    
    const diff = currentY.current - startY.current;
    const currentPosition = startPosition.current + (diff / drawerHeight) * 100;
    const velocity = diff / drawerHeight;

    // Always return to the original position
    if (diff > 0) { // Dragging down
      if (currentPosition > 50 || velocity > 0.1) {
        onPositionChange(100 - previewOffset);
        onClose?.();
      } else {
        onPositionChange(startPosition.current);
      }
    } else { // Dragging up
      onPositionChange(startPosition.current);
    }
  };

  return {
    handleStart,
    handleMove,
    handleEnd,
    isDragging,
  };
}; 