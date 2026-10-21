---
title: "Comandos de Git que Todo Desarrollador Debe Dominar en 2026"
category: "Herramientas"
date: "2026-01-17"
updated: "2026-10-21"
excerpt: "Git es la herramienta más importante del desarrollo moderno. Aprende los comandos esenciales que usarás todos los días, desde lo básico hasta trucos que te sacarán de apuros."
readTime: "7 min"
tags: ["Git", "Herramientas", "Terminal", "Productividad", "Básico"]
published: true
coverImage: ""
---

No importa si escribes Python, JavaScript, Rust o COBOL, si trabajas en software, usas Git. Es la herramienta que más vas a usar en tu carrera, y sin embargo, muchos desarrolladores solo conocen `git add .` y `git push`.

En este artículo te enseño los comandos de Git que realmente necesitas dominar, organizados de básico a avanzado, con ejemplos prácticos que puedes usar hoy mismo.

## Configuración inicial (solo una vez)

Antes de empezar, configura tu identidad:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

Esto es lo que aparecerá en cada commit que hagas. Si trabajas con diferentes emails (personal vs trabajo), puedes omitir `--global` y configurarlo por repositorio.

**Bonus:** Configura un editor por defecto para los mensajes de commit:

```bash
git config --global core.editor "code --wait"  # VS Code
```

---

## El flujo básico diario

### Iniciar un repositorio

```bash
git init                    # Crear un nuevo repo
git clone <url>             # Clonar uno existente
```

### Ver el estado actual

```bash
git status                  # Ver archivos modificados
git status -s               # Versión corta
```

### Agregar cambios al staging

```bash
git add archivo.js          # Agregar un archivo específico
git add .                   # Agregar todo
git add -p                  # Agregar interactivamente (muy útil)
```

El flag `-p` (patch) te permite revisar cada cambio antes de agregarlo. Úsalo cuando tengas muchos cambios y quieras hacer commits más pequeños y específicos.

### Hacer commit

```bash
git commit -m "feat: agregar login"           # Commit con mensaje
git commit -am "fix: corregir typo"           # Add + commit (solo archivos tracked)
git commit --amend                            # Modificar el último commit
```

**Pro tip:** Usa [Conventional Commits](https://www.conventionalcommits.org/) para mensajes claros:
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` documentación
- `refactor:` cambio de código sin cambiar funcionalidad

### Subir cambios

```bash
git push                              # Subir al remote
git push -u origin main               # Primera vez (establece upstream)
git push --force-with-lease           # Reescribir solo si entiendes el historial remoto
```

`--force-with-lease` comprueba una expectativa sobre la referencia remota, pero sigue reescribiendo historial. Coordina cualquier reescritura de una rama compartida; un fetch automático también puede alterar la referencia que se usa como expectativa.

---

## Trabajando con ramas

Las ramas son la base del trabajo en equipo. Aprende a usarlas bien.

### Crear y cambiar de rama

```bash
git branch                          # Ver ramas locales
git branch -a                       # Ver todas (incluye remotas)
git branch feature/login            # Crear rama
git checkout feature/login          # Cambiar a la rama
git checkout -b feature/login       # Crear y cambiar en un comando
git switch feature/login            # Alternativa moderna a checkout
git switch -c feature/login         # Crear y cambiar (moderno)
```

### Fusionar ramas

```bash
git checkout main                   # Cambiar a main
git merge feature/login             # Fusionar feature/login en main
git merge --no-ff feature/login     # Merge sin fast-forward (mantiene historial)
```

### Eliminar ramas

```bash
git branch -d feature/login         # Eliminar rama local (si ya fue mergeada)
git branch -D feature/login         # Eliminar forzado
git push origin --delete feature/login  # Eliminar rama remota
```

---

## Comandos de rescate (estos te salvarán la vida)

### Ver el historial

```bash
git log                             # Historial completo
git log --oneline                   # Una línea por commit
git log --oneline -10               # Últimos 10 commits
git log --graph --oneline --all     # Visualizar ramas
```

### Deshacer cambios locales

```bash
git checkout -- archivo.js          # Descartar cambios en un archivo
git restore archivo.js              # Alternativa moderna
git restore --staged archivo.js     # Quitar del staging (sin perder cambios)
```

### Stash: guardar cambios temporalmente

Tienes cambios sin commitear pero necesitas cambiar de rama urgentemente:

```bash
git stash                           # Guardar cambios
git stash push -m "wip: login"      # Guardar con mensaje
git stash list                      # Ver stashes guardados
git stash pop                       # Recuperar el último stash
git stash apply stash@{2}           # Aplicar un stash específico
git stash drop                      # Eliminar el último stash
```

### Reset: volver atrás en el tiempo

```bash
git reset --soft HEAD~1             # Deshacer último commit (mantiene cambios en staging)
git reset --mixed HEAD~1            # Deshacer último commit (mantiene cambios sin staging)
git reset --hard HEAD~1             # Deshacer último commit (BORRA todo)
```

`reset --hard` descarta cambios del árbol de trabajo y del staging y puede eliminar archivos no rastreados que impidan escribir archivos rastreados. El reflog puede ayudar con commits previos, pero no garantiza recuperar trabajo sin guardar.

### Revert: deshacer un commit de forma segura

A diferencia de reset, revert crea un nuevo commit que deshace los cambios:

```bash
git revert abc123                   # Revertir un commit específico
git revert HEAD                     # Revertir el último commit
```

Usa revert cuando el commit ya fue pusheado y compartido con el equipo.

---

## Ver diferencias

```bash
git diff                            # Cambios no staged
git diff --staged                   # Cambios en staging
git diff main..feature/login        # Diferencia entre ramas
git diff HEAD~3                     # Cambios de los últimos 3 commits
```

---

## Bonus: Aliases para ser más productivo

Agrega estos aliases a tu configuración:

```bash
git config --global alias.st "status -s"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.cm "commit -m"
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.undo "reset --soft HEAD~1"
```

Ahora puedes usar:

```bash
git st                  # En lugar de git status -s
git co main             # En lugar de git checkout main
git lg                  # Log bonito con gráfico
git undo                # Deshacer último commit
```

---

## Resumen: Los 10 comandos que más usarás

1. `git status`: Ver qué cambió
2. `git add -p`: Agregar cambios selectivamente
3. `git commit -m ""`: Commitear con mensaje
4. `git push`: Subir cambios
5. `git pull`: Traer cambios del remote
6. `git checkout -b`: Crear y cambiar de rama
7. `git merge`: Fusionar ramas
8. `git stash`: Guardar cambios temporalmente
9. `git log --oneline`: Ver historial
10. `git diff`: Ver diferencias

---

## Resolver un conflicto de merge sin adivinar

Un conflicto aparece cuando Git no puede combinar cambios automáticamente. El archivo conserva ambas propuestas y tú decides el resultado. Resolverlo exige entender el código, retirar los marcadores y comprobar el comportamiento final.

En un merge ya iniciado, este recorrido permite identificar y registrar la resolución:

```bash
git status
git diff --name-only --diff-filter=U
# Edita cada archivo en conflicto y comprueba el resultado.
git add ruta/del/archivo
git merge --continue
```

Busca marcadores como `<<<<<<<`, `=======` y `>>>>>>>`, pero no te limites a borrarlos. A veces necesitas combinar la intención de los dos cambios. Si decides cancelar ese merge, `git merge --abort` intenta volver al estado previo; conviene empezar las integraciones con el trabajo local guardado.

### Recuperar un commit no equivale a recuperar cualquier archivo

`git reflog` muestra movimientos locales de referencias. Si localizas un commit perdido, puedes conservarlo creando una rama con `git branch rescate HASH_DEL_COMMIT`. Revisa su contenido antes de integrarlo. Esto no garantiza recuperar modificaciones que nunca guardaste en un commit o stash; además, las entradas y los objetos pueden expirar.

Si todavía no distingues repositorio local y remoto, vuelve a la [guía de Git y GitHub para principiantes](/blog/git-github-para-principiantes-guia-practica).

## Preguntas Frecuentes

**¿Cuáles son los comandos de Git más importantes?**
Los del día a día: `add`, `commit`, `push`, `pull`, `status`, `branch`, `checkout` y `merge`. Con esos comandos puedes practicar un flujo básico; las necesidades cambian según el equipo.

**¿Cómo deshago un cambio o un commit en Git?**
Depende: `git restore` para descartar cambios sin guardar, `git reset` para mover el HEAD, y `git revert` para deshacer un commit ya publicado sin reescribir historia. Los cubro en la sección de comandos de rescate de arriba.

**¿Necesito dominar Git para conseguir trabajo como desarrollador?**
Sí, es innegociable. Git es una de las habilidades que doy por sentadas en mi [guía para destacar en tech en 2026](/blog/guia-destacar-en-tech-2026-habilidades-y-negocios), y va de la mano con [mejorar como programador](/blog/consejos-para-mejorar-en-programacion).

### ¿git fetch modifica mis archivos?

Descarga objetos y actualiza referencias remotas; no integra por sí solo esos commits en tu rama de trabajo. git pull combina una descarga con una integración según tu configuración.

### ¿Puedo usar revert en una rama compartida?

Sí. Crea un commit que deshace cambios anteriores sin retirar esos commits del historial. Puede haber conflictos y conviene comprobar el resultado como cualquier otro cambio.

## Conclusión

Git parece intimidante al principio, pero una vez que dominas estos comandos, se vuelve una segunda naturaleza. Mi consejo: no intentes memorizar todo. Usa esta guía como referencia y practica con proyectos reales.

Si algo sale mal (y saldrá mal), recuerda: casi todo en Git es reversible. Respira, busca el comando correcto, y sigue adelante.

¿Tienes algún comando favorito que no mencioné? Compártelo en mis redes.

---

*¿Te fue útil esta guía? Compártela con ese amigo que todavía le tiene miedo a Git. Y sígueme para más contenido sobre desarrollo y herramientas.*
