---
title: Essential Git Commands for Developers
sourceSlug: comandos-git-esenciales-para-desarrolladores
category: Tools
date: '2026-01-17'
updated: "2026-10-21"
excerpt: Learn essential Git commands for daily work, including commits, branches, merging and recovering from common mistakes.
published: true
translated: '2026-10-10'
---

It does not matter if you write Python, JavaScript, Rust or COBOL, if you work in software, you use Git. It is the tool you are going to use the most in your career, and yet many developers only know `git add .` and `git push`.

In this article I teach you the Git commands that you really need to master, organized from basic to advanced, with practical examples that you can use today.

## Initial configuration (only once)

Before starting, configure your identity:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

This is what will appear in each commit you do. If you work with different emails (personal vs work), you can skip `--global` and configure it by repository.

Bonus: Set up a default editor for commit messages:

```bash
git config --global core.editor "code --wait"  # VS Code
```

---

## The basic daily flow

### Start a repository

```bash
git init                    # Crear un nuevo repo
git clone <url>             # Clonar uno existente
```

### See the current state

```bash
git status                  # Ver archivos modificados
git status -s               # Versión corta
```

### Adding changes to staging

```bash
git add archivo.js          # Agregar un archivo específico
git add .                   # Agregar todo
git add -p                  # Agregar interactivamente (muy útil)
```

The flag `-p` (patch) allows you to review each change before adding it. Use it when you have many changes and want to make smaller and more specific commits.

### Commit

```bash
git commit -m "feat: agregar login"           # Commit con mensaje
git commit -am "fix: corregir typo"           # Add + commit (solo archivos tracked)
git commit --amend                            # Modificar el último commit
```

Pro tip: Use [Conventional Committees](https://www.conventionalcommits.org/) for clear messages:
- `feat:` new functionality
- `fix:` bug correction
- `docs:` documentation
- `refactor:` code change without changing functionality

### Up changes

```bash
git push                              # Subir al remote
git push -u origin main               # Primera vez (establece upstream)
git push --force-with-lease           # Reescribir solo si entiendes el historial remoto
```

▁Nunca Never use `git push --force` in shared branches. If you need to force, use `--force-with-lease` that verifies that no one else has uploaded changes.

---

## Working with branches

Branches are the basis of teamwork. Learn to use them well.

### Create and change branches

```bash
git branch                          # Ver ramas locales
git branch -a                       # Ver todas (incluye remotas)
git branch feature/login            # Crear rama
git checkout feature/login          # Cambiar a la rama
git checkout -b feature/login       # Crear y cambiar en un comando
git switch feature/login            # Alternativa moderna a checkout
git switch -c feature/login         # Crear y cambiar (moderno)
```

### Merging branches

```bash
git checkout main                   # Cambiar a main
git merge feature/login             # Fusionar feature/login en main
git merge --no-ff feature/login     # Merge sin fast-forward (mantiene historial)
```

### Removing branches

```bash
git branch -d feature/login         # Eliminar rama local (si ya fue mergeada)
git branch -D feature/login         # Eliminar forzado
git push origin --delete feature/login  # Eliminar rama remota
```

---

## Rescue Commands (these will save your life)

### View the history

```bash
git log                             # Historial completo
git log --oneline                   # Una línea por commit
git log --oneline -10               # Últimos 10 commits
git log --graph --oneline --all     # Visualizar ramas
```

### Undoing local changes

```bash
git checkout -- archivo.js          # Descartar cambios en un archivo
git restore archivo.js              # Alternativa moderna
git restore --staged archivo.js     # Quitar del staging (sin perder cambios)
```

### Stash: save changes temporarily

You have uncommited changes but need to change branches urgently:

```bash
git stash                           # Guardar cambios
git stash push -m "wip: login"      # Guardar con mensaje
git stash list                      # Ver stashes guardados
git stash pop                       # Recuperar el último stash
git stash apply stash@{2}           # Aplicar un stash específico
git stash drop                      # Eliminar el último stash
```

### Rest: going back in time

```bash
git reset --soft HEAD~1             # Deshacer último commit (mantiene cambios en staging)
git reset --mixed HEAD~1            # Deshacer último commit (mantiene cambios sin staging)
git reset --hard HEAD~1             # Deshacer último commit (BORRA todo)
```

Z Care with `--hard`: changes are permanently lost.

### Reverse: Undo a commit safely

Unlike reset, revert creates a new commit that undoes the changes:

```bash
git revert abc123                   # Revertir un commit específico
git revert HEAD                     # Revertir el último commit
```

It uses reverse when the commit has already been pushed and shared with the team.

---

## See differences

```bash
git diff                            # Cambios no staged
git diff --staged                   # Cambios en staging
git diff main..feature/login        # Diferencia entre ramas
git diff HEAD~3                     # Cambios de los últimos 3 commits
```

---

## Bonus: Aliases to be more productive

Add these aliases to your configuration:

```bash
git config --global alias.st "status -s"
git config --global alias.co "checkout"
git config --global alias.br "branch"
git config --global alias.cm "commit -m"
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.undo "reset --soft HEAD~1"
```

Now you can use:

```bash
git st                  # En lugar de git status -s
git co main             # En lugar de git checkout main
git lg                  # Log bonito con gráfico
git undo                # Deshacer último commit
```

---

## Summary: the 10 commands you will use most

1. `git status`: See what changed
2. `git add -p`: Add changes selectively
3. `git commit -m ""`: Commit with message
4. `git push`: Up changes
5. `git pull`: Bringing Remote Changes
6. `git checkout -b`: Create and change branches
7. `git merge`: Merging branches
8. `git stash`: save changes temporarily
9. `git log --oneline`: View history
10. `git diff`: See differences

---

## Frequently asked questions

What are the most important Git commands?
The daily ones: `add`, `commit`, `push`, `pull`, `status`, `branch`, `checkout` and `merge`. With mastering those covers 90% of the real work.

How do I undo a change or commit in Git?
It depends: `git restore` to rule out unsave changes, `git reset` to move the HEAD, and `git revert` to undo an already published commit without rewrite history. I cover them in the rescue command section above.

Do you need to master Git to get a job as a developer?
Yes, it is non-negotiable. Git is one of the skills I take for granted in my [guide to stand out in tech in 2026](/en/how-to-stand-out-in-tech), and goes hand in hand with [improve as a programmer](/en/how-to-get-better-at-programming).

## Conclusion

Git seems intimidating at first, but once you master these commands, it becomes second nature. My advice: don't try to memorize everything. Use this guide as a reference and practice with real projects.

If something goes wrong (and it will go wrong), remember: almost everything in Git is reversible. Breathe, look for the right command, and move on.

Do you have a favorite command that I did not mention? Share it on my networks.

---

Was this guide useful? Share it with that friend who is still afraid of Git. And follow me for more content on development and tools.

## Resolve a merge conflict deliberately

A conflict occurs when Git cannot combine changes automatically. Read both intentions, edit the result and check its behavior before recording the resolution. For a merge already in progress:

```bash
git status
git diff --name-only --diff-filter=U
# Edita cada archivo en conflicto y comprueba el resultado.
git add ruta/del/archivo
git merge --continue
```

Remove conflict markers only after deciding what the combined code should do. To cancel that merge, `git merge --abort` attempts to restore the previous state. Save local work before starting an integration.

### A recovered commit is not every unsaved file

`git reflog` records local reference movements. If you find a lost commit, preserve it with `git branch rescue COMMIT_HASH` and inspect it before integration. Reflog does not guarantee recovery of changes never saved in a commit or stash, and entries and objects can expire.

If local and remote repositories are still unclear, review [Git and GitHub for beginners](/en/git-and-github-for-beginners).
