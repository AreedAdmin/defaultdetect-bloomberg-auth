import { useEffect, useRef, useState } from 'react';

const stockSymbols = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'JPM', 'BAC', 'GS'];
const currencies = ['$', '€', '£', '¥', '₿'];

interface Ticker {
  symbol: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
}

interface DataPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: Array<{ x: number; y: number }>;
}

interface CandlestickBar {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  isGreen: boolean;
}

export function FinancialBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const tickersRef = useRef<Ticker[]>([]);
  const dataPointsRef = useRef<DataPoint[]>([]);
  const numberStreamsRef = useRef<Array<{ x: number; y: number; speed: number; numbers: string[] }>>([]);
  const candlesticksRef = useRef<CandlestickBar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeElements();
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize elements
    const initializeElements = () => {
      // Stock tickers
      tickersRef.current = stockSymbols.map((symbol, i) => ({
        symbol,
        x: Math.random() * canvas.width,
        y: 50 + i * 80,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.08 + Math.random() * 0.07,
      }));

      // Data points
      dataPointsRef.current = Array.from({ length: 15 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        trail: [],
      }));

      // Number streams
      numberStreamsRef.current = Array.from({ length: 12 }, () => ({
        x: Math.random() * canvas.width,
        y: -Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1,
        numbers: Array.from({ length: 8 }, () => 
          Math.random() > 0.5 
            ? `${(Math.random() * 100).toFixed(2)}`
            : currencies[Math.floor(Math.random() * currencies.length)] + (Math.random() * 1000).toFixed(0)
        ),
      }));

      // Candlestick data
      candlesticksRef.current = Array.from({ length: 40 }, (_, i) => {
        const basePrice = 100 + Math.random() * 50;
        const open = basePrice + (Math.random() - 0.5) * 10;
        const close = basePrice + (Math.random() - 0.5) * 10;
        return {
          x: i * 30,
          open,
          close,
          high: Math.max(open, close) + Math.random() * 5,
          low: Math.min(open, close) - Math.random() * 5,
          isGreen: close > open,
        };
      });
    };

    initializeElements();

    let animationFrame: number;
    let waveOffset = 0;

    const animate = () => {
      // Clear with deep black
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw candlestick charts (blurred background)
      ctx.save();
      ctx.filter = 'blur(8px)';
      const candleStartY = canvas.height * 0.6;
      const candleScale = 2;
      
      candlesticksRef.current.forEach((candle) => {
        const x = candle.x + waveOffset * 0.1;
        const bodyTop = candleStartY - candle.close * candleScale;
        const bodyBottom = candleStartY - candle.open * candleScale;
        const wickTop = candleStartY - candle.high * candleScale;
        const wickBottom = candleStartY - candle.low * candleScale;
        
        ctx.strokeStyle = candle.isGreen ? 'rgba(6, 182, 212, 0.1)' : 'rgba(59, 130, 246, 0.08)';
        ctx.fillStyle = candle.isGreen ? 'rgba(6, 182, 212, 0.08)' : 'rgba(59, 130, 246, 0.06)';
        
        // Wick
        ctx.beginPath();
        ctx.moveTo(x, wickTop);
        ctx.lineTo(x, wickBottom);
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // Body
        ctx.fillRect(x - 5, Math.min(bodyTop, bodyBottom), 10, Math.abs(bodyTop - bodyBottom));
      });
      ctx.restore();

      // Draw wave patterns
      waveOffset += 0.5;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.06)';
      ctx.lineWidth = 2;
      
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        const waveY = canvas.height * 0.3 + wave * 100;
        const waveSpeed = 0.002 + wave * 0.001;
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = waveY + Math.sin((x + waveOffset) * waveSpeed) * 30;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw and update stock tickers with parallax
      tickersRef.current.forEach((ticker, i) => {
        const parallaxFactor = 1 + i * 0.05;
        const mouseInfluence = (mousePos.x / canvas.width - 0.5) * 20 * parallaxFactor;
        
        ticker.x += ticker.speed + mouseInfluence * 0.01;
        if (ticker.x > canvas.width + 100) {
          ticker.x = -100;
        }

        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = `rgba(6, 182, 212, ${ticker.opacity})`;
        ctx.fillText(ticker.symbol, ticker.x, ticker.y);
        
        // Price change
        const change = (Math.random() - 0.5) * 5;
        const changeColor = change > 0 ? 'rgba(16, 185, 129, ' : 'rgba(59, 130, 246, ';
        ctx.font = '11px monospace';
        ctx.fillStyle = changeColor + ticker.opacity + ')';
        ctx.fillText(`${change > 0 ? '+' : ''}${change.toFixed(2)}%`, ticker.x + 60, ticker.y);
      });

      // Draw and update data points with trails
      dataPointsRef.current.forEach((point) => {
        // Mouse interaction - repel points
        const dx = point.x - mousePos.x;
        const dy = point.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          const force = (200 - dist) / 200;
          point.vx += (dx / dist) * force * 0.5;
          point.vy += (dy / dist) * force * 0.5;
        }

        // Update position
        point.x += point.vx;
        point.y += point.vy;
        
        // Damping
        point.vx *= 0.98;
        point.vy *= 0.98;
        
        // Bounds
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));

        // Update trail
        point.trail.push({ x: point.x, y: point.y });
        if (point.trail.length > 20) {
          point.trail.shift();
        }

        // Draw trail
        point.trail.forEach((pos, i) => {
          const alpha = (i / point.trail.length) * 0.1;
          ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw point
        ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 10);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw number streams (matrix-style)
      numberStreamsRef.current.forEach((stream) => {
        stream.y += stream.speed;
        
        if (stream.y > canvas.height + 200) {
          stream.y = -200;
          stream.x = Math.random() * canvas.width;
        }

        ctx.font = '12px monospace';
        stream.numbers.forEach((num, i) => {
          const y = stream.y + i * 25;
          const alpha = Math.max(0, 0.12 - i * 0.015);
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.fillText(num, stream.x, y);
        });
      });

      // Draw connecting lines between nearby data points
      dataPointsRef.current.forEach((point, i) => {
        dataPointsRef.current.slice(i + 1).forEach((otherPoint) => {
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.08;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [mousePos.x, mousePos.y]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
