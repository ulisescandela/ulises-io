---
title: "Cómo evitar dobles reservas: el problema técnico detrás de una agenda de citas"
category: "Herramientas"
date: "2026-10-10"
excerpt: "Dos personas pueden elegir el mismo horario antes de confirmar. Aprende a modelar intervalos, disponibilidad y concurrencia con una agenda como AntraPro."
published: true
tags: ["AntraPro", "Programación", "Bases de Datos"]
---

Una agenda parece sencilla: una fecha, una hora y un nombre. La dificultad aparece cuando dos clientes ven el mismo espacio libre y ambos intentan reservarlo. **Mostrar disponibilidad y garantizar una reserva son problemas distintos.** Si estás construyendo un proyecto de portafolio, esa diferencia vale más que otra pantalla con tarjetas bonitas.

[AntraPro](https://antrapro.app/es?utm_source=ulises_io&utm_medium=referral&utm_campaign=antrapro_guides&utm_content=es_evitar-dobles-reservas-sistema-citas), uno de mis proyectos, reúne agenda, clientes, disponibilidad del equipo y una página de reservas para negocios de servicios. Lo usaré como contexto del problema; las soluciones técnicas de esta guía son criterios generales de diseño, no una descripción de su implementación interna.

## Modela intervalos, no solamente horas

Un corte de 30 minutos y un servicio de 60 minutos no ocupan lo mismo. Para detectar un conflicto necesitas inicio, fin y el recurso que realizará el trabajo: por ejemplo, el barbero.

Dos intervalos se cruzan cuando el inicio del primero está antes del final del segundo y su final está después del inicio del segundo. Con esta regla, una cita de 10:00 a 10:30 permite otra a las 10:30. Si necesitas diez minutos de limpieza, ese margen también debe ocupar disponibilidad.

| Reserva existente | Nueva solicitud | Resultado para la misma persona |
| --- | --- | --- |
| 10:00–10:30 | 10:15–10:45 | Conflicto |
| 10:00–10:30 | 10:30–11:00 | Compatible, sin margen adicional |
| 10:00–11:00 | 10:20–10:40 | Conflicto, aunque empieza a otra hora |

La regla cambia si el negocio reserva una sala además de una persona. Un horario libre del profesional no demuestra que la sala también esté libre. Define los recursos antes de diseñar el formulario.

## La pantalla no es la fuente de verdad

Imagina dos pestañas que cargan a las 09:00. Ambas muestran las 10:00 disponibles. La primera confirma y la segunda conserva una pantalla desactualizada. Desactivar el botón en el navegador de la primera no protege la segunda.

El servidor debe volver a comprobar las condiciones al confirmar y hacer que esa comprobación y la creación de la cita sean una operación protegida frente a concurrencia. Según la base de datos y el modelo, puedes evaluar transacciones, bloqueos o restricciones de integridad. Una consulta previa aislada seguida de una inserción deja una ventana para el conflicto.

No basta con decir “uso una transacción”: verifica qué aislamiento ofrece y qué ocurre cuando dos solicitudes compiten. La prueba importante envía ambas y comprueba que se acepta como máximo una reserva para un recurso de capacidad uno.

## Un reintento no debería crear otra cita

La red puede fallar después de guardar la reserva, pero antes de entregar la respuesta. El cliente vuelve a pulsar y recibes otra solicitud idéntica. Para ese caso, considera una clave de idempotencia y una regla que permita recuperar el resultado de la misma operación.

Esto resuelve un problema diferente al solapamiento. Una solicitud repetida y dos clientes distintos compitiendo por un horario requieren controles distintos. Explica ambos en el README si presentas tu agenda como [proyecto para el portafolio](/blog/proyectos-valiosos-para-tu-cv-programador).

## Diseña también el mensaje de error

Si el horario se ocupó, conserva los datos que la persona ya introdujo y ofrécele elegir otro. Evita mensajes que parezcan culparla por una competencia que no podía ver.

Una propuesta concreta: “Ese horario acaba de ocuparse. Elige otro disponible; conservamos tus datos”. Distingue este caso de un fallo temporal de conexión. Y nunca muestres una confirmación definitiva si solo has enviado la solicitud y aún no conoces el resultado.

## Qué revisar en una agenda existente

En vez de pedirle a un negocio que construya todo desde cero, puedes evaluar una solución como [AntraPro para barberías](https://antrapro.app/para/barberias?utm_source=ulises_io&utm_medium=referral&utm_campaign=antrapro_guides&utm_content=es_evitar-dobles-reservas-sistema-citas). Su propuesta pública incluye disponibilidad por barbero, reservas en línea y confirmaciones por correo. Antes de adoptarla, verifica tu caso real: duración de servicios, horarios del equipo, descansos y reglas de cancelación que necesites.

**Una confirmación por correo tampoco garantiza que el cliente asista.** Sirve para comunicar los detalles; la operación diaria y las políticas del negocio siguen importando.

## Una prueba pequeña que demuestra criterio

Para tu propio proyecto, prepara cinco escenarios: reserva consecutiva válida, solapamiento parcial, intervalo contenido, dos solicitudes simultáneas y reintento de la misma solicitud. No necesitas inventar miles de usuarios para demostrar que entiendes el problema.

Si quieres resolver la operación del negocio, [consulta AntraPro](https://antrapro.app/es?utm_source=ulises_io&utm_medium=referral&utm_campaign=antrapro_guides&utm_content=es_evitar-dobles-reservas-sistema-citas). Si estás aprendiendo a programar, usa estas situaciones para convertir una agenda de demostración en un proyecto cuyas decisiones puedas defender.
