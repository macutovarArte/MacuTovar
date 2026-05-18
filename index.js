 // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
    });

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
    }

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    // Form submit placeholder
    function handleSubmit(e) {
        e.preventDefault();
        alert('¡Mensaje enviado! Te responderé pronto.');
        e.target.reset();
    }

    // Nav scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(233, 209, 209, 0.92)';
            nav.style.backdropFilter = 'blur(10px)';
            nav.style.mixBlendMode = 'normal';
        } else {
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
            nav.style.mixBlendMode = 'multiply';
        }
    });