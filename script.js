// =========================================================
// PARTICLES
// =========================================================

(function initParticles() {

    const container = document.getElementById('particles');

    const emojis = [
        '🌸',
        '✨',
        '💕',
        '🦋',
        '🌷',
        '⭐',
        '🌙',
        '💫',
        '🌺',
        '🍀'
    ];

    for (let i = 0; i < 28; i++) {

        const el = document.createElement('span');

        el.className = 'particle';

        el.textContent = emojis[i % emojis.length];

        el.style.left =
            Math.random() * 100 + '%';

        el.style.fontSize =
            (12 + Math.random() * 22) + 'px';

        el.style.animationDuration =
            (12 + Math.random() * 18) + 's';

        el.style.animationDelay =
            (Math.random() * 20) + 's';

        el.style.opacity =
            0.2 + Math.random() * 0.3;

        container.appendChild(el);
    }

})();


// =========================================================
// NAVIGATION
// =========================================================

document
    .querySelectorAll('.nav-links button')
    .forEach(btn => {

        btn.addEventListener('click', () => {

            const pageId = btn.dataset.page;

            showPage(pageId);

        });

    });


// =========================================================
// SHOW PAGE
// =========================================================

function showPage(id) {

    // Memories is NOT a normal page.
    // Open the full-screen viewer instead.
    if (id === 'memories') {

        openMemories();

        return;
    }


    // If memories viewer is open, close it.
    closeMemories();


    // Hide every page
    document
        .querySelectorAll('.page')
        .forEach(page => {

            page.classList.remove('active');

        });


    // Show requested page
    const target =
        document.getElementById(id);

    if (target) {

        target.classList.add('active');

    }


    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });


    // Update navigation
    document
        .querySelectorAll('.nav-links button')
        .forEach(button => {

            button.classList.toggle(
                'active-nav',
                button.dataset.page === id
            );

        });

}


// =========================================================
// GIFTS
// =========================================================

const giftData = [

    {
        icon: '💋',
        label: 'Kiss',
        reveal:
            'A warm kiss for the birthday princess 😘'
    },

    {
        icon: '💎',
        label: 'Gem',
        reveal:
            'You’re a rare gem — priceless and beautiful 💎'
    },

    {
        icon: '🌹',
        label: 'Rose',
        reveal:
            'A rose for the most beautiful soul 🌹'
    },

    {
        icon: '🌟',
        label: 'Star',
        reveal:
            'You shine brighter than any star ✨'
    },

    {
        icon: '🍫',
        label: 'Chocolate',
        reveal:
            'Sweet as chocolate, but way more special 🍫'
    },

    {
        icon: '🎈',
        label: 'Balloon',
        reveal:
            'May your joy rise higher than the sky 🎈'
    },

    {
        icon: '📱',
        label: 'Phone',
        reveal:
            'Abeg my phone is spoilt send me money😭'
    }

];


const giftGrid =
    document.getElementById('giftGrid');


const opened =
    new Array(giftData.length).fill(false);


giftData.forEach((g, index) => {

    const box =
        document.createElement('div');

    box.className =
        'gift-box';

    box.dataset.index =
        index;

    box.innerHTML = `

        <span class="icon">
            ${g.icon}
        </span>

        <div class="label">
            ${g.label}
        </div>

        <div
            class="reveal-text"
            id="reveal-${index}">
            ❓ tap me
        </div>

    `;

    box.addEventListener(
        'click',
        () => revealGift(box, index)
    );

    giftGrid.appendChild(box);

});


function revealGift(box, index) {

    const txt =
        document.getElementById(
            `reveal-${index}`
        );


    if (opened[index]) {

        txt.textContent =
            '💖 already opened!';

        setTimeout(() => {

            txt.textContent =
                giftData[index].reveal;

        }, 800);

        return;
    }


    opened[index] = true;


    const data =
        giftData[index];


    txt.textContent =
        data.reveal;


    box.classList.add('opened');


    // Confetti
    spawnConfetti(45);


    // Icon animation
    const icon =
        box.querySelector('.icon');


    icon.style.transform =
        'scale(1.4) rotate(10deg)';


    setTimeout(() => {

        icon.style.transform = '';

    }, 400);

}


// =========================================================
// CONFETTI
// =========================================================

function spawnConfetti(count = 60) {

    const colors = [
        '#ff5c8a',
        '#7b61ff',
        '#ffd166',
        '#06d6a0',
        '#ff9f1c',
        '#ef476f',
        '#118ab2',
        '#f78c6b'
    ];


    for (let i = 0; i < count; i++) {

        const el =
            document.createElement('div');

        el.className =
            'confetti-piece';

        el.style.left =
            (10 + Math.random() * 80) + '%';

        el.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

        el.style.width =
            (6 + Math.random() * 10) + 'px';

        el.style.height =
            (10 + Math.random() * 18) + 'px';

        el.style.borderRadius =
            Math.random() > 0.5
                ? '50%'
                : '2px';

        el.style.animationDuration =
            (2 + Math.random() * 2.5) + 's';

        el.style.animationDelay =
            (Math.random() * 0.8) + 's';

        el.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(el);


        setTimeout(() => {

            el.remove();

        }, 4500);

    }

}


// =========================================================
// MEMORIES
// =========================================================
//
// ADD YOUR FILES HERE.
//
// Example folder:
//
// memories/
//    memory1.jpg
//    memory2.jpg
//    memory3.jpg
//    video1.mp4
//    video2.mp4
//
// =========================================================

const memories = [

    {
        type: 'image',
        src: 'memory1.jpg'
    },

    {
        type: 'image',
        src: 'memories/memory2.jpg'
    },

    {
        type: 'video',
        src: 'video1.mp4'
    },

    {
        type: 'image',
        src: 'memories/memory3.jpg'
    },

    {
        type: 'video',
        src: 'video2.mp4.mp4'
    }

];


// =========================================================
// MEMORY VARIABLES
// =========================================================

const memoriesOverlay =
    document.getElementById(
        'memoriesOverlay'
    );


const memoryViewer =
    document.getElementById(
        'memoryViewer'
    );


const memoryDots =
    document.getElementById(
        'memoryDots'
    );


const memoryPrev =
    document.getElementById(
        'memoryPrev'
    );


const memoryNext =
    document.getElementById(
        'memoryNext'
    );


const memoryHomeBtn =
    document.getElementById(
        'memoryHomeBtn'
    );


let currentMemory = 0;


// =========================================================
// CREATE MEMORIES
// =========================================================

function createMemories() {

    memoryViewer.innerHTML = '';

    memoryDots.innerHTML = '';


    memories.forEach((memory, index) => {

        const item =
            document.createElement('div');

        item.className =
            'memory-item';


        // -----------------------------
        // IMAGE
        // -----------------------------

        if (memory.type === 'image') {

            const img =
                document.createElement('img');

            img.src =
                memory.src;

            img.alt =
                `Memory ${index + 1}`;

            img.draggable = false;

            item.appendChild(img);

        }


        // -----------------------------
        // VIDEO
        // -----------------------------

        else if (memory.type === 'video') {

            const video =
                document.createElement('video');

            video.src =
                memory.src;

            video.muted = true;

            video.loop = true;

            video.playsInline = true;

            video.preload = 'metadata';

            // IMPORTANT:
            // No controls.
            video.controls = false;


            // Click video = play/pause
            video.addEventListener(
                'click',
                (event) => {

                    event.stopPropagation();

                    if (video.paused) {

                        video.play()
                            .catch(() => {});

                    } else {

                        video.pause();

                    }

                }
            );


            item.appendChild(video);

        }


        memoryViewer.appendChild(item);


        // -----------------------------
        // DOT
        // -----------------------------

        const dot =
            document.createElement('button');

        dot.className =
            'memory-dot';

        dot.setAttribute(
            'aria-label',
            `Go to memory ${index + 1}`
        );


        dot.addEventListener(
            'click',
            () => {

                showMemory(index);

            }
        );


        memoryDots.appendChild(dot);

    });

}


// =========================================================
// OPEN MEMORIES
// =========================================================

function openMemories() {

    // ALWAYS RESET TO FIRST MEMORY
    currentMemory = 0;


    createMemories();


    memoriesOverlay.classList.add('open');


    // LOCK BACKGROUND
    document.body.style.overflow =
        'hidden';


    showMemory(0);

}


// =========================================================
// CLOSE MEMORIES
// =========================================================

function closeMemories() {

    memoriesOverlay.classList.remove('open');


    // UNLOCK BACKGROUND
    document.body.style.overflow =
        '';


    // Pause ALL videos
    pauseAllVideos();

}


// =========================================================
// SHOW MEMORY
// =========================================================

function showMemory(index) {

    if (memories.length === 0) {

        return;

    }


    // LOOP BACKWARD
    if (index < 0) {

        index =
            memories.length - 1;

    }


    // LOOP FORWARD
    if (index >= memories.length) {

        index = 0;

    }


    currentMemory =
        index;


    const items =
        document.querySelectorAll(
            '.memory-item'
        );


    const dots =
        document.querySelectorAll(
            '.memory-dot'
        );


    // Remove active
    items.forEach(item => {

        item.classList.remove(
            'active'
        );

    });


    dots.forEach(dot => {

        dot.classList.remove(
            'active'
        );

    });


    // PAUSE ALL VIDEOS
    pauseAllVideos();


    // Activate selected memory
    if (items[index]) {

        items[index].classList.add(
            'active'
        );

    }


    if (dots[index]) {

        dots[index].classList.add(
            'active'
        );

    }


    // If current memory is a video:
    // keep it paused until user clicks it.
}


// =========================================================
// PAUSE ALL VIDEOS
// =========================================================

function pauseAllVideos() {

    const videos =
        document.querySelectorAll(
            '#memoryViewer video'
        );


    videos.forEach(video => {

        video.pause();

        // Reset playback position is NOT done.
        // This means if you return to it,
        // it stays at the same position.

    });

}


// =========================================================
// NEXT MEMORY
// =========================================================

function nextMemory() {

    showMemory(
        currentMemory + 1
    );

}


// =========================================================
// PREVIOUS MEMORY
// =========================================================

function previousMemory() {

    showMemory(
        currentMemory - 1
    );

}


// =========================================================
// ARROW BUTTONS
// =========================================================

memoryNext.addEventListener(
    'click',
    (event) => {

        event.stopPropagation();

        nextMemory();

    }
);


memoryPrev.addEventListener(
    'click',
    (event) => {

        event.stopPropagation();

        previousMemory();

    }
);


// =========================================================
// BACK HOME
// =========================================================

memoryHomeBtn.addEventListener(
    'click',
    (event) => {

        event.stopPropagation();

        closeMemories();

        showPage('home');

    }
);


// =========================================================
// KEYBOARD
// =========================================================

document.addEventListener(
    'keydown',
    (event) => {

        // Only react when memories is open
        if (
            !memoriesOverlay.classList.contains(
                'open'
            )
        ) {

            return;

        }


        if (event.key === 'ArrowRight') {

            event.preventDefault();

            nextMemory();

        }


        if (event.key === 'ArrowLeft') {

            event.preventDefault();

            previousMemory();

        }


        if (event.key === 'Escape') {

            event.preventDefault();

            closeMemories();

            showPage('home');

        }

    }
);


// =========================================================
// SWIPE SUPPORT
// =========================================================

let touchStartX = 0;
let touchStartY = 0;


memoriesOverlay.addEventListener(
    'touchstart',
    (event) => {

        touchStartX =
            event.changedTouches[0].screenX;

        touchStartY =
            event.changedTouches[0].screenY;

    },
    {
        passive: true
    }
);


memoriesOverlay.addEventListener(
    'touchend',
    (event) => {

        const touchEndX =
            event.changedTouches[0].screenX;

        const touchEndY =
            event.changedTouches[0].screenY;


        const differenceX =
            touchEndX - touchStartX;

        const differenceY =
            touchEndY - touchStartY;


        // Ignore mostly vertical swipes
        if (
            Math.abs(differenceX) <
            Math.abs(differenceY)
        ) {

            return;

        }


        // Minimum swipe distance
        if (
            Math.abs(differenceX) < 50
        ) {

            return;

        }


        if (differenceX < 0) {

            // Swipe LEFT
            nextMemory();

        } else {

            // Swipe RIGHT
            previousMemory();

        }

    },
    {
        passive: true
    }
);


// =========================================================
// MUSIC
// =========================================================

const audio =
    document.getElementById(
        'bgMusic'
    );


const toggleBtn =
    document.getElementById(
        'musicToggle'
    );


const statusEl =
    document.getElementById(
        'musicStatus'
    );


let musicPlaying = false;


// Start music after first click
document.addEventListener(
    'click',
    () => {

        if (!musicPlaying) {

            audio.play()
                .then(() => {

                    musicPlaying = true;

                    statusEl.textContent =
                        'Playing';

                    toggleBtn.textContent =
                        '⏸';

                })
                .catch(() => {});

        }

    },
    {
        once: true
    }
);


// Music button
toggleBtn.addEventListener(
    'click',
    (event) => {

        event.stopPropagation();


        if (musicPlaying) {

            audio.pause();

            musicPlaying = false;

            statusEl.textContent =
                'Paused';

            toggleBtn.textContent =
                '▶';

        } else {

            audio.play()
                .then(() => {

                    musicPlaying = true;

                    statusEl.textContent =
                        'Playing Best Part';

                    toggleBtn.textContent =
                        '⏸';

                })
                .catch(() => {});

        }

    }
);


// =========================================================
// CONFETTI ON LOAD
// =========================================================

window.addEventListener(
    'load',
    () => {

        setTimeout(() => {

            spawnConfetti(30);

        }, 600);

    }
);


// =========================================================
// START
// =========================================================

console.log(
    '🎂 Happy Birthday Mell! 🎉'
);
