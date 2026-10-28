---
title: "The Tech Job Market in the Age of AI: Why I Think Every Job Will Change (and Mine Already Did)"
sourceSlug: mercado-laboral-programadores-ia-2026
category: Career
date: '2026-10-27'
excerpt: "My theory about today's job market, tested against studies and data: what Stanford, METR, Stack Overflow and DORA say, and how a developer's job changes when they no longer write most of the code."
published: true
translated: '2026-10-28'
---

For years, my job could be summed up in one sentence: write code. I'd open the editor, understand a problem, translate it into instructions and ship it to production. That was the part that felt "mine". Today, that sentence no longer describes what I do. **I no longer write much of the code that reaches production.**

I don't say it with nostalgia or drama. I say it because it forced me to ask an uncomfortable question: if such a central part of my job changed so much in so little time, what is happening to everyone else's jobs? My theory, and what this article is about, is that **yes, every job is going to change**, and that the developer's job is simply the first one where it's clearly visible.

But theories are cheap. What makes an opinion valuable is testing it. So in this article I'll do two things: tell you what this change looks like from the inside, and set it against the **most serious studies available so far**: Stanford, METR, the Stack Overflow survey, Google's DORA report, the World Economic Forum and Anthropic's usage data. Some reinforce my theory, some qualify it and one casts doubt on it. You be the judge.

## What changed in my day to day

I'll start with the concrete. My day no longer revolves around typing functions. It revolves around other things:

*   **Deciding what to build and why**, and describing it precisely enough that another "mind" (human or not) can carry it out.
*   **Reviewing**: reading what was generated, understanding it, and spotting what is wrong, what is missing and what is dangerous.
*   **Verifying**: making sure something truly works, with tests, and not just that it "seems" to work.
*   **Thinking about security and architecture**: what a model can't see because it doesn't know the whole context of the system.
*   **Taking responsibility**: when something fails in production, nobody asks the model. They ask me.

If you've read my article on [what makes developers valuable when everyone can code with AI](/en/what-makes-developers-valuable-in-the-age-of-ai), this will sound familiar: I wrote it as a hypothesis, and today I live it as routine. And notice something: **none of those tasks is "programming" in the classic sense, and all of them require knowing how to program**. That is, perhaps, the central paradox of this moment.

## My theory in three claims

So it can be discussed (and refuted), I'm going to turn my intuition into three concrete claims:

1.  **Almost no knowledge job disappears overnight, but almost all of them change shape.** The title may stay the same; the daily content doesn't.
2.  **The change shows first at the entry level of a career.** The most repeatable, best-defined tasks, traditionally handled by junior profiles, are the easiest to automate.
3.  **Value moves toward specification, verification and responsibility.** Not toward "producing" things, but toward deciding which ones to produce, checking they are right and answering for them.

Now, the data.

## Chapter 1: Everyone uses it, almost nobody fully trusts it

Let's start with adoption, because it is the starting point for everything else.

The **Stack Overflow 2025 developer survey** reports that **84%** of respondents use or plan to use AI tools in their development process, up from 76% the previous year. So far, expected. The interesting part comes when asking about trust: **46%** actively distrust the accuracy of these tools, while only **33%** trust it, and just **3%** say they trust it "highly". A year earlier, trust was 43%.

In other words: **it is used more and more, and trusted less and less.** That seems contradictory, but to me it makes sense: the more you use a tool, the better you know its failures.

Google's **DORA 2025** report, based on almost **5,000 technology professionals**, points the same way: around **90%** use AI in their work and about **65%** rely on it heavily. Its central finding is a phrase I find key: AI acts as an **amplifier**. It magnifies the strengths of organizations that already work well and also the dysfunctions of those that don't. Also, unlike the previous year, the report associates AI use with higher delivery throughput, but warns that speeding up development can expose weaknesses further along the process.

| Source | Data point | What it tells me |
|---|---|---|
| Stack Overflow 2025 | 84% use or plan to use AI | Adoption is already the norm |
| Stack Overflow 2025 | 46% distrust its accuracy, 33% trust it | Trust lags behind usage |
| DORA 2025 | ~90% use AI, ~65% heavily | It's not an experiment, it's the workflow |
| DORA 2025 | AI is an "amplifier" | Good teams improve, bad teams get worse |

My reading: if 84% already use AI, **not using it isn't a competitive advantage, it's a disadvantage**. And if trust is low, **verification is where value accumulates**. This is where my third claim starts to make sense.

## Chapter 2: The canaries in the coal mine

Now the part that worries me most, and the one that deserves the most rigor.

In August 2025, three Stanford researchers (Erik Brynjolfsson, Bharat Chandar and Ruyu Chen) published a paper with a title that is already a metaphor: ***"Canaries in the Coal Mine?"*** Miners carried canaries because, being more sensitive to toxic gas, they warned of danger before it affected humans. The authors' question: who are the canaries of the labor market in the face of generative AI?

They used payroll data from **ADP**, one of the largest payroll processing companies in the United States, which lets you see real employment month by month. Their main finding: workers aged **22 to 25** in the occupations **most exposed to AI** have suffered a **relative employment decline** of **13%** (in the August 2025 version; a later November 2025 version reports 16%), even after controlling for firm-specific shocks. Among the most affected occupations, coverage highlights **software developers** and customer service agents. The study also finds that the declines are concentrated where AI tends to **automate** work and not where it **augments** it.

What the study doesn't say matters too, and the authors themselves point it out: they caution that the facts they document may be influenced in part by factors other than generative AI (I'd think, for example, of the tech sector's interest rate cycle). And it's a study of the **United States**, over a short time window. I read it as an **early signal, not a verdict**.

But it connects directly to my second claim. Think about how the craft used to be learned: junior profiles did bounded, well-defined, repeatable tasks (fixing a simple bug, writing a test, building a form) and that's how they developed judgment. Those are exactly the tasks an AI does best today. **If that first rung of the ladder breaks, the challenge is no longer just automation, it's how the next generation of people with judgment gets trained.** It's a question without an easy answer, and one that seems more important to me than any "AI will take jobs" headline.

If you're at that stage, I recommend my guide on [how to learn programming in the age of AI](/en/learn-programming-with-ai-without-becoming-dependent) and the [developer roadmap from beginner to hired](/en/developer-roadmap-from-beginner-to-hired).

## Chapter 3: The productivity paradox

So far it seems AI speeds everything up. But there is a study that made me stop and reconsider my own feelings, and that's why I include it here even though it partly contradicts my enthusiasm.

In July 2025, the research group **METR** published a randomized controlled trial, the gold standard for this kind of question. They recruited **16 experienced developers** from large, mature open-source projects they already worked on, and randomly assigned them **246 real tasks**: on some they could use AI and on others they couldn't. The tools were those of early 2025 (Cursor was the main one).

The result: when AI was allowed, developers took **19% longer**. In other words, they were **slower**. But the most revealing part isn't that, it's the perception: before starting they expected to be **24% faster**, and after finishing they believed they had been **20% faster**. They were wrong even about their own experience.

This study has to be read carefully, because the authors warn about its limits: few developers, highly experienced, working in large repositories they already knew, with tools from a couple of years ago. It doesn't imply the same happens today, or in other contexts (small projects, less experienced profiles, new tasks).

What I take from it is this:

*   **The feeling of productivity is not a measure of productivity.** It's easy to feel speed when the model writes a lot of code; what's hard is seeing the time that goes into waiting, correcting and reviewing.
*   If your value lies in **verifying and deciding**, then measuring your work by "how much code came out" is the wrong indicator. Consistent with my theory: the bottleneck moves from writing to reviewing.
*   It's also a warning to anyone leading teams: **measure results, not impressions**.

## Chapter 4: Automate or augment. How do you use the tool?

Anthropic analyzed how Claude is used in software development tasks in its *Economic Index*. One data point from its April 2025 report: on **Claude Code**, **79%** of conversations were classified as **automation** (the AI executes the task directly), compared with **49%** in the Claude.ai chat version. In the rest, the user collaborates with the AI (augmentation).

It's a snapshot of a specific tool and moment, not the figure for all AI usage, and later data show the proportions shift over time. But it illustrates well a difference that matters a lot to me: **using AI to do the task for you is not the same as using it to do the task better yourself.** And remember Stanford's finding: the negative employment effects concentrated where AI automates.

For me, the practical translation is this: when you automate, your value is in defining the goal, verifying the result and answering for it. When you augment, your value is your own judgment, which the AI amplifies. Either way, **judgment is what you don't delegate**.

## Chapter 5: We've seen this before

Every time a technology appears that automates part of the work, the fear is the same and the history tends to be more nuanced. In my [tour of the history of programming](/en/history-of-programming-languages-and-technologies) I describe how assembly made binary code cheaper, high-level languages made assembly cheaper and each leap raised the level of abstraction. The profession didn't disappear: **it moved up** and grew.

The **World Economic Forum**, in its *Future of Jobs Report 2025*, surveyed more than 1,000 large employers (over 14 million workers) and projects for 2030 the creation of about **170 million new jobs** and the loss of **92 million**, for a net of **78 million**. These are employer projections, not certainties, and the breakdown varies by sector. But they show something important that matches my first claim: **destruction and creation happen at the same time**. The problem isn't the total number, it's the **transition**: whoever loses one type of job is rarely the person who gets the new one without effort.

This is where my opinion parts ways with the two usual extremes. I don't think "AI will replace all programmers" (I discuss that in [Is AI replacing software developers?](/en/is-ai-replacing-software-developers)). But I don't think "everything will stay the same" either. I think the work **changes shape**, and that whoever doesn't change with it is left with a title that describes an activity that is no longer the center of the craft.

## How I see each role changing (my theory, not a fact)

This table is my **hypothesis**, based on what I see and the data above. Take it as a discussion point, not a prediction:

| Role | Before: the center was... | Now: the center moves toward... |
|---|---|---|
| Developer | Writing features | Specifying, reviewing, integrating and answering for the system |
| QA / Testing | Running and writing manual tests | Designing verification strategies and automating them |
| Security | Auditing code written by people | Reviewing code generated at scale and protecting the agents themselves |
| Product design | Producing screens and mockups | Exploring many options fast and choosing with judgment |
| Product management | Writing requirements | Writing specifications precise enough for a machine to execute |
| Support | Answering repetitive queries | Solving the complex cases automation can't |

Notice the pattern: in every case, the task of **producing** gets cheaper and those of **deciding, verifying and taking responsibility** get more expensive.

## What I'd do if I were starting today

If I were entering this market now, this is what I'd prioritize. It isn't a guaranteed recipe; it's what makes sense if my theory is right.

### 1. Learn the basics in depth, even if AI writes them

Without fundamentals you can't review. And reviewing is the skill that will be paid for most. Logic, data structures, how the network works, how a database works. I have guides for that: [programming logic and data structures](/en/programming-logic-and-data-structures-guide) and [how the internet works when you open a website](/en/how-the-internet-works-when-you-open-a-website).

### 2. Practice specifying precisely

Writing clearly what you want is a trainable and scarce skill. Practice writing requirements, edge cases and "done" criteria before asking a tool for anything.

### 3. Develop security and architecture judgment

It's what a model doesn't see because it doesn't know your whole system. My guide to [software architecture fundamentals and recommended books](/en/software-architecture-fundamentals-and-books) is a good starting point. And I develop the security context in [AI and software security](/en/ai-and-software-security-vulnerabilities-2026).

### 4. Build complete projects and be able to explain them

A portfolio with projects you can defend line by line weighs more than one generated without understanding it. If you used AI, great, but be able to explain every decision. See [portfolio projects that strengthen your developer resume](/en/portfolio-projects-that-strengthen-your-developer-resume).

### 5. Cultivate skills that don't automate easily

Communication, negotiation, understanding the business, working with people. They're in my guide to the [most valuable software development skills](/en/most-valuable-software-development-skills).

### 6. Use AI daily, but with method

If 84% already use it, not using it puts you at a disadvantage. But use it to understand, not just to produce. And measure: are you really going faster, or do you just feel it?

## Where I might be wrong

A theory that doesn't admit it could be wrong isn't a theory. These are the weak points of mine and what would change my mind:

*   **The data is early and limited.** The Stanford study covers the United States over a short period in which interest rates and the tech sector's hiring cycle also changed. If the decline in junior employment reverses with no change in AI, my second claim weakens.
*   **METR uses early-2025 tools.** Models and agents improve fast. An equivalent study today could give a different result, in either direction.
*   **My experience is a sample of one.** That my job changed so much doesn't mean other people's changes as fast. There are sectors, regulations and teams where adoption is much slower.
*   **I may be underestimating the creation of new jobs.** The World Economic Forum's projections point to a positive net balance. If that holds, the transition may be less painful than I fear.
*   **I may be overestimating the change in shape.** Perhaps many jobs change less than I think, and the difference lies in the speed of adoption more than in the nature of the work.

What would change my mind: seeing that people already working with these tools stop needing verification judgment (models becoming so reliable that reviewing is unnecessary), or junior employment recovering without changes in how the work is done.

## Timeline: the evidence so far

| Date | Milestone | What it adds |
|---|---|---|
| Jan. 2025 | World Economic Forum report | 170 M jobs created and 92 M displaced projected to 2030 |
| Apr. 2025 | Anthropic Economic Index (software development) | 79% automation on Claude Code vs 49% on Claude.ai |
| Jul. 2025 | METR study | Developers with AI 19% slower; believed they were 20% faster |
| Aug. 2025 | "Canaries in the Coal Mine" (Stanford) | Relative employment decline for ages 22 to 25 in exposed occupations |
| 2025 | Stack Overflow Developer Survey | 84% use AI; only 33% trust its accuracy |
| 2025 | DORA report | ~90% adoption; AI as an amplifier |

## Frequently Asked Questions about AI and the Tech Job Market

**Will AI replace programmers?**
Current data doesn't point to the profession disappearing, but to a change in the content of the work and early signals of impact on entry-level employment. The Stanford study finds a relative employment decline for people aged 22 to 25 in highly exposed occupations, including software development, but its authors warn there may be other factors.

**Are developers more productive with AI?**
It depends on context. A METR randomized controlled trial (July 2025) found that experienced developers took 19% longer with AI on large projects they already knew, although they believed they were faster. Other contexts (small projects, less experienced profiles, more recent tools) may give different results.

**What percentage of developers use AI?**
According to the Stack Overflow 2025 survey, 84% use or plan to use it. The DORA 2025 report estimates around 90% adoption among technology professionals.

**Which skills matter most now?**
In my opinion, the ones that can't be delegated: specifying precisely, verifying and reviewing, security and architecture judgment, communication and understanding the business. Programming fundamentals remain essential, because without them you can't review.

**Is it still worth learning to program today?**
I think so, with a nuance: learning to program is still the foundation for being able to review, debug and decide, but learning to write syntax is no longer enough. It's worth also learning to specify, test and understand complete systems.

**What about junior profiles?**
It's the most open question. Entry tasks are the most automatable, and that casts doubt on how the next generation's judgment gets formed. My advice is to build complete projects, understand what you do and use AI to learn, not to skip the learning.

## Conclusion: the title changes more slowly than the work

If living through this change has taught me anything, it's that **the title can stay the same while the work changes completely**. I'm still a "developer", but the activity that fills my day is different from a few years ago. And I think that is going to happen, at different speeds, in almost all knowledge professions.

The data doesn't prove my theory, but it doesn't contradict it either: mass adoption with little trust, early signals in entry-level employment, a study reminding us that our feelings of productivity can deceive us, and projections that speak of creation and destruction at once. What does seem consistent to me is the direction: **producing gets cheaper, and deciding, verifying and answering get more expensive.**

My advice is practical: don't bet on nothing changing or on everything disappearing. Bet on being someone with judgment, able to explain and defend what gets built. That, as far as the evidence goes, is what can least be automated.

## Sources to go deeper

* [Brynjolfsson, Chandar and Chen (Stanford): "Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence"](https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine/).
* [METR: the effect of early-2025 AI tools on experienced developers' productivity](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/).
* [Stack Overflow Developer Survey 2025: AI section](https://survey.stackoverflow.co/2025/ai).
* [DORA: State of AI-assisted Software Development 2025](https://dora.dev/research/ai/) and [Google's summary](https://blog.google/technology/developers/dora-report-2025/).
* [World Economic Forum: Future of Jobs Report 2025](https://www.weforum.org/stories/2025/01/future-of-jobs-report-2025-jobs-of-the-future-and-the-skills-you-need-to-get-them/).
* [Anthropic: the impact of AI on software development (Economic Index)](https://www.anthropic.com/research/impact-software-development).
