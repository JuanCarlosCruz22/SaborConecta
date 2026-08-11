let recetas = [];
let recetaEditandoId = null;
let siguienteId = 1;

const inputNombre = document.getElementById("nombreReceta");
const inputTipoCocina = document.getElementById("tipoCocina");
const inputDificultad = document.getElementById("dificultad");
const inputTiempoPreparacion = document.getElementById("tiempoPreparacion");
const inputPorciones = document.getElementById("porciones");

const errorNombre = document.getElementById("errorNombreReceta");
const errorTipoCocina = document.getElementById("errorTipoCocina");
const errorDificultad = document.getElementById("errorDificultad");
const errorTiempoPreparacion = document.getElementById("errorTiempoPreparacion");
const errorPorciones = document.getElementById("errorPorciones");

const listaRecetasContainer = document.getElementById("listaRecetas");
const btnPublicar1 = document.getElementById("btnPublicar1");
const btnPublicar2 = document.getElementById("btnPublicar2");

function validarFormulario() {
    let esValido = true;

    errorNombre.textContent = "";
    errorTipoCocina.textContent = "";
    errorDificultad.textContent = "";
    errorTiempoPreparacion.textContent = "";
    errorPorciones.textContent = "";

    if (inputNombre.value.trim() === "") {
        errorNombre.textContent = "El nombre de la receta es obligatorio.";
        esValido = false;
    }

    if (inputTipoCocina.value.trim() === "") {
        errorTipoCocina.textContent = "El tipo de cocina es obligatorio.";
        esValido = false;
    }

    if (inputDificultad.value.trim() === "") {
        errorDificultad.textContent = "La dificultad es obligatoria.";
        esValido = false;
    }

    if (inputTiempoPreparacion.value.trim() === "") {
        errorTiempoPreparacion.textContent = "El tiempo de preparación es obligatorio.";
        esValido = false;
    } else if (!/\d/.test(inputTiempoPreparacion.value)) {
        errorTiempoPreparacion.textContent = "Debe incluir un número (ej: 25 minutos).";
        esValido = false;
    }

    if (inputPorciones.value.trim() === "") {
        errorPorciones.textContent = "Las porciones son obligatorias.";
        esValido = false;
    } else if (!/\d/.test(inputPorciones.value)) {
        errorPorciones.textContent = "Debe incluir un número (ej: 4 porciones).";
        esValido = false;
    }

    return esValido;
}

function renderRecetas() {
    listaRecetasContainer.innerHTML = "";

    if (recetas.length === 0) {
        listaRecetasContainer.innerHTML = '<p id="sinRecetas">Aún no has creado ninguna receta.</p>';
        return;
    }

    recetas.forEach(function (receta) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "recetaCard";

        tarjeta.innerHTML = `
            <div class="recetaInfo">
                <div class="recetaInfoHeader">
                    <div>
                        <h3>${receta.nombre}</h3>
                        <div class="recetaTags">
                            <span class="tag">${receta.tipoCocina}</span>
                            <span class="tag">${receta.dificultad}</span>
                            <span class="tag"><i class="fa-solid fa-clock"></i> ${receta.tiempo}</span>
                            <span class="tag">${receta.porciones}</span>
                        </div>
                    </div>
                </div>
                <div class="recetaBotones">
                    <button class="btnVerDetalle btnEditar" data-id="${receta.id}">
                        <i class="fa-solid fa-pen"></i> Editar
                    </button>
                    <button class="btnRechazar btnEliminar" data-id="${receta.id}">
                        <i class="fa-solid fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;

        listaRecetasContainer.appendChild(tarjeta);
    });

    document.querySelectorAll(".btnEditar").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const id = Number(boton.dataset.id);
            editarReceta(id);
        });
    });

    document.querySelectorAll(".btnEliminar").forEach(function (boton) {
        boton.addEventListener("click", function () {
            const id = Number(boton.dataset.id);
            eliminarReceta(id);
        });
    });
}

function limpiarFormulario() {
    inputNombre.value = "";
    inputTipoCocina.value = "";
    inputDificultad.value = "";
    inputTiempoPreparacion.value = "";
    inputPorciones.value = "";
}

function guardarReceta() {
    if (!validarFormulario()) {
        return; 
    }

    const receta = {
        id: recetaEditandoId !== null ? recetaEditandoId : siguienteId,
        nombre: inputNombre.value.trim(),
        tipoCocina: inputTipoCocina.value.trim(),
        dificultad: inputDificultad.value.trim(),
        tiempo: inputTiempoPreparacion.value.trim(),
        porciones: inputPorciones.value.trim()
    };

    if (recetaEditandoId === null) {
        recetas.push(receta);
        siguienteId++;
    } else {
        const index = recetas.findIndex(function (r) {
            return r.id === recetaEditandoId;
        });
        recetas[index] = receta;
        recetaEditandoId = null;

        btnPublicar1.innerHTML = '<i class="fa-solid fa-arrow-right"></i> Publicar receta';
        btnPublicar2.innerHTML = '<i class="fa-solid fa-arrow-right"></i> Publicar receta';
    }

    renderRecetas();
    limpiarFormulario();
}

function editarReceta(id) {
    const receta = recetas.find(function (r) {
        return r.id === id;
    });

    if (!receta) {
        return; 
    }

    inputNombre.value = receta.nombre;
    inputTipoCocina.value = receta.tipoCocina;
    inputDificultad.value = receta.dificultad;
    inputTiempoPreparacion.value = receta.tiempo;
    inputPorciones.value = receta.porciones;

    recetaEditandoId = id;

    btnPublicar1.innerHTML = '<i class="fa-solid fa-check"></i> Guardar cambios';
    btnPublicar2.innerHTML = '<i class="fa-solid fa-check"></i> Guardar cambios';

    inputNombre.scrollIntoView({ behavior: "smooth", block: "center" });
}

function eliminarReceta(id) {
    const confirmar = confirm("¿Seguro que quieres eliminar esta receta?");

    if (!confirmar) {
        return;
    }

    recetas = recetas.filter(function (r) {
        return r.id !== id;
    });

    renderRecetas();
}

document.addEventListener("DOMContentLoaded", function () {
    btnPublicar1.addEventListener("click", guardarReceta);
    btnPublicar2.addEventListener("click", guardarReceta);

    renderRecetas();
});