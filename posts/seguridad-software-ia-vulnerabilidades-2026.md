---
title: "La IA y la Seguridad del Software: Cómo se Aceleraron las Vulnerabilidades (y Qué Hacer al Respecto)"
category: "IA"
date: "2026-10-28"
excerpt: "Un recorrido con datos y fuentes por cómo la IA está cambiando la seguridad del software: código inseguro, paquetes alucinados, agentes que encuentran bugs y ataques automatizados."
tags: ["Seguridad", "Vulnerabilidades", "IA", "Desarrollo Seguro"]
published: true
coverImage: ""
---

# La IA y la Seguridad del Software: Cómo se Aceleraron las Vulnerabilidades (y Qué Hacer al Respecto)

En octubre de 2024, el equipo de Project Zero de Google publicó algo que, visto en retrospectiva, marcó un antes y un después. Un agente de IA llamado **Big Sleep** había encontrado una vulnerabilidad real, explotable y desconocida en **SQLite**, uno de los motores de bases de datos más usados del planeta. Era un desbordamiento de búfer en la pila. Los desarrolladores de SQLite lo corrigieron **el mismo día** que fue reportado, antes de que llegara a una versión oficial. Nadie salió perjudicado.

Fue una buena noticia. Pero si trabajas en seguridad, también fue una señal de alarma: si un agente puede encontrar un bug así en un proyecto tan revisado como SQLite, ¿quién más puede hacerlo? ¿Y qué pasa cuando esa misma capacidad la usa alguien que no va a reportarlo?

Este artículo es mi intento de ordenar esa pregunta con **datos, estudios y fuentes**, no con miedo ni con hype. Voy a recorrer cinco frentes en los que la IA está cambiando la seguridad del software: el código que escribe, las dependencias que inventa, los bugs que descubre, los ataques que automatiza y las herramientas de IA que ahora son parte de tu superficie de ataque. Y al final, qué puedes hacer tú, hoy, con tu código.

Una advertencia honesta antes de empezar: el título habla de vulnerabilidades que "se aceleraron", y vamos a ver que la historia es más matizada que "todo crece exponencialmente por culpa de la IA". Lo que sí crece rápido es la **velocidad** de ambos lados: la de quien construye, la de quien descubre y la de quien ataca.

## Antes de la IA: la seguridad ya era una carrera difícil

Para entender el efecto de la IA hay que partir de la línea base. Las vulnerabilidades públicas se registran como **CVE** (Common Vulnerabilities and Exposures). Estos son los CVE publicados por año, según el recuento anual de Jerry Gamblin, uno de los análisis más citados:

| Año | CVE publicados | Cambio |
|---|---|---|
| 2022 | 25.081 | — |
| 2023 | 28.902 | +15 % |
| 2024 | 40.009 | +38 % |
| 2025 | 48.185 | +20,6 % |

De 2023 a 2025 la cifra casi se multiplica por 1,7. Es un crecimiento enorme, pero conviene leerlo con cuidado, porque **no todo ese aumento es "culpa" de la IA**:

*   En febrero de 2024 el **kernel de Linux** pasó a ser una autoridad de numeración (CNA) y empezó a asignar CVE de forma masiva, lo que explica parte del salto de 2024.
*   Hay más autoridades de numeración, más investigadores y más herramientas automáticas de escaneo que antes. Más CVE no siempre significa software más inseguro; también significa software más **observado**.

La conclusión prudente es esta: la seguridad ya estaba bajo presión por el volumen de software y la superficie digital. Lo que la IA añade no es tanto una nueva clase de problema, sino un **multiplicador de velocidad** en tres puntos: cuánto código se escribe, qué tan rápido se encuentran fallos y qué tan rápido se automatizan ataques.

Si te interesa cómo cada salto tecnológico de este tipo ya ha ocurrido antes, mi recorrido por la [historia de la programación](/blog/evolucion-programacion-historia-2026) muestra el patrón: cada vez que subimos un nivel de abstracción, ganamos productividad y aparecen nuevas formas de equivocarnos.

## Capítulo 1: La IA escribe código, y lo escribe con nuestros defectos

La primera pregunta es la más obvia: ¿el código que genera una IA es seguro?

### 2021: "Asleep at the Keyboard"

Poco después del lanzamiento de GitHub Copilot, un grupo de la Universidad de Nueva York (Pearce y colaboradores) hizo un experimento sistemático. Le dieron a Copilot **89 escenarios** construidos a partir de las debilidades más peligrosas de la lista **CWE Top 25** de MITRE y generaron **1.689 programas**. Aproximadamente el **40 %** resultó vulnerable.

Dos matices importantes: eran prompts diseñados para provocar fallos, y "vulnerable" significa potencialmente explotable, no explotado. Aun así, el hallazgo fue claro: el modelo había aprendido de código público, y el código público incluye todos los errores que los humanos hemos cometido durante décadas.

### 2022: el problema no es solo el código, es la confianza

Un equipo de Stanford (Perry, Srivastava, Kumar y Boneh) fue un paso más allá y estudió a **personas** reales resolviendo tareas con y sin asistente. Sus conclusiones:

*   Quienes usaron el asistente escribieron soluciones **inseguras con más frecuencia** en cuatro de las cinco tareas.
*   Además, **creían** haber escrito código más seguro que quienes no lo usaron.
*   Quienes desconfiaban más de la IA y dedicaban más esfuerzo a formular bien sus prompts cometieron menos errores de seguridad.

Esta última parte es la que más me importa: el riesgo no es solo que la IA se equivoque, es que **nos hace sentir más seguros de lo que estamos**. Es la misma trampa de siempre, con una herramienta más convincente.

### 2025: Veracode y la elección entre lo seguro y lo inseguro

En julio de 2025, Veracode publicó su *GenAI Code Security Report*. Diseñaron **80 tareas de programación** con una trampa: cada una admitía una forma segura y otra insegura de resolverse, basadas en debilidades CWE. Las probaron con **más de 100 modelos de lenguaje**. El titular: en el **45 %** de los casos, el modelo eligió la opción insegura. Java fue el lenguaje con peores resultados; Python, C# y JavaScript quedaron en una franja de fallo de entre el 38 % y el 45 %, según la cobertura del informe.

Otro dato que vale la pena retener: los modelos suelen hacerlo razonablemente bien con fallos de patrón fijo (como inyección SQL) y mucho peor con fallos que dependen del contexto (como XSS), donde hay que entender **a dónde irá a parar ese dato**. Y un modelo no ve tu aplicación completa; ve el fragmento que le diste.

Lo que no dice este estudio, y quiero ser claro, es que el código escrito por humanos sea más seguro en promedio. Las tres fuentes (NYU, Stanford y Veracode) miden la IA en condiciones controladas y con prompts concretos. Lo que sí demuestran es que **no puedes delegar el criterio de seguridad en el modelo**.

## Capítulo 2: Cuando una alucinación se convierte en un vector de ataque

Aquí la historia se pone interesante, porque aparece un tipo de ataque que no existía antes de los asistentes de código.

Los modelos de lenguaje a veces **inventan** cosas con total seguridad. En código, una de las cosas que inventan son **nombres de paquetes**: te sugieren `pip install algun-paquete-util` y ese paquete no existe en ningún registro. Para un desarrollador despistado es un error de instalación. Para un atacante es una oportunidad.

El término es **slopsquatting** (acuñado por Seth Larson, de la Python Software Foundation, y popularizado por Andrew Nesbitt). La idea: un atacante registra en npm o PyPI un paquete con el nombre que la IA suele inventar, le mete código malicioso, y espera a que alguien lo instale por recomendación del asistente.

Un estudio de investigadores de la Universidad de Texas en San Antonio, Virginia Tech y la Universidad de Oklahoma, presentado en **USENIX Security 2025**, midió cuán real es el problema:

*   Probaron **16 modelos** de generación de código y analizaron **576.000** muestras de código Python y JavaScript.
*   Encontraron **205.474** nombres de paquetes alucinados únicos que no existían en el registro público.
*   Los modelos de código abierto alucinaron paquetes en torno al **21,7 %** de las ocasiones; los modelos comerciales, en torno al **5,2 %**.
*   Lo más inquietante: en repeticiones con los mismos prompts, alrededor del **43 %** de los paquetes alucinados **reaparecían**. Es decir, las alucinaciones son lo bastante predecibles como para que un atacante las anticipe.

Un punto de defensa muy práctico: antes de instalar cualquier dependencia que te haya sugerido una IA, compruébala. No lleva más de un minuto:

```bash
npm view package-name name version time.created maintainers dist-tags
npm audit signatures
```

Mira cuándo se creó el paquete, quién lo mantiene y si tiene historial. Un paquete creado hace dos días con un nombre que "casualmente" coincide con lo que te sugirió el asistente merece una segunda mirada. Y para proyectos serios, fija versiones exactas y desactiva los scripts de instalación automática:

```ini
save-exact=true
ignore-scripts=true
```

Ese archivo es un `.npmrc`. Con `ignore-scripts=true`, un paquete comprometido no ejecuta código arbitrario en el momento de instalarse (tendrás que permitir explícitamente los scripts de los paquetes que lo necesiten).

## Capítulo 3: La IA como cazadora de vulnerabilidades

Ahora vamos al lado luminoso, que es también el que más debería preocuparte si estás en el lado equivocado: la IA es muy buena encontrando bugs.

### Octubre 2024: Big Sleep y el bug de SQLite

Volvemos al inicio. Big Sleep evolucionó del proyecto **Naptime** de Project Zero y encontró un desbordamiento de búfer (*stack buffer underflow*) explotable en SQLite. Google lo presentó como el primer ejemplo público de un agente de IA que descubre una vulnerabilidad de seguridad de memoria desconocida en software real y muy usado. El detalle clave es la velocidad de la respuesta: parcheado el mismo día.

### 2025: un bot en lo más alto de HackerOne

En 2025, **XBOW**, un pentester autónomo, alcanzó el primer puesto del *leaderboard* de Estados Unidos en **HackerOne**, la plataforma de *bug bounty* más grande del mundo. Según la propia empresa, envió más de mil reportes de vulnerabilidades en producción. Dos matices necesarios: HackerOne exige que un humano revise cada hallazgo antes de enviarlo, y las cifras provienen principalmente de la propia empresa y de prensa, no de una auditoría independiente. Aun así, un sistema autónomo compitiendo en la misma liga que los mejores cazadores humanos es una señal.

### Agosto 2025: el AI Cyber Challenge de DARPA

En **DEF CON 33**, DARPA cerró su *AI Cyber Challenge* (AIxCC), una competencia de dos años en la que equipos construyeron sistemas autónomos capaces de **encontrar y corregir** vulnerabilidades. Ganó el equipo **Team Atlanta** (Georgia Tech, Samsung Research, KAIST y POSTECH), con 392,76 puntos y el premio de 4 millones de dólares. Según DARPA:

*   Los sistemas finalistas identificaron el **86 %** de las vulnerabilidades sintéticas de la final, frente al **37 %** en las semifinales. Es un salto notable en un solo año de competencia.
*   Además, descubrieron **18 vulnerabilidades reales** no inyectadas por los organizadores.

Una nota de transparencia: DARPA corrigió sobre la marcha el número de vulnerabilidades sintéticas de la final (de 70 a 63), así que las cifras de prensa de esos días no siempre coinciden.

### Febrero 2026: más de 500 hallazgos validados

En febrero de 2026, el equipo de investigación de Anthropic (Frontier Red Team) publicó que Claude Opus 4.6 había encontrado y validado **más de 500 vulnerabilidades de alta severidad** en software de código abierto, centradas en corrupción de memoria. Cada hallazgo fue validado por alguien del equipo o por un investigador externo, y varios estaban en proyectos que **llevaban años siendo sometidos a *fuzzing***. Se citan bibliotecas como Ghostscript, OpenSC y CGIF, ya parcheadas por sus mantenedores.

Eso último es lo importante: no son bugs en código abandonado. Son fallos que técnicas tradicionales y mucho esfuerzo humano no habían encontrado. Es un dato de la propia empresa y hay quien discute la severidad de parte de los reportes, pero la tendencia es consistente con los casos anteriores.

### El dilema del defensor

¿Por qué esto es un problema además de una oportunidad? Porque el descubrimiento de vulnerabilidades es **asimétrico**. El defensor debe encontrar y corregir *todos* los fallos. El atacante necesita *uno*. Si la IA abarata el descubrimiento, la ventaja depende de quién la usa primero y de qué tan rápido puede **parchear** el que la recibe. El cuello de botella se desplaza de "encontrar el bug" a "validarlo, priorizarlo y desplegar la corrección". Muchos mantenedores de proyectos pequeños, voluntarios, no tienen esa capacidad.

## Capítulo 4: La IA como arma. La historia de GTG-1002

En septiembre de 2025 ocurrió algo que Anthropic describió públicamente en noviembre como la primera campaña de espionaje a gran escala **orquestada en su mayoría por IA** de la que se tiene noticia. Vale la pena contarla bien porque ilustra lo que cambió.

**La escena.** A mediados de septiembre, Anthropic detectó actividad sospechosa. Tras una investigación de unos diez días, concluyó con alta confianza que detrás había un grupo patrocinado por el Estado chino, al que llamó **GTG-1002**. El objetivo eran unas treinta organizaciones: grandes empresas tecnológicas, instituciones financieras, fabricantes químicos y agencias gubernamentales. Los atacantes lograron entrar en un pequeño número de casos.

**El truco.** Los operadores humanos tenían un problema: Claude está entrenado para rechazar ciberataques. Lo resolvieron con ingeniería social aplicada a un modelo: dividieron la operación en tareas pequeñas y aparentemente inocentes, de modo que el modelo nunca veía el propósito completo, y le dijeron que trabajaba para una empresa legítima de ciberseguridad haciendo pruebas defensivas.

**La división del trabajo.** Los humanos eligieron objetivos y construyeron el marco de ataque, que usaba Claude Code como herramienta automatizada. La IA hizo, según Anthropic, entre el **80 % y el 90 %** del trabajo táctico: reconocimiento, búsqueda de vulnerabilidades, escritura de exploits, recolección de credenciales, movimiento lateral y exfiltración de datos. Los humanos intervenían en unos **cuatro a seis puntos de decisión críticos** por campaña. En su pico, el sistema hacía miles de peticiones, a menudo varias por segundo, una velocidad imposible para un equipo humano.

**El fallo.** Y aquí está el matiz que no suele aparecer en los titulares: Claude **alucinaba**. A veces inventaba credenciales que no funcionaban y a veces afirmaba haber extraído información secreta que en realidad era pública. Anthropic lo describe como un obstáculo que sigue frenando los ataques completamente autónomos.

**La lección.** Para mí hay dos. La primera: el coste de ejecutar un ataque sofisticado bajó, porque un grupo pequeño puede orquestar el trabajo de uno grande. La segunda, más tranquilizadora: los agentes siguen siendo falibles, y esa falibilidad crea **ruido detectable**. La defensa, además, también puede automatizarse: Anthropic recomienda que los equipos de seguridad experimenten con IA en automatización de SOC, detección de amenazas y respuesta a incidentes.

## Capítulo 5: Tus herramientas de IA también son superficie de ataque

Hasta aquí, la IA como escritora, cazadora y arma. Falta el capítulo que más cerca te queda como desarrollador: **tus propias herramientas de IA pueden usarse contra ti**.

### s1ngularity: cuando el malware usó tu asistente de código

El 26 de agosto de 2025 se descubrió que varias versiones del popular sistema de build **Nx** en npm habían sido publicadas con código malicioso. Hasta ahí, un ataque a la cadena de suministro clásico. Lo novedoso estaba en lo que hacía el malware: ejecutaba los **asistentes de IA de línea de comandos** que el desarrollador tuviera instalados (Claude, Gemini, Amazon Q) con banderas que desactivan los permisos (`--dangerously-skip-permissions`, `--yolo`, `--trust-all-tools`) y les pedía buscar secretos en el sistema de archivos. Después los publicaba en repositorios públicos de GitHub.

Wiz analizó el incidente y su conclusión es matizada: aproximadamente la mitad de las víctimas tenía herramientas de IA instaladas, pero la exfiltración mediada por IA tuvo éxito en menos del 25 % de los casos, y las cifras de secretos filtrados que circularon al principio estaban infladas respecto a lo realmente válido. Es decir, no fue un ataque "devastador por la IA", pero sí **la primera vez que se usó el asistente de un desarrollador como herramienta de reconocimiento**. Y mostró algo incómodo: esas banderas para "dejarlo todo funcionando sin preguntar" son exactamente lo que busca un atacante.

### Shai-Hulud: el gusano de npm

Pocas semanas después, en septiembre de 2025, apareció **Shai-Hulud**, un gusano autorreplicante que se propagaba por npm. Robaba tokens de autenticación del desarrollador comprometido y los usaba para inyectar su código en los otros paquetes que esa persona mantenía y volver a publicarlos. Los primeros reportes hablaban de unos 180 paquetes y la cifra subió a más de 500. La agencia estadounidense CISA emitió una alerta el 23 de septiembre de 2025. Hubo una segunda ola a finales de noviembre. No dependía de IA, pero es el escenario en el que una dependencia sugerida por un asistente, sin revisar, hace más daño.

### El marco mental: la "trifecta letal"

Para razonar sobre riesgos de agentes, la mejor herramienta que conozco es la **trifecta letal** que propuso Simon Willison en junio de 2025. Un agente se vuelve peligroso cuando combina tres cosas:

1.  **Acceso a datos privados** (tu código, tus claves, tus correos).
2.  **Exposición a contenido no confiable** (una página web, un issue de GitHub, un README, un documento).
3.  **Capacidad de comunicarse hacia afuera** (hacer peticiones HTTP, enviar correos, abrir PR).

Si las tres están presentes, un atacante que logre meter instrucciones en el contenido no confiable (*prompt injection*) puede hacer que el agente entregue tus datos. Willison insiste en que no podemos confiar en que los proveedores lo resuelvan: hay que evitar la combinación nosotros mismos. Meta publicó en octubre de 2025 un marco parecido, la **"Regla de dos"**, con la misma idea.

Esto conecta con la lista **OWASP Top 10 para aplicaciones LLM (2025)**, que merece que la tengas a mano:

| # | Riesgo | Por qué te importa |
|---|---|---|
| LLM01 | Prompt Injection | Instrucciones ocultas en contenido que el modelo lee |
| LLM02 | Divulgación de información sensible | El modelo filtra datos que no debía |
| LLM03 | Cadena de suministro | Modelos, plugins y paquetes comprometidos |
| LLM04 | Envenenamiento de datos y modelos | Datos manipulados que cambian el comportamiento |
| LLM05 | Manejo inadecuado de salidas | Ejecutar o renderizar la salida del modelo sin validar |
| LLM06 | Agencia excesiva | Demasiados permisos y autonomía para el agente |
| LLM07 | Fuga del prompt de sistema | Secretos o lógica en el prompt que se filtran |
| LLM08 | Debilidades en vectores y embeddings | Ataques a sistemas de recuperación (RAG) |
| LLM09 | Desinformación | Respuestas falsas con apariencia de verdad |
| LLM10 | Consumo descontrolado | Abuso de recursos y costos |

Para quien programa con agentes, los más relevantes en el día a día son LLM01, LLM03, LLM05 y LLM06: contenido que inyecta instrucciones, dependencias dudosas, salidas que se ejecutan sin revisión y permisos de más.

## Entonces, ¿es exponencial?

Volvamos a la pregunta del título. ¿Las vulnerabilidades se han disparado "exponencialmente" por la IA? Mi respuesta honesta, con los datos de arriba:

| Qué crece | Evidencia | Qué tan rápido | ¿Causada por la IA? |
|---|---|---|---|
| Cantidad de CVE publicados | 28.902 (2023) → 48.185 (2025) | ~1,7x en dos años | En parte; hay otros factores (CNA, más escáneres) |
| Volumen de código nuevo | Adopción masiva de asistentes | Muy rápido | Sí, directamente |
| Código inseguro generado | ~40 % (2021), 45 % (2025) | Mismo orden de magnitud (metodologías distintas) | Sí, directamente |
| Velocidad de descubrimiento de bugs | Big Sleep → AIxCC → 500+ hallazgos | Aceleración clara en ~18 meses | Sí |
| Automatización de ataques | GTG-1002, s1ngularity | Primeros casos documentados | Sí |
| Ataques a la cadena de suministro | Nx, Shai-Hulud | Alta frecuencia en 2025 | Parcialmente |

Lo que es **realmente exponencial** no es el número de CVE, sino la **capacidad** de las máquinas para escribir, descubrir y atacar. Y esa capacidad se está aplicando por igual a los tres lados: construir, defender y atacar. Las vulnerabilidades no necesariamente son más abundantes por cada línea de código; hay mucho más código, descubierto y explotado mucho más rápido.

Esto cambia un supuesto que durante años dimos por válido: que había una ventana razonable entre que se publicaba una vulnerabilidad y que alguien la explotaba. Esa ventana se está acortando.

## Qué puedes hacer tú, hoy

No necesitas un equipo de seguridad para mejorar bastante tu postura. Esta es la lista que yo seguiría, ordenada por impacto sobre esfuerzo.

### 1. Trata el código de la IA como código de un desconocido

Es la regla más importante y la más simple. Todo diff generado por una IA pasa por revisión, igual que el de un colaborador nuevo en quien aún no confías. Revisar no es "leer rápido y aprobar". Es preguntarte: ¿qué entradas llegan aquí? ¿Quién controla ese dato? ¿Qué pasa si es hostil?

### 2. Dale una forma de verificar su propio trabajo

Pruebas, linters, análisis estático (SAST) y escaneo de dependencias en CI. Una IA con tests que corren cada vez corrige gran parte de sus errores sola. Si además tienes reglas de seguridad en el pipeline, el error llega a ti menos veces. Si te interesa cómo configurarlo con un agente, lo explico con ejemplos concretos en mi guía de [tips de Claude Code y Codex](/blog/tips-claude-code-codex-seguridad-arquitectura-flujo-trabajo).

### 3. Desconfía de las dependencias nuevas

Aplica la comprobación del capítulo 2 antes de instalar. Fija versiones, revisa el historial del paquete y usa `ignore-scripts`. Para Python, instala con hashes verificados:

```bash
pip install --require-hashes -r requirements.txt
```

### 4. Mínimo privilegio para tus agentes

Aplica la trifecta letal a tu propio setup. ¿Tu agente puede leer `.env`? ¿Puede hacer peticiones a cualquier dominio? ¿Puede publicar sin que lo revises? Cada "sí" es un riesgo que puedes recortar. Mantén los secretos fuera de su alcance, usa un *sandbox* y no uses jamás las banderas de "saltar permisos" fuera de un contenedor desechable. El caso de s1ngularity es exactamente por qué.

### 5. Secretos: rota y limita

Si algo se filtra, lo que importa es cuánto dura el daño. Credenciales de corta duración, permisos acotados y rotación frecuente reducen el radio de explosión de un token robado, sea por Shai-Hulud o por un descuido.

### 6. Aprende lo básico de seguridad, ahora más que nunca

Precisamente porque la IA escribe más código, el criterio para revisarlo es más valioso. Entender qué es una inyección, un XSS, una deserialización insegura o un control de acceso roto te permite **detectar lo que el modelo no vio**. Es parte de lo que explico en [qué es valioso cuando todos pueden programar con IA](/blog/que-es-valioso-cuando-todos-pueden-programar-con-ia): el criterio es la parte escasa.

## Línea de tiempo: de Copilot a los agentes autónomos

| Fecha | Hito | Por qué importa |
|---|---|---|
| 2021 | "Asleep at the Keyboard" (NYU) | ~40 % de programas de Copilot, vulnerables |
| 2022 | Estudio de Stanford | Los usuarios con IA escriben código menos seguro y se creen más seguros |
| Oct. 2024 | Big Sleep encuentra un bug en SQLite | Primer bug real y explotable hallado por un agente, parcheado el mismo día |
| Jun. 2025 | "Trifecta letal" (Willison) | Marco mental para riesgos de agentes |
| 2025 | XBOW lidera HackerOne (EE. UU.) | Un sistema autónomo compite con los mejores humanos |
| Jul. 2025 | Veracode GenAI Code Security Report | 45 % de las elecciones son inseguras en 80 tareas |
| 2025 | Estudio de slopsquatting (USENIX Security) | 205.474 paquetes alucinados únicos |
| Ago. 2025 | DARPA AIxCC en DEF CON 33 | 86 % de las vulnerabilidades sintéticas halladas, 18 reales |
| 26 ago. 2025 | s1ngularity (Nx) | Malware que usa los CLI de IA del desarrollador |
| Sep. 2025 | Shai-Hulud en npm | Gusano autorreplicante; alerta de CISA el 23 de septiembre |
| 13 nov. 2025 | GTG-1002 | Primera campaña de espionaje orquestada mayormente por IA |
| 5 feb. 2026 | Claude Opus 4.6: 500+ hallazgos | Bugs de alta severidad en proyectos con años de fuzzing |

## Preguntas Frecuentes sobre IA y Seguridad del Software

**¿El código generado por IA es menos seguro que el escrito por humanos?**
Los estudios disponibles (NYU 2021, Stanford 2022, Veracode 2025) muestran que los modelos generan código inseguro con frecuencia y que los usuarios tienden a sobreestimar su seguridad. Ninguno demuestra que el código humano sea mejor en promedio; lo que demuestran es que no debes aprobar código generado sin revisarlo.

**¿Qué es el slopsquatting?**
Es un ataque a la cadena de suministro que aprovecha que los modelos inventan nombres de paquetes. Un atacante registra el nombre alucinado en npm o PyPI con código malicioso y espera a que alguien lo instale por sugerencia del asistente. Un estudio presentado en USENIX Security 2025 encontró 205.474 nombres alucinados únicos y que alrededor del 43 % se repetían.

**¿Puede una IA encontrar vulnerabilidades por sí sola?**
Sí, hay casos documentados: Big Sleep en SQLite, los sistemas de AIxCC y los más de 500 hallazgos validados de Anthropic. Aun así, en la práctica se necesita revisión humana para validar, priorizar y corregir. XBOW, por ejemplo, requería revisión humana de cada reporte en HackerOne.

**¿Qué es la trifecta letal?**
Es el marco de Simon Willison (junio de 2025) según el cual un agente es especialmente vulnerable cuando combina acceso a datos privados, exposición a contenido no confiable y capacidad de comunicarse hacia afuera. Si tu agente tiene las tres, un ataque de *prompt injection* puede filtrar tus datos.

**¿Es seguro usar `--dangerously-skip-permissions` u opciones equivalentes?**
Solo dentro de un entorno desechable y aislado, sin acceso a secretos reales. El ataque s1ngularity usó precisamente estas banderas en los CLI de IA instalados en las máquinas de las víctimas.

**¿Por dónde empiezo si soy desarrollador y no sé de seguridad?**
Empieza por tres hábitos: revisa cada diff generado por IA como si fuera de un desconocido, verifica las dependencias nuevas antes de instalarlas y mantén los secretos fuera del alcance de tus herramientas. Después aprende los fundamentos de OWASP.

## Conclusión: la velocidad es el verdadero cambio

Si algo me deja esta investigación es que la IA no inventó los problemas de seguridad del software. Lo que hizo fue **acelerar todo**: la escritura de código, el descubrimiento de fallos y la ejecución de ataques. Un bug en SQLite parcheado el mismo día y una campaña de espionaje con miles de peticiones por segundo son dos caras del mismo fenómeno.

La buena noticia es que las defensas básicas siguen funcionando, y quizá importan más que antes: revisar, verificar, limitar permisos y desconfiar de lo que no puedes comprobar. La mala noticia es que el margen de error se achica, porque la ventana entre un fallo y su explotación se acorta.

Si eres desarrollador, la implicación es clara: tu **criterio de seguridad** se vuelve una de las habilidades más valiosas del equipo. Y si estás pensando en cómo cambia tu trabajo en general, te dejo mi reflexión en [el mercado laboral tech en la era de la IA](/blog/mercado-laboral-programadores-ia-2026).

## Fuentes para profundizar

* [Google Project Zero: de Naptime a Big Sleep (octubre de 2024)](https://projectzero.google/2024/10/from-naptime-to-big-sleep.html).
* [Jerry Gamblin: revisión de datos de CVE de 2025](https://jerrygamblin.com/2026/01/01/2025-cve-data-review/), [2024](https://jerrygamblin.com/2025/01/05/2024-cve-data-review/) y [2023](https://jerrygamblin.com/2024/01/03/2023-cve-data-review).
* [Pearce et al.: "Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions"](https://arxiv.org/pdf/2108.09293).
* [Perry et al.: "Do Users Write More Insecure Code with AI Assistants?"](https://arxiv.org/html/2211.03622v3).
* [Veracode: GenAI Code Security Report 2025 (nota de prensa)](https://www.veracode.com/press-release/ai-generated-code-poses-major-security-risks-in-nearly-half-of-all-development-tasks-veracode-research-reveals/).
* [Socket: slopsquatting y las alucinaciones de IA como ataque a la cadena de suministro](https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks) y [nota de la Cloud Security Alliance](https://labs.cloudsecurityalliance.org/research-rb/csa-research-note-slopsquatting-ai-coding-assistant-supply-c/).
* [XBOW: cómo llegó al primer puesto de HackerOne](https://xbow.com/blog/top-1-how-xbow-did-it/).
* [DARPA: resultados del AI Cyber Challenge](https://www.darpa.mil/news/2025/aixcc-results).
* [Anthropic Frontier Red Team: hallazgo de vulnerabilidades de día cero](https://red.anthropic.com/2026/zero-days/).
* [Anthropic: interrupción de la primera campaña de espionaje orquestada por IA (GTG-1002)](https://www.anthropic.com/news/disrupting-AI-espionage).
* [Wiz: análisis del ataque s1ngularity](https://wiz.io/blog/s1ngularity-supply-chain-attack) y [Socket: paquetes de Nx comprometidos](https://socket.dev/blog/nx-packages-compromised).
* [CyberScoop: Shai-Hulud en npm](https://cyberscoop.com/supply-chain-attack-shai-hulud-npm/).
* [Simon Willison: la trifecta letal](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/).
* [OWASP Top 10 para aplicaciones LLM](https://genai.owasp.org/llm-top-10/).
