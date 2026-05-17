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
