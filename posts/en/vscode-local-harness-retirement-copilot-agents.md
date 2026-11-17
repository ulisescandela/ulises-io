---
title: "VS Code Is Retiring Its Old Agent Harness: The Runtime Matters More Than the Model"
category: Tools
date: '2026-11-17'
excerpt: "VS Code will remove its Local harness in February 2027. The Copilot migration highlights why permissions, context, and execution matter as much as AI model quality."
published: true
sourceSlug: vscode-retira-harness-local-agentes-copilot-2027
tags: ["VS Code", "GitHub Copilot", "AI Agents", "Development", "Security"]
---

On November 16, GitHub reiterated a deadline worth noticing if you use AI coding assistants: **Visual Studio Code will remove its older Local harness in February 2027**. VS Code 1.146, released November 11, already deprecated it. The replacement, the Copilot harness, has been the default for new sessions since version 1.143.

This isn't another announcement about a model outperforming its competitors on coding benchmarks. It's a quieter infrastructure change, and arguably a more useful one: the software responsible for supplying context, connecting tools, and executing an agent's work is changing.

## An agent is not just a model

Developers often describe coding agents by naming their underlying model. We compare reasoning quality, debugging ability, and how often the model produces working code.

But a model alone cannot open a repository, run a test suite, or edit a file. It needs an execution environment—often called a *harness*—that manages context, tools, permissions, and the agent loop.

Change that environment and the practical behavior of an agent may change, even if the underlying model stays the same.

Microsoft describes the new Agent Host as a separate process that owns sessions and makes them accessible across VS Code surfaces. The Copilot harness is based on the Copilot SDK, a foundation shared with Copilot CLI and the GitHub Copilot application.

That doesn't mean every action moves to remote infrastructure. GitHub explicitly says switching harnesses **does not move your files to the cloud**. Agent commands can still run on your machine.

## What changes, and when

The November 11 release notes announced the deprecation; GitHub's November 16 changelog clarified the migration. The old harness remains available during the transition where organizational policy allows it, but new improvements will focus on its replacement.

In February 2027, the Local harness will be removed. So will the temporary enterprise setting `vscode.temporaryDefaultToLocalHarness`. Keeping that exception configured won't preserve the old runtime.

With the new architecture, a session can continue between the editor and the Agents window while its Agent Host process remains active. Some tools supplied by the editor still require an active editor connection. Persistent sessions are useful, but they don't magically make every tool independent of its client.

The newer harness also supports capabilities involving assisted permissions, connectors, and model comparisons. Some are previews or depend on subscription tiers and administrator settings. A feature appearing in release notes doesn't mean every developer has access to it.

## The security detail that matters

Automation changes the trust boundary.

An agent allowed to inspect source code, execute shell commands, and modify files has a much broader operating surface than a chatbot that only produces text. Its permissions deserve the same scrutiny we apply to build pipelines and other privileged developer tools.

GitHub says the Copilot harness supports centrally managed runtime permissions and sandbox restrictions that the older harness cannot enforce. But the announcement includes a critical caveat: **choosing the new harness does not enable sandboxing automatically**.

That distinction matters more than a marketing feature list.

My interpretation is that the harness belongs inside the development security architecture. Teams should know which directories an agent can change, which commands require approval, which credentials it can access, and how its actions are audited.

A capable model is not a substitute for carefully designed permissions.

## A practical migration plan for small teams

I wouldn't move every workflow blindly. I'd start a fresh session, verify that Copilot is selected as the harness, and inspect custom instructions, agents, hooks, and integrations that might depend on the older behavior.

Then I'd test representative tasks in a noncritical repository: run tests, change multiple files, resume a session, and request an operation that should require permission.

For teams, the result should be a short compatibility checklist rather than an assumption that everything transfers automatically. GitHub explicitly warns that switching harnesses doesn't convert every customization.

I'd also test functionality and security separately. Successfully finishing a coding task doesn't prove the agent respected intended boundaries. Inspect the commands it executed, the approvals it requested, and the files it changed.

For an independent SaaS builder, optimizing only for coding speed is tempting. But saving a few minutes means little if automation can accidentally break a release, access sensitive credentials, or produce changes nobody can trace.

## The bigger lesson

This announcement doesn't prove that Copilot is the best coding agent, or that any particular model has won. It confirms a concrete shift in the infrastructure VS Code uses to run agent sessions.

The engineering lesson is broader: **AI-assisted development will depend not only on smarter models, but on execution environments that are persistent, controllable, and auditable**.

Before February 2027, it's worth examining that less visible layer of the stack. It may not generate exciting benchmark headlines, but it directly affects how reliably we build software.

## Sources

- [Visual Studio Code 1.146 official release notes (November 11, 2026)](https://code.visualstudio.com/updates/v1_146)
- [GitHub Changelog: Local harness retirement (November 16, 2026)](https://github.blog/changelog/2026-11-16-vs-code-retires-the-local-harness-in-february-2027/)
- [VS Code Agent Host architecture (August 26, 2026)](https://code.visualstudio.com/blogs/2026/08/26/agent-host-architecture/)