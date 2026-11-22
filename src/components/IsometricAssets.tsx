"use client";

import React, { useEffect, useRef } from "react";

const ISO_ANGLE = Math.PI / 6;
const COS_30 = Math.cos(ISO_ANGLE);
const SIN_30 = Math.sin(ISO_ANGLE);

interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

const project = (p: Point3D, ox: number, oy: number, scale: number): Point2D => ({
  x: ox + (p.x - p.y) * COS_30 * scale,
  y: oy + ((p.x + p.y) * SIN_30 - p.z) * scale,
});

const drawIsoBox = (
  ctx: CanvasRenderingContext2D,
  center: Point3D,
  size: Point3D,
  ox: number,
  oy: number,
  scale: number,
  style: {
    top: string;
    left: string;
    right: string;
    stroke?: string;
    lineWidth?: number;
    glow?: string;
  }
) => {
  const hx = size.x * 0.5;
  const hy = size.y * 0.5;
  const z0 = center.z;
  const z1 = center.z + size.z;

  const t0 = project({ x: center.x - hx, y: center.y - hy, z: z1 }, ox, oy, scale);
  const t1 = project({ x: center.x + hx, y: center.y - hy, z: z1 }, ox, oy, scale);
  const t2 = project({ x: center.x + hx, y: center.y + hy, z: z1 }, ox, oy, scale);
  const t3 = project({ x: center.x - hx, y: center.y + hy, z: z1 }, ox, oy, scale);

  const b1 = project({ x: center.x + hx, y: center.y - hy, z: z0 }, ox, oy, scale);
  const b2 = project({ x: center.x + hx, y: center.y + hy, z: z0 }, ox, oy, scale);
  const b3 = project({ x: center.x - hx, y: center.y + hy, z: z0 }, ox, oy, scale);

  ctx.save();
  if (style.glow) {
    ctx.shadowColor = style.glow;
    ctx.shadowBlur = 12;
  }
  const lw = style.lineWidth ?? 1;

  // Left-front (+Y)
  ctx.beginPath();
  ctx.moveTo(t3.x, t3.y);
  ctx.lineTo(t2.x, t2.y);
  ctx.lineTo(b2.x, b2.y);
  ctx.lineTo(b3.x, b3.y);
  ctx.closePath();
  ctx.fillStyle = style.left;
  ctx.fill();
  if (style.stroke) {
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }

  // Right-front (+X)
  ctx.beginPath();
  ctx.moveTo(t2.x, t2.y);
  ctx.lineTo(t1.x, t1.y);
  ctx.lineTo(b1.x, b1.y);
  ctx.lineTo(b2.x, b2.y);
  ctx.closePath();
  ctx.fillStyle = style.right;
  ctx.fill();
  if (style.stroke) {
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }

  // Top (+Z)
  ctx.beginPath();
  ctx.moveTo(t0.x, t0.y);
  ctx.lineTo(t1.x, t1.y);
  ctx.lineTo(t2.x, t2.y);
  ctx.lineTo(t3.x, t3.y);
  ctx.closePath();
  ctx.fillStyle = style.top;
  ctx.fill();
  if (style.stroke) {
    ctx.strokeStyle = style.stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }

  ctx.restore();
};

export type PillarAssetVariant = "cloud" | "server" | "hologram" | "ledger";

/**
 * Lightweight micro-isometric asset for the 4 platform pillars.
 * Pauses automatically when out of viewport.
 */
export const IsoPillarAsset: React.FC<{ variant: PillarAssetVariant }> = ({ variant }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const width = 80;
    const height = 80;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const ox = 40;
    const oy = 48;
    const scale = 14;

    const render = (now: number) => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);

        if (variant === "cloud") {
          // Base platform
          drawIsoBox(
            ctx,
            { x: 0, y: 0, z: 0 },
            { x: 2.4, y: 2.4, z: 0.35 },
            ox,
            oy,
            scale,
            {
              top: "#1D1D1D",
              left: "#141414",
              right: "#262626",
              stroke: "#F0FD63",
              lineWidth: 1,
            }
          );

          // Pulsing LED Beacon
          const beaconCenter = project({ x: 0, y: 0, z: 0.4 }, ox, oy, scale);
          ctx.beginPath();
          ctx.arc(beaconCenter.x, beaconCenter.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "#F0FD63";
          ctx.fill();

          // Floating cloud
          const bob = Math.sin(now * 0.0035) * 0.18;
          const cloudPt = project({ x: 0, y: 0, z: 1.45 + bob }, ox, oy, scale);
          const cs = scale * 0.042;

          ctx.save();
          ctx.translate(cloudPt.x, cloudPt.y);
          ctx.shadowColor = "rgba(240, 253, 99, 0.4)";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.moveTo(-14 * cs, 7 * cs);
          ctx.lineTo(14 * cs, 7 * cs);
          ctx.arc(13 * cs, 1 * cs, 6 * cs, Math.PI * 0.5, -Math.PI * 0.5, true);
          ctx.arc(4 * cs, -6 * cs, 8 * cs, 0.1, Math.PI, true);
          ctx.arc(-8 * cs, -2 * cs, 6.5 * cs, -0.2, Math.PI * 0.8, true);
          ctx.arc(-14 * cs, 1 * cs, 6 * cs, -Math.PI * 0.5, Math.PI * 0.5, true);
          ctx.closePath();
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.strokeStyle = "#1D1D1D";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.restore();
        } else if (variant === "server") {
          // Central matcher server tower
          drawIsoBox(
            ctx,
            { x: 0, y: 0, z: 0 },
            { x: 2.1, y: 2.1, z: 2.2 },
            ox,
            oy,
            scale,
            {
              top: "#262626",
              left: "#1D1D1D",
              right: "#141414",
              stroke: "#3A3A3A",
              lineWidth: 1,
            }
          );

          // Animated slots
          for (let s = 0; s < 5; s++) {
            const sz = 0.35 + s * 0.35;
            const isLime = (s + Math.floor(now * 0.004)) % 4 === 0;
            const lfA = project({ x: -0.7, y: 1.06, z: sz }, ox, oy, scale);
            const lfB = project({ x: 0.7, y: 1.06, z: sz }, ox, oy, scale);
            ctx.beginPath();
            ctx.moveTo(lfA.x, lfA.y);
            ctx.lineTo(lfB.x, lfB.y);
            ctx.strokeStyle = isLime ? "#F0FD63" : "#919EAB";
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }

          // Spinning Fan on top
          const fanPt = project({ x: 0, y: 0, z: 2.25 }, ox, oy, scale);
          const spin = now * 0.006;
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(fanPt.x, fanPt.y, 8, 4.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = "#121212";
          ctx.fill();
          ctx.strokeStyle = "#F0FD63";
          ctx.lineWidth = 1;
          ctx.stroke();

          for (let b = 0; b < 4; b++) {
            const a = spin + (b / 4) * Math.PI * 2;
            ctx.beginPath();
            ctx.moveTo(fanPt.x, fanPt.y);
            ctx.lineTo(fanPt.x + Math.cos(a) * 6, fanPt.y + Math.sin(a) * 3.5);
            ctx.strokeStyle = "#F0FD63";
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
          ctx.restore();
        } else if (variant === "hologram") {
          // Platform
          drawIsoBox(
            ctx,
            { x: 0, y: 0, z: 0 },
            { x: 2.4, y: 2.4, z: 0.35 },
            ox,
            oy,
            scale,
            {
              top: "#1D1D1D",
              left: "#141414",
              right: "#262626",
              stroke: "#919EAB",
              lineWidth: 1,
            }
          );

          const lens = project({ x: 0, y: 0, z: 0.38 }, ox, oy, scale);
          const bob = Math.sin(now * 0.004) * 0.15;
          const cubeZ = 1.45 + bob;
          const holoCenter = project({ x: 0, y: 0, z: cubeZ }, ox, oy, scale);

          // Light beam
          ctx.save();
          const beam = ctx.createLinearGradient(lens.x, lens.y, holoCenter.x, holoCenter.y);
          beam.addColorStop(0, "rgba(240, 253, 99, 0.45)");
          beam.addColorStop(1, "rgba(240, 253, 99, 0.05)");
          ctx.beginPath();
          ctx.moveTo(lens.x - 6, lens.y);
          ctx.lineTo(lens.x + 6, lens.y);
          ctx.lineTo(holoCenter.x + 10, holoCenter.y);
          ctx.lineTo(holoCenter.x - 10, holoCenter.y);
          ctx.closePath();
          ctx.fillStyle = beam;
          ctx.fill();
          ctx.restore();

          // Floating Cube (Audit Inspector)
          drawIsoBox(
            ctx,
            { x: 0, y: 0, z: cubeZ },
            { x: 0.9, y: 0.9, z: 0.9 },
            ox,
            oy,
            scale,
            {
              top: "#F0FD63",
              left: "rgba(240, 253, 99, 0.75)",
              right: "rgba(145, 158, 171, 0.65)",
              stroke: "#1D1D1D",
              lineWidth: 1,
              glow: "rgba(240, 253, 99, 0.5)",
            }
          );
        } else if (variant === "ledger") {
          // Double-entry sovereign ledger stack
          const layers = 4;
          for (let l = 0; l < layers; l++) {
            const lz = l * 0.45;
            const isTop = l === layers - 1;
            drawIsoBox(
              ctx,
              { x: 0, y: 0, z: lz },
              { x: 2.2, y: 2.2, z: 0.36 },
              ox,
              oy,
              scale,
              {
                top: isTop ? "#F0FD63" : "#262626",
                left: isTop ? "#D8E549" : "#1D1D1D",
                right: isTop ? "#C4D13A" : "#151515",
                stroke: isTop ? "#1D1D1D" : "#3A3A3A",
                lineWidth: 1,
              }
            );

            // Micro checkmark on top slab
            if (isTop) {
              const topC = project({ x: 0, y: 0, z: lz + 0.38 }, ox, oy, scale);
              ctx.beginPath();
              ctx.arc(topC.x, topC.y, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = "#1D1D1D";
              ctx.fill();
            }
          }
        }
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [variant]);

  return (
    <div className="w-16 h-16 flex items-center justify-center shrink-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};

/**
 * Friendly 3D Isometric Robot Assistant for the CTA Section.
 */
export const IsoRobotAssistant: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const width = 160;
    const height = 160;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const render = (now: number) => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);

        const bob = Math.sin(now * 0.0035) * 6;
        const cx = 80;
        const cy = 88 + bob;
        const s = 1.85;

        ctx.save();
        ctx.translate(cx, cy);

        // Ground shadow on dark container
        ctx.beginPath();
        ctx.ellipse(0, 48 - bob * 0.5, 30 * (1 - bob * 0.03), 12 * (1 - bob * 0.03), 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(240, 253, 99, 0.18)";
        ctx.fill();

        // Torso
        const bodyGrad = ctx.createLinearGradient(-12 * s, -10 * s, 12 * s, 20 * s);
        bodyGrad.addColorStop(0, "#FFFFFF");
        bodyGrad.addColorStop(0.6, "#E8E8E8");
        bodyGrad.addColorStop(1, "#919EAB");

        ctx.beginPath();
        ctx.moveTo(-11 * s, -2 * s);
        ctx.quadraticCurveTo(-12 * s, 14 * s, 0, 22 * s);
        ctx.quadraticCurveTo(12 * s, 14 * s, 11 * s, -2 * s);
        ctx.closePath();
        ctx.fillStyle = bodyGrad;
        ctx.fill();
        ctx.strokeStyle = "#1D1D1D";
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Chest badge (#F0FD63)
        ctx.beginPath();
        ctx.arc(0, 8 * s, 3.2 * s, 0, Math.PI * 2);
        ctx.fillStyle = "#F0FD63";
        ctx.fill();
        ctx.strokeStyle = "#1D1D1D";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Head
        const headGrad = ctx.createRadialGradient(-3 * s, -16 * s, 2 * s, 0, -13 * s, 16 * s);
        headGrad.addColorStop(0, "#FFFFFF");
        headGrad.addColorStop(0.7, "#F3F3F3");
        headGrad.addColorStop(1, "#919EAB");

        ctx.beginPath();
        ctx.ellipse(0, -13 * s, 14 * s, 12 * s, 0, 0, Math.PI * 2);
        ctx.fillStyle = headGrad;
        ctx.fill();
        ctx.strokeStyle = "#1D1D1D";
        ctx.lineWidth = 1.3;
        ctx.stroke();

        // Visor
        ctx.beginPath();
        ctx.ellipse(0, -13 * s, 10 * s, 6.5 * s, 0, 0, Math.PI * 2);
        ctx.fillStyle = "#1D1D1D";
        ctx.fill();

        // Glowing Eyes in #F0FD63
        ctx.fillStyle = "#F0FD63";
        ctx.beginPath();
        ctx.arc(-4 * s, -13 * s, 2 * s, 0, Math.PI * 2);
        ctx.arc(4 * s, -13 * s, 2 * s, 0, Math.PI * 2);
        ctx.fill();

        // Antenna
        ctx.beginPath();
        ctx.moveTo(0, -25 * s);
        ctx.lineTo(0, -32 * s);
        ctx.strokeStyle = "#1D1D1D";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -33 * s, 2.8 * s, 0, Math.PI * 2);
        ctx.fillStyle = "#F0FD63";
        ctx.fill();
        ctx.strokeStyle = "#1D1D1D";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Animated Waving Right Arm
        const wave = Math.sin(now * 0.007) * 4;
        ctx.save();
        ctx.translate(11 * s, 2 * s);
        ctx.rotate(-0.35 + wave * 0.05);
        ctx.beginPath();
        if (typeof (ctx as any).roundRect === "function") {
          (ctx as any).roundRect(0, -3 * s, 12 * s, 5 * s, 2.5 * s);
        } else {
          ctx.rect(0, -3 * s, 12 * s, 5 * s);
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.strokeStyle = "#1D1D1D";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // Left Arm resting
        ctx.save();
        ctx.translate(-11 * s, 2 * s);
        ctx.beginPath();
        if (typeof (ctx as any).roundRect === "function") {
          (ctx as any).roundRect(-10 * s, -1 * s, 10 * s, 4.5 * s, 2.25 * s);
        } else {
          ctx.rect(-10 * s, -1 * s, 10 * s, 4.5 * s);
        }
        ctx.fillStyle = "#E8E8E8";
        ctx.fill();
        ctx.strokeStyle = "#1D1D1D";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        ctx.restore();
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-36 h-36 lg:w-44 lg:h-44 flex items-center justify-center shrink-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
    </div>
  );
};
