---
title: "VS Code retira su antiguo motor de agentes: lo importante no es el modelo, sino quién ejecuta sus herramientas"
category: Herramientas
date: '2026-11-17'
excerpt: "VS Code retirará el Local harness en febrero de 2027. La migración a Copilot revela por qué los permisos, el contexto y la ejecución importan tanto como el modelo de IA."
published: true
tags: ["VS Code", "GitHub Copilot", "Agentes", "Desarrollo", "Seguridad"]
---

El 16 de noviembre, GitHub recordó una fecha que merece atención entre quienes desarrollamos software con asistentes de IA: **Visual Studio Code eliminará su antiguo Local harness en febrero de 2027**. La versión 1.146 del editor, publicada el 11 de noviembre, ya lo marcó como obsoleto. Su sustituto, el Copilot harness, es el predeterminado para las sesiones nuevas desde VS Code 1.143.

No estamos ante el lanzamiento de un modelo que supuestamente escribe código mejor que todos los anteriores. Es un cambio menos vistoso, pero quizá más importante para el trabajo diario: la pieza que decide qué contexto recibe el agente, qué herramientas puede usar y cómo ejecuta sus acciones.

## Un agente es más que un modelo

Cuando alguien dice que utiliza un agente de programación, suele mencionar el modelo: su capacidad para razonar, encontrar errores o proponer cambios. Pero un modelo por sí solo no abre archivos, ejecuta pruebas ni modifica un repositorio.

Para hacerlo necesita un entorno de ejecución, o *harness*, que conecte sus respuestas con herramientas, permisos, contexto y un ciclo de trabajo. Si ese entorno cambia, también puede cambiar el comportamiento práctico del agente aunque el modelo seleccionado sea el mismo.

La arquitectura anterior estaba más vinculada a la ventana del editor. Microsoft describe el nuevo Agent Host como un proceso separado que mantiene sesiones y permite acceder a ellas desde distintas superficies de VS Code. El Copilot harness utiliza el Copilot SDK, una base compartida con Copilot CLI y la aplicación de GitHub Copilot.

La consecuencia no es que todo se ejecute automáticamente en la nube. GitHub aclara expresamente que cambiar de harness **no traslada tus archivos a la nube**: los comandos pueden seguir ejecutándose en tu equipo.

## Qué cambia y cuándo

La retirada se anunció en las notas de VS Code 1.146 del 11 de noviembre y GitHub la detalló nuevamente el día 16. Durante el periodo de transición, el Local harness continúa disponible donde lo permitan las políticas de la organización, pero las mejoras se concentrarán en el reemplazo.

En febrero de 2027 desaparecerá el motor anterior, junto con la configuración empresarial temporal `vscode.temporaryDefaultToLocalHarness`. Por eso no basta con dejar activada una excepción y esperar que siga funcionando.

El nuevo motor también permite continuar una sesión entre el editor y la ventana de agentes mientras el proceso Agent Host siga activo. Algunas herramientas aportadas por el editor todavía requieren que ese editor esté conectado. Esta diferencia importa: persistencia de sesión no significa independencia absoluta de todas las herramientas.

Hay capacidades adicionales, como conectores, comparaciones de modelos y permisos asistidos, pero varias están sujetas a planes, vistas preliminares o configuración. No conviene confundir una posibilidad anunciada con una función disponible universalmente.

## La parte de seguridad que sí me interesa

La automatización tiene un costo de confianza. Un agente que puede leer un proyecto, ejecutar comandos y editar archivos tiene una superficie de acción considerablemente mayor que un chatbot que solo devuelve texto.

GitHub afirma que el Copilot harness puede aplicar políticas empresariales de permisos y restricciones de sandbox que el anterior no podía hacer cumplir. Sin embargo, advierte algo fundamental: **seleccionar el nuevo motor no activa automáticamente el sandbox**.

Esa advertencia resume un error frecuente de ingeniería: confundir una capacidad de seguridad con una configuración segura.

Mi interpretación es que el harness debe tratarse como parte de la arquitectura de confianza del desarrollo. Hay que decidir qué carpetas puede modificar, qué comandos necesitan aprobación, qué secretos quedan fuera de su alcance y cómo se revisan sus cambios. Un modelo excelente no compensa permisos excesivos.

## Qué haría en un equipo pequeño o un SaaS

No migraría a ciegas todos los flujos de trabajo. Primero abriría una sesión nueva y comprobaría que el selector indica Copilot. Después revisaría instrucciones personalizadas, agentes, hooks, herramientas y conexiones que dependan del comportamiento anterior.

Probaría tareas representativas en un repositorio no crítico: ejecutar pruebas, editar varios archivos, recuperar una sesión y solicitar una acción que requiera permiso. En un equipo, documentaría qué funciona, qué necesita ajustes y qué controles administra la organización.

También separaría las pruebas funcionales de las de seguridad. Que un agente complete una tarea no demuestra que haya respetado los límites deseados. Revisar comandos ejecutados, permisos concedidos y cambios producidos sigue siendo necesario.

Para un builder independiente, la tentación es optimizar únicamente la velocidad. Pero ahorrar minutos escribiendo código no sirve demasiado si el flujo automatizado puede romper una publicación, exponer credenciales o generar cambios difíciles de auditar.

## La conclusión

El anuncio no demuestra que Copilot sea el mejor agente de programación ni que un modelo determinado haya ganado la carrera. Sí confirma una transición concreta en la infraestructura con la que VS Code ejecuta agentes.

Mi lectura es sencilla: **el futuro de programar con IA no depende solamente de modelos más inteligentes, sino de entornos de ejecución más controlables, persistentes y verificables**.

Antes de febrero de 2027 vale la pena revisar esa capa invisible. Es menos emocionante que una nueva puntuación en benchmarks, pero afecta directamente cómo trabajamos y cuánto podemos confiar en la automatización.

## Fuentes

- [Visual Studio Code 1.146, notas oficiales (11 de noviembre de 2026)](https://code.visualstudio.com/updates/v1_146)
- [GitHub Changelog, retirada del Local harness (16 de noviembre de 2026)](https://github.blog/changelog/2026-11-16-vs-code-retires-the-local-harness-in-february-2027/)
- [Arquitectura de Agent Host, VS Code (26 de agosto de 2026)](https://code.visualstudio.com/blogs/2026/08/26/agent-host-architecture/)
