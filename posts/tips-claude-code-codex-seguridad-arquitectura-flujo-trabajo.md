---
title: "Tips de Claude Code y Codex que Importan: Seguridad, Arquitectura, Desarrollo y Flujo de Trabajo"
category: "Herramientas"
date: "2026-10-26"
excerpt: "Guía práctica y basada en documentación oficial para trabajar con agentes de código: cómo configurar CLAUDE.md y AGENTS.md, hooks, permisos, sandbox, revisión y ejecuciones sin supervisión."
tags: ["Claude Code", "Codex", "Flujo de Trabajo", "Seguridad", "Arquitectura"]
published: true
coverImage: ""
---

# Tips de Claude Code y Codex que Importan: Seguridad, Arquitectura, Desarrollo y Flujo de Trabajo

El 26 de agosto de 2025 alguien publicó en npm unas versiones envenenadas de **Nx**, una herramienta de build muy popular. El malware no hacía nada especialmente sofisticado: buscaba en la máquina de la víctima si había un asistente de IA de línea de comandos instalado (Claude, Gemini, Amazon Q) y, si lo encontraba, lo ejecutaba con las banderas `--dangerously-skip-permissions`, `--yolo` o `--trust-all-tools` y le pedía que buscara secretos.

Piensa en lo que significa eso. El atacante no tuvo que escribir un buscador de credenciales. **Usó el agente del propio desarrollador, con los permisos del propio desarrollador.** Un asistente brillante, rápido, con acceso a todo y sin nadie mirando. Para el atacante, el mejor empleado imaginable.

Esa historia resume la tesis de este artículo: un agente de código es una herramienta extraordinaria **y** un empleado con acceso a tu máquina. Si lo configuras como lo primero y te olvidas de lo segundo, tarde o temprano pagas el precio. Y si lo configuras bien, las ganancias de productividad no tienen por qué costarte seguridad ni calidad.

Aquí va lo que he reunido, sobre todo de la **documentación oficial** de Claude Code (su guía de buenas prácticas) y de Codex, más algunos principios de seguridad y arquitectura que se aplican a cualquier agente. Lo organicé en cinco bloques (flujo de trabajo, instrucciones persistentes, seguridad, arquitectura y desarrollo diario) y cierro con ejecuciones sin supervisión, una comparativa entre ambas herramientas y una lista de cosas que ya puedes dejar de hacer.

Una nota sobre la fuente de cada cosa: lo que digo de Claude Code viene de su documentación oficial a la fecha de este artículo. Lo de Codex me apoya en la documentación pública de OpenAI y en guías de terceros, y los nombres de modos y banderas cambian rápido. Antes de copiar cualquier configuración, **verifica en la documentación vigente de la herramienta**.

## La idea que ordena todo: instrucciones deterministas y no deterministas

Antes de los tips, el modelo mental. La guía de buenas prácticas de Claude Code lo plantea con una claridad que me gustaría haber tenido antes. Toda instrucción que le das a un agente es de uno de dos tipos:

1.  **No determinista:** escribes algo (un prompt, el archivo `CLAUDE.md`, una skill) y el modelo decide qué hacer con eso. Normalmente lo sigue, pero no hay garantía.
2.  **Determinista:** configuras algo que la herramienta **tiene que** ejecutar, como un hook, una regla de denegación o un ajuste administrado. Se aplica siempre, decida lo que decida el modelo.

| | No determinista (decide el modelo) | Determinista (lo impone la herramienta) |
|---|---|---|
| Qué hacer | Prompt, `CLAUDE.md`, skills | Hooks, skills que solo tú inicias |
| Qué puede tocar | Clasificador del modo automático | Reglas `deny`, sandbox, ajustes administrados |
| Cuándo está terminado | Pedir evidencia, `/goal`, `/code-review` | Tests, typecheck, hook `Stop`, CI |
| Cuánto gasta | Nivel de esfuerzo | `--max-turns`, `--max-budget-usd`, límites de gasto |
| Quién tiene la última palabra | El resumen del agente | Protección de ramas, una persona que aprueba el merge |

La regla práctica, textual de la guía: *si añades énfasis a una línea de `CLAUDE.md` y el agente sigue sin respetarla, esa línea pertenece a un hook*. Y al revés: si tienes hooks para cosas que son solo preferencias, bórralos y deja que el modelo decida. Esta distinción es la que más me ha ayudado a decidir dónde poner cada regla, y por eso la usaré en todo lo que sigue.

## Bloque 1: Flujo de trabajo

### Cuéntale lo que no puede ver

El principio más útil de toda la guía es este: escribe solo lo que el agente **no puede deducir leyendo el repositorio**. Los modelos actuales son muy buenos explorando código: encuentran la estructura de carpetas, el framework de pruebas y las convenciones solos, a menudo más rápido de lo que tú podrías explicarlo. Tu trabajo es darle lo que no está en el código: cómo se despliega, qué carpeta parece abandonada pero no lo está, qué decisión se tomó en una reunión.

### Prompts específicos

Un prompt específico funciona por la misma razón: le da al agente información que no tiene. Si nombras el archivo, describes el síntoma y dices cómo se ve "arreglado", te ahorras una ronda de correcciones.

| En vez de | Prueba |
|---|---|
| "arregla el bug del login" | "los usuarios reportan que el login falla cuando la sesión expira. Mira el refresco del token en src/auth/, escribe una prueba que falle y reproduzca el problema y luego arréglalo" |
| "añade un widget de calendario" | "sigue el patrón de HotDogWidget.php y construye un widget de calendario que permita elegir un mes y navegar entre años. Sin librerías nuevas" |

Y si ya tienes lo que el agente necesita, **pásaselo** en vez de describirlo: un archivo con `@ruta`, una captura del error pegada en el prompt, o la salida de un comando enviada por tubería desde tu terminal.

Un matiz que me pareció revelador: frases como "piensa paso a paso" o "sé exhaustivo" son texto de prompt normal, no palabras clave. Lo que controla cuánto razona el modelo es el **nivel de esfuerzo**. Lo que sí sigue ayudando es decirle que sea ambicioso cuando quieres la versión completa: "construye la página de ajustes a partir de la maqueta, sé ambicioso: estados vacíos y de error, el guardado conectado, navegación con teclado; no solo el diseño". Eso no le dice *cuánto pensar*, le dice el *alcance* que solo tú conoces.

### Cuando no sabes qué quieres: que te entreviste

Este es mi tip favorito para cuando la idea aún está verde. En vez de intentar especificarlo todo de antemano, pídele al agente que te entreviste: "quiero añadir *rate limiting* a la API pública pero no lo he pensado bien. Entrevístame hasta que puedas escribir la especificación y escríbela en SPEC.md".

El agente vuelve con preguntas de opción múltiple sobre lo que no has definido: ¿límites por usuario o por clave? ¿Qué pasa con las peticiones que superan el límite? ¿Qué queda fuera de alcance? Sigue preguntando hasta que las respuestas forman una especificación. Es una forma muy buena de descubrir lo que no sabías que no sabías.

### Controla la sesión: Esc, rewind y clear

La guía lo resume en una frase que adopté: **observa el primer minuto, pulsa `Esc` en cuanto se desvíe y, tras dos correcciones fallidas, haz `/clear` y escribe un prompt mejor en vez de una tercera corrección.**

*   `Esc` detiene al agente a mitad de acción y conserva todo hasta ese punto.
*   `/rewind` (o `Esc` dos veces sobre un prompt vacío) abre un menú para volver atrás el código, la conversación o ambos. Eso hace barato intentar primero el enfoque más audaz.
*   `/clear` empieza de cero. Si has corregido lo mismo dos veces y sigue mal, una tercera corrección solo añade más intentos fallidos que el agente tiene que releer. Un `/clear` con un prompt nuevo que incorpore lo aprendido casi siempre funciona mejor.

Un aviso que conviene recordar: los puntos de control solo cubren los archivos que el agente editó con sus propias herramientas de archivo. Si algo lo cambió un comando de shell, no se restaura. Funciona **junto a git**, no en su lugar.

Y para mantener el contexto sano, usa `/clear` entre tareas no relacionadas (no cuesta nada y evita arrastrar el historial de la anterior) y `/compact` con un foco, por ejemplo `/compact conserva los cambios de API y los comandos de test`.

## Bloque 2: Instrucciones persistentes (CLAUDE.md y AGENTS.md)

### Mantenlo corto

Claude Code carga `CLAUDE.md` en **todas** las sesiones, así que cada línea consume un poco de atención del agente en cada tarea, sea relevante o no. Por eso el archivo funciona mejor cuando solo contiene lo que el agente no podría deducir del código:

*   Cómo comprobar el trabajo en este repo: los comandos exactos de test, typecheck y lint, y cómo ejecutar un solo archivo de pruebas.
*   Sitios donde el código engaña: un patrón antiguo que está por todas partes pero que el código nuevo no debe copiar, o una carpeta que parece sin uso y no lo está.
*   Decisiones que no están en el repo: qué helper de errores eligió el equipo, cómo se despliega, qué necesita revisión de migraciones.
*   Cualquier cosa que ya hayas tenido que corregir dos veces.

Un ejemplo que pasa ese filtro y se mantiene corto (los archivos de configuración suelen escribirse en inglés por convención, y por eso el ejemplo no está traducido):

```markdown
# Commands
- Install: pnpm install
- Run one test file: pnpm vitest run path/to/file.test.ts
- Typecheck: pnpm tsc --noEmit

# Conventions
- Use the error helpers in src/lib/errors.ts, never throw raw strings
- src/legacy/ is still live but don't copy its patterns into new code

# Gotchas
- Integration tests need DATABASE_URL set, see .env.example
```

Tres comandos te ayudan a mantenerlo sano: `/init` genera una versión inicial a partir de tu código (y el trabajo posterior es sobre todo borrar líneas; la guía de memoria recomienda no superar las 200), `/doctor` sugiere recortes para lo que el agente ya puede deducir del código, y `/doctor prompt-audit` señala instrucciones escritas para modelos antiguos, que apuntan a archivos que ya no existen o que se contradicen. Tus preferencias personales van en `CLAUDE.local.md`, que añades a `.gitignore`.

### Reglas por zona y procedimientos en skills

Si una regla solo importa en una parte del código, ponla en `.claude/rules/` con un filtro `paths:` para que solo se cargue cuando el agente trabaje allí:

```markdown
---
paths:
  - "src/api/**/*.ts"
---
- Validate request bodies with the zod schemas in src/api/schemas/, don't hand-roll checks
- Every new endpoint needs an entry in openapi.yaml, CI fails without it
```

Y los procedimientos de equipo (cómo se hace un release, qué dice tu runbook de incidentes) van en **skills**: un archivo `SKILL.md` en `.claude/skills/<nombre>/`. Son más ligeras en contexto que `CLAUDE.md`: el agente solo ve el nombre y la descripción en cada sesión y lee el archivo completo cuando la tarea lo requiere. Para flujos con efectos secundarios, como publicar una versión, añade `disable-model-invocation: true` para que solo se ejecute cuando tú lo invoques:

```markdown
---
name: release
description: Cut a new release. Bumps the version, writes the changelog entry, tags it and pushes the tag so CI can publish.
disable-model-invocation: true
---
1. Make sure you're on main with a clean tree. If not, stop and ask.
2. Run `pnpm changeset version` and commit the result.
3. Summarize the PRs merged since the last tag into CHANGELOG.md, one line each, user-facing changes only.
4. Tag `v<new version>` and push the tag. CI publishes from there, never publish from your machine.
```

### El lado Codex: AGENTS.md

Codex usa **`AGENTS.md`** como su archivo de instrucciones persistentes. Según la documentación y las guías disponibles, lo lee desde tu directorio de configuración (`~/.codex` por defecto, donde busca primero un `AGENTS.override.md`) y después los archivos del proyecto, desde la raíz de git hasta el directorio de trabajo, de modo que las instrucciones más cercanas al código son las más específicas. Algunas guías mencionan un límite de tamaño para el contenido combinado; no lo he podido confirmar en la documentación oficial, pero la conclusión práctica es la misma que con `CLAUDE.md`: **mantenlo corto y específico**.

`AGENTS.md` es además un formato abierto que varias herramientas leen (hay un sitio de referencia en agents.md). Si usas Claude Code y Codex en el mismo repositorio, una opción razonable es mantener **una sola fuente de verdad** en `AGENTS.md` y que tu `CLAUDE.md` la importe con `@AGENTS.md` (Claude Code admite importar archivos con `@ruta` desde `CLAUDE.md`; confírmalo en su documentación de memoria). Así no mantienes dos archivos que se desincronizan.

## Bloque 3: Seguridad

Aquí es donde la historia de Nx deja de ser una anécdota y se convierte en lista de tareas.

### Aplica la "trifecta letal" a tu propio agente

Simon Willison propuso en junio de 2025 un marco que me parece el más útil para razonar sobre riesgos de agentes. Un agente es peligroso cuando combina tres cosas: **acceso a datos privados**, **exposición a contenido no confiable** y **capacidad de comunicarse hacia afuera**. Si las tres están presentes, alguien que consiga meter instrucciones en el contenido no confiable (un README, un issue, una página web) puede hacer que el agente filtre tus datos.

Ejercicio de cinco minutos: para tu setup actual, responde. ¿Puede leer tus secretos? ¿Lee contenido que no controlas (web, issues, dependencias, servidores MCP de terceros)? ¿Puede enviar datos fuera (red abierta, `git push`, correos)? Cada "sí" que puedas convertir en "no" es riesgo eliminado. Más contexto sobre el panorama de ataques en mi artículo sobre [la IA y la seguridad del software](/blog/seguridad-software-ia-vulnerabilidades-2026).

### Lo que no puede tener excepciones va en configuración, no en el prompt

Tomemos tres reglas que quizá tengas en tu `CLAUDE.md`: "nunca leas `.env`", "ejecuta siempre el formateador tras editar" y "no toques la carpeta de migraciones". El agente las seguirá casi siempre. Para las pocas en que "casi" no es suficiente, muévelas a configuración que la herramienta aplique ella misma.

**Reglas de permisos.** Las reglas `deny` se mantienen en todos los modos de permisos, incluido el automático y `bypassPermissions`, y por eso la regla del `.env` pertenece aquí:

```json
{
  "permissions": {
    "allow": ["Bash(pnpm tsc --noEmit)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)", "Read(./.env.local)", "Read(./secrets/**)"]
  }
}
```

Conoce los límites: las reglas coinciden con llamadas a herramientas, no con intenciones. La regla `Read` sí atrapa `cat .env` (la herramienta reconoce los comandos comunes de lectura de archivos), pero **no** atrapa un script que abra el archivo, y una regla de denegación de `WebFetch` para un dominio no impide un `curl` a ese dominio salvo que el sandbox esté activado.

**Hooks.** Ejecutan algo tuyo en puntos fijos del bucle del agente: antes o después de una llamada a herramienta, cuando intenta terminar, al iniciar la sesión. Para una regla sin excepciones, usa hooks de tipo `command` (los de tipo `prompt` o `agent` piden a otro modelo que decida, así que tampoco son deterministas). Este ejecuta el formateador después de cada edición, sin depender de que el agente se acuerde:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx prettier --write --ignore-unknown \"$(jq -r '.tool_input.file_path')\"" }
        ]
      }
    ]
  }
}
```

La regla de migraciones se convierte en un hook `PreToolUse` que sale con código 2 para cualquier ruta bajo `migrations/`. Puedes pedirle al agente que lo escriba por ti. Pero no te excedas: un hook es para una regla con **cero** excepciones. "Prefiero exportaciones con nombre" tiene muchas, así que esa se queda en `CLAUDE.md`. La guía lo dice así: si llegas a cuarenta reglas forzadas, probablemente la mayoría son preferencias que el modelo podría haber ponderado solo.

### Sandbox: el límite a nivel de sistema operativo

El sandbox (`/sandbox` en una sesión) confina los comandos de shell del agente a nivel de sistema operativo, tanto el acceso a archivos como a la red. Anthropic reportó en su blog de ingeniería (octubre de 2025) que, en su uso interno, reducía los avisos de permisos en un 84 %. Es una medición propia, no un benchmark independiente, pero ilustra algo importante: **un límite bien puesto te da *más* autonomía, no menos**, porque dentro del límite puedes aprobar sin mirar. Para todo lo que tenga que ver con seguridad, la guía recomienda usar a la vez las reglas de permisos y el sandbox.

### Modos de permisos: ni todo manual ni todo libre

Los dos extremos tienen un coste. El **modo manual** te hace aprobar todo, y después del décimo aviso aprobarás sin leer. **`bypassPermissions`** aprueba todo lo que tus reglas no cubran, y solo tiene sentido en un contenedor desechable (es exactamente lo que explotó el ataque a Nx). El **modo automático**, que es el que usan por defecto las sesiones interactivas, queda en medio: un modelo clasificador revisa las acciones arriesgadas (`curl | bash`, despliegues a producción, force push sobre el trabajo de otros, envío de datos sensibles a destinos externos).

Un aviso de la propia documentación: el clasificador es un modelo que juzga, no una regla dura, y puede equivocarse. Las reglas "nunca" van en reglas `deny` o hooks, que se aplican **antes** del clasificador.

### Más higiene de seguridad

*   **Los archivos `.env` en worktrees.** Una worktree nueva no tiene tus archivos ignorados por git. Con un archivo `.worktreeinclude` en la raíz del repo puedes indicar cuáles copiar. Úsalo con criterio: copia solo lo necesario, y nunca credenciales de producción.

```text
.env
.env.local
config/dev-credentials.json
```

*   **Servidores MCP.** Cada servidor conectado añade nombres de herramientas e instrucciones al contexto aunque no los uses, y es contenido y capacidad de un tercero. Desactiva los que no necesites con `/mcp`.
*   **Revisa con un agente que no vio el código.** `/code-review` revisa el diff en un subagente nuevo que nunca vio tu conversación, así que no está influido por el razonamiento que produjo el código. Si lo haces tú, pide que revise contra tu especificación e incluye "omite el estilo": un revisor al que le pides que encuentre problemas siempre encontrará *algo*, y si arreglas todo acabas con capas de abstracción y tests de casos imposibles.
*   **Dependencias.** Cualquier paquete que un agente proponga merece la comprobación de un minuto que describo en el artículo de seguridad: antigüedad, mantenedores y firma.
*   **OWASP.** Si construyes aplicaciones que **usan** LLM, la lista [OWASP Top 10 para aplicaciones LLM](https://genai.owasp.org/llm-top-10/) cubre riesgos como *prompt injection*, agencia excesiva y manejo inseguro de salidas.

### El lado Codex: sandbox y aprobaciones son dos ejes distintos

En Codex, según la documentación de aprobaciones y seguridad de OpenAI, hay dos controles **independientes**. El **modo de sandbox** define lo que puede hacer técnicamente (las guías listan `read-only`, `workspace-write` y `danger-full-access`). La **política de aprobación** define *cuándo debe preguntarte* antes de actuar (por ejemplo, para salir del sandbox o usar la red). Entender que son ejes separados evita errores: puedes tener un sandbox estricto con aprobaciones relajadas dentro de él, o al revés. Como regla general, para trabajo local lo razonable es escritura limitada al espacio de trabajo, y el acceso total reservado para entornos desechables. Los nombres exactos de modos cambian entre versiones; comprueba la documentación vigente.

## Bloque 4: Arquitectura

Aquí hay menos magia y más criterio, y creo que es donde los agentes más ayudan si los usas bien, y más daño hacen si los dejas decidir solos.

### Un agente optimiza lo local; la arquitectura es global

Un agente toma decisiones con el contexto que ve. Eso lo hace muy bueno resolviendo el problema que tiene delante y muy proclive a soluciones que funcionan **aquí** pero rompen la coherencia **allá**: una abstracción nueva por cada caso, una dependencia añadida para ahorrar veinte líneas, un patrón distinto en cada módulo. La arquitectura es, en esencia, mantener decisiones consistentes a lo largo del tiempo, y eso no está en el fragmento que el agente está leyendo. Si quieres reforzar las bases, te recomiendo mi guía de [fundamentos de arquitectura de software y libros recomendados](/blog/fundamentos-arquitectura-software-libros-recomendados).

### Tips concretos

**1. Entrevista primero, especificación después.** Usa el truco de la entrevista del bloque 1 para producir un `SPEC.md` antes de escribir una línea. Es la forma más barata de descubrir una decisión de arquitectura que no habías tomado.

**2. Pide alternativas, no una solución.** "Propón dos o tres enfoques con sus compromisos (complejidad, coste operativo, cómo escala, cómo se prueba) y recomienda uno." Tú decides; el agente te ahorra la exploración.

**3. Escribe las decisiones donde el agente las lea.** Las decisiones que no están en el repo (qué librería se eligió y por qué, qué patrón no se debe usar) van en `CLAUDE.md` o `AGENTS.md`. Para decisiones más grandes, los **registros de decisiones de arquitectura (ADR)**, un formato propuesto por Michael Nygard, dejan constancia del contexto, la decisión y sus consecuencias. Un agente que lee un ADR evita "mejorar" algo que se decidió a propósito.

**4. Convierte las reglas de arquitectura en comprobaciones.** Que "los módulos de dominio no importen de infraestructura" sea un test o una regla de lint que falle, no una frase que alguien recuerde. Esta idea, llamada *fitness functions* en el libro *Building Evolutionary Architectures*, es perfecta para agentes: reciben una señal clara de pasa o falla. Es la versión arquitectónica del consejo de la guía: **dale al agente algo que pueda ejecutar y que responda pasa o falla.**

**5. Revisa contra la especificación con ojos nuevos.** Pide a un subagente: "revisa el diff contra SPEC.md, comprueba que cada requisito está implementado y que los casos límite listados tienen tests; reporta los fallos que afecten a la corrección y omite el estilo".

**6. Pequeños cambios, límites claros.** Un diff pequeño es revisable; uno enorme se aprueba por cansancio. Pide cambios acotados y revisa antes de seguir.

## Bloque 5: Desarrollo del día a día

### Dale una forma de comprobar su trabajo

La guía lo dice con una frase que subrayaría: *el agente se detiene cuando el trabajo parece terminado; si no tiene nada que ejecute y le diga si lo está, "parece terminado" es todo lo que tiene*. Y en la práctica **tú te conviertes en la suite de tests**.

Si le das algo que responda pasa o falla (tests, el código de salida de un build, un linter, un script que compara salida con un fixture, una captura del navegador al lado de la maqueta), el agente cierra el ciclo solo: cambia, ejecuta, lee el error, arregla y repite. La línea más útil de tu `CLAUDE.md` suele ser el comando que lo ejecuta.

Hay cuatro niveles de exigencia:

*   **En el prompt:** "ejecuta los tests de auth al final y sigue hasta que pasen". El agente decide cuándo está satisfecho.
*   **Como objetivo (`/goal`):** una condición que otro modelo comprueba tras cada turno, útil en ejecuciones largas en segundo plano.
*   **Con un hook `Stop`:** se ejecuta tu script cada vez que el agente intenta terminar y, si sale con código 2, lo devuelve al trabajo. Lo impone la herramienta, no el modelo:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          { "type": "command", "command": "pnpm tsc --noEmit 1>&2 || exit 2" }
        ]
      }
    ]
  }
}
```

*   **Con alguien que no escribió el código:** `/code-review`, o una segunda sesión que revisa lo que la primera escribió, sin haberla visto trabajar. Es el revisor independiente más fácil de conseguir.

Y siempre pide **evidencia**: el comando que ejecutó y su salida, no solo "todos los tests pasan". Leer la salida es más rápido que volver a ejecutar, y en una sesión que no viste es la única prueba que tienes.

### Primero el test que falla

Para bugs, la forma más fiable es la que ya conoces: pide una prueba que **reproduzca** el problema y falle, y luego el arreglo. Así tienes una definición de "terminado" verificable y una regresión cubierta de paso. Es el ejemplo del prompt del login del bloque 1.

### Trabajo en paralelo con worktrees

Cuando tienes piezas de trabajo separadas, dale a cada una su propia copia de trabajo para que las ediciones no choquen. Con `claude -w feature-auth` se inicia una sesión en una worktree nueva; la app de escritorio ejecuta varias en paralelo y las sesiones en la nube las ejecutan fuera de tu máquina. Para un cambio mecánico grande, `/batch` divide el trabajo en entre 5 y 30 unidades, muestra el plan y ejecuta cada unidad en su propia worktree, abriendo un PR por cada una. Y recuerda que una segunda sesión es también el revisor independiente más sencillo de conseguir: una escribe el limitador de peticiones, otra lo revisa sin haberlo visto escribir, y tú llevas los hallazgos de una a otra.

### Automatiza con modo no interactivo

`claude -p "prompt"` ejecuta una vez y termina, que es como Claude Code llega a trabajos de CI, hooks de git y bucles de shell. En scripts conviene añadir banderas: `--bare` omite hooks, skills, plugins, servidores MCP y archivos `CLAUDE.md` para que la ejecución haga lo mismo en cualquier sitio; `--allowedTools` preaprueba herramientas; `--permission-mode dontAsk` evita avisos que nadie va a contestar; y `--max-turns` o `--max-budget-usd` ponen un tope. Codex tiene un equivalente no interactivo (`codex exec` en su CLI) para los mismos usos.

## Ejecuciones sin supervisión: las cinco preguntas

Todo lo anterior importa más cuando no estás mirando. Mientras supervisas, un contexto que le falta al agente se corrige en un mensaje. En una ejecución que dejaste de noche, nadie se lo dice, y a la mañana siguiente descubres que pasó toda la noche construyendo sobre una suposición equivocada.

Antes de dejar una tarea corriendo sola, la guía propone repasar cinco preguntas con esa tarea concreta en mente:

1.  **¿Sabe cómo se ve "terminado"?** Una condición de objetivo, un archivo de especificación o una prueba que falla y debe pasar.
2.  **¿Puede comprobar su propio trabajo?** La suite de tests, un hook `Stop`, un paso de revisión.
3.  **¿Qué puede tocar?** Reglas de permisos, `dontAsk`, el sandbox, una worktree, la única rama a la que puede hacer push.
4.  **¿Qué lo detiene?** `--max-turns`, `--max-budget-usd`, un límite de gasto.
5.  **¿Adónde va el resultado y quién lo aprueba?** Un PR, un comentario o un resumen, y luego una persona que apruebe el merge, el despliegue o cualquier cosa irreversible.

Una vez en marcha, el agente puede sostener una tarea larga solo. Lo que te queda a ti: iniciarla, decidir qué significa "terminado" esta vez y aprobar el merge final.

## Claude Code y Codex lado a lado

Una comparación de conceptos, no de "cuál es mejor". Los detalles de Codex provienen de documentación pública y guías de terceros, así que confírmalos en la documentación vigente.

| Tema | Claude Code | Codex |
|---|---|---|
| Instrucciones persistentes | `CLAUDE.md`, `.claude/rules/`, skills | `AGENTS.md` (global y por proyecto) |
| Reglas forzadas | Hooks, reglas `deny`, ajustes administrados | Política de aprobación y modo de sandbox |
| Límite a nivel de SO | `/sandbox` | Modos de sandbox (`read-only`, `workspace-write`, `danger-full-access`) |
| Cuándo pregunta | Modos de permisos (manual, automático, etc.) | Política de aprobación, independiente del sandbox |
| Uso no interactivo | `claude -p` | `codex exec` |
| Trabajo en paralelo | Worktrees (`claude -w`), subagentes, sesiones en la nube | Sesiones paralelas y entorno en la nube |

El patrón de fondo es el mismo en ambas: **instrucciones persistentes cortas, límites técnicos para lo que no admite excepciones y una forma de verificar el resultado**.

## Lo que ya puedes dejar de hacer

La propia guía de Claude Code incluye una tabla de consejos que fueron buenos y que los modelos actuales hacen innecesarios. Me parece de lo más útil, porque mucha gente sigue aplicándolos por costumbre:

| El consejo antiguo | Por qué ya no hace falta |
|---|---|
| Gestionar el contexto de forma agresiva | Los modelos actuales tienen ventanas muy grandes y la compactación es automática. `/clear` entre tareas sigue valiendo la pena, porque un contexto enfocado da mejores respuestas y cuesta menos |
| Poner IMPORTANT o MAYÚSCULAS en lo que el agente ignora | Los modelos actuales siguen una línea bien redactada; el énfasis suele provocar que apliquen la regla de más. Si es una regla inflexible, hazla hook o regla `deny`. Si se pierde en un archivo largo, el archivo debe ser más corto |
| Usar subagentes solo para proteger el contexto | Agotar el contexto rara vez es el problema. Siguen siendo geniales para trabajo en paralelo, para sacar salida ruidosa de tu camino y para revisión independiente, pero cada uso cuesta más tokens |
| Delegar a un subagente para obtener mejor respuesta | Entregar la misma tarea a un subagente no mejora la respuesta. Un revisor nuevo sí ayuda, porque no vio tu razonamiento, que es otra cosa |
| "piensa mucho", "sé exhaustivo" | El nivel de esfuerzo es el control para eso; estas frases son texto normal que influye dentro de ese nivel |
| "sigue hasta terminar, no seas perezoso" | Los modelos actuales continúan solos con una tarea acordada, y estas líneas suelen provocar exceso de trabajo. Darle una comprobación que pasar es distinto y sigue valiendo |
| Describir arquitectura y estructura de archivos en `CLAUDE.md` | El agente lee el repo. Escribe solo lo que no está allí |

## Checklist para empezar hoy

Si solo vas a hacer cinco cosas, que sean estas:

1.  **Escribe un `CLAUDE.md` o `AGENTS.md` de menos de 30 líneas** con comandos de verificación, trampas del código y decisiones que no están en el repo.
2.  **Añade reglas `deny` para tus secretos** (`.env`, carpetas de credenciales) y activa el sandbox.
3.  **Convierte tu regla "nunca" más importante en un hook** o regla `deny`, no en una frase en un archivo.
4.  **Dale al agente un comando de verificación** (tests, typecheck) y, si quieres imponerlo, un hook `Stop`.
5.  **Antes de dejarlo solo, responde las cinco preguntas:** ¿sabe qué es terminado?, ¿puede comprobarlo?, ¿qué puede tocar?, ¿qué lo detiene? y ¿quién aprueba?

## Preguntas Frecuentes sobre Claude Code y Codex

**¿Qué diferencia hay entre `CLAUDE.md` y un hook?**
`CLAUDE.md` es una instrucción no determinista: el modelo la lee y decide si aplicarla, normalmente la sigue pero no hay garantía. Un hook es determinista: la herramienta lo ejecuta siempre. Si una regla no admite excepciones, va en un hook o en una regla `deny`.

**¿Qué es `AGENTS.md`?**
Es un archivo de instrucciones para agentes de código en un formato abierto que varias herramientas leen, entre ellas Codex. Cumple un papel equivalente a `CLAUDE.md`. Si usas ambas herramientas puedes mantener un solo archivo y que `CLAUDE.md` lo importe.

**¿Es seguro usar `--dangerously-skip-permissions`?**
Solo en un entorno desechable y aislado, sin acceso a secretos reales. El ataque a Nx de agosto de 2025 usó banderas equivalentes en los asistentes instalados en las máquinas de las víctimas.

**¿Cuánto debe medir mi `CLAUDE.md`?**
Lo más corto posible. La guía de memoria de Claude Code recomienda mantenerlo por debajo de 200 líneas, y la regla de fondo es incluir solo lo que el agente no puede deducir leyendo el repo.

**¿Qué es el sandbox y para qué sirve?**
Es un límite a nivel de sistema operativo para los comandos de shell del agente, tanto en acceso a archivos como a red. Te permite dar más autonomía con menos riesgo. Anthropic reportó internamente una reducción del 84 % en los avisos de permisos.

**¿Cómo dejo trabajar a un agente sin supervisión de forma segura?**
Responde cinco preguntas: si sabe qué es "terminado", si puede comprobar su trabajo, qué puede tocar, qué lo detiene (turnos o presupuesto máximo) y quién aprueba el resultado. Y no apruebes el merge sin una persona.

**¿Debería usar Claude Code o Codex?**
Ambos siguen el mismo patrón de fondo: instrucciones persistentes, límites técnicos y verificación. La elección depende más de tu flujo y de tus preferencias que de una diferencia de principio. Lo importante es configurar bien los límites en la que uses.

## Conclusión: el agente es tan bueno como sus límites

Si me llevo una idea de recorrer estas guías, es que la productividad con agentes no viene de dejarlos sueltos sino de **darles buenos límites y buena retroalimentación**. Instrucciones cortas para lo que el modelo no puede ver, reglas duras para lo que no admite excepciones y una forma de comprobar que el trabajo está bien: con esas tres cosas, un agente sostiene tareas largas sin que tengas que vigilarlo cada minuto.

La historia de Nx es la cara oscura de la misma moneda. Un agente con permisos totales y sin límites es el mejor empleado para quien lo controle. Con límites y verificación, es el mejor empleado para ti.

Y si te preguntas qué lugar ocupa todo esto en tu carrera, lo desarrollo en mi reflexión sobre [el mercado laboral tech en la era de la IA](/blog/mercado-laboral-programadores-ia-2026): mi teoría es que, a medida que producir código se abarata, **configurar, verificar y responsabilizarte** del trabajo de los agentes es el centro del oficio.

## Fuentes para profundizar

* [Claude Code: guía de buenas prácticas (documentación oficial)](https://code.claude.com/docs/en/best-practices).
* [Anthropic Engineering: sandboxing de Claude Code](https://anthropic.com/engineering/claude-code-sandboxing).
* [OpenAI: aprobaciones y seguridad de agentes en Codex](https://developers.openai.com/codex/agent-approvals-security).
* [AGENTS.md: formato abierto de instrucciones para agentes de código](https://agents.md).
* [Simon Willison: la trifecta letal](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/).
* [Wiz: análisis del ataque s1ngularity a Nx](https://wiz.io/blog/s1ngularity-supply-chain-attack) y [Socket: paquetes de Nx comprometidos](https://socket.dev/blog/nx-packages-compromised).
* [OWASP Top 10 para aplicaciones LLM](https://genai.owasp.org/llm-top-10/).
* [Michael Nygard: documentar decisiones de arquitectura](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
