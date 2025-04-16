import React from 'react';

/**
 * A simple code syntax highlighter without external dependencies
 */

// JavaScript/TypeScript keywords to highlight
const keywords = [
  'import', 'export', 'default', 'function', 'class', 'const', 'let', 'var',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
  'return', 'new', 'this', 'typeof', 'instanceof', 'null', 'undefined',
  'true', 'false', 'try', 'catch', 'finally', 'throw', 'async', 'await',
  'extends', 'implements', 'interface', 'type', 'from', 'as'
];

/**
 * Process a line of code and return an array of tokens with their types
 * @param {string} code - The code to tokenize
 * @returns {Array} - Array of tokens with their types
 */
const tokenize = (code) => {
  // Define regex patterns for different token types
  const patterns = {
    whitespace: /^\s+/,
    keyword: new RegExp(`^(${keywords.join('|')})\\b`),
    string: /^(['"`])((?:\\.|(?!\1)[^\\])*)\1/,
    comment: /^(\/\/.*$)|(\/\*[\s\S]*?\*\/)/m,
    number: /^-?\d+(\.\d+)?/,
    jsx: /^<\/?[a-zA-Z][a-zA-Z0-9]*/,
    bracket: /^[{}()\[\]]/,
    identifier: /^[a-zA-Z_$][a-zA-Z0-9_$]*/,
    operator: /^[+\-*/%=<>!&|^~?:;.]+/,
    other: /^./,
  };

  const tokens = [];
  let remaining = code;

  // Process the code until there's nothing left
  while (remaining) {
    let matched = false;

    // Try each pattern
    for (const [type, pattern] of Object.entries(patterns)) {
      const match = remaining.match(pattern);
      if (match) {
        matched = true;
        const value = match[0];
        tokens.push({ type, value });
        remaining = remaining.slice(value.length);
        break;
      }
    }

    // Prevent infinite loop
    if (!matched) {
      tokens.push({ type: 'other', value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
};

/**
 * React component replacement for SyntaxHighlighter
 */
const CodeHighlighter = ({ children, language = 'js', className = '' }) => {
  // Allow passing a string or object (for when children come from components)
  const code = typeof children === 'string' ? children : (children?.toString() || '');

  // Split code into lines
  const lines = code.split('\n');

  return (
    <pre className={`code-highlighter ${className}`}>
      <code className={`language-${language}`}>
        {lines.map((line, lineIndex) => {
          // Tokenize the line
          const tokens = tokenize(line);

          return (
            <React.Fragment key={lineIndex}>
              {tokens.map((token, tokenIndex) => {
                // Assign CSS class based on token type
                const tokenClass = token.type === 'whitespace'
                  ? ''
                  : `code-${token.type}`;

                return (
                  <span
                    key={`${lineIndex}-${tokenIndex}`}
                    className={tokenClass}
                  >
                    {token.value}
                  </span>
                );
              })}
              {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
          );
        })}
      </code>
    </pre>
  );
};

export default CodeHighlighter;