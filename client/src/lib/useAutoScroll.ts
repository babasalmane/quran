import { useState, useEffect, useRef } from 'react';

export function useAutoScroll(scrollContainerRef: React.RefObject<HTMLElement>) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(5); // 1-10 scale
  const scrollIntervalRef = useRef<number | null>(null);

  // Start auto-scrolling
  const startAutoScroll = () => {
    if (!scrollContainerRef.current) return;
    
    // Clear any existing interval
    if (scrollIntervalRef.current) {
      window.clearInterval(scrollIntervalRef.current);
    }
    
    // Calculate scroll speed (lower interval = faster scroll)
    // Map speed 1-10 to interval 50ms-10ms
    const scrollAmount = 1;
    const interval = 55 - (scrollSpeed * 4.5);
    
    scrollIntervalRef.current = window.setInterval(() => {
      if (!scrollContainerRef.current) return;
      
      // Increment scroll position
      scrollContainerRef.current.scrollTop += scrollAmount;
      
      // If we've reached the bottom, stop scrolling
      if (
        scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight >=
        scrollContainerRef.current.scrollHeight - 10
      ) {
        stopAutoScroll();
      }
    }, Math.max(10, interval));
  };
  
  // Stop auto-scrolling
  const stopAutoScroll = () => {
    if (scrollIntervalRef.current) {
      window.clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    setIsAutoScrolling(false);
  };
  
  // Toggle auto-scrolling
  const toggleAutoScroll = () => {
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      setIsAutoScrolling(true);
      startAutoScroll();
    }
  };
  
  // Update scrolling when speed changes
  useEffect(() => {
    if (isAutoScrolling) {
      stopAutoScroll();
      setIsAutoScrolling(true);
      startAutoScroll();
    }
  }, [scrollSpeed]);
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        window.clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);
  
  return {
    isAutoScrolling,
    toggleAutoScroll,
    setScrollSpeed,
  };
}
