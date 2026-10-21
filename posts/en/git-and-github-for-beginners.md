---
title: 'Git and GitHub for Beginners: A Practical Guide'
sourceSlug: git-github-para-principiantes-guia-practica
category: Tools
date: '2026-05-27'
updated: "2026-10-21"
excerpt: Learn what Git and GitHub do, how they differ and how to use repositories, commits and branches in a practical beginner workflow.
published: true
translated: '2026-10-10'
---

If you are learning to program, there is a tool that you will use every day throughout your career, and curiously almost nobody teaches it at the beginning: Git. It feels confusing, full of rare commands, and many postpone it "for later". That postponement is an expensive mistake.

This guide is the practical introduction that I would have liked to have: what Git is, how it differs from GitHub, and the basic workflow you need to start versioning your code today, without drowning in theory. When you internalize it, stopping using Git will seem unthinkable.

## What Git is (and why you need it)

Git is a version control system. Translated: it is like a "record save" for your code. Every time you make an important change, you save a "photo" (a commit) of the status of your project. If something breaks, you can go back to any previous photo.

Without Git, save folders type `proyecto_final`, `proyecto_final_v2`, `proyecto_final_bueno_este_si`. With Git you have a clean and orderly history of everything, and you can also work as a team without stepping on anyone's code. That is why it is a requirement in, literally, any development work.

## Git is not GitHub: the key difference

It is confusion number one of beginners, and clarifying it saves you a lot of mess:

*   Git is the tool that runs on your computer and manages the history of your code. It works without internet.
*   GitHub is a cloud service where you upload your Git repositories to save, share and collaborate.

An analogy: Git is like photography (the technique of taking and saving photos), and GitHub is like Instagram (the place where you upload and share them with the world). You need the technique to use the site.

## The basic workflow (90% of your day to day)

You do not need to master the hundreds of Git commands. With this cycle you cover almost all your daily work:

1.  You modify files in your project as usual.
2.  `git add` selects which changes you want to save in the next photo.
3.  `git commit` takes the picture, with a message describing the change.
4.  `git push` uploads that photo to GitHub.

And to bring changes (yours from another team, or from a partner): `git pull`. That cycle (modify, add, commit, push) is the heart of working with Git, and you will repeat it thousands of times.

## The commands that you will really use

Once you understand the flow, this handful of commands takes you a long way. Don't try to memorize them: they are learned using them.

*   `git init`: converts a folder into a Git repository.
*   `git status`: tells you what you have changed and what needs to be saved. Use it constantly.
*   `git add .`: prepares all the changes for commit.
*   `git commit -m "mensaje"`: saves the photo with a description.
*   `git push`: upload your commits to GitHub.
*   `git pull`: download the latest remote changes.
*   `git log`: displays the commit history.

When you want to take the next step (branches, undo changes, `stash`, resolve conflicts), I have a more complete reference in [Essential Git commands for developers](/en/essential-git-commands-for-developers).

## Quick reference table

|Command|What it does|
|---|---|
|`git init`|Start a repository in the folder|
|`git status`|It shows what has changed|
|`git add .`|Prepares changes to save|
|`git commit -m "..."`|Save a photo with a message|
|`git push`|Increase changes to GitHub|
|`git pull`|Brings the latest remote changes|
|`git log`|Shows the history|

## Good habits from the beginning

Starting with good habits saves you pain later:

*   Small and frequent commitments. It is better to save often with bounded changes than a giant commit at the end of the day.
*   Clear messages. "Arrange the login error" says a lot; "changes" says nothing. Your future self will thank you.
*   upload your work to GitHub. Your GitHub profile is your cover letter: fill it with [projects that really work for your CV](/en/portfolio-projects-that-strengthen-your-developer-resume).
*   Learn Git soon, not "later". It is from [The first technologies you should touch when you start](/en/best-technologies-to-start-programming).

## Frequently asked questions

Do I need to know Git to get my first job?
Yes, without exception. Git is the standard collaboration tool in the industry. You do not need to be an expert, but you do easily handle the basic flow (add, commit, push, pull) and branches.

Is Git difficult to learn?
The basic concepts are learned in a couple of afternoons using them in a real project. Git is notorious for its advanced functions (overtaking, complex conflict resolution), but that comes much later and you don't need it to start.

Is GitHub free?
Yes, GitHub is free for personal use, including private repositories. It is more than enough to learn, save your projects and build your public portfolio.

When do I learn branches?
As soon as you master the basic flow. Branches allow you to work on a functionality without touching the stable code, and are essential for teamwork. They are covered in the [essential command guide](/en/essential-git-commands-for-developers).

## Conclusion: the tool that will always accompany you

Git may seem like another obstacle when you already have a thousand things to learn, but it is just the opposite: it is the safety net that lets you experiment without fear of breaking anything, because you can always go back. Learning it soon is one of the best decisions you can make as a developer.

Start today: create a repository, make your first commit and upload it to GitHub. In a few days, this cycle will be as natural as saving a document. And with Git under control, you have a key piece of the [roadmap from zero to contracted](/en/developer-roadmap-from-beginner-to-hired) solved.

## Your first project on GitHub, from start to finish

To upload a project you need a local repository with a commit, a remote repository and a way to authenticate. A commit saves history locally; push sends it to the configured remote.

For this exercise, create an empty GitHub repository without an initial README or license. Open your project folder in a terminal:

```bash
git init
git status
```

Create a suitable `.gitignore` before adding files. For a Node project, for example, exclude `node_modules/` and `.env`. Review file names and replace the example paths with files you actually intend to publish:

```bash
git add README.md .gitignore
git commit -m "docs: agregar presentación del proyecto"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git remote -v
git push -u origin main
```

The identity in git config identifies commits; it does not authenticate GitHub access. Use the HTTPS or SSH method configured for your account. If origin already exists, inspect `git remote -v` first. This exercise assumes an empty remote. If it already has files, clone it into another folder and integrate your work there.

Open GitHub and verify the commit arrived. Continue with the [Git command reference](/en/essential-git-commands-for-developers) for branches and recovery.
