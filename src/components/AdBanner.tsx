"use client";

import { useEffect, useRef } from "react";

/**
 * Adsterra 320×50 banner ad component.
 * Uses a ref + useEffect to inject the ad script exactly once per mount,
 * preventing duplicate ads across navigations.
 */
export default function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null);
  const injectedRef = useRef(false);

  useEffect(() => {
    if (!adRef.current || injectedRef.current) return;
    injectedRef.current = true;

    // Inject atOptions configuration
    const configScript = document.createElement("script");
    configScript.type = "text/javascript";
    configScript.text = `
      atOptions = {
        'key' : '43b1992a6cf84cd743850d012ca3be3b',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    `;
    adRef.current.appendChild(configScript);

    // Inject the invoke script
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src =
      "https://accedelid.com/43b1992a6cf84cd743850d012ca3be3b/invoke.js";
    adRef.current.appendChild(invokeScript);
  }, []);

  return (
    <div className="ad-container ad-banner-320" ref={adRef} aria-hidden="true" />
  );
}
