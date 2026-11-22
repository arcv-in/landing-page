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

        {/* Official Triangle with Scroll Rotation anchored to visual centroid (256, 290) */}
        <g
          style={{
            transformOrigin: "256px 290px",
            transform: `rotate(${rotation}deg)`,
            willChange: rotateOnScroll ? "transform" : "auto",
            transition: rotateOnScroll ? "transform 0.05s linear" : "none",
          }}
        >
          <path
            d="M233.849 134.5C243.472 117.833 267.528 117.833 277.151 134.5L396.229 340.75C405.852 357.417 393.823 378.25 374.578 378.25H136.421C117.176 378.25 105.148 357.417 114.771 340.75L233.849 134.5Z"
            fill="#F0FD63"
          />
        </g>
      </svg>
    </div>
  );
};

export default ArcvLogo;
