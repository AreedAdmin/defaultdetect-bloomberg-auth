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

    // Helix parameters
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    const turns = 4;
    const pointsPerTurn = 30;
    const totalPoints = turns * pointsPerTurn;
    const verticalSpacing = canvas.height / totalPoints;

    // Animation
    let animationFrame: number;
    let rotation = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      rotation += 0.005;

      // Draw helix
      for (let i = 0; i < totalPoints; i++) {
        const angle = (i / pointsPerTurn) * Math.PI * 2 + rotation;
        const y = i * verticalSpacing - canvas.height * 0.2;
        const x = centerX + Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        // Calculate size based on depth (z-axis)
        const scale = (z + radius) / (radius * 2);
        const size = 3 + scale * 4;
        const opacity = 0.3 + scale * 0.7;
        
        // Alternate colors
        const isAccent = i % 5 === 0;
        const color = isAccent 
          ? `rgba(30, 201, 232, ${opacity})` // accent cyan
          : `rgba(255, 106, 19, ${opacity})`; // primary orange
        
        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Draw glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Connect adjacent points
        if (i > 0) {
          const prevAngle = ((i - 1) / pointsPerTurn) * Math.PI * 2 + rotation;
          const prevY = (i - 1) * verticalSpacing - canvas.height * 0.2;
          const prevX = centerX + Math.cos(prevAngle) * radius;
          
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(255, 106, 19, ${opacity * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

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
      style={{ background: 'transparent' }}
    />
  );
}
