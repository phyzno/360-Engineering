"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TouchHoverFix() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if device is touch-capable
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches || 
                    ("ontouchstart" in window) || 
                    navigator.maxTouchPoints > 0;
                    
    if (!isTouch) return;

    // Remove the default tap highlight color on mobile to make it look like a native app
    document.body.style.setProperty("-webkit-tap-highlight-color", "transparent");

    const fixElements = () => {
      // Find elements that rely on hover states
      const elements = document.querySelectorAll('.group, .group\\/navItem, .group\\/subItem, [class*="hover:"]');
      
      elements.forEach((el) => {
        // Skip elements that are naturally focusable or interactive
        if (
          !el.hasAttribute("tabindex") && 
          el.tagName !== "A" && 
          el.tagName !== "BUTTON" && 
          el.tagName !== "INPUT" && 
          el.tagName !== "TEXTAREA" && 
          el.tagName !== "SELECT"
        ) {
          // Add tabindex to allow the element to receive focus on tap, 
          // which triggers the :hover state on most mobile browsers.
          el.setAttribute("tabindex", "0");
          
          // Outline none to prevent default focus ring on mobile tap
          (el as HTMLElement).style.outline = "none";
        }
      });
    };

    // Run initially
    fixElements();

    // Use MutationObserver to apply the fix to dynamically rendered elements
    const observer = new MutationObserver((mutations) => {
      let shouldFix = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldFix = true;
          break;
        }
      }
      if (shouldFix) fixElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Adding an empty touchstart listener to the document body enables 
    // active and hover states on iOS Safari for all elements.
    const dummyListener = () => {};
    document.addEventListener("touchstart", dummyListener, { passive: true });

    return () => {
      observer.disconnect();
      document.removeEventListener("touchstart", dummyListener);
    };
  }, [pathname]); // Re-run when route changes just to be safe

  return null;
}
