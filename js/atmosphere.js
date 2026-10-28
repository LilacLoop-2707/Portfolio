/**
 * =======================================================================
 * THE CAPTAIN'S DESK — ATMOSPHERE & LIGHTING SYSTEM
 * Subtle floating dust particles, gentle candlelight, and ocean caustics
 * =======================================================================
 */

class CaptainAtmosphere {
  constructor() {
    this.canvas = document.getElementById('atmosphere-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.candleSpot = document.querySelector('.candle-glow-spot');

    this.particles = [];
    this.maxParticles = 55;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.mouse = {
      x: this.width * 0.5,
      y: this.height * 0.4,
      targetX: this.width * 0.5,
      targetY: this.height * 0.4
    };

    this.time = 0;
    this.isRunning = true;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.onMouseMove(e));

    // Handle visibility changes for power efficiency
    document.addEventListener('visibilitychange', () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) this.render();
    });

    this.createParticles();
    this.render();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  onMouseMove(e) {
    this.mouse.targetX = e.clientX;
    this.mouse.targetY = e.clientY;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.45 - 0.15, // gently drifting upward like motes in warm air
        opacity: Math.random() * 0.5 + 0.2,
        baseOpacity: Math.random() * 0.4 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        seed: Math.random() * 100
      });
    }
  }

  render() {
    if (!this.isRunning) return;
    this.time += 0.02;

    // Smooth candlelight following cursor
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;

    if (this.candleSpot) {
      // Gentle flicker perturbation
      const flicker = Math.sin(this.time * 2.5) * 6 + Math.cos(this.time * 5.2) * 4;
      this.candleSpot.style.transform = `translate(${this.mouse.x + flicker}px, ${this.mouse.y + flicker}px)`;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw subtle ocean caustic light reflection
    this.drawCaustics();

    // 2. Draw floating candlelit dust motes
    this.drawParticles();

    requestAnimationFrame(() => this.render());
  }

  drawCaustics() {
    const ctx = this.ctx;
    const waveCount = 3;

    ctx.save();
    for (let i = 0; i < waveCount; i++) {
      const offset = (this.time * 0.4 + i * 2) % 10;
      const gradient = ctx.createRadialGradient(
        this.width * 0.5 + Math.sin(this.time * 0.3 + i) * 120,
        this.height * 0.45 + Math.cos(this.time * 0.2 + i) * 80,
        50,
        this.width * 0.5,
        this.height * 0.5,
        Math.max(this.width, this.height) * 0.75
      );

      gradient.addColorStop(0, 'rgba(24, 54, 58, 0.07)');
      gradient.addColorStop(0.5, 'rgba(113, 139, 131, 0.02)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, this.width, this.height);
    }
    ctx.restore();
  }

  drawParticles() {
    const ctx = this.ctx;

    for (let p of this.particles) {
      // Movement
      p.x += p.speedX + Math.sin(this.time + p.seed) * 0.2;
      p.y += p.speedY;

      // Wrap around edges
      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      // Distance to candlelight
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Light illumination: particles near candlelight shine warm antique gold
      const lightFactor = Math.max(0, 1 - dist / 380);
      const alpha = p.baseOpacity * (1 + lightFactor * 2.2);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 + lightFactor * 0.5), 0, Math.PI * 2);

      if (lightFactor > 0.2) {
        // Illuminated golden dust
        ctx.fillStyle = `rgba(229, 199, 136, ${Math.min(1, alpha)})`;
        ctx.shadowColor = 'rgba(229, 199, 136, 0.4)';
        ctx.shadowBlur = 4;
      } else {
        // Ambient soft ivory dust
        ctx.fillStyle = `rgba(244, 235, 221, ${Math.min(0.4, alpha * 0.5)})`;
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.captainAtmosphere = new CaptainAtmosphere();
});

