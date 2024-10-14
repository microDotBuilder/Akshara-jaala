import React, { useEffect, useRef } from "react";

const GeometryAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window === "undefined") return;

    let animationFrameId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Particle properties
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }[] = [];

    // Monochrome color for particles and lines
    const particleColor = "rgba(150, 150, 150, 0.5)"; // Darker gray with lower opacity

    // Reduced number of particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5, // Smaller particles
        speedX: (Math.random() - 0.5) * 0.5, // Slower speed
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    // Function to draw a particle
    const drawParticle = (particle: (typeof particles)[0]) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    };

    // Function to draw a line between two particles
    const drawLine = (
      particle1: (typeof particles)[0],
      particle2: (typeof particles)[0]
    ) => {
      ctx.beginPath();
      ctx.moveTo(particle1.x, particle1.y);
      ctx.lineTo(particle2.x, particle2.y);
      ctx.strokeStyle = particleColor;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    // Animation loop
    const animate = () => {
      // Fill the canvas with a black background
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce particles off the edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        drawParticle(particle);

        // Draw lines between close particles
        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            drawLine(particle, otherParticle);
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 "
    />
  );
};

export default GeometryAnimation;
