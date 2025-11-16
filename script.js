// Cursor trail effect
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    trailX += (mouseX - trailX) * 0.1;
    trailY += (mouseY - trailY) * 0.1;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
}
animateTrail();

// Loading screen
setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
}, 2500);

// Modal functions
function showModal(title, text) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalText').textContent = text;
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    createParticles();
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Particle effects
function createParticles() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            document.body.appendChild(particle);

            setTimeout(() => {
                particle.style.opacity = '1';
                particle.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(${Math.random() * 3 + 1})`;
                particle.style.transition = 'all 2s';
            }, 10);

            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 50);
    }
}

// Quotes carousel
let currentQuote = 0;
const quotes = document.querySelectorAll('.carousel-quote');
const dotsContainer = document.getElementById('carouselDots');

// Create dots
quotes.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'carousel-dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToQuote(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.carousel-dot');

function goToQuote(index) {
    quotes[currentQuote].classList.remove('active');
    dots[currentQuote].classList.remove('active');
    currentQuote = index;
    quotes[currentQuote].classList.add('active');
    dots[currentQuote].classList.add('active');
}

function nextQuote() {
    quotes[currentQuote].classList.remove('active');
    dots[currentQuote].classList.remove('active');
    currentQuote = (currentQuote + 1) % quotes.length;
    quotes[currentQuote].classList.add('active');
    dots[currentQuote].classList.add('active');
}

// Auto-advance quotes - CHANGED FROM 5000 TO 8000 (8 seconds)
setInterval(nextQuote, 8000);

// Surprise section reveal
const surpriseSection = document.getElementById('surpriseSection');
const observerOptions = {
    threshold: 0.3
};

const surpriseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            surpriseSection.classList.add('revealed');
        }
    });
}, observerOptions);

if (surpriseSection) {
    surpriseObserver.observe(surpriseSection);
}

// Smooth reveal on scroll for all sections
const sectionObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, sectionObserverOptions);

document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('hero')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 1s, transform 1s';
        sectionObserver.observe(section);
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Close modal on background click
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});
