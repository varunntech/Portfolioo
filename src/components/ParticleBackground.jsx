import { useEffect, useRef } from 'react';

/**
 * ParticleBackground - Animated canvas particle system
 * Creates a subtle, techy particle effect for the hero section
 */

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${this.opacity})`; // cyan-500 color
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = Math.min(90, Math.floor((width * height) / 13000)); // Denser particles for a richer web
    particlesRef.current = Array.from({ length: particleCount }, () => new Particle());

    // Mouse coordinates tracker for spider web pull effect
    let mouse = { x: null, y: null, radius: 180 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      // Account for canvas scaling (DPR)
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Draw connections between nearby particles and the mouse
    const drawConnections = () => {
      const maxDistance = 135; // Increased connection range
      const maxConnections = 4; // Denser web lines

      for (let i = 0; i < particlesRef.current.length; i++) {
        let connections = 0;

        // Connect particles to mouse to form the interactive spider web
        if (mouse.x !== null && mouse.y !== null) {
          const dx = particlesRef.current[i].x - mouse.x;
          const dy = particlesRef.current[i].y - mouse.y;
          const distanceToMouse = Math.sqrt(dx * dx + dy * dy);

          if (distanceToMouse < mouse.radius) {
            const opacity = (1 - distanceToMouse / mouse.radius) * 0.35; // Brighter lines near the mouse
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          if (connections >= maxConnections) break;

          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.18; // Slightly more visible lines
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
            connections++;
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Reinitialize particles for new size
      const newCount = Math.min(90, Math.floor((width * height) / 13000));
      particlesRef.current = Array.from({ length: newCount }, () => new Particle());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground;
