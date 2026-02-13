# ClawMark

ClawMark is an **intent-boundary language** written in Markdown.

It describes only the parts of a program an LLM cannot safely infer.

The generated code is disposable.\
The ClawMark is the source of truth.

------------------------------------------------------------------------

## Why ClawMark Exists

Modern coding agents already know how to write Rust (or any mainstream
language) correctly most of the time.

They fail when a problem has multiple *reasonable* implementations but
only one *correct* behavior.

Traditional specs try to describe everything.\
Prompts try to describe enough.\
ClawMark describes only what must not be guessed.

> ClawMark reduces the solution space until all remaining
> implementations are equivalent.

Instead of telling the model how to build software, you define the
boundaries inside which any implementation is acceptable.

------------------------------------------------------------------------

## Core Rule

**If a competent engineer would independently make the same choice, do
not write it.**

ClawMark contains only: - invariants - semantic constraints - failure
behavior - ownership meaning - temporal meaning

Not: - loops - data structures - framework usage - idiomatic patterns -
language mechanics

------------------------------------------------------------------------

## Philosophy

> Fix the intent, not the output.

Compiler errors, linter feedback, and runtime failures are corrected by
editing the ClawMark --- never the generated code.

The model regenerates a new implementation consistent with the refined
intent.

Code is a build artifact.\
Intent is the program.

------------------------------------------------------------------------

## What ClawMark Is

ClawMark is closest to:

-   executable behavioral constraints
-   synthesis boundary definitions
-   anti-hallucination specifications
-   invariant-first architecture

It is **not**: - pseudocode - a DSL - a prompt template - a code
generator config - documentation

------------------------------------------------------------------------

## What Goes Into ClawMark

Write only when guessing would break correctness.

Examples of valid ClawMark information:

    queue never blocks
    new data is dropped when full
    timestamp is capture time, not processing time
    producer is sole writer
    missed deadlines are counted, not retried
    processing order must match arrival order

Examples of invalid ClawMark information:

    use a Vec
    spawn a thread
    make a struct
    use async handlers
    iterate through items
    return Result

------------------------------------------------------------------------

## Structure Overview

ClawMark uses Markdown structure as semantic grouping.

Typical sections:

-   `# tools` --- external capabilities required
-   `# types` --- conceptual data shapes (not layouts)
-   `# behavior` --- allowed and forbidden behaviors
-   `# routes` --- external contract
-   `note:` --- guidance that narrows interpretation
-   `todo:` --- unresolved semantic decisions
-   `# understanding` --- model reasoning trace

The headings organize meaning; they do not prescribe implementation.

------------------------------------------------------------------------

## Example

``` markdown
# user service

goal: manage users via API

behavior:
- creating a user generates a stable unique id
- duplicate email is rejected
- deleting a user makes id permanently unusable

routes:
GET /users -> list users
POST /users -> create user
DELETE /users/{id} -> remove user
```

Many Rust programs satisfy this spec.\
All correct ones behave identically.

------------------------------------------------------------------------

## Workflow

1.  Write ClawMark
2.  Generate code
3.  Compile / lint / run
4.  Adjust ClawMark
5.  Regenerate

Never patch the generated code.

------------------------------------------------------------------------

## Target Use Cases

ClawMark is most valuable where correctness depends on semantics rather
than structure:

-   real-time systems
-   concurrency
-   protocol behavior
-   distributed coordination
-   state machines
-   long-lived systems where drift matters

------------------------------------------------------------------------

## Editor

Browser editor with preview and LLM integration:

https://glcapps.github.io/ClawMark/public/editor.html

------------------------------------------------------------------------

## License

Source code: Apache 2.0
