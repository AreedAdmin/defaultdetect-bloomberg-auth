import { useEffect, useRef } from 'react';

export function SubtleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Dots
    const dots: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = [];
    for (let i = 0; i < 30; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1
      });
    }

    // Grid lines
    const gridLines: Array<{ opacity: number; fadeDirection: number }> = [];
    const gridSpacing = 50;
    for (let i = 0; i < Math.ceil(canvas.width / gridSpacing); i++) {
      gridLines.push({ opacity: Math.random() * 0.1, fadeDirection: Math.random() > 0.5 ? 1 : -1 });
    }

    let animationFrame: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      gridLines.forEach((line, i) => {
        line.opacity += line.fadeDirection * 0.001;
        if (line.opacity >= 0.15 || line.opacity <= 0.02) {
          line.fadeDirection *= -1;
        }
        
        ctx.strokeStyle = `rgba(6, 182, 212, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(i * gridSpacing, 0);
        ctx.lineTo(i * gridSpacing, canvas.height);
        ctx.stroke();
      });

      // Draw horizontal grid lines
      for (let i = 0; i < Math.ceil(canvas.height / gridSpacing); i++) {
        const opacity = 0.05 + Math.sin(Date.now() * 0.0005 + i) * 0.05;
        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, i * gridSpacing);
        ctx.lineTo(canvas.width, i * gridSpacing);
        ctx.stroke();
      }

      // Update and draw dots
      dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

        // Draw dot
        const gradient = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 4);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.2)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: '#0a0a0a' }}
    />
  );
}
