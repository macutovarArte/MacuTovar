function filtrar(categoria) {
    // 1. Gestionar el estado activo de los botones
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(btn => {
        btn.classList.remove('activo');
        // Si el botón clicado coincide con la categoría, lo marcamos como activo
        if (btn.getAttribute('onclick').includes(categoria)) {
            btn.classList.add('activo');
        }
    });

    // 2. Filtrar las obras
    const obras = document.querySelectorAll('.obra');
    obras.forEach(obra => {
        if (categoria === 'todas') {
            obra.classList.remove('oculto');
        } else {
            if (obra.getAttribute('data-categoria') === categoria) {
                obra.classList.remove('oculto');
            } else {
                obra.classList.add('oculto');
            }
        }
    });
}
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

function openLightbox(images, index, caption) {
    currentImages = images;
    currentIndex  = index;
    lightboxImg.src = currentImages[currentIndex];
    lightboxCaption.textContent = caption || '';
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
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
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
}

function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    lightboxImg.src = currentImages[currentIndex];
    lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
}

// Abrir al hacer clic en "Ver obra"
document.querySelectorAll('.project-card').forEach(card => {
    card.querySelector('.project-overlay').addEventListener('click', (e) => {
        e.stopPropagation();
        const images  = JSON.parse(card.dataset.images);
        const index   = parseInt(card.dataset.index) || 0;
        const caption = card.querySelector('.project-title').textContent;
        openLightbox(images, index, caption);
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
