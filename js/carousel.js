document.querySelectorAll('.carousel').forEach(function (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    const interval = parseInt(carousel.dataset.interval) || 5000;
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
        autoplayTimer = setInterval(() => goTo(current + 1), interval);
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goTo(i);
            resetAutoplay();
        });
    });

    let touchStartX = 0;

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
});
