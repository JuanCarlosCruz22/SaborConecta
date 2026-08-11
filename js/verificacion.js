const listaVerificacion = document.getElementById("verificacionLista");
const filtroTotal = document.getElementById("filtroTotal");
const botonesFiltro = document.querySelectorAll(".filtroBtn");

function actualizarContador() {
    const tarjetas = listaVerificacion.querySelectorAll(".recetaCard");
    const cantidad = tarjetas.length;
    filtroTotal.textContent = cantidad + (cantidad === 1 ? " receta" : " recetas");

    if (cantidad === 0) {
        listaVerificacion.innerHTML = '<p id="sinPendientes">No hay recetas por revisar.</p>';
    }
}

function quitarTarjeta(boton) {
    const tarjeta = boton.closest(".recetaCard");
    if (!tarjeta) return;

    tarjeta.remove();
    actualizarContador();
}

listaVerificacion.addEventListener("click", function (evento) {

    const btnAprobar = evento.target.closest(".btnAprobar");
    if (btnAprobar) {
        const tarjeta = btnAprobar.closest(".recetaCard");
        const nombreReceta = tarjeta.querySelector("h3").textContent;

        alert(`"${nombreReceta}" fue aprobada y ya está visible en el catálogo.`);
        quitarTarjeta(btnAprobar);
        return;
    }

    const btnRechazar = evento.target.closest(".btnRechazar");
    if (btnRechazar) {
        const tarjeta = btnRechazar.closest(".recetaCard");
        const nombreReceta = tarjeta.querySelector("h3").textContent;

        const confirmar = confirm(`¿Seguro que quieres rechazar "${nombreReceta}"?`);
        if (!confirmar) return;

        quitarTarjeta(btnRechazar);
    }
});

botonesFiltro.forEach(function (boton) {
    boton.addEventListener("click", function () {
        botonesFiltro.forEach(function (b) {
            b.classList.remove("filtroActivo");
        });
        boton.classList.add("filtroActivo");

        const filtro = boton.dataset.filtro; 
        const tarjetas = listaVerificacion.querySelectorAll(".recetaCard");

        tarjetas.forEach(function (tarjeta) {
            const estado = tarjeta.dataset.estado;
            const mostrar =
                filtro === "todas" ||
                (filtro === "pendientes" && estado === "pendiente") ||
                (filtro === "recientes" && estado === "reciente");

            tarjeta.style.display = mostrar ? "" : "none";
        });
    });
});
