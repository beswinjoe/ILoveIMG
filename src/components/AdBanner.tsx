"use client";

/**
 * Adsterra 320×50 banner ad component.
 * Uses an iframe to load the ad from a static HTML file.
 * This guarantees `document.write` works securely without breaking the React SPA,
 * ensures `atOptions` is available before `invoke.js`, and prevents duplicate ads.
 */
export default function AdBanner() {
  return (
    <div className="flex justify-center items-center w-full my-4 min-h-[50px]">
      <iframe
        src="/ad-320x50.html?v=2"
        width="320"
        height="50"
        scrolling="no"
        style={{ border: "none", width: "320px", height: "50px", overflow: "hidden" }}
        title="Advertisement"
      />
    </div>
  );
}
