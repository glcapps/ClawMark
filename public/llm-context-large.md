


# ClawMark LLM Context (Large)

You are translating a ClawMark file into idiomatic Rust. ClawMark is a Markdown-based pseudocode language that describes software modules using natural language. It is designed for LLMs and developers to co-author applications with minimal syntax and maximum clarity.

## Rules

- Every section (`#`, `##`) defines scope (module, trait, behavior, etc.)
- List items are declarative steps or fields.
- `note:` clarifies subtle intent or prevents common LLM pitfalls.
- `todo:` is a marker for unresolved decisions—do not implement these unless clarified.
- Assume `AppState` is shared across threads if declared system wide.
- If a type is named but not detailed, infer a minimal plausible shape.

## Behaviors

- Describe function logic in steps: input → transformation → output.
- Use safe patterns: no `unwrap`, no sync IO in async contexts.
- If unsure between `Rc` vs `Arc`, prefer `Arc` in any shared or threaded context.
- Prefer `Result<T, E>` over panicking on failure.
- Infer `async` when I/O or network access is implied.

## Output Expectations

- All Rust output must compile and pass Clippy.
- Trait and impl usage should match idiomatic style.
- Test cases defined in ClawMark must generate valid `#[test]` functions.
- Avoid boilerplate unless explicitly requested.
- Never copy ClawMark syntax into the output; it is input only.