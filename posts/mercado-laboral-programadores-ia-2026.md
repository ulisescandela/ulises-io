---
title: "El Mercado Laboral Tech en la Era de la IA: Por Qué Creo que Todos los Trabajos Van a Cambiar (y el Mío Ya Cambió)"
category: "Carrera"
date: "2026-10-27"
excerpt: "Mi teoría sobre el mercado laboral actual, contrastada con estudios y datos: qué dicen Stanford, METR, Stack Overflow y DORA, y cómo cambia el trabajo de un desarrollador cuando ya no escribe gran parte del código."
tags: ["Mercado Laboral", "Futuro del Desarrollo", "IA", "Carrera"]
published: true
coverImage: ""
---

# El Mercado Laboral Tech en la Era de la IA: Por Qué Creo que Todos los Trabajos Van a Cambiar (y el Mío Ya Cambió)

Durante años, mi trabajo se podía resumir en una frase: escribir código. Abría el editor, entendía un problema, lo traducía a instrucciones y lo mandaba a producción. Esa era la parte que sentía "mía". Hoy, esa frase ya no describe lo que hago. **Ya no escribo mucho del código que llega a producción.**

No lo digo con nostalgia ni con drama. Lo digo porque me obligó a hacerme una pregunta incómoda: si una parte tan central de mi trabajo cambió tanto en tan poco tiempo, ¿qué le está pasando a todos los demás trabajos? Mi teoría, y de eso trata este artículo, es que **sí, todos los trabajos van a cambiar**, y que el de desarrollador es solo el primero en el que se nota con claridad.

Pero las teorías son baratas. Lo que hace valiosa una opinión es contrastarla. Así que en este artículo voy a hacer dos cosas: contarte cómo se ve este cambio desde dentro, y ponerlo frente a los **estudios más serios que existen hasta ahora**: Stanford, METR, la encuesta de Stack Overflow, el informe DORA de Google, el Foro Económico Mundial y los datos de uso de Anthropic. Algunos refuerzan mi teoría, otros la matizan y uno la pone en duda. Tú juzgas.

## Lo que cambió en mi día a día

Voy a empezar por lo concreto. Mi jornada ya no gira alrededor de teclear funciones. Gira alrededor de otras cosas:

*   **Decidir qué construir y por qué**, y describirlo con la precisión suficiente para que otra "mente" (humana o no) lo pueda ejecutar.
*   **Revisar**: leer lo que se generó, entenderlo, detectar lo que está mal, lo que falta y lo que es peligroso.
*   **Verificar**: asegurarme de que algo funciona de verdad, con pruebas, y no solo de que "parece" funcionar.
*   **Pensar en seguridad y arquitectura**: lo que un modelo no ve porque no conoce todo el contexto del sistema.
*   **Asumir la responsabilidad**: cuando algo falla en producción, nadie le pregunta al modelo. Me lo preguntan a mí.

Si has leído mi artículo sobre [qué es valioso cuando todos pueden programar con IA](/blog/que-es-valioso-cuando-todos-pueden-programar-con-ia), esto te sonará familiar: lo escribí como hipótesis, y hoy lo vivo como rutina. Y fíjate en algo: **ninguna de esas tareas es "programar" en el sentido clásico, y todas requieren saber programar**. Esa es, quizá, la paradoja central de este momento.

## Mi teoría en tres afirmaciones

Para que se pueda discutir (y refutar), voy a convertir mi intuición en tres afirmaciones concretas:

1.  **Casi ningún trabajo del conocimiento desaparece de golpe, pero casi todos cambian de forma.** El título puede seguir igual; el contenido diario no.
2.  **El cambio se nota primero en la entrada de la carrera.** Las tareas más repetibles y mejor definidas, que tradicionalmente hacían los perfiles junior, son las más fáciles de automatizar.
3.  **El valor se mueve hacia la especificación, la verificación y la responsabilidad.** No hacia "producir" cosas, sino hacia decidir cuáles producir, comprobar que están bien y responder por ellas.

Ahora, a los datos.

## Capítulo 1: Todos lo usan, casi nadie confía del todo

Empecemos por la adopción, porque es el punto de partida de todo lo demás.

La **encuesta de desarrolladores de Stack Overflow 2025** reporta que el **84 %** de los encuestados usa o planea usar herramientas de IA en su proceso de desarrollo, frente al 76 % del año anterior. Hasta aquí, lo esperable. Lo interesante viene al preguntar por confianza: el **46 %** desconfía activamente de la precisión de estas herramientas, mientras que solo el **33 %** confía en ella, y apenas un **3 %** dice confiar "mucho". Un año antes, la confianza era del 43 %.

Es decir: **cada vez se usa más y se confía menos.** Esto, que parece contradictorio, para mí tiene sentido: cuanto más usas una herramienta, mejor conoces sus fallos.

El informe **DORA 2025** de Google, basado en casi **5.000 profesionales** de tecnología, apunta en la misma dirección: alrededor del **90 %** usa IA en su trabajo y cerca del **65 %** depende de ella de forma intensiva. Su hallazgo central es una frase que me parece clave: la IA actúa como un **amplificador**. Magnifica las fortalezas de las organizaciones que ya funcionan bien y también las disfunciones de las que no. Además, a diferencia del año anterior, el informe asocia el uso de IA con mayor velocidad de entrega, pero advierte de que acelerar el desarrollo puede exponer debilidades más adelante en el proceso.

| Fuente | Dato | Lo que me dice |
|---|---|---|
| Stack Overflow 2025 | 84 % usa o planea usar IA | La adopción ya es la norma |
| Stack Overflow 2025 | 46 % desconfía de su precisión, 33 % confía | La confianza va por detrás del uso |
| DORA 2025 | ~90 % usa IA, ~65 % de forma intensiva | No es un experimento, es el flujo de trabajo |
| DORA 2025 | La IA es un "amplificador" | Equipos buenos mejoran, equipos malos empeoran |

Mi lectura: si el 84 % ya usa IA, **no usarla no es una ventaja competitiva, es una desventaja**. Y si la confianza es baja, **la verificación es donde se acumula el valor**. Aquí empieza a cobrar sentido mi tercera afirmación.

## Capítulo 2: Los canarios en la mina

Ahora la parte que más me inquieta, y la que más rigor merece.

En agosto de 2025, tres investigadores de Stanford (Erik Brynjolfsson, Bharat Chandar y Ruyu Chen) publicaron un trabajo con un título que ya es una metáfora: ***"Canaries in the Coal Mine?"*** (¿Canarios en la mina de carbón?). Los mineros llevaban canarios porque, al ser más sensibles al gas tóxico, avisaban del peligro antes de que afectara a los humanos. La pregunta de los autores: ¿quiénes son los canarios del mercado laboral frente a la IA generativa?

Usaron datos de nóminas de **ADP**, una de las mayores empresas de procesamiento de nóminas de Estados Unidos, que permiten ver el empleo real mes a mes. Su hallazgo principal: los trabajadores de **22 a 25 años** en las ocupaciones **más expuestas a la IA** han sufrido una **caída relativa del empleo** del **13 %** (en la versión de agosto de 2025; una versión posterior de noviembre de 2025 reporta un 16 %), incluso después de controlar por choques específicos de cada empresa. Entre las ocupaciones más afectadas, la cobertura destaca a los **desarrolladores de software** y a los agentes de atención al cliente. Además, el estudio encuentra que las caídas se concentran donde la IA tiende a **automatizar** el trabajo y no donde lo **aumenta**.

Lo que no dice el estudio también importa, y los propios autores lo señalan: advierten de que los hechos que documentan podrían estar influidos en parte por otros factores además de la IA generativa (yo pensaría, por ejemplo, en el ciclo de tasas de interés del sector tecnológico). Y es un estudio sobre **Estados Unidos**, con una ventana de tiempo corta. Yo lo leo como una **señal temprana, no como una sentencia**.

Pero conecta con mi segunda afirmación de forma directa. Piensa en cómo se aprendía el oficio: los perfiles junior hacían tareas acotadas, bien definidas y repetibles (arreglar un bug sencillo, escribir una prueba, construir un formulario) y así desarrollaban el criterio. Son justamente las tareas que mejor hace hoy una IA. **Si esa primera escalera se rompe, el reto ya no es solo automatizar, es cómo se forma la siguiente generación de gente con criterio.** Es una pregunta que no tiene respuesta fácil, y que me parece más importante que cualquier titular de "la IA va a quitar empleos".

Si estás en esa etapa, te recomiendo mi guía de [cómo aprender programación en la era de la IA](/blog/como-aprender-programacion-era-ia) y el [roadmap de desarrollador de cero a contratado](/blog/roadmap-desarrollador-2026-de-cero-a-contratado).

## Capítulo 3: La paradoja de la productividad

Hasta aquí parece que la IA lo acelera todo. Pero hay un estudio que me hizo frenar y reconsiderar mis propias sensaciones, y por eso lo cuento aquí aunque en parte contradiga mi entusiasmo.

En julio de 2025, el grupo de investigación **METR** publicó un ensayo controlado aleatorizado, el estándar de oro para este tipo de preguntas. Reclutaron a **16 desarrolladores experimentados** de proyectos de código abierto grandes y maduros en los que ya trabajaban, y les asignaron **246 tareas reales** al azar: en unas podían usar IA y en otras no. Las herramientas eran las de principios de 2025 (Cursor era la principal).

El resultado: cuando se permitía la IA, los desarrolladores tardaron un **19 % más**. Es decir, fueron **más lentos**. Pero lo más revelador no es eso, sino la percepción: antes de empezar esperaban ir un **24 % más rápido**, y después de terminar, creían que habían ido un **20 % más rápido**. Se equivocaban incluso sobre su propia experiencia.

Hay que leer este estudio con cuidado, porque los autores advierten de sus límites: son pocos desarrolladores, muy experimentados, trabajando en repositorios grandes que ya conocían, con herramientas de hace un par de años. No implica que hoy ocurra lo mismo, ni que ocurra en otros contextos (proyectos pequeños, perfiles menos experimentados, tareas nuevas).

Lo que me llevo es esto:

*   **La sensación de productividad no es una medida de productividad.** Es fácil sentir velocidad cuando el modelo escribe mucho código; lo difícil es ver el tiempo que se va en esperar, corregir y revisar.
*   Si tu valor está en **verificar y decidir**, entonces medir tu trabajo por "cuánto código salió" es el indicador equivocado. Lo coherente con mi teoría: el cuello de botella se mueve de escribir a revisar.
*   Esto es también una advertencia a quien dirija equipos: **mide resultados, no impresiones**.

## Capítulo 4: Automatizar o aumentar. ¿Cómo usas la herramienta?

Anthropic analizó cómo se usa Claude en tareas de desarrollo de software dentro de su *Economic Index*. Un dato de su informe de abril de 2025: en **Claude Code**, el **79 %** de las conversaciones se clasificó como **automatización** (la IA ejecuta la tarea directamente), frente al **49 %** en la versión de chat de Claude.ai. En el resto, el usuario colabora con la IA (aumento).

Es una fotografía puntual de una herramienta y un momento concretos, no la cifra de todo el uso de IA, y los datos posteriores muestran que las proporciones se mueven con el tiempo. Pero ilustra bien una diferencia que me importa mucho: **no es lo mismo usar la IA para que te haga la tarea que usarla para hacer tú mejor la tarea.** Y recuerda el hallazgo de Stanford: los efectos negativos en empleo se concentraron donde la IA automatiza.

Para mí, la traducción práctica es esta: cuando automatizas, tu valor está en definir el objetivo, verificar el resultado y responder por él. Cuando aumentas, tu valor es tu propio criterio, que la IA potencia. En ambos casos, **el criterio es lo que no se delega**.

## Capítulo 5: Esto ya lo hemos visto

Cada vez que aparece una tecnología que automatiza una parte del trabajo, el miedo es el mismo y la historia suele ser más matizada. En mi [recorrido por la historia de la programación](/blog/evolucion-programacion-historia-2026) cuento cómo el ensamblador abarató el código binario, los lenguajes de alto nivel abarataron el ensamblador y cada salto elevó el nivel de abstracción. La profesión no desapareció: **se movió hacia arriba** y se amplió.

El **Foro Económico Mundial**, en su *Future of Jobs Report 2025*, encuestó a más de 1.000 grandes empleadores (más de 14 millones de trabajadores) y proyecta para 2030 la creación de unos **170 millones de nuevos empleos** y la desaparición de **92 millones**, con un saldo neto de **78 millones**. Son proyecciones de los empleadores, no certezas, y el desglose varía por sector. Pero muestran algo importante que coincide con mi primera afirmación: **destrucción y creación ocurren a la vez**. El problema no es la cantidad total, es la **transición**: quien pierde un tipo de trabajo rara vez es quien consigue el nuevo sin esfuerzo.

Aquí es donde mi opinión se separa de los dos extremos habituales. No creo que "la IA reemplazará a todos los programadores" (hablo de eso en [¿La IA está reemplazando a los desarrolladores?](/blog/ia-reemplazando-developers)). Pero tampoco creo que "todo seguirá igual". Creo que el trabajo **cambia de forma**, y que quien no cambie con él se queda con un título que describe una actividad que ya no es el centro del oficio.

## Cómo veo que cambia cada rol (mi teoría, no un hecho)

Esta tabla es mi **hipótesis**, basada en lo que veo y en los datos anteriores. Tómala como punto de discusión, no como predicción:

| Rol | Antes: el centro era... | Ahora: el centro se mueve hacia... |
|---|---|---|
| Desarrollador | Escribir funcionalidades | Especificar, revisar, integrar y responder por el sistema |
| QA / Testing | Ejecutar y escribir pruebas manuales | Diseñar estrategias de verificación y automatizarlas |
| Seguridad | Auditar código escrito por personas | Revisar código generado a escala y proteger a los propios agentes |
| Diseño de producto | Producir pantallas y maquetas | Explorar muchas opciones rápido y elegir con criterio |
| Gestión de producto | Redactar requisitos | Escribir especificaciones tan precisas que una máquina las ejecute |
| Soporte | Responder consultas repetitivas | Resolver los casos complejos que la automatización no puede |

Fíjate en el patrón: en todos los casos, la tarea de **producir** se abarata y las de **decidir, verificar y asumir responsabilidad** se encarecen.

## Qué haría yo si empezara hoy

Si estuviera entrando a este mercado ahora, esto es lo que priorizaría. No es una receta garantizada; es lo que tiene sentido si mi teoría es correcta.

### 1. Aprende lo básico a fondo, aunque la IA lo escriba

Sin fundamentos no puedes revisar. Y revisar es la habilidad que más se va a pagar. Lógica, estructuras de datos, cómo funciona la red, cómo funciona una base de datos. Tengo guías para eso: [lógica y estructuras de datos](/blog/guia-completa-logica-estructuras-de-datos) y [cómo funciona internet al abrir una web](/blog/como-funciona-internet-al-abrir-una-web).

### 2. Practica especificar con precisión

Escribir qué quieres con claridad es una habilidad entrenable y escasa. Practica redactando requisitos, casos límite y criterios de "terminado" antes de pedirle nada a una herramienta.

### 3. Desarrolla criterio de seguridad y arquitectura

Es lo que un modelo no ve porque no conoce tu sistema completo. Mi guía de [fundamentos de arquitectura de software y libros recomendados](/blog/fundamentos-arquitectura-software-libros-recomendados) es un buen punto de partida. Y el contexto de seguridad lo desarrollo en [la IA y la seguridad del software](/blog/seguridad-software-ia-vulnerabilidades-2026).

### 4. Construye proyectos completos y sé capaz de explicarlos

Un portafolio con proyectos que puedas defender línea por línea pesa más que uno generado sin comprenderlo. Si lo usaste con IA, perfecto, pero sé capaz de explicar cada decisión. Mira [proyectos valiosos para tu CV](/blog/proyectos-valiosos-para-tu-cv-programador).

### 5. Cultiva habilidades que no se automatizan fácil

Comunicación, negociación, entender el negocio, trabajar con personas. Están en mi guía de [habilidades más valiosas en el desarrollo de software](/blog/habilidades-valiosas-desarrollo-software-2026).

### 6. Usa la IA a diario, pero con método

Si el 84 % ya la usa, no usarla te pone en desventaja. Pero úsala para entender, no solo para producir. Y mide: ¿realmente estás yendo más rápido, o solo lo sientes?

## Dónde puedo estar equivocado

Una teoría que no admite estar equivocada no es una teoría. Estos son los puntos débiles de la mía y qué cambiaría mi opinión:

*   **Los datos son tempranos y acotados.** El estudio de Stanford es de Estados Unidos y cubre un periodo corto en el que también cambiaron las tasas de interés y el ciclo de contratación del sector tecnológico. Si la caída de empleo junior se revierte sin cambios en la IA, mi segunda afirmación se debilita.
*   **METR usa herramientas de principios de 2025.** Los modelos y agentes mejoran rápido. Un estudio equivalente hoy podría dar otro resultado, en cualquier dirección.
*   **Mi experiencia es una muestra de uno.** Que mi trabajo cambiara tanto no significa que el de otros cambie igual de rápido. Hay sectores, regulaciones y equipos en los que la adopción es mucho más lenta.
*   **Puede que subestime la creación de trabajos nuevos.** Las proyecciones del Foro Económico Mundial apuntan a un saldo neto positivo. Si se cumple, la transición puede ser menos dolorosa de lo que temo.
*   **Puede que sobreestime el cambio de forma.** Quizá muchos trabajos cambien menos de lo que creo, y la diferencia esté en la velocidad de adopción más que en la naturaleza del trabajo.

Lo que me haría cambiar de opinión: ver que quienes ya trabajan con estas herramientas dejan de necesitar criterio de verificación (que los modelos se vuelvan tan fiables que revisar sea innecesario), o que el empleo junior se recupere sin cambios en cómo se hace el trabajo.

## Línea de tiempo: la evidencia hasta ahora

| Fecha | Hito | Qué aporta |
|---|---|---|
| Ene. 2025 | Informe del Foro Económico Mundial | 170 M de empleos creados y 92 M desplazados proyectados a 2030 |
| Abr. 2025 | Anthropic Economic Index (desarrollo de software) | 79 % de automatización en Claude Code frente al 49 % en Claude.ai |
| Jul. 2025 | Estudio de METR | Desarrolladores con IA, 19 % más lentos; creían ser 20 % más rápidos |
| Ago. 2025 | "Canaries in the Coal Mine" (Stanford) | Caída relativa del empleo de jóvenes de 22 a 25 años en ocupaciones expuestas |
| 2025 | Stack Overflow Developer Survey | 84 % usa IA; solo el 33 % confía en su precisión |
| 2025 | Informe DORA | ~90 % de adopción; la IA como amplificador |

## Preguntas Frecuentes sobre IA y el Mercado Laboral Tech

**¿La IA va a reemplazar a los programadores?**
Los datos actuales no indican una desaparición de la profesión, sino un cambio en el contenido del trabajo y señales tempranas de impacto en el empleo de nivel de entrada. El estudio de Stanford encuentra una caída relativa del empleo de jóvenes de 22 a 25 años en ocupaciones muy expuestas, entre ellas el desarrollo de software, pero sus autores advierten de que puede haber otros factores.

**¿Los desarrolladores son más productivos con IA?**
Depende del contexto. Un ensayo controlado de METR (julio de 2025) halló que desarrolladores experimentados tardaron un 19 % más con IA en proyectos grandes que ya conocían, aunque creían ir más rápido. Otros contextos (proyectos pequeños, perfiles menos experimentados, herramientas más recientes) pueden dar resultados distintos.

**¿Qué porcentaje de desarrolladores usa IA?**
Según la encuesta de Stack Overflow 2025, el 84 % la usa o planea usarla. El informe DORA 2025 estima alrededor del 90 % de adopción entre profesionales de tecnología.

**¿Qué habilidades importan más ahora?**
En mi opinión, las que no se pueden delegar: especificar con precisión, verificar y revisar, criterio de seguridad y arquitectura, comunicación y comprensión del negocio. Los fundamentos de programación siguen siendo imprescindibles, porque sin ellos no puedes revisar.

**¿Vale la pena aprender a programar hoy?**
Creo que sí, con un matiz: aprender a programar sigue siendo la base para poder revisar, depurar y decidir, pero ya no basta con aprender a escribir sintaxis. Conviene aprender también a especificar, probar y entender los sistemas completos.

**¿Qué pasa con los perfiles junior?**
Es la pregunta más abierta. Las tareas de entrada son las más automatizables, y eso pone en duda cómo se forma el criterio de la siguiente generación. Mi consejo es construir proyectos completos, entender lo que haces y usar la IA para aprender, no para saltarte el aprendizaje.

## Conclusión: el título cambia más despacio que el trabajo

Si algo me ha enseñado vivir este cambio es que **el título puede seguir igual mientras el trabajo cambia por completo**. Yo sigo siendo "desarrollador", pero la actividad que ocupa mi día es distinta a la de hace unos años. Y creo que eso va a pasar, a distinta velocidad, en casi todas las profesiones del conocimiento.

Los datos no demuestran mi teoría, pero tampoco la contradicen: adopción masiva con poca confianza, señales tempranas en el empleo de entrada, un estudio que nos recuerda que nuestras sensaciones de productividad engañan y proyecciones que hablan de creación y destrucción a la vez. Lo que sí me parece consistente es la dirección: **producir se abarata, y decidir, verificar y responder se encarecen.**

Mi consejo es práctico: no apuestes a que nada cambie ni a que todo desaparezca. Apuesta a ser alguien con criterio, capaz de explicar y defender lo que se construye. Eso, hasta donde alcanza la evidencia, es lo que menos se puede automatizar.

## Fuentes para profundizar

* [Brynjolfsson, Chandar y Chen (Stanford): "Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence"](https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine/).
* [METR: efecto de las herramientas de IA de principios de 2025 en la productividad de desarrolladores experimentados](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
* [Stack Overflow Developer Survey 2025: sección de IA](https://survey.stackoverflow.co/2025/ai).
* [DORA: estado del desarrollo de software asistido por IA 2025](https://dora.dev/research/ai/) y [resumen de Google](https://blog.google/technology/developers/dora-report-2025/).
* [Foro Económico Mundial: Future of Jobs Report 2025](https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-jobs-of-the-future-and-the-skills-you-need-to-get-them/).
* [Anthropic: el impacto de la IA en el desarrollo de software (Economic Index)](https://www.anthropic.com/research/impact-software-development).
