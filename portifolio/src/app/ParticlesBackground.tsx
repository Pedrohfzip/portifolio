"use client";
import { useRef, useEffect } from "react";

export default function ParticlesBackground() {
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

    // Cada "cobra" é uma trilha de pontos
    const NUM_SNAKES = 7;
    const SNAKE_LENGTH = 40;
    // Cada cobra tem um tempo de "nascimento" e opacidade inicial
    // Função para gerar ponto próximo da borda
    function randomEdgePoint() {
      const edge = Math.floor(Math.random() * 4);
      const margin = 60;
      switch (edge) {
        case 0: // topo
          return { x: Math.random() * width, y: Math.random() * margin };
        case 1: // base
          return { x: Math.random() * width, y: height - Math.random() * margin };
        case 2: // esquerda
          return { x: Math.random() * margin, y: Math.random() * height };
        case 3: // direita
          return { x: width - Math.random() * margin, y: Math.random() * height };
        default:
          return { x: Math.random() * width, y: Math.random() * height };
      }
    }

    const snakes = Array.from({ length: NUM_SNAKES }, (_, i) => {
      const start = randomEdgePoint();
      return {
        points: Array.from({ length: SNAKE_LENGTH }, () => ({ x: start.x, y: start.y })),
        angle: Math.random() * Math.PI * 2,
        speed: 1.2 + Math.random() * 0.7,
        color: `hsl(${Math.random() * 360}, 80%, 60%)`,
        bornAt: performance.now() + i * 900, // cada cobra nasce com delay
        opacity: 0,
      };
    });

    const mouse = { x: -1000, y: -1000 };

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();
      snakes.forEach(snake => {
        // Fade-in gradual
        if (now >= snake.bornAt && snake.opacity < 1) {
          snake.opacity += 0.03;
          if (snake.opacity > 1) snake.opacity = 1;
        }
        if (now < snake.bornAt) return; // ainda não nasceu

        // Interação com mouse: afasta a cabeça se estiver próxima
        const head = snake.points[0];
        const distMouse = Math.hypot(head.x - mouse.x, head.y - mouse.y);
        if (distMouse < 120) {
          const angleAway = Math.atan2(head.y - mouse.y, head.x - mouse.x);
          // Aplica força para afastar
          head.x += Math.cos(angleAway) * 8 * (1 - distMouse / 120);
          head.y += Math.sin(angleAway) * 8 * (1 - distMouse / 120);
        }

        // Move cabeça normalmente
        snake.angle += (Math.random() - 0.5) * 0.2; // movimento suave
        head.x += Math.cos(snake.angle) * snake.speed;
        head.y += Math.sin(snake.angle) * snake.speed;
        // Se sair da tela, teletransporta todos os segmentos para a nova posição
        let teleported = false;
        if (head.x < 0) { head.x = width; teleported = true; }
        if (head.x > width) { head.x = 0; teleported = true; }
        if (head.y < 0) { head.y = height; teleported = true; }
        if (head.y > height) { head.y = 0; teleported = true; }
        if (teleported) {
          for (let i = 0; i < snake.points.length; i++) {
            snake.points[i].x = head.x;
            snake.points[i].y = head.y;
          }
        }
        // Move corpo: cada ponto segue o anterior
        for (let i = snake.points.length - 1; i > 0; i--) {
          snake.points[i].x += (snake.points[i-1].x - snake.points[i].x) * 0.7;
          snake.points[i].y += (snake.points[i-1].y - snake.points[i].y) * 0.7;
        }
        // Desenha trilha com fade-out nas bordas e fade-in global
        ctx.save();
        for (let i = 1; i < snake.points.length; i++) {
          const p0 = snake.points[i - 1];
          const p1 = snake.points[i];
          // Calcula opacidade baseada na proximidade da borda
          const margin = 60;
          let alpha = 0.6 * snake.opacity;
          if (
            p1.x < margin || p1.x > width - margin ||
            p1.y < margin || p1.y > height - margin
          ) {
            // Quanto mais perto da borda, menor a opacidade
            const dx = Math.min(p1.x, width - p1.x, margin);
            const dy = Math.min(p1.y, height - p1.y, margin);
            const dist = Math.min(dx, dy);
            alpha = Math.max(0, dist / margin) * 0.6 * snake.opacity;
          }
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = snake.color;
          ctx.lineWidth = 6;
          ctx.globalAlpha = alpha;
          ctx.shadowColor = snake.color;
          ctx.shadowBlur = 16;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      });
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
    canvas.addEventListener("mousemove", handleMouseMove);

    function handleMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }
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
      className="absolute top-0 left-0 w-full h-full z-10"
      style={{ pointerEvents: "auto", cursor: "pointer" }}
    />
  );
}
