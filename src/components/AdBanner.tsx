"use client";

/**
 * Adsterra 320×50 banner ad component.
 * Uses an iframe to load the ad from a static HTML file.
 * This guarantees `document.write` works securely without breaking the React SPA,
 * ensures `atOptions` is available before `invoke.js`, and prevents duplicate ads.
 */
export default function AdBanner() {
  return (
    <div className="flex justify-center items-center w-full my-4 min-h-[50px] overflow-hidden">
      <iframe
        src="/ad-320x50.html"
        width="320"
        height="50"
        scrolling="no"
        sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-top-navigation-by-user-activation"
        style={{ border: "none", overflow: "hidden", width: "320px", height: "50px" }}
        title="Advertisement"
      />
    </div>
  );
}
