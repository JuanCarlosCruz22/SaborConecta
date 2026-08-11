document.addEventListener('DOMContentLoaded', () => {
    initModalPerfil();
    initValidacionPerfil();
});

function initModalPerfil() {
    const btnEditar = document.querySelector('.info button'); // botón "Editar Perfil"
    const overlay = document.getElementById('modalOverlay');
    const btnCerrar = document.getElementById('btnCerrarModal');
    const btnCancelar = document.getElementById('btnCancelarPerfil');

    if (!overlay) return;

    const abrirModal = () => {
        overlay.classList.add('activo');
        document.getElementById('nombrePerfil')?.focus();
    };

    const cerrarModal = () => {
        overlay.classList.remove('activo');
        limpiarErrores();
    };

    if (btnEditar) btnEditar.addEventListener('click', abrirModal);
    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    if (btnCancelar) btnCancelar.addEventListener('click', cerrarModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) cerrarModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('activo')) {
            cerrarModal();
        }
    });
}

function initValidacionPerfil() {
    const form = document.getElementById('formEditarPerfil');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        limpiarErrores();

        const nombre = document.getElementById('nombrePerfil');
        const correo = document.getElementById('correoPerfil');
        const bio = document.getElementById('bioPerfil');

        let esValido = true;

        if (nombre.value.trim() === '') {
            mostrarErrorCampo('errorNombre', 'El nombre es obligatorio.');
            esValido = false;
        }

        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo.value.trim() === '') {
            mostrarErrorCampo('errorCorreo', 'El correo es obligatorio.');
            esValido = false;
        } else if (!regexCorreo.test(correo.value.trim())) {
            mostrarErrorCampo('errorCorreo', 'Ingresá un correo válido (ej. nombre@dominio.com).');
            esValido = false;
        }

        if (bio.value.trim().length > 200) {
            mostrarErrorCampo('errorBio', 'La biografía no puede superar los 200 caracteres.');
            esValido = false;
        }

        if (!esValido) {
            mostrarMensajePerfil('Revisá los campos marcados en rojo.', 'error');
            return;
        }

        document.querySelector('.info h2').textContent = nombre.value.trim();
        document.querySelector('.info p:nth-of-type(2)').textContent = bio.value.trim();

        mostrarMensajePerfil('Perfil actualizado correctamente.', 'exito');

        setTimeout(() => {
            document.getElementById('modalOverlay').classList.remove('activo');
        }, 1200);
    });
}

function mostrarErrorCampo(idSpan, texto) {
    const span = document.getElementById(idSpan);
    if (!span) return;
    span.textContent = texto;
    span.classList.add('visible');
    const input = span.previousElementSibling;
    if (input) input.classList.add('campo-invalido');
}

function limpiarErrores() {
    document.querySelectorAll('.mensaje-campo').forEach(span => {
        span.textContent = '';
        span.classList.remove('visible');
    });
    document.querySelectorAll('.campo-invalido').forEach(input => {
        input.classList.remove('campo-invalido');
    });
}

function mostrarMensajePerfil(texto, tipo) {
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