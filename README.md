# SaborConecta

## Descripción del proyecto

SaborConecta es una plataforma digital colaborativa para la gestión y descubrimiento de recetas culinarias. Permite a los usuarios planificar sus comidas según presupuesto, preferencias dietéticas e ingredientes disponibles, además de fomentar una comunidad activa de chefs y aficionados a la cocina que comparten, valoran y mejoran recetas de forma colaborativa.

## Alcance

Este repositorio corresponde al **Avance I** del proyecto del curso SOFT-06 (Diseño y programación web). En esta etapa el alcance es:

- Definir la propuesta de solución para la problemática de gestión culinaria.
- Diseñar los wireframes de navegación y disposición de contenido para al menos 6 funcionalidades, distribuidas entre dos tipos de usuario: **Chef/Experto culinario** y **Usuario regular**.
- Establecer la estructura del repositorio y la estrategia de trabajo colaborativo en GitHub que se usará durante el resto del proyecto.

La implementación funcional con HTML, CSS y JavaScript se desarrollará en avances posteriores, a partir de la retroalimentación recibida sobre esta maquetación.

## Integrantes y roles

| Integrante | Rol en este avance |
|---|---|
| Juan Carlos Cruz | Repositorio y documentación (README.md) |
| Esteban López | Wireframes de Usuario regular |
| Alejandro Navarro | Wireframes de Chef/Experto culinario |
| Julián Salazar | Integración, navegación entre wireframes y entrega final |

## Estructura del repositorio

```
SaborConecta/
├── README.md
└── docs/
    └── wireframes.pdf   (wireframes de las 6 funcionalidades, con flujo de navegación)
```

La carpeta `docs` se irá utilizando en próximos avances para mantener toda la documentación del proyecto (wireframes, manuales, diagramas, etc.).

## Estrategia de branches y commits

- **main**: rama principal y estable. Solo se actualiza mediante Pull Requests revisados, nunca con push directo.
- Cada integrante trabaja en su propia rama, con la convención `feature/<tarea>`, por ejemplo:
  - `feature/wireframes-usuario-regular`
  - `feature/wireframes-chef`
  - `feature/integracion-navegacion`
  - `feature/readme`
- Al finalizar una tarea, se abre un **Pull Request** hacia `main` para que el resto del equipo revise antes de fusionar.
- Los mensajes de commit son cortos, descriptivos y en español, indicando la acción realizada. Ejemplos:
  - `Agrega wireframe de búsqueda por ingredientes`
  - `Conecta navegación entre dashboard y planificador de comidas`
  - `Actualiza README con estrategia de branches`
