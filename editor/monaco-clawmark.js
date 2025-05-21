

export function registerClawmark(monaco) {
  monaco.languages.register({ id: 'clawmark' });

  monaco.languages.setMonarchTokensProvider('clawmark', {
    tokenizer: {
      root: [
        [/^# .+/, 'keyword'],            // Top-level headers
        [/^## .+/, 'keyword'],           // Section headers
        [/^[-*] .+/, 'string'],          // Bullet items
        [/\b(GET|POST|PUT|DELETE|PATCH)\b/, 'keyword'],
        [/\breturns:\b/, 'type'],
        [/\broot path prefix\b/, 'type.identifier'],
        [/note:/i, 'type.identifier'],
        [/todo:/i, 'invalid'],
        [/\bis\b/, 'operator'],
        [/"[^"]*"/, 'string'],
        [/\d+/, 'number'],
      ],
    }
  });

  monaco.languages.setLanguageConfiguration('clawmark', {
    comments: {
      lineComment: '//'
    },
    brackets: [],
    autoClosingPairs: [
      { open: '"', close: '"' },
      { open: '`', close: '`' }
    ],
    surroundingPairs: [
      { open: '"', close: '"' },
      { open: '`', close: '`' }
    ]
  });
}