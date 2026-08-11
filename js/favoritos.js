const botonGuardar = document.getElementById("btnGuardarReceta");
const iconoGuardar = botonGuardar ? botonGuardar.querySelector(".icono") : null;
const textoGuardar = botonGuardar ? botonGuardar.querySelector(".texto-boton") : null;

const FAVORITOS_KEY = "saborconecta_favoritos";
const idReceta = document.querySelector("h1") ? document.querySelector("h1").textContent.trim() : "receta-sin-nombre";

function obtenerFavoritos() {
    const guardados = localStorage.getItem(FAVORITOS_KEY);
    return guardados ? JSON.parse(guardados) : [];
}

function guardarFavoritos(lista) {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(lista));
}

function actualizarBotonGuardar(estaGuardado) {
    if (!botonGuardar) return;

    if (estaGuardado) {
        iconoGuardar.textContent = "❤️";
        textoGuardar.textContent = "Guardado en colección";
        botonGuardar.classList.add("guardado");
    } else {
        iconoGuardar.textContent = "🤍";
        textoGuardar.textContent = "Guardar en colección";
        botonGuardar.classList.remove("guardado");
    }
}

function alternarGuardado() {
    const favoritos = obtenerFavoritos();
    const yaGuardada = favoritos.includes(idReceta);

    let nuevaLista;
    if (yaGuardada) {
        nuevaLista = favoritos.filter(function (nombre) {
            return nombre !== idReceta;
        });
    } else {
        nuevaLista = favoritos.concat(idReceta);
    }

    guardarFavoritos(nuevaLista);
    actualizarBotonGuardar(!yaGuardada);
}

if (botonGuardar) {
    const favoritosGuardados = obtenerFavoritos();
    actualizarBotonGuardar(favoritosGuardados.includes(idReceta));

    botonGuardar.addEventListener("click", alternarGuardado);
}