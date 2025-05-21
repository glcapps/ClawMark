
window.registerClawmarkAutocomplete = function(monaco) {
  monaco.languages.registerCompletionItemProvider('clawmark', {
    triggerCharacters: [' ', ':', '/', '#'],
    provideCompletionItems: function (model, position) {
      const suggestions = [

        // Top-level sections
        {
          label: '# tools',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: '# tools\n',
          documentation: 'Declare external crates or tools'
        },
        {
          label: '# types',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: '# types\n',
          documentation: 'Define structured data types'
        },
        {
          label: '# routes',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: '# routes\n',
          documentation: 'Declare REST API endpoints'
        },
        {
          label: '# server',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: '# server\n',
          documentation: 'Declare server behavior, bind port, static directory'
        },
        {
          label: '# async',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: '# async\n- ',
          documentation: 'Describe async behavior and handlers'
        },
        {
          label: '# schema',
          kind: monaco.languages.CompletionItemKind.Module,
          insertText: '# schema\n```sql\n\n```',
          documentation: 'Embed SQL schema directly'
        },
        {
          label: '# notes',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: '# notes\n- note: ',
          documentation: 'General advisory notes block'
        },
        {
          label: '# todos',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: '# todos\n- todo: ',
          documentation: 'Unresolved task list'
        },

        // Common block patterns
        {
          label: 'root path prefix',
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: 'root path prefix: /api',
          documentation: 'Used at top of # routes to define common path prefix'
        },
        {
          label: 'bind to',
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: '- bind to 0.0.0.0:5156',
          documentation: 'Server bind address'
        },
        {
          label: 'serve static',
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: '- serve static files from ./public',
          documentation: 'Serve frontend or SPA assets'
        },
        {
          label: 'fallback to index.html',
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: '- fallback to index.html for SPA',
          documentation: 'Single-page fallback routing'
        },

        // Route snippets
        {
          label: 'GET /path',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'GET /${1:path}\n- returns: ${2:200 OK with JSON}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'GET route definition'
        },
        {
          label: 'POST /path',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'POST /${1:path}\n- expects ${2:JSON body}\n- returns: ${3:200 OK or error}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'POST route definition'
        },

        // Behavior idioms
        {
          label: 'note: Arc not Rc',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'note: must be thread-safe (Clippy: avoid Rc)',
          documentation: 'Advisory to prefer Arc in shared contexts'
        },
        {
          label: 'note: no unwrap',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'note: avoid unwrap in async context',
          documentation: 'Promotes safe handling of Option/Result'
        },
        {
          label: 'todo: clarify',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'todo: clarify result type—Option or Result?',
          documentation: 'Flag for further clarification'
        },
        {
          label: 'returns:',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'returns: ',
          documentation: 'Response expectation for route or function'
        },
        {
          label: 'AppState is system wide',
          kind: monaco.languages.CompletionItemKind.Property,
          insertText: 'AppState is system wide\n- note: use Arc',
          documentation: 'Defines shared, thread-safe state container'
        }
      ];

      return { suggestions };
    }
  });
}