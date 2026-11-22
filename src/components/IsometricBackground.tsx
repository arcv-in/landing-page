"use client";

import React, { useEffect, useRef } from "react";

/**
 * ============================================================================
 * ARCV — FINANCIAL ARCHIVE | 3D ISOMETRIC DIORAMA BACKGROUND CANVAS
 * Faithful structural replication of the isometric cloud/server/AI topology,
 * strictly styled in the Alignly Design System palette:
 * - Canvas Background: #F3F3F3 (60% Base Surface)
 * - Primary Obsidian Platforms & Chassis: #1D1D1D / #262626
 * - Electric Lime Highlights, LEDs, Holograms & Pulses: #F0FD63
 * - Slate Gray Accents & Secondary Hardware: #919EAB
 * - Crisp Cables, Borders & Micro-Indicators: #F3F3F3 / #E8E8E8
 * ============================================================================
 */

interface Point2D {
  x: number;
  y: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface CableDef {
  points: Point3D[];
  speed: number;
  phase: number;
  reverse?: boolean;
}

const ISO_ANGLE = Math.PI / 6; // 30 degrees true isometric projection
const COS_30 = Math.cos(ISO_ANGLE);
const SIN_30 = Math.sin(ISO_ANGLE);

export const IsometricBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const updateSize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    const handlePointerMove = (e: MouseEvent) => {
      pointerRef.current.targetX = (e.clientX / Math.max(1, width) - 0.5) * 2;
      pointerRef.current.targetY = (e.clientY / Math.max(1, height) - 0.5) * 2;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // -------------------------------------------------------------------------
    // 3D ISOMETRIC PROJECTION & PRIMITIVE HELPERS
    // -------------------------------------------------------------------------
    const project = (p: Point3D, ox: number, oy: number, scale: number): Point2D => ({
      x: ox + (p.x - p.y) * COS_30 * scale,
      y: oy + ((p.x + p.y) * SIN_30 - p.z) * scale,
    });

    /**
     * Draws a rounded-corner isometric extruded slab (platform base)
     */
    const drawRoundedIsoSlab = (
      cx: number,
      cy: number,
      z0: number,
      heightZ: number,
      w: number,
      d: number,
      cornerRadius: number,
      ox: number,
      oy: number,
      scale: number,
      colors: {
        top: string;
        sideLeft: string;
        sideRight: string;
        rimStroke: string;
        topHighlight?: string;
        shadow?: boolean;
      }
    ) => {
      const hw = w * 0.5;
      const hd = d * 0.5;
      const r = Math.min(cornerRadius, hw * 0.45, hd * 0.45);

      const perimeter: Point2D[] = [];
      const steps = 6;
      const corners = [
        { x: cx + hw - r, y: cy - hd + r, a0: -Math.PI / 2, a1: 0 },
        { x: cx + hw - r, y: cy + hd - r, a0: 0, a1: Math.PI / 2 },
        { x: cx - hw + r, y: cy + hd - r, a0: Math.PI / 2, a1: Math.PI },
        { x: cx - hw + r, y: cy - hd + r, a0: Math.PI, a1: (Math.PI * 3) / 2 },
      ];

      corners.forEach((c) => {
        for (let i = 0; i <= steps; i++) {
          const a = c.a0 + ((c.a1 - c.a0) * i) / steps;
          perimeter.push({
            x: c.x + Math.cos(a) * r,
            y: c.y + Math.sin(a) * r,
          });
        }
      });

      const topPts = perimeter.map((pt) => project({ x: pt.x, y: pt.y, z: z0 + heightZ }, ox, oy, scale));
      const botPts = perimeter.map((pt) => project({ x: pt.x, y: pt.y, z: z0 }, ox, oy, scale));

      // Soft ambient ground shadow
      if (colors.shadow) {
        const shPts = perimeter.map((pt) =>
          project({ x: pt.x + 0.18, y: pt.y + 0.22, z: z0 - 0.02 }, ox, oy, scale)
        );
        ctx.save();
        ctx.beginPath();
        shPts.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
        ctx.closePath();
        ctx.fillStyle = "rgba(29, 29, 29, 0.08)";
        ctx.fill();
        ctx.restore();
      }

      // Draw extruded vertical wall segments
      for (let i = 0; i < perimeter.length; i++) {
        const next = (i + 1) % perimeter.length;
        const pA = perimeter[i];
        const pB = perimeter[next];
        const nx = pB.y - pA.y;
        const ny = -(pB.x - pA.x);
        if (nx + ny >= -0.05) {
          ctx.beginPath();
          ctx.moveTo(topPts[i].x, topPts[i].y);
          ctx.lineTo(topPts[next].x, topPts[next].y);
          ctx.lineTo(botPts[next].x, botPts[next].y);
          ctx.lineTo(botPts[i].x, botPts[i].y);
          ctx.closePath();
          ctx.fillStyle = nx > ny ? colors.sideRight : colors.sideLeft;
          ctx.fill();
        }
      }

      // Bottom rim stroke
      ctx.beginPath();
      botPts.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
      ctx.closePath();
      ctx.strokeStyle = colors.rimStroke;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Top face
      ctx.beginPath();
      topPts.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
      ctx.closePath();
      ctx.fillStyle = colors.top;
      ctx.fill();
      ctx.strokeStyle = colors.topHighlight || colors.rimStroke;
      ctx.lineWidth = 1.35;
      ctx.stroke();
    };

    /**
     * Draws a crisp 3D isometric rectangular prism
     */
    const drawIsoBox = (
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
        ctx.shadowBlur = 16;
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

    /**
     * Draws a 3D isometric cylinder / disc
     */
    const drawIsoCylinder = (
      center: Point3D,
      radius: number,
      heightZ: number,
      ox: number,
      oy: number,
      scale: number,
      colors: {
        top: string;
        side: string;
        stroke: string;
      }
    ) => {
      const segs = 24;
      const topPts: Point2D[] = [];
      const botPts: Point2D[] = [];

      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        const px = center.x + Math.cos(a) * radius;
        const py = center.y + Math.sin(a) * radius;
        topPts.push(project({ x: px, y: py, z: center.z + heightZ }, ox, oy, scale));
        botPts.push(project({ x: px, y: py, z: center.z }, ox, oy, scale));
      }

      ctx.beginPath();
      const startIdx = Math.floor(segs * 0.875);
      for (let k = 0; k <= segs / 2; k++) {
        const idx = (startIdx + k) % segs;
        if (k === 0) ctx.moveTo(topPts[idx].x, topPts[idx].y);
        else ctx.lineTo(topPts[idx].x, topPts[idx].y);
      }
      for (let k = segs / 2; k >= 0; k--) {
        const idx = (startIdx + k) % segs;
        ctx.lineTo(botPts[idx].x, botPts[idx].y);
      }
      ctx.closePath();
      ctx.fillStyle = colors.side;
      ctx.fill();
      ctx.strokeStyle = colors.stroke;
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // Top ellipse
      ctx.beginPath();
      topPts.forEach((pt, idx) => (idx === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)));
      ctx.closePath();
      ctx.fillStyle = colors.top;
      ctx.fill();
      ctx.strokeStyle = colors.stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    /**
     * Draws one of the 4 central server rack towers
     */
    const drawServerTower = (
      cx: number,
      cy: number,
      baseZ: number,
      now: number,
      phase: number,
      ox: number,
      oy: number,
      scale: number
    ) => {
      const w = 1.38;
      const d = 1.38;
      const h = 3.05;

      drawIsoBox(
        { x: cx, y: cy, z: baseZ },
        { x: w, y: d, z: h },
        ox,
        oy,
        scale,
        {
          top: "#262626",
          left: "#1D1D1D",
          right: "#151515",
          stroke: "#3A3A3A",
          lineWidth: 1.1,
        }
      );

      const numSlots = 14;
      for (let s = 0; s < numSlots; s++) {
        const slotZ = baseZ + 0.24 + s * 0.19;
        const isLimeActive = (s + Math.floor(now * 0.004 + phase)) % 5 === 0;
        const barColor = isLimeActive ? "#F0FD63" : s % 2 === 0 ? "#919EAB" : "#555E68";

        const lfA = project({ x: cx - w * 0.4, y: cy + d * 0.503, z: slotZ }, ox, oy, scale);
        const lfB = project({ x: cx + w * 0.4, y: cy + d * 0.503, z: slotZ }, ox, oy, scale);
        ctx.beginPath();
        ctx.moveTo(lfA.x, lfA.y);
        ctx.lineTo(lfB.x, lfB.y);
        ctx.strokeStyle = barColor;
        ctx.lineWidth = scale * 0.065;
        ctx.lineCap = "round";
        ctx.stroke();

        const ledL = project({ x: cx - w * 0.42, y: cy + d * 0.506, z: slotZ + 0.04 }, ox, oy, scale);
        ctx.fillStyle = isLimeActive ? "#F0FD63" : "#FFFFFF";
        ctx.fillRect(ledL.x - 1, ledL.y - 1, 2, 2);

        const rfA = project({ x: cx + w * 0.503, y: cy - d * 0.4, z: slotZ }, ox, oy, scale);
        const rfB = project({ x: cx + w * 0.503, y: cy + d * 0.4, z: slotZ }, ox, oy, scale);
        ctx.beginPath();
        ctx.moveTo(rfA.x, rfA.y);
        ctx.lineTo(rfB.x, rfB.y);
        ctx.strokeStyle = s % 3 === 0 ? "#F0FD63" : "#919EAB";
        ctx.lineWidth = scale * 0.065;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      // Top Fan
      const fanCenterZ = baseZ + h + 0.01;
      const fanCenter = project({ x: cx, y: cy, z: fanCenterZ }, ox, oy, scale);
      const fanRx = scale * 0.48;
      const fanRy = fanRx * 0.577;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(fanCenter.x, fanCenter.y, fanRx, fanRy, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#121212";
      ctx.fill();
      ctx.strokeStyle = "#919EAB";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      const bladeCount = 7;
      const spin = now * 0.0045 + phase;
      for (let b = 0; b < bladeCount; b++) {
        const a0 = spin + (b / bladeCount) * Math.PI * 2;
        const a1 = a0 + 0.42;
        ctx.beginPath();
        ctx.moveTo(fanCenter.x, fanCenter.y);
        ctx.ellipse(fanCenter.x, fanCenter.y, fanRx * 0.85, fanRy * 0.85, 0, a0, a1);
        ctx.closePath();
        ctx.fillStyle = b % 2 === 0 ? "#F0FD63" : "#919EAB";
        ctx.fill();
      }

      ctx.beginPath();
      ctx.ellipse(fanCenter.x, fanCenter.y, fanRx * 0.24, fanRy * 0.24, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.restore();

      const screwOffsets = [
        [-0.54, -0.54],
        [0.54, -0.54],
        [0.54, 0.54],
        [-0.54, 0.54],
      ];
      ctx.fillStyle = "#919EAB";
      screwOffsets.forEach(([sx, sy]) => {
        const sp = project({ x: cx + sx, y: cy + sy, z: fanCenterZ }, ox, oy, scale);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    /**
     * Draws the isometric robot assistant
     */
    const drawIsoRobot = (
      pos: Point3D,
      facing: "left" | "right",
      now: number,
      phase: number,
      ox: number,
      oy: number,
      scale: number
    ) => {
      const bob = Math.sin(now * 0.004 + phase) * 0.08;
      const p = project({ x: pos.x, y: pos.y, z: pos.z + bob }, ox, oy, scale);
      const s = scale * 0.036;

      ctx.save();
      ctx.translate(p.x, p.y);

      // Shadow
      const shP = project({ x: pos.x, y: pos.y, z: pos.z - 0.58 }, ox, oy, scale);
      ctx.beginPath();
      ctx.ellipse(
        shP.x - p.x,
        shP.y - p.y,
        11 * s * (1 - bob * 0.5),
        6 * s * (1 - bob * 0.5),
        0,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "rgba(240, 253, 99, 0.28)";
      ctx.fill();

      // Torso
      const bodyGrad = ctx.createLinearGradient(-12 * s, -10 * s, 12 * s, 20 * s);
      bodyGrad.addColorStop(0, "#FFFFFF");
      bodyGrad.addColorStop(0.55, "#E8E8E8");
      bodyGrad.addColorStop(1, "#919EAB");

      ctx.beginPath();
      ctx.moveTo(-11 * s, -2 * s);
      ctx.quadraticCurveTo(-12 * s, 14 * s, 0, 22 * s);
      ctx.quadraticCurveTo(12 * s, 14 * s, 11 * s, -2 * s);
      ctx.closePath();
      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.strokeStyle = "#1D1D1D";
      ctx.lineWidth = 1.1;
      ctx.stroke();

      // Chest badge in #F0FD63
      ctx.beginPath();
      ctx.arc(facing === "right" ? 3 * s : -3 * s, 7 * s, 2.6 * s, 0, Math.PI * 2);
      ctx.fillStyle = "#F0FD63";
      ctx.fill();
      ctx.strokeStyle = "#1D1D1D";
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Head
      const headGrad = ctx.createRadialGradient(-3 * s, -16 * s, 2 * s, 0, -13 * s, 15 * s);
      headGrad.addColorStop(0, "#FFFFFF");
      headGrad.addColorStop(0.7, "#F3F3F3");
      headGrad.addColorStop(1, "#919EAB");

      ctx.beginPath();
      ctx.ellipse(0, -13 * s, 13.5 * s, 11.5 * s, 0, 0, Math.PI * 2);
      ctx.fillStyle = headGrad;
      ctx.fill();
      ctx.strokeStyle = "#1D1D1D";
      ctx.lineWidth = 1.15;
      ctx.stroke();

      // Visor
      const visorX = facing === "right" ? 2.5 * s : -2.5 * s;
      ctx.beginPath();
      ctx.ellipse(visorX, -13 * s, 9.5 * s, 6.2 * s, facing === "right" ? 0.12 : -0.12, 0, Math.PI * 2);
      ctx.fillStyle = "#1D1D1D";
      ctx.fill();

      // Eyes in #F0FD63
      const eyeOffset = facing === "right" ? 3.5 * s : -3.5 * s;
      ctx.fillStyle = "#F0FD63";
      ctx.beginPath();
      ctx.arc(visorX - 3.2 * s + eyeOffset * 0.25, -13.2 * s, 1.85 * s, 0, Math.PI * 2);
      ctx.arc(visorX + 3.2 * s + eyeOffset * 0.25, -13.2 * s, 1.85 * s, 0, Math.PI * 2);
      ctx.fill();

      // Antenna
      ctx.beginPath();
      ctx.moveTo(0, -24.5 * s);
      ctx.lineTo(0, -30 * s);
      ctx.strokeStyle = "#1D1D1D";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -31 * s, 2.3 * s, 0, Math.PI * 2);
      ctx.fillStyle = "#F0FD63";
      ctx.fill();
      ctx.strokeStyle = "#1D1D1D";
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // Arm
      const armWave = Math.sin(now * 0.009 + phase) * 1.8 * s;
      const armDir = facing === "right" ? 1 : -1;
      ctx.beginPath();
      const armX = armDir * 6 * s - (armDir < 0 ? 11 * s : 0);
      const armY = 1 * s + armWave;
      const armW = 11 * s;
      const armH = 4.2 * s;
      const armR = 2.1 * s;
      ctx.beginPath();
      ctx.moveTo(armX + armR, armY);
      ctx.lineTo(armX + armW - armR, armY);
      ctx.arcTo(armX + armW, armY, armX + armW, armY + armR, armR);
      ctx.lineTo(armX + armW, armY + armH - armR);
      ctx.arcTo(armX + armW, armY + armH, armX + armW - armR, armY + armH, armR);
      ctx.lineTo(armX + armR, armY + armH);
      ctx.arcTo(armX, armY + armH, armX, armY + armH - armR, armR);
      ctx.lineTo(armX, armY + armR);
      ctx.arcTo(armX, armY, armX + armR, armY, armR);
      ctx.closePath();
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#1D1D1D";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.restore();
    };

    /**
     * Draws floating HUD cards around the perimeter
     */
    const drawFloatingIsometricCard = (
      anchor: Point3D,
      widthUnits: number,
      heightUnits: number,
      orientation: "left" | "right",
      variant: "code" | "verticalBars" | "horizontalWave",
      now: number,
      phase: number,
      ox: number,
      oy: number,
      scale: number
    ) => {
      const floatZ = Math.sin(now * 0.0024 + phase) * 0.14;
      const baseZ = anchor.z + floatZ;

      const dx = orientation === "right" ? widthUnits : 0;
      const dy = orientation === "left" ? widthUnits : 0;

      const p0 = project({ x: anchor.x, y: anchor.y, z: baseZ + heightUnits }, ox, oy, scale);
      const p1 = project({ x: anchor.x + dx, y: anchor.y + dy, z: baseZ + heightUnits }, ox, oy, scale);
      const p2 = project({ x: anchor.x + dx, y: anchor.y + dy, z: baseZ }, ox, oy, scale);
      const p3 = project({ x: anchor.x, y: anchor.y, z: baseZ }, ox, oy, scale);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.fillStyle = "rgba(29, 29, 29, 0.94)";
      ctx.fill();
      ctx.strokeStyle = "#919EAB";
      ctx.lineWidth = 1.25;
      ctx.stroke();

      if (variant === "code") {
        const rows = 9;
        for (let r = 0; r < rows; r++) {
          const tZ = baseZ + heightUnits * (0.84 - r * 0.085);
          const lenFactor = 0.35 + ((r * 37 + Math.floor(now * 0.003)) % 50) / 100;
          const startFactor = r % 3 === 1 ? 0.22 : 0.12;

          const lA = project(
            { x: anchor.x + dx * startFactor, y: anchor.y + dy * startFactor, z: tZ },
            ox,
            oy,
            scale
          );
          const lB = project(
            {
              x: anchor.x + dx * Math.min(0.88, startFactor + lenFactor),
              y: anchor.y + dy * Math.min(0.88, startFactor + lenFactor),
              z: tZ,
            },
            ox,
            oy,
            scale
          );

          ctx.beginPath();
          ctx.moveTo(lA.x, lA.y);
          ctx.lineTo(lB.x, lB.y);
          ctx.strokeStyle = r % 3 === 0 ? "#F0FD63" : r % 2 === 0 ? "#FFFFFF" : "#919EAB";
          ctx.lineWidth = 1.7;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      } else if (variant === "verticalBars") {
        const cols = 6;
        for (let c = 0; c < cols; c++) {
          const frac = 0.16 + (c / (cols - 1)) * 0.68;
          const barH =
            heightUnits * (0.25 + 0.55 * Math.abs(Math.sin(now * 0.003 + c * 0.9 + phase)));
          const bBot = project(
            { x: anchor.x + dx * frac, y: anchor.y + dy * frac, z: baseZ + heightUnits * 0.14 },
            ox,
            oy,
            scale
          );
          const bTop = project(
            {
              x: anchor.x + dx * frac,
              y: anchor.y + dy * frac,
              z: baseZ + heightUnits * 0.14 + barH,
            },
            ox,
            oy,
            scale
          );
          ctx.beginPath();
          ctx.moveTo(bBot.x, bBot.y);
          ctx.lineTo(bTop.x, bTop.y);
          ctx.strokeStyle = c % 2 === 0 ? "#F0FD63" : "#FFFFFF";
          ctx.lineWidth = 2.4;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      } else if (variant === "horizontalWave") {
        const bars = 16;
        for (let b = 0; b < bars; b++) {
          const frac = 0.08 + (b / (bars - 1)) * 0.84;
          const amp =
            heightUnits * (0.18 + 0.62 * Math.abs(Math.sin(now * 0.004 + b * 0.55)));
          const bBot = project(
            { x: anchor.x + dx * frac, y: anchor.y + dy * frac, z: baseZ + heightUnits * 0.18 },
            ox,
            oy,
            scale
          );
          const bTop = project(
            {
              x: anchor.x + dx * frac,
              y: anchor.y + dy * frac,
              z: baseZ + heightUnits * 0.18 + amp,
            },
            ox,
            oy,
            scale
          );
          ctx.beginPath();
          ctx.moveTo(bBot.x, bBot.y);
          ctx.lineTo(bTop.x, bTop.y);
          ctx.strokeStyle = b % 3 === 0 ? "#F0FD63" : "#FFFFFF";
          ctx.lineWidth = 2.1;
          ctx.lineCap = "round";
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    /**
     * Draws curved cables with #F0FD63 pulses
     */
    const drawCableWithPulse = (
      cable: CableDef,
      now: number,
      ox: number,
      oy: number,
      scale: number
    ) => {
      const pts2D = cable.points.map((p) => project(p, ox, oy, scale));
      if (pts2D.length < 2) return;

      const sampleSpline = (t: number): Point2D => {
        const clamped = Math.max(0, Math.min(1, t));
        if (pts2D.length === 2) {
          return {
            x: pts2D[0].x + (pts2D[1].x - pts2D[0].x) * clamped,
            y: pts2D[0].y + (pts2D[1].y - pts2D[0].y) * clamped,
          };
        }
        const segs = pts2D.length - 1;
        const scaled = clamped * segs;
        const idx = Math.min(Math.floor(scaled), segs - 1);
        const f = scaled - idx;
        const p0 = pts2D[Math.max(0, idx - 1)];
        const p1 = pts2D[idx];
        const p2 = pts2D[idx + 1];
        const p3 = pts2D[Math.min(segs, idx + 2)];

        const f2 = f * f;
        const f3 = f2 * f;
        return {
          x:
            0.5 *
            (2 * p1.x +
              (-p0.x + p2.x) * f +
              (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * f2 +
              (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * f3),
          y:
            0.5 *
            (2 * p1.y +
              (-p0.y + p2.y) * f +
              (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * f2 +
              (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * f3),
        };
      };

      ctx.save();
      ctx.beginPath();
      const samples = 28;
      for (let i = 0; i <= samples; i++) {
        const pt = sampleSpline(i / samples);
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }

      ctx.strokeStyle = "#919EAB";
      ctx.lineWidth = 2.6;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.strokeStyle = "#F3F3F3";
      ctx.lineWidth = 1.3;
      ctx.stroke();

      [pts2D[0], pts2D[pts2D.length - 1]].forEach((endPt) => {
        ctx.beginPath();
        ctx.arc(endPt.x, endPt.y, 3.1, 0, Math.PI * 2);
        ctx.fillStyle = "#1D1D1D";
        ctx.fill();
        ctx.strokeStyle = "#F0FD63";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      let t = (now * cable.speed + cable.phase) % 1;
      if (cable.reverse) t = 1 - t;
      const pulsePt = sampleSpline(t);

      ctx.beginPath();
      ctx.arc(pulsePt.x, pulsePt.y, 3.6, 0, Math.PI * 2);
      ctx.fillStyle = "#F0FD63";
      ctx.shadowColor = "#F0FD63";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.strokeStyle = "#1D1D1D";
      ctx.lineWidth = 0.9;
      ctx.stroke();

      ctx.restore();
    };

    const cables: CableDef[] = [
      {
        points: [
          { x: -3.2, y: -1.6, z: 0.45 },
          { x: -2.6, y: -1.1, z: 0.1 },
          { x: -2.0, y: -0.7, z: 0.42 },
        ],
        speed: 0.00045,
        phase: 0.1,
      },
      {
        points: [
          { x: -3.2, y: -1.1, z: 0.45 },
          { x: -2.55, y: -0.6, z: 0.08 },
          { x: -2.0, y: -0.2, z: 0.42 },
        ],
        speed: 0.0005,
        phase: 0.45,
      },
      {
        points: [
          { x: -3.2, y: -0.6, z: 0.45 },
          { x: -2.55, y: -0.1, z: 0.08 },
          { x: -2.0, y: 0.3, z: 0.42 },
        ],
        speed: 0.00042,
        phase: 0.78,
      },
      {
        points: [
          { x: -5.4, y: -0.4, z: 0.4 },
          { x: -5.6, y: 0.7, z: 0.15 },
          { x: -5.2, y: 1.7, z: 0.45 },
        ],
        speed: 0.00038,
        phase: 0.25,
      },
      {
        points: [
          { x: -4.1, y: 2.1, z: 0.42 },
          { x: -3.1, y: 1.9, z: 0.1 },
          { x: -2.0, y: 1.3, z: 0.42 },
        ],
        speed: 0.00048,
        phase: 0.6,
      },
      {
        points: [
          { x: -4.7, y: 3.3, z: 0.38 },
          { x: -4.5, y: 4.3, z: 0.08 },
          { x: -3.4, y: 4.8, z: 0.4 },
        ],
        speed: 0.0004,
        phase: 0.9,
      },
      {
        points: [
          { x: -2.1, y: 3.9, z: 0.42 },
          { x: -1.7, y: 3.0, z: 0.08 },
          { x: -1.2, y: 2.1, z: 0.42 },
        ],
        speed: 0.00052,
        phase: 0.15,
        reverse: true,
      },
      {
        points: [
          { x: -1.3, y: 5.5, z: 0.35 },
          { x: -0.3, y: 5.9, z: 0.06 },
          { x: 0.7, y: 5.4, z: 0.35 },
        ],
        speed: 0.00044,
        phase: 0.52,
      },
      {
        points: [
          { x: 0.9, y: 4.5, z: 0.36 },
          { x: 0.7, y: 3.3, z: 0.08 },
          { x: 0.5, y: 2.1, z: 0.45 },
        ],
        speed: 0.00055,
        phase: 0.3,
        reverse: true,
      },
      {
        points: [
          { x: 1.4, y: 4.5, z: 0.36 },
          { x: 1.3, y: 3.3, z: 0.08 },
          { x: 1.1, y: 2.1, z: 0.45 },
        ],
        speed: 0.00048,
        phase: 0.72,
      },
      {
        points: [
          { x: 2.0, y: 5.3, z: 0.35 },
          { x: 2.8, y: 5.5, z: 0.08 },
          { x: 3.4, y: 4.7, z: 0.38 },
        ],
        speed: 0.00046,
        phase: 0.85,
      },
      {
        points: [
          { x: 1.8, y: 1.6, z: 0.45 },
          { x: 2.6, y: 2.2, z: 0.1 },
          { x: 3.3, y: 2.9, z: 0.4 },
        ],
        speed: 0.0005,
        phase: 0.2,
      },
      {
        points: [
          { x: 2.0, y: 1.1, z: 0.45 },
          { x: 2.9, y: 1.7, z: 0.1 },
          { x: 3.7, y: 2.5, z: 0.4 },
        ],
        speed: 0.00043,
        phase: 0.65,
      },
      {
        points: [
          { x: 1.2, y: -2.0, z: 0.45 },
          { x: 1.7, y: -2.7, z: 0.1 },
          { x: 2.1, y: -3.2, z: 0.42 },
        ],
        speed: 0.00047,
        phase: 0.38,
      },
      {
        points: [
          { x: 2.0, y: -0.5, z: 0.45 },
          { x: 3.1, y: -0.6, z: 0.08 },
          { x: 4.1, y: -0.7, z: 0.36 },
        ],
        speed: 0.00051,
        phase: 0.55,
      },
      {
        points: [
          { x: 4.6, y: -2.3, z: 0.4 },
          { x: 4.9, y: -1.6, z: 0.08 },
          { x: 4.8, y: -1.1, z: 0.36 },
        ],
        speed: 0.0004,
        phase: 0.12,
      },
    ];

    const render = (now: number) => {
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.05;
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.05;

      // Completely transparent canvas background so diorama floats seamlessly over Hero
      ctx.clearRect(0, 0, width, height);

      // Responsive scale: fits the full height of the Hero comfortably without cut-off
      const availableH = Math.max(300, height - 60);
      const scale = Math.min(38, Math.max(20, availableH / 13.5));

      // On desktop, position diorama on the right half so text on the left has breathing room
      const isDesktop = width >= 1024;
      const targetXRatio = isDesktop ? 0.68 : 0.5;

      const originX = width * targetXRatio - pointerRef.current.x * 16;
      const originY = height * 0.52 - pointerRef.current.y * 10;

      // Soft opacity on smaller viewports so overlaid text remains completely legible
      ctx.globalAlpha = isDesktop ? 1.0 : 0.4;

      // MODULE 2: TOP-LEFT PLATFORM
      drawRoundedIsoSlab(-4.7, -2.0, 0, 0.42, 3.2, 3.4, 0.5, originX, originY, scale, {
        top: "#1D1D1D",
        sideLeft: "#141414",
        sideRight: "#262626",
        rimStroke: "#919EAB",
        topHighlight: "#919EAB",
        shadow: true,
      });

      [-5.45, -4.75, -4.05].forEach((cabX, idx) => {
        drawIsoBox(
          { x: cabX, y: -2.45, z: 0.42 },
          { x: 0.62, y: 1.35, z: 2.15 },
          originX,
          originY,
          scale,
          {
            top: "#262626",
            left: "#1D1D1D",
            right: "#151515",
            stroke: "#919EAB",
            lineWidth: 1,
          }
        );

        const scrTop = project({ x: cabX - 0.22, y: -1.77, z: 2.38 }, originX, originY, scale);
        const scrBot = project({ x: cabX + 0.22, y: -1.77, z: 2.02 }, originX, originY, scale);
        ctx.save();
        ctx.beginPath();
        const wavePts = 14;
        for (let w = 0; w <= wavePts; w++) {
          const t = w / wavePts;
          const wx = scrTop.x + (scrBot.x - scrTop.x) * t;
          const wy =
            (scrTop.y + scrBot.y) * 0.5 +
            Math.sin(t * Math.PI * 3 + now * 0.006 + idx * 1.4) * (scale * 0.08);
          if (w === 0) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        ctx.strokeStyle = "#F0FD63";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.restore();

        for (let v = 0; v < 3; v++) {
          const vx = cabX - 0.14 + v * 0.14;
          const vA = project({ x: vx, y: -1.77, z: 1.55 }, originX, originY, scale);
          const vB = project({ x: vx, y: -1.77, z: 0.65 }, originX, originY, scale);
          ctx.beginPath();
          ctx.moveTo(vA.x, vA.y);
          ctx.lineTo(vB.x, vB.y);
          ctx.strokeStyle = v === 1 ? "#F0FD63" : "#919EAB";
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      });

      drawIsoRobot({ x: -4.2, y: -1.15, z: 1.05 }, "left", now, 0.4, originX, originY, scale);

      // MODULE 3: TOP-RIGHT DATABASE STACKS PLATFORM
      drawRoundedIsoSlab(3.3, -3.5, 0, 0.42, 3.0, 2.7, 0.5, originX, originY, scale, {
        top: "#1D1D1D",
        sideLeft: "#141414",
        sideRight: "#262626",
        rimStroke: "#919EAB",
        topHighlight: "#919EAB",
        shadow: true,
      });

      [
        { x: 2.65, y: -3.65, phase: 0 },
        { x: 3.85, y: -3.15, phase: 1.5 },
      ].forEach((stack) => {
        const layers = 5;
        for (let l = 0; l < layers; l++) {
          const lz = 0.45 + l * 0.44;
          const isTop = l === layers - 1;
          const isActiveLayer = (l + Math.floor(now * 0.003 + stack.phase)) % layers === 0;

          drawIsoBox(
            { x: stack.x, y: stack.y, z: lz },
            { x: 0.96, y: 0.96, z: 0.34 },
            originX,
            originY,
            scale,
            {
              top: isTop ? "#F3F3F3" : "#262626",
              left: "#1D1D1D",
              right: "#141414",
              stroke: isActiveLayer || isTop ? "#F0FD63" : "#919EAB",
              lineWidth: isTop ? 1.3 : 1,
            }
          );

          const ledA = project(
            { x: stack.x - 0.3, y: stack.y + 0.485, z: lz + 0.17 },
            originX,
            originY,
            scale
          );
          const ledB = project(
            { x: stack.x + 0.3, y: stack.y + 0.485, z: lz + 0.17 },
            originX,
            originY,
            scale
          );
          ctx.beginPath();
          ctx.moveTo(ledA.x, ledA.y);
          ctx.lineTo(ledB.x, ledB.y);
          ctx.strokeStyle = isActiveLayer ? "#F0FD63" : "#919EAB";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        const topZ = 0.45 + layers * 0.44 - 0.08;
        const topPt = project({ x: stack.x, y: stack.y, z: topZ }, originX, originY, scale);
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(topPt.x, topPt.y, scale * 0.34, scale * 0.34 * 0.577, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "#1D1D1D";
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(topPt.x, topPt.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#F0FD63";
        ctx.fill();
        ctx.restore();
      });

      // MODULE 1: CENTRAL 2x2 SERVER HUB PLATFORM
      drawRoundedIsoSlab(0, 0, 0, 0.48, 4.3, 4.3, 0.62, originX, originY, scale, {
        top: "#1D1D1D",
        sideLeft: "#121212",
        sideRight: "#262626",
        rimStroke: "#F0FD63",
        topHighlight: "#919EAB",
        shadow: true,
      });

      drawRoundedIsoSlab(0, 0, 0.48, 0.04, 3.65, 3.65, 0.45, originX, originY, scale, {
        top: "#262626",
        sideLeft: "#1D1D1D",
        sideRight: "#1D1D1D",
        rimStroke: "#919EAB",
        topHighlight: "#3A3A3A",
      });

      drawServerTower(-0.82, -0.82, 0.52, now, 0.0, originX, originY, scale);
      drawServerTower(-0.82, 0.82, 0.52, now, 1.5, originX, originY, scale);
      drawServerTower(0.82, -0.82, 0.52, now, 3.0, originX, originY, scale);
      drawServerTower(0.82, 0.82, 0.52, now, 4.5, originX, originY, scale);

      // MODULE 4: MID-LEFT CLOUD NODE
      drawRoundedIsoSlab(-4.9, 2.5, 0, 0.38, 1.85, 1.85, 0.34, originX, originY, scale, {
        top: "#919EAB",
        sideLeft: "#1D1D1D",
        sideRight: "#262626",
        rimStroke: "#1D1D1D",
        topHighlight: "#FFFFFF",
        shadow: true,
      });

      drawIsoBox(
        { x: -4.9, y: 2.5, z: 0.38 },
        { x: 1.15, y: 1.15, z: 0.1 },
        originX,
        originY,
        scale,
        {
          top: "#1D1D1D",
          left: "#121212",
          right: "#262626",
          stroke: "#F0FD63",
          lineWidth: 1.2,
        }
      );

      const padCenter = project({ x: -4.9, y: 2.5, z: 0.49 }, originX, originY, scale);
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(padCenter.x, padCenter.y, scale * 0.24, scale * 0.13, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#F0FD63";
      ctx.fill();
      ctx.restore();

      const cloudFloat = Math.sin(now * 0.0032) * 0.12;
      const cloudPt = project({ x: -4.9, y: 2.5, z: 1.65 + cloudFloat }, originX, originY, scale);
      const cs = scale * 0.038;

      ctx.save();
      ctx.translate(cloudPt.x, cloudPt.y);
      ctx.shadowColor = "rgba(240, 253, 99, 0.35)";
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.moveTo(-18 * cs, 10 * cs);
      ctx.lineTo(18 * cs, 10 * cs);
      ctx.arc(17 * cs, 2 * cs, 8 * cs, Math.PI * 0.5, -Math.PI * 0.5, true);
      ctx.arc(6 * cs, -6 * cs, 11 * cs, 0, Math.PI, true);
      ctx.arc(-9 * cs, -2 * cs, 8.5 * cs, -Math.PI * 0.3, Math.PI * 1.1, true);
      ctx.arc(-18 * cs, 3 * cs, 7 * cs, -Math.PI * 0.6, Math.PI * 0.5, true);
      ctx.closePath();
      ctx.fillStyle = "#1D1D1D";
      ctx.fill();
      ctx.strokeStyle = "#F0FD63";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      [-8 * cs, 0, 8 * cs].forEach((dx, idx) => {
        const pulse = 0.65 + 0.35 * Math.sin(now * 0.006 - idx * 0.9);
        ctx.beginPath();
        ctx.arc(dx, 2 * cs, 2.3 * cs * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "#F0FD63";
        ctx.fill();
      });
      ctx.restore();

      // MODULE 8: MID-RIGHT HOLOGRAPHIC PROJECTOR NODE
      drawRoundedIsoSlab(4.7, -0.7, 0, 0.38, 1.55, 1.55, 0.3, originX, originY, scale, {
        top: "#919EAB",
        sideLeft: "#1D1D1D",
        sideRight: "#262626",
        rimStroke: "#1D1D1D",
        topHighlight: "#FFFFFF",
        shadow: true,
      });

      drawIsoCylinder({ x: 4.7, y: -0.7, z: 0.38 }, 0.44, 0.24, originX, originY, scale, {
        top: "#262626",
        side: "#1D1D1D",
        stroke: "#919EAB",
      });
      drawIsoCylinder({ x: 4.7, y: -0.7, z: 0.62 }, 0.3, 0.22, originX, originY, scale, {
        top: "#F0FD63",
        side: "#1D1D1D",
        stroke: "#1D1D1D",
      });

      const lensTop = project({ x: 4.7, y: -0.7, z: 0.84 }, originX, originY, scale);
      const holoCenter = project({ x: 4.7, y: -0.7, z: 2.15 }, originX, originY, scale);

      ctx.save();
      const beamGrad = ctx.createLinearGradient(lensTop.x, lensTop.y, holoCenter.x, holoCenter.y - 20);
      beamGrad.addColorStop(0, "rgba(240, 253, 99, 0.55)");
      beamGrad.addColorStop(1, "rgba(240, 253, 99, 0.04)");

      ctx.beginPath();
      ctx.moveTo(lensTop.x - scale * 0.24, lensTop.y);
      ctx.lineTo(lensTop.x + scale * 0.24, lensTop.y);
      ctx.lineTo(holoCenter.x + scale * 0.55, holoCenter.y - scale * 0.15);
      ctx.lineTo(holoCenter.x - scale * 0.55, holoCenter.y - scale * 0.15);
      ctx.closePath();
      ctx.fillStyle = beamGrad;
      ctx.fill();
      ctx.restore();

      const holoBob = Math.sin(now * 0.0035) * 0.1;
      const holoSpin = Math.sin(now * 0.002) * 0.08;
      drawIsoBox(
        { x: 4.7 + holoSpin, y: -0.7 - holoSpin, z: 1.85 + holoBob },
        { x: 0.68, y: 0.68, z: 0.68 },
        originX,
        originY,
        scale,
        {
          top: "rgba(240, 253, 99, 0.65)",
          left: "rgba(240, 253, 99, 0.35)",
          right: "rgba(145, 158, 171, 0.35)",
          stroke: "#1D1D1D",
          lineWidth: 1.1,
          glow: "rgba(240, 253, 99, 0.6)",
        }
      );

      // MODULE 5: BOTTOM-LEFT LAPTOP PLATFORM
      drawRoundedIsoSlab(-2.5, 4.9, 0, 0.4, 2.35, 2.35, 0.42, originX, originY, scale, {
        top: "#1D1D1D",
        sideLeft: "#121212",
        sideRight: "#262626",
        rimStroke: "#919EAB",
        topHighlight: "#919EAB",
        shadow: true,
      });

      drawIsoBox(
        { x: -2.25, y: 4.65, z: 0.42 },
        { x: 0.85, y: 1.05, z: 0.08 },
        originX,
        originY,
        scale,
        {
          top: "#919EAB",
          left: "#262626",
          right: "#1D1D1D",
          stroke: "#F3F3F3",
          lineWidth: 0.9,
        }
      );

      drawIsoBox(
        { x: -1.85, y: 4.65, z: 0.48 },
        { x: 0.1, y: 1.05, z: 0.82 },
        originX,
        originY,
        scale,
        {
          top: "#262626",
          left: "#1D1D1D",
          right: "#121212",
          stroke: "#F0FD63",
          lineWidth: 1.1,
        }
      );

      for (let r = 0; r < 5; r++) {
        const lz = 0.62 + r * 0.13;
        const la = project({ x: -1.91, y: 4.25, z: lz }, originX, originY, scale);
        const lb = project(
          { x: -1.91, y: 4.25 + (0.4 + ((r + Math.floor(now * 0.004)) % 3) * 0.2), z: lz },
          originX,
          originY,
          scale
        );
        ctx.beginPath();
        ctx.moveTo(la.x, la.y);
        ctx.lineTo(lb.x, lb.y);
        ctx.strokeStyle = r % 2 === 0 ? "#F0FD63" : "#FFFFFF";
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      drawIsoRobot({ x: -2.95, y: 5.15, z: 1.02 }, "right", now, 2.1, originX, originY, scale);

      // MODULE 6: BOTTOM-CENTER MICROCHIP
      drawRoundedIsoSlab(1.35, 5.1, 0, 0.36, 1.35, 1.35, 0.26, originX, originY, scale, {
        top: "#919EAB",
        sideLeft: "#1D1D1D",
        sideRight: "#262626",
        rimStroke: "#1D1D1D",
        topHighlight: "#FFFFFF",
        shadow: true,
      });

      drawIsoBox(
        { x: 1.35, y: 5.1, z: 0.36 },
        { x: 0.78, y: 0.78, z: 0.14 },
        originX,
        originY,
        scale,
        {
          top: "#1D1D1D",
          left: "#121212",
          right: "#262626",
          stroke: "#F3F3F3",
          lineWidth: 1,
        }
      );

      const chipPulse = 0.75 + 0.25 * Math.sin(now * 0.007);
      drawIsoBox(
        { x: 1.35, y: 5.1, z: 0.5 },
        { x: 0.36 * chipPulse, y: 0.36 * chipPulse, z: 0.06 },
        originX,
        originY,
        scale,
        {
          top: "#F0FD63",
          left: "#DCE953",
          right: "#C7D544",
          stroke: "#1D1D1D",
          glow: "rgba(240, 253, 99, 0.75)",
        }
      );

      // MODULE 7: BOTTOM-RIGHT WORKSTATION PLATFORM
      drawRoundedIsoSlab(4.3, 3.6, 0, 0.42, 2.65, 2.55, 0.45, originX, originY, scale, {
        top: "#1D1D1D",
        sideLeft: "#121212",
        sideRight: "#262626",
        rimStroke: "#919EAB",
        topHighlight: "#919EAB",
        shadow: true,
      });

      drawIsoBox(
        { x: 3.75, y: 3.1, z: 0.42 },
        { x: 0.36, y: 0.36, z: 0.36 },
        originX,
        originY,
        scale,
        {
          top: "#919EAB",
          left: "#262626",
          right: "#1D1D1D",
          stroke: "#919EAB",
        }
      );

      drawIsoBox(
        { x: 3.75, y: 3.1, z: 0.76 },
        { x: 0.14, y: 1.35, z: 0.92 },
        originX,
        originY,
        scale,
        {
          top: "#262626",
          left: "#1D1D1D",
          right: "#121212",
          stroke: "#F0FD63",
          lineWidth: 1.15,
        }
      );

      for (let r = 0; r < 6; r++) {
        const mz = 0.9 + r * 0.12;
        const ma = project({ x: 3.83, y: 2.55, z: mz }, originX, originY, scale);
        const mb = project(
          { x: 3.83, y: 2.55 + (0.45 + ((r * 2 + Math.floor(now * 0.004)) % 4) * 0.15), z: mz },
          originX,
          originY,
          scale
        );
        ctx.beginPath();
        ctx.moveTo(ma.x, ma.y);
        ctx.lineTo(mb.x, mb.y);
        ctx.strokeStyle = r % 2 === 0 ? "#F0FD63" : "#FFFFFF";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      drawIsoBox(
        { x: 4.35, y: 3.25, z: 0.42 },
        { x: 0.42, y: 0.85, z: 0.07 },
        originX,
        originY,
        scale,
        {
          top: "#919EAB",
          left: "#262626",
          right: "#1D1D1D",
          stroke: "#F3F3F3",
        }
      );

      drawIsoRobot({ x: 4.85, y: 3.85, z: 1.04 }, "left", now, 3.7, originX, originY, scale);

      // CABLES WITH DATA PULSES
      cables.forEach((cable) => {
        drawCableWithPulse(cable, now, originX, originY, scale);
      });

      // 4 FLOATING ISOMETRIC HUD CARDS
      drawFloatingIsometricCard(
        { x: -3.2, y: -5.2, z: 2.1 },
        0.95,
        1.35,
        "right",
        "code",
        now,
        0.2,
        originX,
        originY,
        scale
      );

      drawFloatingIsometricCard(
        { x: -6.3, y: 0.6, z: 1.6 },
        0.85,
        1.25,
        "left",
        "verticalBars",
        now,
        1.8,
        originX,
        originY,
        scale
      );

      drawFloatingIsometricCard(
        { x: 4.5, y: -4.2, z: 2.3 },
        1.65,
        0.65,
        "left",
        "horizontalWave",
        now,
        3.1,
        originX,
        originY,
        scale
      );

      drawFloatingIsometricCard(
        { x: 5.7, y: 1.2, z: 1.85 },
        0.95,
        1.35,
        "right",
        "code",
        now,
        4.4,
        originX,
        originY,
        scale
      );

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handlePointerMove);
    };
  }, []);

  return (
    <div
      className="relative w-full h-full select-none pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default IsometricBackground;
