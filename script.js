// ========================
// LOADER
// ========================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('out');
    }, 1500);
});

// ========================
// AOS
// ========================
AOS.init({
    duration: 750,
    easing: 'ease-out-cubic',
    once: true,
    offset: 70
});

// ========================
// HEADER SCROLL
// ========================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});

// ========================
// ACTIVE NAV LINK
// ========================
const allSections = document.querySelectorAll('section[id]');
const navLinks    = document.querySelectorAll('#nav-menu .nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === '#' + entry.target.id
            );
        });
    });
}, { threshold: 0.35 });

allSections.forEach(sec => sectionObserver.observe(sec));

// ========================
// MENU MOBILE
// ========================
const mobileBtn     = document.getElementById('mobile-btn');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileClose   = document.getElementById('mobile-close');
const mobileLinks   = document.querySelectorAll('.mobile-link');

function openMenu() {
    mobileBtn.classList.add('open');
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeMenu() {
    mobileBtn.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

mobileBtn.addEventListener('click', () => {
    mobileOverlay.classList.contains('open') ? closeMenu() : openMenu();
});
mobileClose.addEventListener('click', closeMenu);
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

// ========================
// SMOOTH SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        closeMenu();
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.pageYOffset - 76,
            behavior: 'smooth'
        });
    });
});

// ========================
// CONTADORES HERO
// ========================
function countUp(el, target, duration = 1600) {
    let current = 0;
    const step  = target / (duration / 16);
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    const statsObs = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        document.querySelectorAll('.stat-num').forEach(el => {
            countUp(el, parseInt(el.dataset.target));
        });
        statsObs.disconnect();
    }, { threshold: 0.5 });
    statsObs.observe(statsSection);
}

// ========================
// PARTÍCULAS HERO
// ========================
(function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // injeta keyframe dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0%   { transform: translateY(0) translateX(0);   opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 0.6; }
            100% { transform: translateY(-110vh) translateX(var(--dx)); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        const size  = Math.random() * 3 + 1;
        const isRed = Math.random() > 0.55;
        const dx    = (Math.random() - 0.5) * 120;

        p.style.cssText = `
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            background: ${isRed ? '#D72626' : 'rgba(255,255,255,0.55)'};
            opacity: 0;
            --dx: ${dx}px;
            animation: floatUp ${Math.random() * 14 + 8}s linear infinite;
            animation-delay: -${Math.random() * 12}s;
        `;
        container.appendChild(p);
    }
})();

// ========================
// PARALLAX HERO (sutil)
// ========================
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (!heroSection) return;
    const y = window.pageYOffset;
    heroSection.style.backgroundPositionY = `calc(50% + ${y * 0.28}px)`;
}, { passive: true });