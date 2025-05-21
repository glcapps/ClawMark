# ClawMark

ClawMark is an intent-first pseudocode format written in Markdown for defining full applications using natural language. It enables LLMs to generate safe, idiomatic code—especially Rust—in a single pass, without boilerplate.

## ✨ Key Features

- **Natural Language Syntax** – Write what you mean using lists, headers, and simple English
- **Minimalist Semantics** – Focused enough for code generation, loose enough for rapid sketching
- **LLM-Ready** – Designed for use with OpenAI, Claude, and local models like Mixtral or LLaMA
- **First-Class `note:` and `todo:` Annotations** – Embed guidance and tasks in the source
- **Clippy- and Compiler-Corrective** – Feedback is applied at the intent level, not in the generated code
- **Editor Included** – Browser-based editor with Markdown preview and LLM integration

## 🧠 Philosophy

> Fix the intent, not the output.

ClawMark positions Markdown as the human-editable source of truth. When code fails, you edit the ClawMark—not the generated Rust. This makes iteration seamless and consistent.

## 📦 Structure Overview

- `# tools` – Declare crates and dependencies
- `## types` – Define data structures
- `## User can` – Describe behaviors with intent
- `# routes`, `# server` – REST and static file endpoints
- `note:` – Soft constraints to guide LLM behavior
- `todo:` – Pending decisions or clarity points
- `# schema`, `# sql behavior` – SQL schema and intent-level query structure
- `# understanding` – Logs model used, version, and result

## 🔧 Example

```markdown
# user_service module

# tools
serde
uuid
axum

# types

User
- id is uuid
- name
- email

# routes
root path prefix: /api

GET /users
- returns: list of User

POST /users
- creates new User from JSON body
- returns 201 or error

# async
- all handlers are async
```

## 📄 License

- Source code: MIT
- Language spec and documentation: CC BY 4.0

---
Visit [grizzled.dev](https://grizzled.dev) for updates and documentation.
