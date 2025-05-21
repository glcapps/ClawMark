export function defineClawmarkTheme(monaco) {
  monaco.editor.defineTheme('clawmark-theme', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: '1e88e5', fontStyle: 'bold' },        // headers, verbs
      { token: 'type.identifier', foreground: '43a047', fontStyle: 'italic' }, // note:, root path
      { token: 'invalid', foreground: 'e53935', fontStyle: 'italic' },      // todo:
      { token: 'string', foreground: '6a1b9a' },                            // quoted strings
      { token: 'number', foreground: '00897b' },                           // numbers
      { token: 'operator', foreground: '546e7a' }                          // is
    ],
    colors: {
      'editorLineNumber.foreground': '#9e9e9e',
      'editorIndentGuide.background': '#e0e0e0',
    }
  });
}
