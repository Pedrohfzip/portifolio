"use client";
import { useRef, useEffect } from "react";

export default function MeshBackground() {
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

    const NUM_POINTS = 40;
    const points = Array.from({ length: NUM_POINTS }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25, // velocidade menor
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const mouse = { x: -1000, y: -1000 };

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Atualiza pontos
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        // Rebote nas bordas
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        // Interação com mouse
        const distMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distMouse < 120) {
          const angleAway = Math.atan2(p.y - mouse.y, p.x - mouse.x);
          p.vx += Math.cos(angleAway) * 0.07 * (1 - distMouse / 120); // interação mais suave
          p.vy += Math.sin(angleAway) * 0.07 * (1 - distMouse / 120);
        }
      }
      // Desenha conexões
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 120) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(40, 50, 60, ${0.2 + 0.5 * (1 - dist / 120)})`;
            ctx.lineWidth = 1.2;
            ctx.shadowColor = "#111311";
            ctx.shadowBlur = 2;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      // Desenha pontos
      for (const p of points) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#22272e";
        ctx.shadowColor = "#111311";
        ctx.shadowBlur = 4;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.restore();
      }
      requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener("resize", handleResize);

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

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute w-full h-full z-8"
      style={{ pointerEvents: "auto", cursor: "pointer" }}
    />
  );
}
