---
title: "Claude Code and Codex Tips That Matter: Security, Architecture, Development and Workflow"
sourceSlug: tips-claude-code-codex-seguridad-arquitectura-flujo-trabajo
category: Tools
date: '2026-10-26'
excerpt: "A practical guide grounded in official documentation for working with coding agents. Covers CLAUDE.md and AGENTS.md, hooks, permissions, sandboxing, review and unattended runs."
published: true
translated: '2026-10-28'
---

On August 26, 2025, someone published poisoned versions of **Nx**, a very popular build tool, to npm. The malware didn't do anything especially sophisticated: it checked whether the victim's machine had a command-line AI assistant installed (Claude, Gemini, Amazon Q) and, if it found one, ran it with the `--dangerously-skip-permissions`, `--yolo` or `--trust-all-tools` flags and asked it to search for secrets.

Think about what that means. The attacker didn't have to write a credential finder. **They used the developer's own agent, with the developer's own permissions.** A brilliant, fast assistant with access to everything and nobody watching. For the attacker, the best employee imaginable.

That story sums up the thesis of this article: a coding agent is an extraordinary tool **and** an employee with access to your machine. If you configure it as the first and forget the second, sooner or later you pay the price. And if you configure it well, the productivity gains don't have to cost you security or quality.

Here's what I've gathered, mostly from the **official documentation** of Claude Code (its best practices guide) and of Codex, plus some security and architecture principles that apply to any agent. I organized it into five blocks (workflow, persistent instructions, security, architecture and day-to-day development) and close with unattended runs, a comparison between both tools and a list of things you can stop doing.

A note on the source of each thing: what I say about Claude Code comes from its official documentation as of this article's date. What I say about Codex relies on OpenAI's public documentation and third-party guides, and mode and flag names change fast. Before copying any configuration, **check the tool's current documentation**.

## The idea that organizes everything: deterministic and non-deterministic instructions

Before the tips, the mental model. Claude Code's best practices guide frames it with a clarity I wish I'd had earlier. Every instruction you give an agent is one of two kinds:

1.  **Non-deterministic:** you write something (a prompt, the `CLAUDE.md` file, a skill) and the model decides what to do with it. It usually follows it, but there's no guarantee.
2.  **Deterministic:** you configure something the tool **has to** execute, such as a hook, a deny rule or a managed setting. It applies every time, no matter what the model decides.

| | Non-deterministic (the model decides) | Deterministic (the tool enforces) |
|---|---|---|
| What to do | Prompt, `CLAUDE.md`, skills | Hooks, skills only you start |
| What it can touch | Auto mode's classifier | `deny` rules, sandbox, managed settings |
| When it's done | Asking for evidence, `/goal`, `/code-review` | Tests, typecheck, `Stop` hook, CI |
| How much it spends | Effort level | `--max-turns`, `--max-budget-usd`, spend limits |
| Who has the last word | The agent's summary | Branch protection, a person approving the merge |

The practical rule, straight from the guide: *if you keep adding emphasis to a line in `CLAUDE.md` and the agent still misses it, that line belongs in a hook*. And the other way around: if you have hooks for things that are only preferences, delete them and let the model decide. This distinction is what has helped me most to decide where each rule goes, so I'll use it throughout what follows.

## Block 1: Workflow

### Tell it what it can't see

The most useful principle in the whole guide is this: write down only what the agent **can't work out by reading the repository**. Current models are very good at exploring code: they find the folder structure, the test framework and the conventions on their own, often faster than you could explain them. Your job is to give it what isn't in the code: how it deploys, which folder looks abandoned but isn't, which decision was made in a meeting.

### Specific prompts

A specific prompt works for the same reason: it gives the agent information it doesn't have. If you name the file, describe the symptom and say what "fixed" looks like, you save yourself a round of corrections.

| Instead of | Try |
|---|---|
| "fix the login bug" | "users report login fails after the session times out. Look at token refresh in src/auth/, write a failing test that reproduces it, then fix it" |
| "add a calendar widget" | "follow the pattern in HotDogWidget.php and build a calendar widget that lets you pick a month and page between years. No new libraries" |

And if you already have what the agent needs, **hand it over** instead of describing it: a file with `@path`, a screenshot of the error pasted into the prompt, or command output piped in from your terminal.

A nuance I found revealing: phrases like "think step by step" or "be thorough" are ordinary prompt text, not keywords. What controls how much the model reasons is the **effort level**. What does still help is telling it to be ambitious when you want the full version: "build the settings page from the mockup, be ambitious: empty and error states, the save flow wired up, keyboard navigation, not just the layout". That doesn't tell it *how hard to think*, it tells it the *scope* that only you know.

### When you don't know what you want: have it interview you

This is my favorite tip for when the idea is still green. Instead of trying to specify everything up front, ask the agent to interview you: "I want to add rate limiting to the public API but haven't thought it through yet. Interview me until you could write the spec, then write it to SPEC.md".

The agent comes back with multiple-choice questions about what you haven't defined: per-user or per-key limits? What happens to requests over the limit? What's out of scope? It keeps asking until the answers add up to a specification. It's a great way to discover what you didn't know you didn't know.

### Steer the session: Esc, rewind and clear

The guide sums it up in a sentence I adopted: **watch the first minute, press `Esc` the moment it drifts and, after two failed corrections, run `/clear` and write a better prompt instead of a third correction.**

*   `Esc` stops the agent mid-action and keeps everything up to that point.
*   `/rewind` (or `Esc` twice on an empty prompt) opens a menu to roll back the code, the conversation or both. That makes it cheap to try the bolder approach first.
*   `/clear` starts over. If you've corrected the same thing twice and it's still wrong, a third correction only adds more failed attempts for the agent to re-read. A `/clear` with a new prompt that folds in what you learned almost always works better.

A warning worth remembering: checkpoints only cover files the agent edited with its own file tools. If a shell command changed something, it isn't restored. It works **alongside git**, not instead of it.

And to keep context healthy, use `/clear` between unrelated tasks (it costs nothing and avoids dragging along the previous task's history) and `/compact` with a focus, for example `/compact keep the API changes and the test commands`.

## Block 2: Persistent instructions (CLAUDE.md and AGENTS.md)

### Keep it short

Claude Code loads `CLAUDE.md` into **every** session, so each line takes a bit of the agent's attention on every task, relevant or not. That's why the file works best when it only holds what the agent couldn't work out from the code:

*   How to confirm work in this repo: the exact test, typecheck and lint commands, and how to run a single test file.
*   Places where the code is misleading: an old pattern that's everywhere but that new code must not copy, or a directory that looks unused but isn't.
*   Decisions that aren't in the repo: which error helper the team settled on, how deploys work, what needs a migration review.
*   Anything you've had to correct twice already.

An example that passes that filter and stays short (configuration files are usually written in English by convention):

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

Three commands help you keep it healthy: `/init` generates a starting version from your code (and the work after that is mostly removing lines; the memory guide recommends staying under 200), `/doctor` suggests cuts for what the agent can already work out from the code, and `/doctor prompt-audit` flags instructions written for older models, pointing at files that no longer exist or contradicting each other. Your personal preferences go in `CLAUDE.local.md`, which you add to `.gitignore`.

### Rules by area and procedures in skills

If a rule only matters in one part of the code, put it in `.claude/rules/` with a `paths:` filter so it only loads when the agent works there:

```markdown
---
paths:
  - "src/api/**/*.ts"
---
- Validate request bodies with the zod schemas in src/api/schemas/, don't hand-roll checks
- Every new endpoint needs an entry in openapi.yaml, CI fails without it
```

And team procedures (how a release is done, what your incident runbook says) go in **skills**: a `SKILL.md` file in `.claude/skills/<name>/`. They're lighter on context than `CLAUDE.md`: the agent only sees the name and description in each session and reads the full file when the task calls for it. For workflows with side effects, like cutting a release, add `disable-model-invocation: true` so it only runs when you invoke it:

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

### The Codex side: AGENTS.md

Codex uses **`AGENTS.md`** as its persistent instructions file. According to the documentation and available guides, it reads it from your configuration directory (`~/.codex` by default, where it first looks for an `AGENTS.override.md`) and then project files, from the git root down to the working directory, so the instructions closest to the code are the most specific. Some guides mention a size limit on the combined content; I couldn't confirm it in the official documentation, but the practical conclusion is the same as with `CLAUDE.md`: **keep it short and specific**.

`AGENTS.md` is also an open format that several tools read (there's a reference site at agents.md). If you use Claude Code and Codex in the same repository, a reasonable option is to keep **a single source of truth** in `AGENTS.md` and have your `CLAUDE.md` import it with `@AGENTS.md` (Claude Code supports importing files with `@path` from `CLAUDE.md`; confirm it in its memory documentation). That way you don't maintain two files that drift apart.

## Block 3: Security

This is where the Nx story stops being an anecdote and becomes a to-do list.

### Apply the "lethal trifecta" to your own agent

Simon Willison proposed in June 2025 a framework that I find the most useful for reasoning about agent risks. An agent is dangerous when it combines three things: **access to private data**, **exposure to untrusted content** and **the ability to communicate externally**. If all three are present, someone who manages to get instructions into the untrusted content (a README, an issue, a web page) can make the agent leak your data.

A five-minute exercise: for your current setup, answer. Can it read your secrets? Does it read content you don't control (web, issues, dependencies, third-party MCP servers)? Can it send data out (open network, `git push`, email)? Every "yes" you can turn into a "no" is risk removed. More context on the attack landscape in my article on [AI and software security](/en/ai-and-software-security-vulnerabilities-2026).

### What can't have exceptions goes in configuration, not in the prompt

Take three rules you might have in your `CLAUDE.md`: "never read `.env`", "always run the formatter after editing" and "don't touch the migrations folder". The agent will follow them almost every time. For the few where "almost" isn't enough, move them into configuration the tool applies itself.

**Permission rules.** `deny` rules hold in every permission mode, including auto and `bypassPermissions`, which is exactly why the `.env` rule belongs here:

```json
{
  "permissions": {
    "allow": ["Bash(pnpm tsc --noEmit)"],
    "ask": ["Bash(git push *)"],
    "deny": ["Read(./.env)", "Read(./.env.local)", "Read(./secrets/**)"]
  }
}
```

Know the edges: rules match tool calls, not intent. The `Read` rule does catch `cat .env` (the tool recognizes common file-reading commands), but it does **not** catch a script that opens the file, and a `WebFetch` deny rule for a domain does nothing about a `curl` to that same domain unless the sandbox is on.

**Hooks.** They run something of yours at fixed points in the agent's loop: before or after a tool call, when it tries to stop, when a session starts. For a rule with no exceptions, use `command` hooks (`prompt` or `agent` hooks ask another model to decide, so they aren't deterministic either). This one runs the formatter after every edit, without depending on the agent remembering:

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

The migrations rule becomes a `PreToolUse` hook that exits with code 2 for any path under `migrations/`. You can ask the agent to write it for you. But don't overdo it: a hook is for a rule with **zero** exceptions. "Prefer named exports" has plenty, so that one stays in `CLAUDE.md`. The guide puts it this way: if you ever reach forty enforced rules, most are probably preferences the model could have weighed on its own.

### Sandbox: the operating-system-level boundary

The sandbox (`/sandbox` in a session) confines the agent's shell commands at the operating-system level, both file and network access. Anthropic reported on its engineering blog (October 2025) that, in its internal use, it reduced permission prompts by 84%. That's its own measurement, not an independent benchmark, but it illustrates something important: **a well-placed boundary gives you *more* autonomy, not less**, because inside the boundary you can approve without looking. For anything security-related, the guide recommends using permission rules and the sandbox together.

### Permission modes: neither all manual nor all free

Both extremes have a cost. **Manual mode** makes you approve everything, and after the tenth prompt you'll approve without reading. **`bypassPermissions`** approves everything your rules don't cover, and only makes sense in a disposable container (it's exactly what the Nx attack exploited). **Auto mode**, which is the default for interactive sessions, sits in between: a classifier model reviews risky actions (`curl | bash`, production deploys, force pushes over other people's work, sensitive data sent to external destinations).

A warning from the documentation itself: the classifier is a model making judgment calls, not a hard rule, and it can be wrong. "Never" rules go in `deny` rules or hooks, which apply **before** the classifier.

### More security hygiene

*   **`.env` files in worktrees.** A new worktree doesn't have your git-ignored files. With a `.worktreeinclude` file at the repo root you can say which to copy. Use it judiciously: copy only what's needed, and never production credentials.

```text
.env
.env.local
config/dev-credentials.json
```

*   **MCP servers.** Every connected server adds tool names and instructions to the context even when you aren't using it, and it's third-party content and capability. Turn off the ones you don't need with `/mcp`.
*   **Review with an agent that didn't see the code.** `/code-review` reviews the diff in a fresh subagent that never saw your conversation, so it isn't swayed by the reasoning that produced the code. If you do it yourself, ask it to review against your specification and include "skip style": a reviewer you ask to find problems will always find *something*, and if you fix everything you end up with layers of abstraction and tests for impossible cases.
*   **Dependencies.** Any package an agent proposes deserves the one-minute check I describe in the security article: age, maintainers and signature.
*   **OWASP.** If you build applications that **use** LLMs, the [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) covers risks such as *prompt injection*, excessive agency and insecure output handling.

### The Codex side: sandbox and approvals are two different axes

In Codex, according to OpenAI's approvals and security documentation, there are two **independent** controls. The **sandbox mode** defines what it can technically do (guides list `read-only`, `workspace-write` and `danger-full-access`). The **approval policy** defines *when it must ask you* before acting (for example, to leave the sandbox or use the network). Understanding they are separate axes avoids mistakes: you can have a strict sandbox with relaxed approvals inside it, or the other way around. As a general rule, for local work the reasonable choice is write access limited to the workspace, with full access reserved for disposable environments. Exact mode names change between versions; check the current documentation.

## Block 4: Architecture

There's less magic here and more judgment, and I think it's where agents help most if you use them well, and do the most harm if you let them decide alone.

### An agent optimizes the local; architecture is global

An agent makes decisions with the context it sees. That makes it very good at solving the problem in front of it and very prone to solutions that work **here** but break coherence **there**: a new abstraction for every case, a dependency added to save twenty lines, a different pattern in every module. Architecture is, in essence, keeping decisions consistent over time, and that isn't in the fragment the agent is reading. If you want to reinforce the foundations, I recommend my guide to [software architecture fundamentals and recommended books](/en/software-architecture-fundamentals-and-books).

### Concrete tips

**1. Interview first, specify after.** Use the interview trick from block 1 to produce a `SPEC.md` before writing a line. It's the cheapest way to discover an architecture decision you hadn't made.

**2. Ask for alternatives, not a solution.** "Propose two or three approaches with their trade-offs (complexity, operating cost, how it scales, how it's tested) and recommend one." You decide; the agent saves you the exploration.

**3. Write decisions where the agent will read them.** Decisions that aren't in the repo (which library was chosen and why, which pattern must not be used) go in `CLAUDE.md` or `AGENTS.md`. For bigger decisions, **architecture decision records (ADRs)**, a format proposed by Michael Nygard, record the context, the decision and its consequences. An agent that reads an ADR avoids "improving" something that was decided on purpose.

**4. Turn architecture rules into checks.** Make "domain modules must not import from infrastructure" a test or a lint rule that fails, not a sentence someone remembers. This idea, called *fitness functions* in the book *Building Evolutionary Architectures*, is perfect for agents: they get a clear pass or fail signal. It's the architectural version of the guide's advice: **give the agent something it can run that returns pass or fail.**

**5. Review against the specification with fresh eyes.** Ask a subagent: "review the diff against SPEC.md, check every requirement is implemented and the listed edge cases have tests, report gaps that affect correctness and skip style".

**6. Small changes, clear boundaries.** A small diff is reviewable; a huge one gets approved out of fatigue. Ask for bounded changes and review before moving on.

## Block 5: Day-to-day development

### Give it a way to check its work

The guide says it in a sentence I'd underline: *the agent stops when the work looks done; if it has nothing to run that tells it whether it is, "looks done" is all it has*. And in practice **you become the test suite**.

If you give it something that returns pass or fail (tests, a build's exit code, a linter, a script that diffs output against a fixture, a browser screenshot next to the mockup), the agent closes the loop itself: it changes, runs, reads the error, fixes and repeats. The most useful line in your `CLAUDE.md` is often the command that runs it.

There are four levels of strictness:

*   **In the prompt:** "run the auth tests at the end and keep going until they pass". The agent decides when it's satisfied.
*   **As a goal (`/goal`):** a condition another model checks after every turn, useful in long background runs.
*   **With a `Stop` hook:** your script runs every time the agent tries to finish and, if it exits with code 2, sends it back to work. It's enforced by the tool, not the model:

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

*   **By someone who didn't write the code:** `/code-review`, or a second session that reviews what the first wrote without having watched it work. It's the easiest independent reviewer to get.

And always ask for **evidence**: the command it ran and its output, not just "all tests pass". Reading the output is faster than rerunning, and in a session you didn't watch it's the only proof you have.

### Failing test first

For bugs, the most reliable way is the one you already know: ask for a test that **reproduces** the problem and fails, then the fix. That gives you a verifiable definition of "done" and a regression covered along the way. It's the login prompt example from block 1.

### Parallel work with worktrees

When you have separate pieces of work, give each its own working copy so edits don't collide. `claude -w feature-auth` starts a session in a new worktree; the desktop app runs several in parallel and cloud sessions run them off your machine. For a big mechanical change, `/batch` splits the work into 5 to 30 units, shows you the plan and runs each unit in its own worktree, opening a PR for each. And remember that a second session is also the easiest independent reviewer to get: one writes the rate limiter, another reviews it without having watched it being written, and you carry the findings from one to the other.

### Automate with non-interactive mode

`claude -p "prompt"` runs once and exits, which is how Claude Code ends up in CI jobs, git hooks and shell loops. In scripts you'll want some flags: `--bare` skips hooks, skills, plugins, MCP servers and `CLAUDE.md` files so the run does the same thing anywhere; `--allowedTools` pre-approves tools; `--permission-mode dontAsk` avoids prompts nobody will answer; and `--max-turns` or `--max-budget-usd` set a cap. Codex has a non-interactive equivalent (`codex exec` in its CLI) for the same uses.

## Unattended runs: the five questions

Everything above matters more when you aren't watching. While you supervise, a piece of context the agent lacks gets fixed in one message. In a run you left overnight, nobody tells it, and the next morning you find it spent the whole night building on a wrong assumption.

Before leaving a task running on its own, the guide suggests going through five questions with that specific task in mind:

1.  **Does it know what "done" looks like?** A goal condition, a spec file or a failing test it has to turn green.
2.  **Can it check its own work?** The test suite, a `Stop` hook, a review step.
3.  **What is it allowed to touch?** Permission rules, `dontAsk`, the sandbox, a worktree, the one branch it may push to.
4.  **What stops it?** `--max-turns`, `--max-budget-usd`, a spend limit.
5.  **Where does the result go and who approves it?** A PR, a comment or a summary, and then a person approving the merge, the deploy or anything irreversible.

Once it's going, the agent can carry a long task on its own. What stays with you: starting it, deciding what "done" means this time and approving the final merge.

## Claude Code and Codex side by side

A comparison of concepts, not of "which is better". The Codex details come from public documentation and third-party guides, so confirm them in the current documentation.

| Topic | Claude Code | Codex |
|---|---|---|
| Persistent instructions | `CLAUDE.md`, `.claude/rules/`, skills | `AGENTS.md` (global and per project) |
| Enforced rules | Hooks, `deny` rules, managed settings | Approval policy and sandbox mode |
| OS-level boundary | `/sandbox` | Sandbox modes (`read-only`, `workspace-write`, `danger-full-access`) |
| When it asks | Permission modes (manual, auto, etc.) | Approval policy, independent of the sandbox |
| Non-interactive use | `claude -p` | `codex exec` |
| Parallel work | Worktrees (`claude -w`), subagents, cloud sessions | Parallel sessions and cloud environment |

The underlying pattern is the same in both: **short persistent instructions, technical limits for what can't have exceptions and a way to verify the result**.

## What you can stop doing

Claude Code's own guide includes a table of advice that was good and that current models make unnecessary. I find it among the most useful parts, because many people keep applying it out of habit:

| The old advice | Why it's no longer needed |
|---|---|
| Manage context aggressively | Current models have very large windows and compaction is automatic. `/clear` between tasks is still worth it, because a focused context gives better answers and costs less |
| Put IMPORTANT or ALL CAPS on what the agent ignores | Current models follow a plainly worded line; emphasis tends to make them over-apply the rule. If it's a rule that can't bend, make it a hook or `deny` rule. If it gets lost in a long file, the file needs to be shorter |
| Use subagents only to protect context | Running out of context is rarely the problem. They're still great for parallel work, for getting noisy output out of your way and for independent review, but each use costs extra tokens |
| Delegate to a subagent for a better answer | Handing the same task to a subagent doesn't improve the answer. A fresh reviewer does help, because it didn't see your reasoning, which is a different thing |
| "think hard", "be thorough" | Effort level is the control for that; these phrases are ordinary text that nudges within that level |
| "keep going until done, don't be lazy" | Current models carry on with an agreed task on their own, and such lines tend to cause over-work. Giving it a check to pass is different and still worthwhile |
| Describe architecture and file layout in `CLAUDE.md` | The agent reads the repo. Write down only what isn't there |

## Checklist to start today

If you're only going to do five things, make them these:

1.  **Write a `CLAUDE.md` or `AGENTS.md` under 30 lines** with verification commands, code gotchas and decisions that aren't in the repo.
2.  **Add `deny` rules for your secrets** (`.env`, credential folders) and turn on the sandbox.
3.  **Turn your most important "never" rule into a hook** or `deny` rule, not a sentence in a file.
4.  **Give the agent a verification command** (tests, typecheck) and, if you want to enforce it, a `Stop` hook.
5.  **Before leaving it alone, answer the five questions:** does it know what done is?, can it check it?, what can it touch?, what stops it? and who approves?

## Frequently Asked Questions about Claude Code and Codex

**What's the difference between `CLAUDE.md` and a hook?**
`CLAUDE.md` is a non-deterministic instruction: the model reads it and decides whether to apply it, usually following it but with no guarantee. A hook is deterministic: the tool runs it every time. If a rule admits no exceptions, it goes in a hook or a `deny` rule.

**What is `AGENTS.md`?**
It's an instructions file for coding agents in an open format that several tools read, including Codex. It plays a role equivalent to `CLAUDE.md`. If you use both tools you can keep a single file and have `CLAUDE.md` import it.

**Is it safe to use `--dangerously-skip-permissions`?**
Only in a disposable, isolated environment with no access to real secrets. The August 2025 Nx attack used equivalent flags on the assistants installed on victims' machines.

**How long should my `CLAUDE.md` be?**
As short as possible. Claude Code's memory guide recommends staying under 200 lines, and the underlying rule is to include only what the agent can't work out by reading the repo.

**What is the sandbox and what is it for?**
It's an operating-system-level boundary for the agent's shell commands, covering both file and network access. It lets you grant more autonomy with less risk. Anthropic reported an internal 84% reduction in permission prompts.

**How do I let an agent work unattended safely?**
Answer five questions: whether it knows what "done" is, whether it can check its work, what it can touch, what stops it (maximum turns or budget) and who approves the result. And don't approve the merge without a person.

**Should I use Claude Code or Codex?**
Both follow the same underlying pattern: persistent instructions, technical limits and verification. The choice depends more on your workflow and preferences than on a difference in principle. What matters is configuring the limits well in whichever you use.

## Conclusion: an agent is only as good as its limits

If I take one idea from going through these guides, it's that productivity with agents doesn't come from letting them loose but from **giving them good limits and good feedback**. Short instructions for what the model can't see, hard rules for what admits no exceptions and a way to check the work is right: with those three things, an agent can sustain long tasks without you watching it every minute.

The Nx story is the dark side of the same coin. An agent with full permissions and no limits is the best employee for whoever controls it. With limits and verification, it's the best employee for you.

And if you're wondering where all this fits in your career, I develop it in my reflection on [the tech job market in the age of AI](/en/developer-job-market-ai-2026): my theory is that, as producing code gets cheaper, **configuring, verifying and taking responsibility** for the agents' work is the center of the craft.

## Sources to go deeper

* [Claude Code: best practices guide (official documentation)](https://code.claude.com/docs/en/best-practices).
* [Anthropic Engineering: Claude Code sandboxing](https://anthropic.com/engineering/claude-code-sandboxing).
* [OpenAI: Codex agent approvals and security](https://developers.openai.com/codex/agent-approvals-security).
* [AGENTS.md: open instructions format for coding agents](https://agents.md).
* [Simon Willison: the lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/).
* [Wiz: analysis of the s1ngularity attack on Nx](https://wiz.io/blog/s1ngularity-supply-chain-attack) and [Socket: compromised Nx packages](https://socket.dev/blog/nx-packages-compromised).
* [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/).
* [Michael Nygard: documenting architecture decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).
