---
title: "AI and Software Security: How Vulnerabilities Accelerated (and What to Do About It)"
sourceSlug: seguridad-software-ia-vulnerabilidades-2026
category: AI
date: '2026-10-28'
excerpt: "A data-driven, sourced tour of how AI is changing software security, from insecure generated code and hallucinated packages to bug-hunting agents and automated attacks."
published: true
translated: '2026-10-28'
---

In October 2024, Google's Project Zero team published something that, looking back, marked a before and after. An AI agent called **Big Sleep** had found a real, exploitable, previously unknown vulnerability in **SQLite**, one of the most widely used database engines on the planet. It was a stack buffer underflow. The SQLite developers fixed it **the same day** it was reported, before it reached an official release. Nobody was harmed.

It was good news. But if you work in security, it was also a warning bell: if an agent can find a bug like that in a project as heavily reviewed as SQLite, who else can do it? And what happens when that same capability is used by someone who isn't going to report it?

This article is my attempt to organize that question with **data, studies and sources**, not with fear or hype. I'll walk through five fronts where AI is changing software security: the code it writes, the dependencies it invents, the bugs it discovers, the attacks it automates, and the AI tools that are now part of your attack surface. And at the end, what you can do with your own code, today.

An honest warning before we start: the title talks about vulnerabilities that "accelerated", and we'll see the story is more nuanced than "everything grows exponentially because of AI". What does grow quickly is the **speed** on every side: that of whoever builds, whoever discovers and whoever attacks.

## Before AI: security was already a hard race

To understand the effect of AI, we need a baseline. Public vulnerabilities are recorded as **CVEs** (Common Vulnerabilities and Exposures). These are the CVEs published per year, according to Jerry Gamblin's annual count, one of the most cited analyses:

| Year | CVEs published | Change |
|---|---|---|
| 2022 | 25,081 | — |
| 2023 | 28,902 | +15% |
| 2024 | 40,009 | +38% |
| 2025 | 48,185 | +20.6% |

From 2023 to 2025 the figure grows by roughly 1.7x. That is enormous growth, but it needs careful reading, because **not all of that increase is "caused" by AI**:

*   In February 2024 the **Linux kernel** became a CVE Numbering Authority (CNA) and began assigning CVEs in bulk, which explains part of the 2024 jump.
*   There are more numbering authorities, more researchers and more automated scanners than before. More CVEs doesn't always mean less secure software; it also means more **observed** software.

The prudent conclusion is this: security was already under pressure from the sheer volume of software and digital surface area. What AI adds is not so much a new class of problem as a **speed multiplier** at three points: how much code gets written, how fast flaws are found, and how fast attacks get automated.

If you're curious how every technological leap like this has happened before, my tour of the [history of programming](/en/history-of-programming-languages-and-technologies) shows the pattern: every time we climb a level of abstraction, we gain productivity and new ways to get things wrong appear.

## Chapter 1: AI writes code, and it writes it with our flaws

The first question is the most obvious one: is the code an AI generates secure?

### 2021: "Asleep at the Keyboard"

Shortly after GitHub Copilot launched, a group at New York University (Pearce and colleagues) ran a systematic experiment. They gave Copilot **89 scenarios** built from the most dangerous weaknesses on MITRE's **CWE Top 25** list and generated **1,689 programs**. Roughly **40%** turned out to be vulnerable.

Two important caveats: the prompts were designed to provoke flaws, and "vulnerable" means potentially exploitable, not exploited. Even so, the finding was clear: the model had learned from public code, and public code includes every mistake humans have made over decades.

### 2022: the problem isn't just the code, it's the confidence

A Stanford team (Perry, Srivastava, Kumar and Boneh) went a step further and studied real **people** solving tasks with and without an assistant. Their conclusions:

*   Those who used the assistant wrote **insecure solutions more often** in four of the five tasks.
*   They also **believed** they had written more secure code than those who didn't use it.
*   Those who distrusted the AI more and put more effort into crafting their prompts made fewer security mistakes.

That last part is the one that matters most to me: the risk isn't only that the AI makes mistakes, it's that it **makes us feel safer than we are**. It's the same old trap, with a more convincing tool.

### 2025: Veracode and the choice between secure and insecure

In July 2025, Veracode published its *GenAI Code Security Report*. They designed **80 coding tasks** with a catch: each could be solved in a secure or an insecure way, based on CWE weaknesses. They ran them against **more than 100 language models**. The headline: in **45%** of cases, the model chose the insecure option. Java had the worst results; Python, C# and JavaScript fell in a failure band of 38% to 45%, according to coverage of the report.

Another detail worth keeping: models tend to do reasonably well on fixed-pattern flaws (like SQL injection) and much worse on context-dependent ones (like XSS), where you need to understand **where that data will end up**. And a model doesn't see your whole application; it sees the fragment you gave it.

What this study doesn't say, and I want to be clear, is that human-written code is more secure on average. All three sources (NYU, Stanford and Veracode) measure AI under controlled conditions with specific prompts. What they do show is that **you cannot delegate security judgment to the model**.

## Chapter 2: When a hallucination becomes an attack vector

Here the story gets interesting, because a type of attack appears that didn't exist before code assistants.

Language models sometimes **make things up** with total confidence. In code, one of the things they invent is **package names**: they suggest `pip install some-util-package` and that package doesn't exist in any registry. For a distracted developer it's an installation error. For an attacker it's an opportunity.

The term is **slopsquatting** (coined by Seth Larson of the Python Software Foundation and popularized by Andrew Nesbitt). The idea: an attacker registers a package on npm or PyPI under the name the AI tends to invent, puts malicious code in it, and waits for someone to install it on the assistant's recommendation.

A study by researchers at the University of Texas at San Antonio, Virginia Tech and the University of Oklahoma, presented at **USENIX Security 2025**, measured how real the problem is:

*   They tested **16 models** for code generation and analyzed **576,000** Python and JavaScript code samples.
*   They found **205,474** unique hallucinated package names that did not exist in the public registry.
*   Open-source models hallucinated packages around **21.7%** of the time; commercial models, around **5.2%**.
*   The most unsettling part: when repeating runs with the same prompts, around **43%** of the hallucinated packages **reappeared**. In other words, the hallucinations are predictable enough for an attacker to anticipate.

A very practical defensive point: before installing any dependency an AI suggested, check it. It takes under a minute:

```bash
npm view package-name name version time.created maintainers dist-tags
npm audit signatures
```

Look at when the package was created, who maintains it and whether it has a history. A package created two days ago with a name that "coincidentally" matches what your assistant suggested deserves a second look. And for serious projects, pin exact versions and turn off automatic install scripts:

```ini
save-exact=true
ignore-scripts=true
```

That file is an `.npmrc`. With `ignore-scripts=true`, a compromised package does not execute arbitrary code at install time (you'll have to explicitly allow the scripts of packages that need them).

## Chapter 3: AI as a vulnerability hunter

Now to the bright side, which is also the one that should worry you most if you're on the wrong end of it: AI is very good at finding bugs.

### October 2024: Big Sleep and the SQLite bug

Back to the beginning. Big Sleep evolved from Project Zero's **Naptime** project and found an exploitable stack buffer underflow in SQLite. Google presented it as the first public example of an AI agent discovering a previously unknown memory-safety vulnerability in widely used, real-world software. The key detail is the speed of the response: patched the same day.

### 2025: a bot at the top of HackerOne

In 2025, **XBOW**, an autonomous pentester, reached first place on the US **HackerOne** leaderboard, the world's largest bug bounty platform. According to the company itself, it submitted over a thousand vulnerability reports against production systems. Two necessary caveats: HackerOne requires a human to review each finding before submission, and the figures come mainly from the company and the press, not from an independent audit. Even so, an autonomous system competing in the same league as the best human hunters is a signal.

### August 2025: DARPA's AI Cyber Challenge

At **DEF CON 33**, DARPA wrapped up its *AI Cyber Challenge* (AIxCC), a two-year competition in which teams built autonomous systems able to **find and fix** vulnerabilities. **Team Atlanta** (Georgia Tech, Samsung Research, KAIST and POSTECH) won with 392.76 points and the $4 million prize. According to DARPA:

*   The finalist systems identified **86%** of the final's synthetic vulnerabilities, up from **37%** in the semifinals. That's a remarkable jump in a single year of competition.
*   They also discovered **18 real vulnerabilities** not injected by the organizers.

A transparency note: DARPA corrected the number of synthetic vulnerabilities in the final along the way (from 70 to 63), so press figures from those days don't always match.

### February 2026: more than 500 validated findings

In February 2026, Anthropic's research team (the Frontier Red Team) published that Claude Opus 4.6 had found and validated **more than 500 high-severity vulnerabilities** in open-source software, focused on memory corruption. Each finding was validated by someone on the team or by an outside researcher, and several were in projects that had been **subjected to fuzzing for years**. Libraries such as Ghostscript, OpenSC and CGIF are cited, already patched by their maintainers.

That last point is the important one: these aren't bugs in abandoned code. They are flaws that traditional techniques and a lot of human effort had not found. This is data from the company itself and some people dispute the severity of part of the reports, but the trend is consistent with the earlier cases.

### The defender's dilemma

Why is this a problem as well as an opportunity? Because vulnerability discovery is **asymmetric**. The defender must find and fix *every* flaw. The attacker needs *one*. If AI makes discovery cheaper, the advantage depends on who uses it first and how fast the recipient can **patch**. The bottleneck shifts from "finding the bug" to "validating it, prioritizing it and deploying the fix". Many maintainers of small, volunteer-run projects don't have that capacity.

## Chapter 4: AI as a weapon. The story of GTG-1002

In September 2025 something happened that Anthropic publicly described in November as the first known large-scale espionage campaign **mostly orchestrated by AI**. It's worth telling well because it illustrates what changed.

**The scene.** In mid-September, Anthropic detected suspicious activity. After an investigation of about ten days, it concluded with high confidence that a Chinese state-sponsored group, which it called **GTG-1002**, was behind it. The targets were about thirty organizations: large tech companies, financial institutions, chemical manufacturers and government agencies. The attackers got in in a small number of cases.

**The trick.** The human operators had a problem: Claude is trained to refuse cyberattacks. They solved it with social engineering applied to a model: they split the operation into small, seemingly innocent tasks so the model never saw the full purpose, and told it that it worked for a legitimate cybersecurity firm doing defensive testing.

**The division of labor.** The humans chose targets and built the attack framework, which used Claude Code as an automated tool. The AI did, according to Anthropic, **80% to 90%** of the tactical work: reconnaissance, vulnerability research, exploit writing, credential harvesting, lateral movement and data exfiltration. Humans intervened at about **four to six critical decision points** per campaign. At its peak, the system made thousands of requests, often several per second, a speed impossible for a human team.

**The flaw.** And here's the nuance that tends not to make the headlines: Claude **hallucinated**. Sometimes it invented credentials that didn't work, and sometimes it claimed to have extracted secret information that was actually public. Anthropic describes it as an obstacle that still holds back fully autonomous attacks.

**The lesson.** For me there are two. The first: the cost of running a sophisticated attack went down, because a small group can orchestrate the work of a large one. The second, more reassuring: agents are still fallible, and that fallibility creates **detectable noise**. Defense can also be automated: Anthropic recommends that security teams experiment with AI in SOC automation, threat detection and incident response.

## Chapter 5: Your AI tools are also attack surface

So far, AI as writer, hunter and weapon. One chapter is left, the one closest to you as a developer: **your own AI tools can be used against you**.

### s1ngularity: when malware used your coding assistant

On August 26, 2025 it was discovered that several versions of the popular **Nx** build system on npm had been published with malicious code. So far, a classic supply chain attack. What was new was what the malware did: it ran the **command-line AI assistants** the developer had installed (Claude, Gemini, Amazon Q) with flags that disable permissions (`--dangerously-skip-permissions`, `--yolo`, `--trust-all-tools`) and asked them to search the file system for secrets. Then it published them to public GitHub repositories.

Wiz analyzed the incident and its conclusion is nuanced: roughly half of the victims had AI tools installed, but AI-mediated exfiltration succeeded in fewer than 25% of cases, and the figures for leaked secrets that circulated at first were inflated compared with what was actually valid. In other words, it wasn't an attack "devastating because of AI", but it was **the first time a developer's assistant was used as a reconnaissance tool**. And it showed something uncomfortable: those flags for "let it all run without asking" are exactly what an attacker is looking for.

### Shai-Hulud: the npm worm

A few weeks later, in September 2025, **Shai-Hulud** appeared, a self-replicating worm that spread through npm. It stole authentication tokens from the compromised developer and used them to inject its code into the other packages that person maintained and republish them. The first reports spoke of about 180 packages and the figure rose to more than 500. The US agency CISA issued an alert on September 23, 2025. There was a second wave in late November. It didn't depend on AI, but it's the scenario in which a dependency suggested by an assistant, unreviewed, does the most damage.

### The mental model: the "lethal trifecta"

To reason about agent risk, the best tool I know is the **lethal trifecta** that Simon Willison proposed in June 2025. An agent becomes dangerous when it combines three things:

1.  **Access to private data** (your code, your keys, your email).
2.  **Exposure to untrusted content** (a web page, a GitHub issue, a README, a document).
3.  **The ability to communicate externally** (make HTTP requests, send email, open PRs).

If all three are present, an attacker who manages to get instructions into the untrusted content (*prompt injection*) can make the agent hand over your data. Willison insists we can't count on vendors to solve it: we have to avoid the combination ourselves. Meta published a similar framework in October 2025, the **"Agents Rule of Two"**, with the same idea.

This connects to the **OWASP Top 10 for LLM Applications (2025)**, which deserves a place within reach:

| # | Risk | Why it matters to you |
|---|---|---|
| LLM01 | Prompt Injection | Hidden instructions in content the model reads |
| LLM02 | Sensitive Information Disclosure | The model leaks data it shouldn't |
| LLM03 | Supply Chain | Compromised models, plugins and packages |
| LLM04 | Data and Model Poisoning | Manipulated data that changes behavior |
| LLM05 | Improper Output Handling | Executing or rendering model output without validating it |
| LLM06 | Excessive Agency | Too many permissions and too much autonomy for the agent |
| LLM07 | System Prompt Leakage | Secrets or logic in the prompt that leak |
| LLM08 | Vector and Embedding Weaknesses | Attacks on retrieval systems (RAG) |
| LLM09 | Misinformation | False answers that look true |
| LLM10 | Unbounded Consumption | Abuse of resources and costs |

For people who program with agents, the most relevant day to day are LLM01, LLM03, LLM05 and LLM06: content that injects instructions, doubtful dependencies, outputs executed without review and excess permissions.

## So, is it exponential?

Back to the question in the title. Have vulnerabilities shot up "exponentially" because of AI? My honest answer, with the data above:

| What grows | Evidence | How fast | Caused by AI? |
|---|---|---|---|
| Number of CVEs published | 28,902 (2023) → 48,185 (2025) | ~1.7x in two years | In part; other factors (CNAs, more scanners) |
| Volume of new code | Mass adoption of assistants | Very fast | Yes, directly |
| Insecure generated code | ~40% (2021), 45% (2025) | Same order of magnitude (different methodologies) | Yes, directly |
| Speed of bug discovery | Big Sleep → AIxCC → 500+ findings | Clear acceleration in ~18 months | Yes |
| Attack automation | GTG-1002, s1ngularity | First documented cases | Yes |
| Supply chain attacks | Nx, Shai-Hulud | High frequency in 2025 | Partially |

What is **truly exponential** is not the number of CVEs but the machines' **capability** to write, discover and attack. And that capability is being applied equally to all three sides: building, defending and attacking. Vulnerabilities are not necessarily more abundant per line of code; there is far more code, discovered and exploited far faster.

This changes an assumption we took for granted for years: that there was a reasonable window between a vulnerability being published and someone exploiting it. That window is shrinking.

## What you can do, today

You don't need a security team to improve your posture considerably. This is the list I'd follow, ordered by impact over effort.

### 1. Treat AI code as code from a stranger

It's the most important rule and the simplest. Every AI-generated diff goes through review, just like a new collaborator's you don't trust yet. Reviewing is not "skim and approve". It's asking yourself: what inputs reach this? Who controls that data? What happens if it's hostile?

### 2. Give it a way to verify its own work

Tests, linters, static analysis (SAST) and dependency scanning in CI. An AI with tests that run every time fixes much of its own mistakes. If you also have security rules in the pipeline, the error reaches you less often. If you're interested in how to set that up with an agent, I explain it with concrete examples in my guide to [Claude Code and Codex tips](/en/claude-code-and-codex-tips-security-architecture-workflow).

### 3. Distrust new dependencies

Apply the check from chapter 2 before installing. Pin versions, review the package's history and use `ignore-scripts`. For Python, install with verified hashes:

```bash
pip install --require-hashes -r requirements.txt
```

### 4. Least privilege for your agents

Apply the lethal trifecta to your own setup. Can your agent read `.env`? Can it make requests to any domain? Can it publish without you reviewing? Every "yes" is a risk you can trim. Keep secrets out of its reach, use a *sandbox* and never use the "skip permissions" flags outside a disposable container. The s1ngularity case is exactly why.

### 5. Secrets: rotate and limit

If something leaks, what matters is how long the damage lasts. Short-lived credentials, narrow permissions and frequent rotation reduce the blast radius of a stolen token, whether from Shai-Hulud or from a slip-up.

### 6. Learn security basics, now more than ever

Precisely because AI writes more code, the judgment to review it is more valuable. Understanding what an injection, an XSS, an insecure deserialization or a broken access control is lets you **spot what the model missed**. It's part of what I explain in [what makes developers valuable when everyone can code with AI](/en/what-makes-developers-valuable-in-the-age-of-ai): judgment is the scarce part.

## Timeline: from Copilot to autonomous agents

| Date | Milestone | Why it matters |
|---|---|---|
| 2021 | "Asleep at the Keyboard" (NYU) | ~40% of Copilot programs vulnerable |
| 2022 | Stanford study | Users with AI write less secure code and believe it's more secure |
| Oct. 2024 | Big Sleep finds a bug in SQLite | First real, exploitable bug found by an agent, patched the same day |
| Jun. 2025 | "Lethal trifecta" (Willison) | Mental model for agent risks |
| 2025 | XBOW leads HackerOne (US) | An autonomous system competes with the best humans |
| Jul. 2025 | Veracode GenAI Code Security Report | 45% of choices are insecure across 80 tasks |
| 2025 | Slopsquatting study (USENIX Security) | 205,474 unique hallucinated packages |
| Aug. 2025 | DARPA AIxCC at DEF CON 33 | 86% of synthetic vulnerabilities found, 18 real ones |
| Aug. 26, 2025 | s1ngularity (Nx) | Malware that uses the developer's AI CLIs |
| Sep. 2025 | Shai-Hulud on npm | Self-replicating worm; CISA alert on September 23 |
| Nov. 13, 2025 | GTG-1002 | First espionage campaign mostly orchestrated by AI |
| Feb. 5, 2026 | Claude Opus 4.6: 500+ findings | High-severity bugs in projects with years of fuzzing |

## Frequently Asked Questions about AI and Software Security

**Is AI-generated code less secure than human-written code?**
The available studies (NYU 2021, Stanford 2022, Veracode 2025) show that models often generate insecure code and that users tend to overestimate its security. None demonstrates that human code is better on average; what they demonstrate is that you shouldn't approve generated code without reviewing it.

**What is slopsquatting?**
It's a supply chain attack that exploits the fact that models invent package names. An attacker registers the hallucinated name on npm or PyPI with malicious code and waits for someone to install it on the assistant's suggestion. A study presented at USENIX Security 2025 found 205,474 unique hallucinated names and that around 43% repeated.

**Can an AI find vulnerabilities on its own?**
Yes, there are documented cases: Big Sleep in SQLite, the AIxCC systems and Anthropic's more than 500 validated findings. Even so, in practice human review is needed to validate, prioritize and fix. XBOW, for example, required human review of each report on HackerOne.

**What is the lethal trifecta?**
It's Simon Willison's framework (June 2025) according to which an agent is especially vulnerable when it combines access to private data, exposure to untrusted content and the ability to communicate externally. If your agent has all three, a *prompt injection* attack can leak your data.

**Is it safe to use `--dangerously-skip-permissions` or equivalent options?**
Only inside a disposable, isolated environment with no access to real secrets. The s1ngularity attack used exactly these flags in the AI CLIs installed on victims' machines.

**Where do I start if I'm a developer and don't know security?**
Start with three habits: review every AI-generated diff as if it came from a stranger, verify new dependencies before installing them and keep secrets out of your tools' reach. Then learn the OWASP fundamentals.

## Conclusion: speed is the real change

If this research leaves me with one thing, it's that AI didn't invent software security problems. What it did was **accelerate everything**: writing code, discovering flaws and executing attacks. A SQLite bug patched the same day and an espionage campaign making thousands of requests per second are two faces of the same phenomenon.

The good news is that the basic defenses still work, and perhaps matter more than before: review, verify, limit permissions and distrust what you can't check. The bad news is that the margin for error is shrinking, because the window between a flaw and its exploitation is getting shorter.

If you're a developer, the implication is clear: your **security judgment** becomes one of the most valuable skills on the team. And if you're wondering how your work in general is changing, here is my reflection on [the tech job market in the age of AI](/en/developer-job-market-ai-2026).

## Sources to go deeper

* [Google Project Zero: From Naptime to Big Sleep (October 2024)](https://projectzero.google/2024/10/from-naptime-to-big-sleep.html).
* [Jerry Gamblin: CVE data review for 2025](https://jerrygamblin.com/2026/01/01/2025-cve-data-review/), [2024](https://jerrygamblin.com/2025/01/05/2024-cve-data-review/) and [2023](https://jerrygamblin.com/2024/01/03/2023-cve-data-review).
* [Pearce et al.: "Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions"](https://arxiv.org/pdf/2108.09293).
* [Perry et al.: "Do Users Write More Insecure Code with AI Assistants?"](https://arxiv.org/html/2211.03622v3).
* [Veracode: GenAI Code Security Report 2025 (press release)](https://www.veracode.com/press-release/ai-generated-code-poses-major-security-risks-in-nearly-half-of-all-development-tasks-veracode-research-reveals/).
* [Socket: slopsquatting and AI hallucinations as a supply chain attack](https://socket.dev/blog/slopsquatting-how-ai-hallucinations-are-fueling-a-new-class-of-supply-chain-attacks) and [Cloud Security Alliance research note](https://labs.cloudsecurityalliance.org/research-rb/csa-research-note-slopsquatting-ai-coding-assistant-supply-c/).
* [XBOW: how it reached first place on HackerOne](https://xbow.com/blog/top-1-how-xbow-did-it/).
* [DARPA: AI Cyber Challenge results](https://www.darpa.mil/news/2025/aixcc-results).
* [Anthropic Frontier Red Team: finding zero-day vulnerabilities](https://red.anthropic.com/2026/zero-days/).
* [Anthropic: disrupting the first AI-orchestrated espionage campaign (GTG-1002)](https://www.anthropic.com/news/disrupting-AI-espionage).
* [Wiz: analysis of the s1ngularity attack](https://wiz.io/blog/s1ngularity-supply-chain-attack) and [Socket: compromised Nx packages](https://socket.dev/blog/nx-packages-compromised).
* [CyberScoop: Shai-Hulud on npm](https://cyberscoop.com/supply-chain-attack-shai-hulud-npm/).
* [Simon Willison: the lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/).
* [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/).
