document.addEventListener('DOMContentLoaded', () => {
    initLoginSimulado();
    initBusqueda();
    initFiltros();
    initAccesibilidad();
});

const ROL_KEY = 'saborconecta_rol';

function initLoginSimulado() {
    const selector = document.getElementById('selectorRol');
    const btnLogin = document.getElementById('btnLogin');

    const rolGuardado = localStorage.getItem(ROL_KEY) || 'usuario';
    aplicarRol(rolGuardado);
    if (selector) selector.value = rolGuardado;

    if (btnLogin && selector) {
        btnLogin.addEventListener('click', () => {
            const rolElegido = selector.value;
            localStorage.setItem(ROL_KEY, rolElegido);
            aplicarRol(rolElegido);
            mostrarMensaje(
                `Ingresaste como ${rolElegido === 'admin' ? 'Administrador' : 'Usuario'}`,
                'exito'
            );
        });
    }
}

function aplicarRol(rol) {
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = rol === 'admin' ? '' : 'none';
    });

    document.querySelectorAll('.usuario-only').forEach(el => {
        el.style.display = rol === 'admin' ? 'none' : '';
    });

    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.textContent = rol === 'admin' ? 'Modo Admin activo' : 'Ingresar';
    }
}

function mostrarMensaje(texto, tipo = 'info') {
    let contenedor = document.getElementById('mensajeGlobal');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'mensajeGlobal';
        contenedor.setAttribute('role', 'status');
        contenedor.setAttribute('aria-live', 'polite');
        document.body.prepend(contenedor);
    }
    contenedor.textContent = texto;
    contenedor.className = `mensaje-global mensaje-${tipo}`;
    contenedor.style.display = 'block';

    clearTimeout(contenedor._timeout);
    contenedor._timeout = setTimeout(() => {
        contenedor.style.display = 'none';
    }, 3000);
}

function initBusqueda() {
    const input = document.getElementById('inputBusqueda');
    const boton = document.getElementById('btnBuscar');
    if (!input) return;

    const ejecutarBusqueda = () => filtrarTarjetas(input.value.trim().toLowerCase());

    input.addEventListener('input', ejecutarBusqueda);
    if (boton) boton.addEventListener('click', ejecutarBusqueda);
}

function filtrarTarjetas(texto) {
    const tarjetas = document.querySelectorAll('.recetas .card');
    let visibles = 0;

    tarjetas.forEach(card => {
        const titulo = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const etiquetas = Array.from(card.querySelectorAll('.tags span'))
            .map(tag => tag.textContent.toLowerCase());

        const coincide = titulo.includes(texto) || etiquetas.some(tag => tag.includes(texto));
        card.style.display = (texto === '' || coincide) ? '' : 'none';
        if (card.style.display !== 'none') visibles++;
    });

    mostrarSinResultados(visibles === 0);
}

function mostrarSinResultados(sinResultados) {
    const seccion = document.querySelector('.recetas');
    if (!seccion) return;
    let aviso = document.getElementById('sinResultados');

    if (sinResultados) {
        if (!aviso) {
            aviso = document.createElement('p');
            aviso.id = 'sinResultados';
            aviso.textContent = 'No se encontraron recetas con ese criterio.';
            seccion.after(aviso);
        }
    } else if (aviso) {
        aviso.remove();
    }
}

function initFiltros() {
    const botones = document.querySelectorAll('.filtros button');
    if (!botones.length) return;

    botones.forEach(boton => {
        boton.setAttribute('aria-expanded', 'false');
        boton.addEventListener('click', () => toggleMenuFiltro(boton));
    });
}

function toggleMenuFiltro(boton) {
    const existente = boton.nextElementSibling;
    if (existente && existente.classList.contains('menu-filtro')) {
        existente.remove();
        boton.setAttribute('aria-expanded', 'false');
        return;
    }


    document.querySelectorAll('.menu-filtro').forEach(m => m.remove());

    const opciones = obtenerEtiquetasUnicas();
    const menu = document.createElement('div');
    menu.className = 'menu-filtro';
    menu.setAttribute('role', 'menu');

    menu.appendChild(crearOpcionFiltro('Ver todas', ''));
    opciones.forEach(valor => {
        menu.appendChild(crearOpcionFiltro(valor, valor.toLowerCase()));
    });

    boton.insertAdjacentElement('afterend', menu);
    boton.setAttribute('aria-expanded', 'true');
    menu.querySelector('button')?.focus();
}

function crearOpcionFiltro(etiquetaVisible, valorFiltro) {
    const opcion = document.createElement('button');
    opcion.type = 'button';
    opcion.textContent = etiquetaVisible;
    opcion.setAttribute('role', 'menuitem');
    opcion.addEventListener('click', () => {
        filtrarTarjetas(valorFiltro);
        document.querySelectorAll('.menu-filtro').forEach(m => m.remove());
        const input = document.getElementById('inputBusqueda');
        if (input) input.value = valorFiltro;
    });
    return opcion;
}

function obtenerEtiquetasUnicas() {
    const etiquetas = new Set();
    document.querySelectorAll('.recetas .card .tags span').forEach(span => {
        etiquetas.add(span.textContent.trim());
    });
    return Array.from(etiquetas);
}

function initAccesibilidad() {
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('usando-teclado');
        }
    });

    document.body.addEventListener('mousedown', () => {
        document.body.classList.remove('usando-teclado');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.menu-filtro').forEach(m => m.remove());
            document.querySelectorAll('.filtros button').forEach(b =>
                b.setAttribute('aria-expanded', 'false')
            );
        }
    });
}