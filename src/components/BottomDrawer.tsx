import React, { useState, useRef, useEffect } from "react";
import { useResizeObserver } from "../utils/resizeUtils";
import { useDrawerDrag } from "../hooks/useDrawerDrag";

interface BottomDrawerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  previewOffset?: number; // Percentage of drawer height to show when closed (0-100)
  height?: number; // Specific height in viewport height units (0-100)
}

const HANDLE_HEIGHT = 28; // px (handle + margin)

export const BottomDrawer: React.FC<BottomDrawerProps> = ({
  children,
  isOpen = false,
  onClose,
  previewOffset = 20,
  height,
}) => {
  const [drawerHeight, setDrawerHeight] = useState<number | undefined>(
    height ? (height / 100) * window.innerHeight : undefined
  );
  const [position, setPosition] = useState(100 - previewOffset);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Update drawer height when window resizes if using vh units
  useResizeObserver({
    onResize: () => {
      if (height === undefined) return;
      setDrawerHeight((height / 100) * window.innerHeight);
    },
    useWindow: true,
  });

  // Dynamically update drawer height based on content if no specific height is provided
  useResizeObserver({
    onResize: () => {
      if (!contentRef.current || height !== undefined) return;
      const contentHeight = contentRef.current.scrollHeight;
      const maxHeightPx = window.innerHeight;
      const newHeight = Math.min(contentHeight + HANDLE_HEIGHT, maxHeightPx);
      setDrawerHeight(newHeight);
    },
    elementRef: contentRef,
  });

  // Handle initial mount and isOpen changes
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      return;
    }

    setIsTransitioning(true);
    if (isOpen) {
      setPosition(0);
    } else {
      setPosition(100 - previewOffset);
    }
  }, [isOpen, previewOffset, isMounted]);

  const { handleStart, handleMove, handleEnd } = useDrawerDrag({
    drawerHeight,
    lastPosition: position,
    onPositionChange: setPosition,
    onClose,
    previewOffset,
    onTransitionChange: setIsTransitioning,
  });

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
    handleStart(e.touches[0].clientY);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while dragging
    handleMove(e.touches[0].clientY);
  };
  const handleTouchEnd = () => {
    handleEnd();
  };

  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientY);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientY);
  };
  const handleMouseUp = () => {
    handleEnd();
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleEnd();
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [handleEnd]);

  return (
    <div
      ref={drawerRef}
      className="fixed left-0 right-0 bottom-0 bg-white rounded-t-2xl z-50"
      style={{
        height: drawerHeight ? `${drawerHeight}px` : undefined,
        maxHeight: "100vh",
        transform: `translateY(${position}%)`,
        transition: isTransitioning ? "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        touchAction: "none", // Prevent default touch behaviors
        boxShadow: "0 8px 32px 0 rgba(60,60,100,0.25), 0 1.5px 6px 0 rgba(60,60,100,0.10)"
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div
        className="w-10 h-1 bg-gray-300 rounded-full mx-auto my-2 cursor-grab active:cursor-grabbing drawer-content"
        style={{ height: 8, marginTop: 8, marginBottom: 12 }}
      />
      <div className="drawer-content-inner"> </div>
      <div
        ref={contentRef}
        className="p-4"
        style={{
          overflowY: "auto",
          height: `calc(100% - ${HANDLE_HEIGHT}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
