---
title: "How to Prevent Double Bookings: The Engineering Behind an Appointment Calendar"
category: "Tools"
date: "2026-10-10"
updated: "2026-10-21"
excerpt: "Two people can choose the same time before confirming. Learn to reason about intervals, availability and concurrent requests using an appointment calendar such as AntraPro."
published: true
tags: ["AntraPro", "Programación", "Bases de Datos"]
sourceSlug: "evitar-dobles-reservas-sistema-citas"
translated: "2026-10-10"
---

An appointment calendar looks simple: a date, a time and a name. The difficulty appears when two clients see the same free slot and both try to book it. **Displaying availability and guaranteeing a reservation are different problems.** If you are building a portfolio project, that distinction matters more than another screen of attractive cards.

[AntraPro](https://antrapro.app?utm_source=ulises_io&utm_medium=referral&utm_campaign=antrapro_guides&utm_content=en_evitar-dobles-reservas-sistema-citas), one of my projects, brings together appointments, clients, staff availability and a public booking page for service businesses. I will use it as context for the problem; the engineering approaches below are general design criteria, not a description of its internal implementation.

## Model intervals, not just start times

A 30-minute haircut and a 60-minute service occupy different amounts of time. To detect a conflict, you need a start, an end and the resource doing the work: for example, the barber.

Two intervals overlap when the first starts before the second ends and ends after the second starts. Under that rule, an appointment from 10:00 to 10:30 allows another at 10:30. If cleaning requires ten minutes, that buffer must also occupy availability.

| Existing booking | New request | Result for the same person |
| --- | --- | --- |
| 10:00–10:30 | 10:15–10:45 | Conflict |
| 10:00–10:30 | 10:30–11:00 | Compatible, without an additional buffer |
| 10:00–11:00 | 10:20–10:40 | Conflict, despite a different start time |

The rule changes if a business reserves a room as well as a person. A professional being free does not prove the room is free. Define your resources before designing the form.

## The screen is not the source of truth

Imagine two tabs loading at 09:00. Both show 10:00 as available. The first confirms, while the second keeps an outdated screen. Disabling the button in the first browser does not protect the second.

The server must check the conditions again at confirmation and protect that check and appointment creation against concurrent requests. Depending on the database and model, consider transactions, locks or integrity constraints. A separate lookup followed by an insert leaves a window for a conflict.

Saying “I use a transaction” is not enough: check its isolation guarantees and what happens when two requests compete. The meaningful test sends both and verifies that at most one booking succeeds for a resource with a capacity of one.

## A retry should not create another appointment

The network can fail after a booking is saved but before the response reaches the client. The client clicks again and you receive another identical request. For that situation, consider an idempotency key and a rule that can retrieve the result of the same operation.

This addresses a different problem from overlapping appointments. A repeated request and two different clients competing for a slot require different controls. Explain both in your README if you present your calendar as a [portfolio project](/en/portfolio-projects-that-strengthen-your-developer-resume).

## Design the error message too

If the slot is taken, preserve the information the person already entered and let them choose another. Avoid messages that appear to blame them for a race they could not see.

One concrete option: “That time was just booked. Choose another available time; we have kept your details.” Distinguish this from a temporary connection failure. Never display a final confirmation if you have only sent the request and do not yet know the result.

## What to check in an existing calendar

Instead of asking a business to build everything from scratch, you can evaluate a solution such as [AntraPro for barbershops](https://antrapro.app/for/barbershops?utm_source=ulises_io&utm_medium=referral&utm_campaign=antrapro_guides&utm_content=en_evitar-dobles-reservas-sistema-citas). Its public offering includes per-barber availability, online booking and email confirmations. Before adopting it, check your actual requirements: service duration, staff working hours, breaks and the cancellation rules you need.

**An email confirmation does not guarantee attendance either.** It communicates the details; daily operations and business policies still matter.

## A small test that demonstrates judgment

For your own project, prepare five scenarios: a valid consecutive booking, a partial overlap, a contained interval, two simultaneous requests and a retry of the same request. You do not need to invent thousands of users to demonstrate that you understand the problem.

To address a business's appointment operations, [explore AntraPro](https://antrapro.app?utm_source=ulises_io&utm_medium=referral&utm_campaign=antrapro_guides&utm_content=en_evitar-dobles-reservas-sistema-citas). If you are learning to code, use these situations to turn a demonstration calendar into a project whose decisions you can defend.

## An overlap rule needs an integrity guarantee

For half-open intervals, including the start and excluding the end, intervals overlap when the new start is before the existing end and the new end is after the existing start. Consecutive appointments are compatible unless a buffer is required.

```text
conflicto = mismo_recurso
            y inicio_nuevo < fin_existente
            y fin_nuevo > inicio_existente
```

Also validate start before end and use a consistent time model. Include preparation or cleanup in resource occupancy where necessary.

A unique key on resource and start time cannot prevent every overlap: 10:00–11:00 and 10:30–11:30 have distinct starts. Integrity must cover the full interval and the states that occupy capacity.

Depending on the database and design, evaluate exclusion constraints, coordinated locking or isolation with retries. An isolated availability query is not a guarantee. Send concurrent requests and inspect persisted state as well as responses. These are general criteria, not claims about AntraPro's internal implementation. See the [architecture fundamentals](/en/software-architecture-fundamentals-and-books).
