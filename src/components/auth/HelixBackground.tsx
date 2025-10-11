import { useEffect, useRef } from 'react';

export function HelixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Helix parameters - more visible configuration
    let rotation = 0;
    const radius = 200;
    const turns = 5;
    const pointsPerTurn = 25;
    const totalPoints = turns * pointsPerTurn;

    // Animation
    let animationFrame: number;

    const animate = () => {
      // Semi-transparent clear for trail effect
      ctx.fillStyle = 'rgba(11, 15, 25, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      rotation += 0.008;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const heightSpan = Math.min(canvas.height * 0.8, 800);

      // Draw helix with depth sorting
      const points: Array<{x: number, y: number, z: number, i: number}> = [];
      
      for (let i = 0; i < totalPoints; i++) {
        const progress = i / totalPoints;
        const angle = (i / pointsPerTurn) * Math.PI * 2 + rotation;
        const y = centerY - heightSpan / 2 + progress * heightSpan;
        const x = centerX + Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        points.push({ x, y, z, i });
      }

      // Sort by z-index for depth
      points.sort((a, b) => a.z - b.z);

      // Draw connections first (back to front)
      for (let idx = 0; idx < points.length - 1; idx++) {
        const point = points[idx];
        const nextPoint = points[idx + 1];
        
        if (Math.abs(point.i - nextPoint.i) === 1) {
          const scale = (point.z + radius) / (radius * 2);
          const opacity = 0.2 + scale * 0.3;
          
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.strokeStyle = `rgba(255, 106, 19, ${opacity})`;
          ctx.lineWidth = 1 + scale;
          ctx.stroke();
        }
      }

      // Draw points (back to front)
      points.forEach(point => {
        const scale = (point.z + radius) / (radius * 2);
        const size = 4 + scale * 6;
        const opacity = 0.4 + scale * 0.6;
        
        // Alternate colors
        const isAccent = point.i % 6 === 0;
        const color = isAccent 
          ? `rgba(30, 201, 232, ${opacity})` // accent cyan
          : `rgba(255, 106, 19, ${opacity})`; // primary orange
        
        // Outer glow
        const glowGradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size * 4);
        glowGradient.addColorStop(0, color);
        glowGradient.addColorStop(0.5, isAccent ? 'rgba(30, 201, 232, 0)' : 'rgba(255, 106, 19, 0)');
        glowGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Core point
        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Bright center
        ctx.beginPath();
        ctx.arc(point.x, point.y, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = isAccent ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    // Initial clear
    ctx.fillStyle = 'rgb(11, 15, 25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
