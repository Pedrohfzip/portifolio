"use client";
import { useRef, useEffect } from "react";

export default function ParticlesBackgroundAlt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const now = performance.now();
    const NUM_PARTICLES = 25;
    const particles = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 7 + Math.random() * 8,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`,
      speed: 0.7 + Math.random() * 1.2,
      angle: Math.random() * Math.PI * 2,
      opacity: 0, // começa invisível
      bornAt: now + i * 500, // cada bolinha nasce com delay
      targetOpacity: 0.5 + Math.random() * 0.5,
    }));

    // Mouse state
    const mouse = { x: -1000, y: -1000 };

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();
      particles.forEach(p => {
        // Fade-in gradual
        if (now >= p.bornAt && p.opacity < p.targetOpacity) {
          p.opacity += 0.03;
          if (p.opacity > p.targetOpacity) p.opacity = p.targetOpacity;
        }
        if (now < p.bornAt) return; // ainda não nasceu

        // Interação com mouse: afasta se estiver próxima
        const distMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distMouse < 100) {
          const angleAway = Math.atan2(p.y - mouse.y, p.x - mouse.x);
          p.x += Math.cos(angleAway) * 6 * (1 - distMouse / 100);
          p.y += Math.sin(angleAway) * 6 * (1 - distMouse / 100);
        }

        // Movimento aleatório
        p.angle += (Math.random() - 0.5) * 0.1;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        // Rebote nas bordas
        if (p.x < p.r) { p.x = p.r; p.angle = Math.PI - p.angle; }
        if (p.x > width - p.r) { p.x = width - p.r; p.angle = Math.PI - p.angle; }
        if (p.y < p.r) { p.y = p.r; p.angle = -p.angle; }
        if (p.y > height - p.r) { p.y = height - p.r; p.angle = -p.angle; }
        // Desenha bolinha
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(animate);
    }

    animate();

    // Mouse listeners
  function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-10"
      style={{ pointerEvents: "auto", cursor: "pointer" }}
    />
  );
}
