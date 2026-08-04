 // ── GRUPOS DE IMÁGENES ──
const imageGroups = {
    edificios: [
        "imagenes/Edificios/Beasada.jpg",        
        "imagenes/Edificios/CasaAbuela.jpg",        
        "imagenes/Edificios/CabezaDorada.jpg",        
        "imagenes/Edificios/RuralPoio.jpg",
        "imagenes/Edificios/TemploDebod.jpg",
        "imagenes/Edificios/Cementerio.jpg",
        "imagenes/Edificios/ConcelloBueu.jpg", 
        "imagenes/Edificios/Pasanteria.jpeg", 


    ],
    paisajes: [
        "imagenes/Paisajes/LLautCarril.jpeg",
        "imagenes/Paisajes/Dorna.jpeg",
        "imagenes/Paisajes/Aldan.jpg",
        "imagenes/Paisajes/Brokoa.jpeg",
        "imagenes/Paisajes/Covelo.jpg",        
        "imagenes/Paisajes/Arosa.jpg",
        "imagenes/Paisajes/Lagos.jpg",
        "imagenes/Paisajes/Jerte.jpg",
        "imagenes/Paisajes/Combarro.jpeg",
        "imagenes/Paisajes/PlayaCabeceira.jpeg",      
        "imagenes/Paisajes/PuenteBarca.jpeg",
        "imagenes/Paisajes/RuaViñas.jpeg",
        "imagenes/Paisajes/PaisajeNevado.jpeg",  
        "imagenes/Paisajes/RefugioStellaAlpina.jpeg",
        "imagenes/Paisajes/FaroLariño.jpeg"           
        

    ]
};

// Asignar automáticamente el array a cada tarjeta según su data-group
document.querySelectorAll('.project-card').forEach(card => {
    const group = card.dataset.group;
    if (group && imageGroups[group]) {
        card.dataset.images = JSON.stringify(imageGroups[group]);
    }
});
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
    // ── LIGHTBOX ──
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCounter = document.getElementById('lightboxCounter');

let currentImages = [];
let currentIndex  = 0;
function openLightbox(images, index, caption, card) {
    currentImages = images;
    currentIndex = index;

    const group = card.dataset.group;
    currentCards = [...document.querySelectorAll(`.project-card[data-group="${group}"]`)];

    lightboxImg.src = currentImages[currentIndex];
    lightboxCaption.textContent = caption || '';
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
}

function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;

    lightboxImg.src = currentImages[currentIndex];
    lightboxCaption.textContent =
        currentCards[currentIndex].querySelector('.project-title').textContent;

    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;

    lightboxImg.src = currentImages[currentIndex];
    lightboxCaption.textContent =
        currentCards[currentIndex].querySelector('.project-title').textContent;

    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

// Abrir al hacer clic en "Ver obra"
document.querySelectorAll('.project-card').forEach(card => {
    card.querySelector('.project-overlay').addEventListener('click', (e) => {
        e.stopPropagation();
        const images  = JSON.parse(card.dataset.images);
        const index   = parseInt(card.dataset.index) || 0;
        const caption = card.querySelector('.project-title').textContent;
        openLightbox(images, index, caption,card);
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Cerrar al hacer clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Navegar con teclado
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape')     closeLightbox();
});
//para abrir/cerrar el modal
document.querySelectorAll('.project-video-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const videoId = this.dataset.video;
        const modal = document.getElementById('videoModal');
        document.getElementById('videoModalIframe').src = 
    `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modal.style.display = 'flex';
    });
});

document.getElementById('videoModalClose').addEventListener('click', () => {
    document.getElementById('videoModal').style.display = 'none';
    document.getElementById('videoModalIframe').src = '';
});

// Cerrar al hacer clic fuera
document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        document.getElementById('videoModalIframe').src = '';
    }
});