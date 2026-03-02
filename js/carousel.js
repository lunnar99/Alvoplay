(function () {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let current = 0;
    let autoplayTimer;

    function goTo(index) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('active');
        dots[current].classList.add('active');

        track.style.transform = `translateX(-${current * 100}%)`;
    }

    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            goTo(current + 1);
        }, 8000);
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    // Dot click navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goTo(i);
            resetAutoplay();
        });
    });

    // Touch / swipe support
    let touchStartX = 0;
    const carousel = document.querySelector('.carousel');

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            goTo(diff > 0 ? current + 1 : current - 1);
            resetAutoplay();
        }
    }, { passive: true });

    startAutoplay();
})();
