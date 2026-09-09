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
       
