// ─── PARTICLES ───
        (function initParticles() {
            const container = document.getElementById('particles');
            const emojis = ['🌸', '✨', '💕', '🦋', '🌷', '⭐', '🌙', '💫', '🌺', '🍀'];
            for (let i = 0; i < 28; i++) {
                const el = document.createElement('span');
                el.className = 'particle';
                el.textContent = emojis[i % emojis.length];
                el.style.left = Math.random() * 100 + '%';
                el.style.fontSize = (12 + Math.random() * 22) + 'px';
                el.style.animationDuration = (12 + Math.random() * 18) + 's';
                el.style.animationDelay = (Math.random() * 20) + 's';
                el.style.opacity = 0.2 + Math.random() * 0.3;
                container.appendChild(el);
            }
        })();

        // ─── NAV ───
        document.querySelectorAll('.nav-links button').forEach(btn => {
            btn.addEventListener('click', () => {
                const pageId = btn.dataset.page;
                showPage(pageId);
                document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active-nav'));
                btn.classList.add('active-nav');
            });
        });

        // ─── SHOW PAGE ───
        function showPage(id) {
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            const target = document.getElementById(id);
            if (target) target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // update nav highlight
            document.querySelectorAll('.nav-links button').forEach(b => {
                b.classList.toggle('active-nav', b.dataset.page === id);
            });
        }

        // ─── GIFTS ───
        const giftData = [
            { icon: '💋', label: 'Kiss', reveal: 'A warm kiss for the birthday princess 😘' },
            { icon: '💎', label: 'Gem', reveal: 'You’re a rare gem — priceless and beautiful 💎' },
            { icon: '🌹', label: 'Rose', reveal: 'A rose for the most beautiful soul 🌹' },
            { icon: '🌟', label: 'Star', reveal: 'You shine brighter than any star ✨' },
            { icon: '🍫', label: 'Chocolate', reveal: 'Sweet as chocolate, but way more special 🍫' },
            { icon: '🎈', label: 'Balloon', reveal: 'May your joy rise higher than the sky 🎈' },
            { icon: '📱', label: 'Phone', reveal: 'Abeg my phone is spoilt send me money😭' },
        ];

        const giftGrid = document.getElementById('giftGrid');
        giftData.forEach((g, index) => {
            const box = document.createElement('div');
            box.className = 'gift-box';
            box.dataset.index = index;
            box.innerHTML = `
            <span class="icon">${g.icon}</span>
            <div class="label">${g.label}</div>
            <div class="reveal-text" id="reveal-${index}">❓ tap me</div>
          `;
            box.addEventListener('click', () => revealGift(box, index));
            giftGrid.appendChild(box);
        });

        const opened = new Array(giftData.length).fill(false);

        function revealGift(box, index) {
            if (opened[index]) {
                // already opened – show a little extra love
                const txt = document.getElementById(`reveal-${index}`);
                txt.textContent = '💖 already opened!';
                setTimeout(() => {
                    txt.textContent = giftData[index].reveal;
                }, 800);
                return;
            }
            opened[index] = true;
            const data = giftData[index];
            const txt = document.getElementById(`reveal-${index}`);
            txt.textContent = data.reveal;
            box.classList.add('opened');
            // confetti burst
            spawnConfetti(45);
            // update footer
            document.getElementById('giftFooter').textContent = '🎉 ' + data.label + ' unlocked! ' + data.reveal;
            setTimeout(() => {
                document.getElementById('giftFooter').textContent = '💫 each box holds a little piece of my heart';
            }, 4000);
            // icon animation
            const icon = box.querySelector('.icon');
            icon.style.transform = 'scale(1.4) rotate(10deg)';
            setTimeout(() => { icon.style.transform = ''; }, 400);
        }

        // ─── CONFETTI ───
        function spawnConfetti(count = 60) {
            const colors = ['#ff5c8a', '#7b61ff', '#ffd166', '#06d6a0', '#ff9f1c', '#ef476f', '#118ab2', '#f78c6b'];
            for (let i = 0; i < count; i++) {
                const el = document.createElement('div');
                el.className = 'confetti-piece';
                el.style.left = (10 + Math.random() * 80) + '%';
                el.style.background = colors[Math.floor(Math.random() * colors.length)];
                el.style.width = (6 + Math.random() * 10) + 'px';
                el.style.height = (10 + Math.random() * 18) + 'px';
                el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                el.style.animationDuration = (2 + Math.random() * 2.5) + 's';
                el.style.animationDelay = (Math.random() * 0.8) + 's';
                el.style.transform = `rotate(${Math.random() * 360}deg)`;
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 4500);
            }
        }

        // ─── MUSIC ───
        const audio = document.getElementById('bgMusic');
        const toggleBtn = document.getElementById('musicToggle');
        const statusEl = document.getElementById('musicStatus');

        let musicPlaying = false;

        // try to autoplay on first user interaction
        document.addEventListener('click', () => {
            if (!musicPlaying) {
                audio.play().then(() => {
                    musicPlaying = true;
                    statusEl.textContent = 'Playing';
                    toggleBtn.textContent = '⏸';
                }).catch(() => {});
            }
        }, { once: true });

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (musicPlaying) {
                audio.pause();
                musicPlaying = false;
                statusEl.textContent = 'Paused';
                toggleBtn.textContent = '▶';
            } else {
                audio.play().then(() => {
                    musicPlaying = true;
                    statusEl.textContent = 'Playing Best Part(feat. H.E.R) Daniel Caesar ';
                    toggleBtn.textContent = '⏸';
                }).catch(() => {});
            }
        });

        // also auto-start if user taps anywhere after page load
        document.addEventListener('click', () => {
            if (!musicPlaying && audio.paused) {
                audio.play().then(() => {
                    musicPlaying = true;
                    statusEl.textContent = 'Playing';
                    toggleBtn.textContent = '⏸';
                }).catch(() => {});
            }
        }, { once: true });

        // ─── CONFETTI ON LOAD (small burst) ───
        window.addEventListener('load', () => {
            setTimeout(() => spawnConfetti(30), 600);
        });

        // ─── KEYBOARD SHORTCUT: ESC → home ───
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') showPage('home');
        });

        console.log('🎂 Happy Birthday Mell! 🎉');
       (function() {
        "use strict";

        // --------------------------------------------------------------
        // 1. DEFINE YOUR MEMORIES — replace with your own images/videos
        //    Each item: { type: 'image' or 'video', src: 'path' }
        // -------------------------------------------------------------
        const memories = [{
            type: 'image',
            src: 'https://picsum.photos/id/1015/600/800'
        }, {
            type: 'image',
            src: 'https://picsum.photos/id/1016/600/800'
        }, {
            type: 'image',
            src: 'https://picsum.photos/id/1018/600/800'
        }, {
            type: 'video',
            src: 'https://www.w3schools.com/html/mov_bbb.mp4'
        }, {
            type: 'image',
            src: 'https://picsum.photos/id/1020/600/800'
        }, {
            type: 'video',
            src: 'https://www.w3schools.com/html/mov_bbb.mp4'
        }, {
            type: 'image',
            src: 'https://picsum.photos/id/1024/600/800'
        }, {
            type: 'image',
            src: 'https://picsum.photos/id/1027/600/800'
        }, ];
        // --------------------------------------------------------------

        // DOM refs
        const overlay = document.getElementById('memoriesOverlay');
        const openBtn = document.getElementById('memoriesBtn');
        const closeBtn = document.getElementById('memCloseBtn');
        const track = document.getElementById('memTrack');
        const dotsContainer = document.getElementById('memDots');
        const counter = document.getElementById('memCounter');
        const prevBtn = document.getElementById('memPrev');
        const nextBtn = document.getElementById('memNext');

        let currentIndex = 0;
        let total = memories.length;
        let isOpen = false;

        // ---------- RENDER SLIDES ----------
        function renderSlides() {
            track.innerHTML = '';
            dotsContainer.innerHTML = '';

            memories.forEach((item, idx) => {
                // Slide wrapper
                const slide = document.createElement('div');
                slide.className = 'mem-slide';

                const inner = document.createElement('div');
                inner.className = 'mem-slide-inner';

                let media;
                if (item.type === 'video') {
                    media = document.createElement('video');
                    media.src = item.src;
                    media.muted = true;
                    media.playsInline = true;
                    media.loop = true;
                    media.setAttribute('preload', 'metadata');
                    // click to play/pause
                    media.addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (this.paused) this.play();
                        else this.pause();
                    });
                } else {
                    media = document.createElement('img');
                    media.src = item.src;
                    media.alt = 'Memory ' + (idx + 1);
                    media.loading = 'lazy';
                }

                inner.appendChild(media);
                slide.appendChild(inner);
                track.appendChild(slide);

                // Dot
                const dot = document.createElement('button');
                dot.className = 'mem-dot' + (idx === 0 ? ' active' : '');
                dot.dataset.index = idx;
                dot.addEventListener('click', function() {
                    goTo(parseInt(this.dataset.index));
                });
                dotsContainer.appendChild(dot);
            });

            updateUI();
            updateArrowVisibility();
        }

        // ---------- UPDATE UI (position, counter, dots) ----------
        function updateUI() {
            // Move track
            track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

            // Counter
            counter.textContent = (currentIndex + 1) + ' / ' + total;

            // Dots
            const dots = dotsContainer.querySelectorAll('.mem-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });

            // Pause all videos except the current one
            const allVideos = track.querySelectorAll('video');
            allVideos.forEach((v, i) => {
                if (i === currentIndex) {
                    // don't auto-play, let user decide
                } else {
                    v.pause();
                }
            });
        }

        function updateArrowVisibility() {
            if (total <= 1) {
                prevBtn.classList.add('hidden');
                nextBtn.classList.add('hidden');
            } else {
                prevBtn.classList.remove('hidden');
                nextBtn.classList.remove('hidden');
            }
        }

        // ---------- NAVIGATION ----------
        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            if (index === currentIndex) return;
            currentIndex = index;
            updateUI();
        }

        function next() {
            goTo(currentIndex + 1);
        }

        function prev() {
            goTo(currentIndex - 1);
        }

        // ---------- OPEN / CLOSE ----------
        function openMemories() {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            isOpen = true;
            // reset to first slide
            currentIndex = 0;
            updateUI();
            // preload adjacent media
        }

        function closeMemories() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
            isOpen = false;
            // pause all videos
            track.querySelectorAll('video').forEach(v => v.pause());
        }

        // ---------- EVENT LISTENERS ----------
        openBtn.addEventListener('click', openMemories);
        closeBtn.addEventListener('click', closeMemories);

        // Click on backdrop → close (but not on slider content)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeMemories();
            }
        });

        // ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isOpen) closeMemories();
            if (e.key === 'ArrowLeft' && isOpen) prev();
            if (e.key === 'ArrowRight' && isOpen) next();
        });

        // Arrow buttons
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);

        // ---------- TOUCH SWIPE SUPPORT ----------
        let touchStartX = 0;
        let touchStartY = 0;
        let isSwiping = false;

        const slider = document.getElementById('memSlider');

        slider.addEventListener('touchstart', function(e) {
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            isSwiping = true;
        }, { passive: true });

        slider.addEventListener('touchmove', function(e) {
            if (!isSwiping) return;
            // prevent vertical scroll while swiping horizontally
            const touch = e.touches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 20) {
                e.preventDefault();
            }
        }, { passive: false });

        slider.addEventListener('touchend', function(e) {
            if (!isSwiping) return;
            isSwiping = false;
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
                if (deltaX < 0) next();
                else prev();
            }
        }, { passive: true });

        // ---------- INIT ----------
        renderSlides();

        // fix: if total is 0, show a message
        if (total === 0) {
            track.innerHTML = `
                        <div class="mem-slide">
                            <div class="mem-slide-inner" style="color:#888;font-size:1.4rem;text-align:center;padding:40px;">
                                No memories yet ✨
                            </div>
                        </div>
                    `;
            dotsContainer.innerHTML = '';
            counter.textContent = '0 / 0';
            prevBtn.classList.add('hidden');
            nextBtn.classList.add('hidden');
        }

        console.log('📸 Memories viewer ready! (' + total + ' items)');
    })();
