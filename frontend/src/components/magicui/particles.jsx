import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
}

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const v = parseInt(hex, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function circleParams(canvasW, canvasH, size) {
  return {
    x: Math.floor(Math.random() * canvasW),
    y: Math.floor(Math.random() * canvasH),
    translateX: 0,
    translateY: 0,
    size: Math.floor(Math.random() * 2) + size,
    alpha: 0,
    targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    magnetism: 0.1 + Math.random() * 4,
  };
}

function remapValue(value, start1, end1, start2, end2) {
  const r = ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
  return r > 0 ? r : 0;
}

export function Particles({
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const ctxRef = useRef(null);
  const circlesRef = useRef([]);
  const mousePosition = useMousePosition();
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafRef = useRef(null);
  const resizeTimer = useRef(null);
  const initRef = useRef(() => {});
  const mouseMoveRef = useRef(() => {});
  const animateRef = useRef(() => {});

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext("2d");
    }
    initRef.current();
    animateRef.current();

    const onResize = () => {
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => initRef.current(), 200);
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      window.removeEventListener("resize", onResize);
    };
  }, [color]);

  useEffect(() => {
    mouseMoveRef.current();
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    initRef.current();
  }, [refresh]);

  const init = () => {
    resize();
    draw();
  };

  const onMouseMove = () => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const { w, h } = canvasSize.current;
    const x = mousePosition.x - rect.left - w / 2;
    const y = mousePosition.y - rect.top - h / 2;
    if (x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2) {
      mouseRef.current = { x, y };
    }
  };

  const resize = () => {
    if (!containerRef.current || !canvasRef.current || !ctxRef.current) return;
    const w = containerRef.current.offsetWidth;
    const h = containerRef.current.offsetHeight;
    canvasSize.current = { w, h };
    canvasRef.current.width = w * dpr;
    canvasRef.current.height = h * dpr;
    canvasRef.current.style.width = `${w}px`;
    canvasRef.current.style.height = `${h}px`;
    ctxRef.current.scale(dpr, dpr);
    circlesRef.current = [];
    for (let i = 0; i < quantity; i++) {
      const c = circleParams(w, h, size);
      drawCircle(c);
    }
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle, update = false) => {
    if (!ctxRef.current) return;
    const { x, y, translateX, translateY, size: s, alpha } = circle;
    ctxRef.current.translate(translateX, translateY);
    ctxRef.current.beginPath();
    ctxRef.current.arc(x, y, s, 0, 2 * Math.PI);
    ctxRef.current.fillStyle = `rgba(${rgb.join(",")}, ${alpha})`;
    ctxRef.current.fill();
    ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!update) circlesRef.current.push(circle);
  };

  const clear = () => {
    if (ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    }
  };

  const draw = () => {
    clear();
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams(canvasSize.current.w, canvasSize.current.h, size));
    }
  };

  const animate = () => {
    clear();
    const { w, h } = canvasSize.current;
    circlesRef.current.forEach((circle, i) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        h - circle.y - circle.translateY - circle.size,
      ];
      const closest = edge.reduce((a, b) => Math.min(a, b));
      const remapped = parseFloat(remapValue(closest, 0, 20, 0, 1).toFixed(2));
      if (remapped > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapped;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouseRef.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouseRef.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
      drawCircle(circle, true);
      if (
        circle.x < -circle.size || circle.x > w + circle.size ||
        circle.y < -circle.size || circle.y > h + circle.size
      ) {
        circlesRef.current.splice(i, 1);
        drawCircle(circleParams(w, h, size));
      }
    });
    rafRef.current = window.requestAnimationFrame(animateRef.current);
  };

  initRef.current = init;
  mouseMoveRef.current = onMouseMove;
  animateRef.current = animate;

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={containerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
}
