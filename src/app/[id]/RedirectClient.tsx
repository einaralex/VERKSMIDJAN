"use client";

import { useEffect } from "react";

export default function RedirectClient({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "var(--font-geist-sans)",
      }}
    >
      <p>Redirecting…</p>
    </div>
  );
}
