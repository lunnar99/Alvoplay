(function () {
    const header      = document.getElementById('main-header');
    const expanded    = document.getElementById('header-expanded');
    const compact     = document.getElementById('header-compact');
    const playBig     = document.getElementById('play-now-big');

    // Alturas alvo (px)
    const HEIGHT_EXPANDED = 220;
    const HEIGHT_COMPACT  = 84;

    // Pixels de scroll para atingir 100% compacto
    const THRESHOLD = 160;

    function lerp(a, b, t) {
        return a + (b - a) * t;
    }

    function clamp(v, min, max) {
        return Math.min(Math.max(v, min), max);
    }

    function update() {
        const p = clamp(window.scrollY / THRESHOLD, 0, 1);

        // Altura do header
        const headerH = lerp(HEIGHT_EXPANDED, HEIGHT_COMPACT, p);
        header.style.height = headerH + 'px';

        // Raio da borda inferior
        const radius = lerp(30, 20, p);
        header.style.borderRadius = `0 0 ${radius}px ${radius}px`;

        // Layer expandida: some conforme rola
        expanded.style.opacity = clamp(1 - p * 2, 0, 1);
        expanded.style.pointerEvents = p > 0.8 ? 'none' : 'auto';

        // Layer compacta: aparece conforme rola
        compact.style.opacity       = p;
        compact.style.pointerEvents = p < 0.2 ? 'none' : 'auto';

        // Botão grande: desce e some
        const btnBottom = lerp(-22, -60, p);
        const btnOpacity = clamp(1 - p * 2.5, 0, 1); // some mais rápido
        playBig.style.bottom         = btnBottom + 'px';
        playBig.style.opacity        = btnOpacity;
        playBig.style.pointerEvents  = btnOpacity < 0.1 ? 'none' : 'auto';

        // Padding do body para compensar o header fixo
        // inclui a metade do botão grande quando expandido
        const bodyPad = lerp(HEIGHT_EXPANDED + 30, HEIGHT_COMPACT + 10, p);
        document.body.style.paddingTop = bodyPad + 'px';
    }

    window.addEventListener('scroll', update, { passive: true });

    // Inicializa no estado correto ao carregar a página
    update();
})();
