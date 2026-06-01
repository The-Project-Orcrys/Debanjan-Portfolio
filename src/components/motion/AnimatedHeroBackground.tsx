"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Blob = {
  cx: number;
  cy: number;
  radius: number;
  rgb: [number, number, number];
  phase: number;
  speed: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
  pulse: number;
};

const BLOBS: Blob[] = [
  { cx: 0.12, cy: 0.18, radius: 0.52, rgb: [26, 58, 255], phase: 0, speed: 1 },
  { cx: 0.82, cy: 0.15, radius: 0.45, rgb: [200, 184, 255], phase: 1.4, speed: 0.85 },
  { cx: 0.65, cy: 0.75, radius: 0.58, rgb: [90, 70, 220], phase: 2.1, speed: 1.1 },
  { cx: 0.9, cy: 0.55, radius: 0.4, rgb: [26, 58, 255], phase: 0.6, speed: 0.95 },
  { cx: 0.32, cy: 0.5, radius: 0.34, rgb: [140, 120, 255], phase: 3.2, speed: 1.05 },
  { cx: 0.5, cy: 0.35, radius: 0.28, rgb: [60, 100, 255], phase: 1.8, speed: 0.9 },
];

export function AnimatedHeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let frameId = 0;
    let visible = true;
    let time = 0;

    const mouse = { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      mouse.y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    };

    const onPointerLeave = () => {
      mouse.x = 0.5;
      mouse.y = 0.5;
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 768 ? 9000 : 7500;
      const target = Math.min(reducedMotion ? 40 : 160, Math.floor((width * height) / density));
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.2 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
        pulse: 0.5 + Math.random() * 1.5,
      }));
    };

    const drawBase = () => {
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, "#080818");
      g.addColorStop(0.45, "#0a0a12");
      g.addColorStop(1, "#06060a");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);
    };

    const drawAuroraBlobs = (t: number) => {
      mouse.sx += (mouse.x - mouse.sx) * 0.04;
      mouse.sy += (mouse.y - mouse.sy) * 0.04;
      const mx = (mouse.sx - 0.5) * width * 0.14;
      const my = (mouse.sy - 0.5) * height * 0.12;

      const centerGlow = ctx.createRadialGradient(
        width * 0.55,
        height * 0.4,
        0,
        width * 0.55,
        height * 0.4,
        width * 0.7,
      );
      centerGlow.addColorStop(0, "rgba(30, 28, 55, 0.5)");
      centerGlow.addColorStop(1, "rgba(10, 10, 10, 0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      const animT = reducedMotion ? 0 : t * 0.00032;

      for (const blob of BLOBS) {
        const ox =
          Math.sin(animT * blob.speed + blob.phase) * width * 0.08 +
          mx * (0.3 + blob.phase * 0.05);
        const oy =
          Math.cos(animT * 0.9 * blob.speed + blob.phase) * height * 0.07 +
          my * (0.3 + blob.phase * 0.05);
        const x = blob.cx * width + ox;
        const y = blob.cy * height + oy;
        const radius = blob.radius * Math.min(width, height);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        const [r, g, b] = blob.rgb;
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.5)`);
        grad.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, 0.18)`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const drawAuroraWaves = (t: number) => {
      if (reducedMotion) return;

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      const waves = [
        { y: 0.28, amp: 55, freq: 0.007, speed: 0.0011, alpha: 0.12, color: [26, 58, 255] },
        { y: 0.52, amp: 45, freq: 0.009, speed: 0.0009, alpha: 0.1, color: [200, 184, 255] },
        { y: 0.72, amp: 38, freq: 0.006, speed: 0.0013, alpha: 0.08, color: [100, 80, 220] },
      ];

      for (const wave of waves) {
        ctx.beginPath();
        for (let x = 0; x <= width + 10; x += 6) {
          const y =
            height * wave.y +
            Math.sin(x * wave.freq + t * wave.speed) * wave.amp +
            Math.sin(x * wave.freq * 0.4 + t * wave.speed * 1.3) * (wave.amp * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const [r, g, b] = wave.color;
        const fill = ctx.createLinearGradient(0, height * wave.y - wave.amp, 0, height);
        fill.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${wave.alpha})`);
        fill.addColorStop(1, "rgba(10, 10, 10, 0)");
        ctx.fillStyle = fill;
        ctx.fill();
      }

      ctx.restore();
    };

    const drawGrid = (t: number) => {
      const spacing = 52;
      const offsetX = reducedMotion ? 0 : (t * 0.022) % spacing;
      const offsetY = reducedMotion ? 0 : (t * 0.016) % spacing;
      const cx = width / 2;
      const cy = height / 2;

      ctx.save();
      for (let x = -spacing + offsetX; x < width + spacing; x += spacing) {
        const dist = Math.abs(x - cx) / cx;
        const alpha = 0.02 + (1 - Math.min(1, dist)) * 0.05;
        ctx.strokeStyle = `rgba(200, 184, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -spacing + offsetY; y < height + spacing; y += spacing) {
        const dist = Math.abs(y - cy) / cy;
        const alpha = 0.02 + (1 - Math.min(1, dist)) * 0.05;
        ctx.strokeStyle = `rgba(200, 184, 255, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawParticles = (t: number) => {
      const linkDistance = width < 768 ? 110 : 150;
      const animT = t * 0.002;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          const dx = p.x - mouse.sx * width;
          const dy = p.y - mouse.sy * height;
          const dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 0) {
            p.vx += (dx / dist) * 0.02;
            p.vy += (dy / dist) * 0.02;
          }
          p.vx *= 0.99;
          p.vy *= 0.99;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x <= 0 || p.x >= width) p.vx *= -1;
          if (p.y <= 0 || p.y >= height) p.vy *= -1;
        }

        const twinkle =
          0.35 +
          0.65 *
            (0.5 +
              0.5 * Math.sin(animT * p.pulse + p.phase));
        const alpha = p.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 210, 255, ${alpha})`;
        ctx.fill();

        if (reducedMotion) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x;
          const ddy = p.y - q.y;
          const dist = Math.hypot(ddx, ddy);
          if (dist < linkDistance) {
            const lineAlpha = (1 - dist / linkDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(26, 58, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const markReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      requestAnimationFrame(() => setReady(true));
    };

    const render = (now: number) => {
      time = now;
      drawBase();
      drawAuroraBlobs(now);
      drawAuroraWaves(now);
      drawGrid(now);
      drawParticles(now);
      markReady();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    intersection.observe(container);

    if (!reducedMotion) {
      container.addEventListener("pointermove", onPointerMove, { passive: true });
      container.addEventListener("pointerleave", onPointerLeave);
    }

    if (reducedMotion) {
      render(0);
      setReady(true);
      return () => {
        resizeObserver.disconnect();
        intersection.disconnect();
      };
    }

    const loop = (now: number) => {
      if (visible) render(now);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersection.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "hero-animated-bg pointer-events-none absolute inset-0",
        ready && "hero-animated-bg--ready",
      )}
      aria-hidden
    >
      <div className="hero-bg-skeleton" />
      <div className="hero-bg-mesh" />

      <canvas
        ref={canvasRef}
        className={cn(
          "hero-bg-canvas absolute inset-0 h-full w-full",
          ready && "hero-bg-canvas--ready",
        )}
      />

      <div className="hero-bg-beams hero-bg-layer" />
      <div className="hero-bg-orb hero-bg-orb--1 hero-bg-layer" />
      <div className="hero-bg-orb hero-bg-orb--2 hero-bg-layer" />
      <div className="hero-bg-orb hero-bg-orb--3 hero-bg-layer" />
      <div className="hero-bg-orb hero-bg-orb--4 hero-bg-layer" />
      <div className="hero-bg-noise hero-bg-layer" />
      <div className="hero-bg-vignette" />

      {!ready && (
        <div className="hero-bg-loader" aria-hidden>
          <span className="hero-bg-loader__pulse" />
        </div>
      )}
    </div>
  );
}
