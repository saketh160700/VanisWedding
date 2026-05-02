/* ── Custom Cursor ── */
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'; }, 80);
    });

    /* ── Loader ── */
    window.addEventListener('load', () => {
      setTimeout(() => document.getElementById('loader').classList.add('hide'), 2000);
    });

    /* ── Nav Scroll ── */
    window.addEventListener('scroll', () => {
      document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 80);
    });

    /* ── Countdown ── */
    const weddingDate = new Date('2026-05-09T08:15:00');
    function updateCountdown() {
      const diff = weddingDate - new Date();
      if (diff <= 0) {
        document.getElementById('cd-days').textContent = '00';
        document.getElementById('cd-hours').textContent = '00';
        document.getElementById('cd-mins').textContent = '00';
        document.getElementById('cd-secs').textContent = '00';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
      document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
      document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
      document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
    }
    updateCountdown(); setInterval(updateCountdown, 1000);

    /* ── Rose Petals Canvas ── */
    (function () {
      const canvas = document.getElementById('petals-canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
      const petals = [];
      const petalColors = ['#FF9933', '#E65100', '#FFCC00', '#D50000', '#FF3D00', '#FDF1B8'];
      class Petal {
        constructor() { this.reset(); this.y = Math.random() * window.innerHeight; }
        reset() {
          this.x = Math.random() * window.innerWidth;
          this.y = -20;
          this.size = Math.random() * 8 + 5;
          this.speed = Math.random() * 1.5 + .5;
          this.angle = Math.random() * Math.PI * 2;
          this.rotSpeed = (Math.random() - .5) * .05;
          this.drift = (Math.random() - .5) * .8;
          this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
          this.opacity = Math.random() * .6 + .3;
        }
        update() {
          this.y += this.speed;
          this.x += this.drift;
          this.angle += this.rotSpeed;
          if (this.y > window.innerHeight + 30) this.reset();
        }
        draw() {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          ctx.globalAlpha = this.opacity;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size, this.size * .55, 0, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.restore();
        }
      }
      for (let i = 0; i < 55; i++) petals.push(new Petal());
      function animatePetals() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animatePetals);
      }
      animatePetals();
    })();

    /* ── Sparkle Canvas ── */
    (function () {
      const canvas = document.getElementById('sparkle-canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
      const sparks = [];
      class Spark {
        constructor() { this.reset(); }
        reset() {
          this.x = Math.random() * window.innerWidth;
          this.y = Math.random() * window.innerHeight;
          this.size = Math.random() * 2.5 + .5;
          this.opacity = 0;
          this.maxOp = Math.random() * .8 + .2;
          this.phase = Math.random() * Math.PI * 2;
          this.speed = Math.random() * .02 + .01;
        }
        update() {
          this.phase += this.speed;
          this.opacity = Math.max(0, Math.sin(this.phase) * this.maxOp);
          if (this.phase > Math.PI * 2) this.reset();
        }
        draw() {
          ctx.save();
          ctx.globalAlpha = this.opacity;
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#F0C060';
          ctx.fillStyle = '#FAE08A';
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      for (let i = 0; i < 120; i++) sparks.push(new Spark());
      function animateSparks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        sparks.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animateSparks);
      }
      animateSparks();
    })();

    /* ── Diya Floaters ── */
    function spawnDiya() {
      const d = document.createElement('div');
      d.className = 'diya-float';
      d.textContent = ['🪔', '✨', '🌸', '🌼', '💫'][Math.floor(Math.random() * 5)];
      d.style.left = Math.random() * 100 + 'vw';
      d.style.animationDuration = (Math.random() * 8 + 6) + 's';
      d.style.animationDelay = '0s';
      document.body.appendChild(d);
      setTimeout(() => d.remove(), 14000);
    }
    setInterval(spawnDiya, 2500);

    /* ── Scroll Reveal ── */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .couple-card, .event-card, .g-item, .timeline-item');
    const revealObs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          const delay = e.target.dataset.delay ? parseInt(e.target.dataset.delay) : 0;
          setTimeout(() => e.target.classList.add('visible'), delay);
        }
      });
    }, { threshold: .12 });
    revealEls.forEach(el => revealObs.observe(el));

    /* ── Lightbox ── */
    document.querySelectorAll('.g-item img').forEach(img => {
      img.addEventListener('click', () => {
        document.getElementById('lb-img').src = img.src;
        document.getElementById('lightbox').classList.add('open');
      });
    });
    document.getElementById('lb-close').addEventListener('click', () => {
      document.getElementById('lightbox').classList.remove('open');
    });


    /* ── Blessings ── */
    async function submitBlessing() {
      const name = document.getElementById('b-name').value.trim();
      const msg = document.getElementById('b-msg').value.trim();
      if (!name || !msg) { alert('Please enter both your name and blessing!'); return; }
      
      const btn = document.getElementById('btn-bless');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      try {
        const response = await fetch('/api/blessings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, message: msg }),
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        btn.style.display = 'none';
        document.getElementById('b-name').parentElement.style.display = 'none';
        document.getElementById('b-msg').parentElement.style.display = 'none';
        document.querySelector('.guest-blessing-box h3').style.display = 'none';
        
        document.getElementById('blessing-success').style.display = 'block';
      } catch (error) {
        console.error('Error saving blessing:', error);
        alert('Failed to send blessing. Please try again.');
        btn.textContent = '✨ Send Blessings';
        btn.disabled = false;
      }
    }

    /* ── Music Toggle ── */
    function toggleMusic() {
      const btn = document.getElementById('music-btn');
      const audio = document.getElementById('bg-music');
      
      if (audio.paused) {
        audio.play().then(() => {
          btn.textContent = '🔊';
          btn.classList.add('playing');
        }).catch(err => console.log("Audio play failed:", err));
      } else {
        audio.pause();
        btn.textContent = '🎵';
        btn.classList.remove('playing');
      }
    }
    
    // Attempt to auto-play on first interaction
    document.body.addEventListener('click', function initAudio() {
      const audio = document.getElementById('bg-music');
      if (audio.paused) {
        toggleMusic();
      }
      document.body.removeEventListener('click', initAudio);
    }, { once: true });
    
    // Loop the first 30 seconds of the background music
    document.getElementById('bg-music').addEventListener('timeupdate', function() {
      if (this.currentTime >= 30) {
        this.currentTime = 0;
        if (!this.paused) {
          this.play().catch(e => console.log("Loop play failed", e));
        }
      }
    });

    /* ── Mouse Ripple on Click ── */
    document.addEventListener('click', e => {
      const ripple = document.createElement('div');
      ripple.style.cssText = `
    position:fixed; left:${e.clientX}px; top:${e.clientY}px;
    width:6px; height:6px; border-radius:50%;
    background:rgba(201,149,42,.8); pointer-events:none; z-index:9990;
    transform:translate(-50%,-50%) scale(0);
    animation: rippleOut .6s ease forwards;
  `;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
    const style = document.createElement('style');
    style.textContent = '@keyframes rippleOut { to { transform: translate(-50%,-50%) scale(12); opacity: 0; } }';
    document.head.appendChild(style);

    /* ── Parallax on Hero BG ── */
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroBg = document.querySelector('.hero-bg');
      if (heroBg) heroBg.style.transform = `translateY(${scrollY * .35}px)`;
    });
    /* ── Video Player ── */
    function playWeddingVideo() {
      const modal = document.getElementById('video-modal');
      const video = document.getElementById('wedding-vid');
      modal.classList.add('active');
      
      try {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      } catch(e) {
        console.log("Fullscreen API error", e);
      }
      video.play();
    }
    
    function closeWeddingVideo() {
      const modal = document.getElementById('video-modal');
      const video = document.getElementById('wedding-vid');
      modal.classList.remove('active');
      video.pause();
      video.currentTime = 0;
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
      }
    }
    
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement) {
        closeWeddingVideo();
      }
    });