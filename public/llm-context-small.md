


# ClawMark LLM Context (Small)

ClawMark is a Markdown-based pseudocode language for describing applications in terms of structure, behavior, and intent using natural language.

- Do not expect code syntax.
- Every list item is a declarative intent.
- `note:` prevents common mistakes (e.g. unwrap, Rc, sync IO).
- `todo:` marks unresolved decisions—do not fill these in.
- Treat types like `AppState` as shared if declared “system wide.”

Your task is to generate safe, idiomatic Rust from the ClawMark in a single pass. Assume async where needed, use traits and Result properly, and never emit ClawMark in the output.