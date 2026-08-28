import { useEffect, useRef } from 'react';

/**
 * High-performance 3D Point-Cloud Voxel Particle Matrix Canvas.
 * Renders an interactive, rotating 3D security voxel lattice (inspired by Axiom Zero reference).
 */
export function ParticleMatrix({ theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 380);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 380;
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D voxel grid points for two interconnected cubes/shields
    const points = [];
    const size = 110;
    const density = 6;

    // Cube 1
    for (let x = -size; x <= size; x += size / density) {
      for (let y = -size; y <= size; y += size / density) {
        for (let z = -size; z <= size; z += size / density) {
          // Keep mostly surface points for a hollow voxel structure
          const isSurface =
            Math.abs(x) >= size * 0.75 || Math.abs(y) >= size * 0.75 || Math.abs(z) >= size * 0.75;
          if (isSurface && Math.random() > 0.3) {
            points.push({ x: x - 40, y: y - 40, z: z, baseZ: z, group: 1 });
          }
        }
      }
    }

    // Cube 2 (connected offset)
    for (let x = -size * 0.8; x <= size * 0.8; x += (size * 0.8) / 5) {
      for (let y = -size * 0.8; y <= size * 0.8; y += (size * 0.8) / 5) {
        for (let z = -size * 0.8; z <= size * 0.8; z += (size * 0.8) / 5) {
          const isSurface =
            Math.abs(x) >= size * 0.6 || Math.abs(y) >= size * 0.6 || Math.abs(z) >= size * 0.6;
          if (isSurface && Math.random() > 0.35) {
            points.push({ x: x + 60, y: y + 60, z: z + 30, baseZ: z + 30, group: 2 });
          }
        }
      }
    }

    let angleX = 0.5;
    let angleY = 0.6;
    let targetAngleX = 0.5;
    let targetAngleY = 0.6;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;
      targetAngleY = mouseX * 2;
      targetAngleX = mouseY * 2;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleX += (targetAngleX - angleX) * 0.05 + 0.003;
      angleY += (targetAngleY - angleY) * 0.05 + 0.005;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const fov = 400;
      const cx = width / 2;
      const cy = height / 2;

      // Color scheme based on dark vs light mode
      const isDark = theme === 'dark' || document.documentElement.getAttribute('data-theme') === 'dark';
      const color1 = isDark ? '#b8ff2c' : '#2563eb'; // Citron lime for dark, Royal Blue for light
      const color2 = isDark ? '#6ee7b7' : '#0284c7';

      // Sort points by depth
      const projected = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Rotate Y
        let x1 = p.x * cosY + p.z * sinY;
        let z1 = -p.x * sinY + p.z * cosY;

        // Rotate X
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX + 340;

        if (z2 > 10) {
          const scale = fov / z2;
          const x2d = cx + x1 * scale;
          const y2d = cy + y1 * scale;
          const alpha = Math.max(0.1, Math.min(1, (z2 - 100) / 350));
          const dotSize = Math.max(1, 2.4 * scale);

          projected.push({
            x: x2d,
            y: y2d,
            z: z2,
            size: dotSize,
            alpha: alpha,
            group: p.group,
          });
        }
      }

      projected.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        ctx.fillStyle = pt.group === 1 ? color1 : color2;
        ctx.globalAlpha = pt.alpha;
        ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-surface-1/40">
      {/* Background blueprint grid lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />
      
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="relative z-10 h-full w-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
