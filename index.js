exports.addAnimationOnScroll = function (className, startClasses) {
    const els = document.querySelectorAll(`.${className}`);

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Apply end state
                startClasses.forEach((c) => entry.target.classList.remove(c));
                // Only run once per element
                io.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0
    });

    els.forEach((el) => {
        // Prepare initial hidden state and smooth transition
        startClasses.forEach((c) => el.classList.add(c));
        el.classList.add('transition', 'duration-700', 'ease-in-out');

        // Observe after the initial classes are applied (next frame)
        requestAnimationFrame(() => {
            io.observe(el);
        });
    });

    // Optional: kick a manual check in case elements start in-view
    // (Some browsers won’t fire until a change happens)
    setTimeout(() => {
        els.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            const inView = rect.top < vh && rect.bottom > 0; // basic check
            if (inView) {
                startClasses.forEach((c) => el.classList.remove(c));
                io.unobserve(el);
            }
        });
    }, 0);
}