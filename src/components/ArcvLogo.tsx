"use client";

import React, { useEffect, useState } from "react";

interface ArcvLogoProps {
  size?: number; // Size in pixels (default: 36)
  className?: string;
  rotateOnScroll?: boolean;
}

export const ArcvLogo: React.FC<ArcvLogoProps> = ({
  size = 36,
  className = "",
  rotateOnScroll = false,
}) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!rotateOnScroll) return;

    let rafId = 0;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Continuous smooth rotation tracking window scroll depth (0.35 deg per px)
        setRotation(window.scrollY * 0.35);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [rotateOnScroll]);

  return (
    <div
      className={`relative shrink-0 flex items-center justify-center overflow-hidden rounded-[10px] sm:rounded-xl bg-[#1D1D1D] shadow-sm select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full block"
      >
        {/* Obsidian Base Chassis */}
        <rect width="512" height="512" rx="75" fill="#1D1D1D" />

        {/* Official Triangle Centered Exactly at (256, 256) for Flawless 360° Rotation */}
        <g
          style={{
            transformOrigin: "256px 256px",
            transform: `rotate(${rotation}deg)`,
            willChange: rotateOnScroll ? "transform" : "auto",
            transition: rotateOnScroll ? "transform 0.05s linear" : "none",
          }}
        >
          <path
            d="M234.349 105.417C243.972 88.75 268.028 88.75 277.651 105.417L396.729 311.667C406.352 328.334 394.323 349.167 375.078 349.167H136.921C117.676 349.167 105.648 328.334 115.271 311.667L234.349 105.417Z"
            fill="#F0FD63"
          />
        </g>
      </svg>
    </div>
  );
};

export default ArcvLogo;
