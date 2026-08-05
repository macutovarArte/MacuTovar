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
        document.getElementById('retos').style.display = 'none';
        document.getElementById('proyectos').style.display = 'block';
    }
     function closeMobileMenuReto() {
       mobileMenu.classList.remove('open');
       document.getElementById('retos').style.display = 'block';
       document.getElementById('proyectos').style.display = 'none';
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
// RETO DE AGOSTO
const dias = [
    { dia: 1, titulo: null, dimensiones: null, img: null },
    { dia: 2, titulo: 'Lago Myvatn', dimensiones: '36 x 36 cm', img: 'imagenes/Reto/2.jpeg' }, 
    { dia: 3, titulo: 'Río Firth', dimensiones: '26 x 37 cm', img: 'imagenes/Reto/3.jpeg' },
    { dia: 4, titulo: 'Selatngar', dimensiones: '26 x 37 cm', img: 'imagenes/Reto/4.jpeg' },
    { dia: 5, titulo: null, dimensiones: null, img: null },
    { dia: 6, titulo: null, dimensiones: null, img: null },
    { dia: 7, titulo: null, dimensiones: null, img: null },
    { dia: 8, titulo: null, dimensiones: null, img: null },
    { dia: 9, titulo: null, dimensiones: null, img: null },
    { dia: 10, titulo: null, dimensiones: null, img: null },
    { dia: 11, titulo: null, dimensiones: null, img: null },
    { dia: 12, titulo: null, dimensiones: null, img: null },
    { dia: 13, titulo: null, dimensiones: null, img: null },
    { dia: 14, titulo: null, dimensiones: null, img: null },
    { dia: 15, titulo: null, dimensiones: null, img: null },
    { dia: 16, titulo: null, dimensiones: null, img: null },
    { dia: 17, titulo: null, dimensiones: null, img: null },
    { dia: 18, titulo: null, dimensiones: null, img: null },
    { dia: 19, titulo: null, dimensiones: null, img: null },
    { dia: 20, titulo: null, dimensiones: null, img: null },
    { dia: 21, titulo: null, dimensiones: null, img: null },
    { dia: 22, titulo: null, dimensiones: null, img: null },
    { dia: 23, titulo: null, dimensiones: null, img: null },
    { dia: 24, titulo: null, dimensiones: null, img: null },
    { dia: 25, titulo: null, dimensiones: null, img: null },
    { dia: 26, titulo: null, dimensiones: null, img: null },
    { dia: 27, titulo: null, dimensiones: null, img: null },
    { dia: 28, titulo: null, dimensiones: null, img: null },
    { dia: 29, titulo: null, dimensiones: null, img: null },
    { dia: 30, titulo: null, dimensiones: null, img: null },
    { dia: 31, titulo: null, dimensiones: null, img: null }
];

const grid = document.querySelector('.reto-grid');
if (grid) {
    grid.innerHTML = dias.map((d, index) => {  // ← dias, no diasAgosto
        if (!d.img) return `
            <div class="reto-card vacio">
                <div class="reto-dia-num">${d.dia}</div>
                <div class="reto-placeholder"><span>✦</span></div>
            </div>`;

        return `
            <div class="reto-card tiene-obra" 
                 data-img="${d.img}" 
                 data-titulo="${d.titulo}" 
                 data-dimensiones="${d.dimensiones}"
                 data-index="${index}">
                <div class="reto-dia-num">${d.dia}</div>
                <div class="reto-img-wrap">
                    <img src="${d.img}" alt="Acuarela día ${d.dia}" loading="lazy">
                </div>
                <div class="reto-info">
                    <span class="reto-titulo">${d.titulo}</span>
                    <span class="reto-dimensiones">${d.dimensiones}</span>
                </div>
            </div>`;
    }).join('');

    document.querySelectorAll('.reto-card.tiene-obra .reto-img-wrap').forEach(wrap => {
        wrap.addEventListener('click', (e) => {
            e.stopPropagation();
            const card        = wrap.closest('.reto-card');
            const img         = card.dataset.img;
            const titulo      = card.dataset.titulo;
            const dimensiones = card.dataset.dimensiones;
            openRetoLightbox(img, titulo, dimensiones);
        });
    });
}

let retoImages = [];
let retoIndex  = 0;

function openRetoLightbox(img, titulo, dimensiones) {
    // Construye el array con todas las obras que tienen imagen
    retoImages = dias.filter(d => d.img);
    // Encuentra el índice de la imagen clicada
    retoIndex  = retoImages.findIndex(d => d.img === img);

    mostrarRetoLightbox();
    document.getElementById('retoLightbox').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function mostrarRetoLightbox() {
    const d = retoImages[retoIndex];
    document.getElementById('retoLightboxImg').src          = d.img;
    document.getElementById('retoLightboxTitulo').textContent     = d.titulo;
    document.getElementById('retoLightboxDimensiones').textContent = `${d.dimensiones} · Día ${d.dia}`;
}

function showPrevReto() {
    retoIndex = (retoIndex - 1 + retoImages.length) % retoImages.length;
    mostrarRetoLightbox();
}

function showNextReto() {
    retoIndex = (retoIndex + 1) % retoImages.length;
    mostrarRetoLightbox();
}

function closeRetoLightbox() {
    document.getElementById('retoLightbox').style.display = 'none';
    document.getElementById('retoLightboxImg').src = '';
    document.body.style.overflow = '';
}

// Eventos botones prev/next
document.getElementById('lightboxPrevRetos').addEventListener('click', showPrevReto);
document.getElementById('lightboxNextRetos').addEventListener('click', showNextReto);

// Cerrar al hacer clic fuera
document.getElementById('retoLightbox').addEventListener('click', function(e) {
    if (e.target === this) closeRetoLightbox();
});

// Teclado
document.addEventListener('keydown', (e) => {
    if (document.getElementById('retoLightbox').style.display === 'flex') {
        if (e.key === 'ArrowLeft')  showPrevReto();
        if (e.key === 'ArrowRight') showNextReto();
        if (e.key === 'Escape')     closeRetoLightbox();
    }
});

// Estos eventos van dentro de DOMContentLoaded para asegurar que el lightbox existe
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('retoLightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) closeRetoLightbox();
        });
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeRetoLightbox();
});