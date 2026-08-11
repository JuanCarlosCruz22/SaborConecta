# SaborConecta

## Descripción del proyecto
SaborConecta es una plataforma digital colaborativa para la gestión y descubrimiento de recetas culinarias. Permite a los usuarios planificar sus comidas según presupuesto, preferencias dietéticas e ingredientes disponibles, y fomenta una comunidad activa de chefs y aficionados a la cocina.

## Alcance (Avance III)

Este repositorio corresponde al **Avance III** del proyecto del curso SOFT-06 (Diseño y programación web). A partir de la maquetación HTML/CSS del Avance II, en esta etapa se implementó la lógica de interacción en JavaScript del lado del cliente: validaciones de formularios, manejo de eventos, manipulación del DOM y simulación de operaciones típicas del sistema (login, CRUD, búsqueda y filtros).

## Cómo ejecutar el proyecto

1. Clonar o descargar este repositorio.
2. Abrir la carpeta del proyecto en un editor (recomendado: VS Code).
3. Abrir el archivo `src/Inicio.html` directamente en el navegador (o usar la extensión **Live Server**).
4. Navegar entre las pantallas usando el menú; el rol (Administrador/Usuario) se elige desde el login simulado en `Inicio.html`.

No requiere instalación de dependencias ni servidor backend: todo el estado se simula en el navegador con `localStorage`.

## Funcionalidades implementadas (JavaScript)

| # | Funcionalidad | Archivo | Descripción |
|---|---|---|---|
| 1 | Login simulado por rol | `js/usuario.js` | Selecciona rol (Administrador/Usuario), guarda la sesión en `localStorage` y muestra/oculta contenido según el rol. |
| 2 | Búsqueda de recetas en tiempo real | `js/usuario.js` | Filtra las tarjetas de recetas visibles a medida que el usuario escribe. |
| 3 | Filtros por categoría | `js/usuario.js` | Botones de filtro que muestran/ocultan recetas según etiquetas. |
| 4 | CRUD simulado de recetas | `js/admin.js` | Crear, listar, editar y eliminar recetas con validación de formulario (campos obligatorios y formatos numéricos) y mensajes de error. |
| 5 | Guardar/quitar de favoritos | `js/favoritos.js` | Alterna el estado de "guardado" de una receta y lo persiste en `localStorage`. |
| 6 | Edición de perfil | `js/perfil.js` | Modal de edición con validación de nombre, correo y biografía, y mensajes de confirmación. |
| 7 | Verificación de recetas | `js/verificacion.js` | Panel de administrador para aprobar/rechazar recetas pendientes, con filtro y contador dinámico. |

## Estructura de archivos JavaScript

```
SaborConecta/
├── js/
│   ├── admin.js          → CRUD simulado de recetas (rol Administrador)
│   ├── favoritos.js       → Guardar/quitar recetas favoritas
│   ├── perfil.js           → Edición de perfil con validación
│   ├── usuario.js         → Login simulado, búsqueda y filtros
│   └── verificacion.js    → Verificación/aprobación de recetas
├── src/                    → Pantallas HTML (Inicio, Receta, Perfil, adminDashboard, adminRecetas, adminVerificacion)
├── css/                     → Estilos (base, layout, components, por pantalla)
├── assets/                 → Recursos multimedia
└── docs/                    → Wireframes y documentación de entrega
```

## Integrantes y roles

| Integrante | Rol |
|---|---|
| Esteban López | Setup del repositorio, variables CSS globales, pantallas del rol Administrador |
| Luis Alejandro Navarro | Pantallas de Usuario/Colaborador, lógica de perfil y favoritos |
| Julián Salazar | Diseño responsive, navegación entre pantallas, accesibilidad |
| Juan Carlos Cruz | README, organización final del repositorio, control de calidad, documento de entrega |
