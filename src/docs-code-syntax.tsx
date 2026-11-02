/*
 * Copyright 2026 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { Highlight, type PrismTheme } from "prism-react-renderer";

// Syntax tokens use the active theme colors.
const codeTheme: PrismTheme = {
  plain: { color: "var(--foreground)", backgroundColor: "transparent" },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "var(--muted-foreground)", fontStyle: "italic" } },
    { types: ["keyword", "builtin", "function", "tag", "selector", "number", "boolean", "constant", "property", "class-name"], style: { color: "var(--primary)" } },
    { types: ["string", "char", "attr-value", "url", "regex", "inserted"], style: { color: "var(--docs-code-string)" } },
    { types: ["deleted"], style: { color: "var(--destructive)" } },
    { types: ["punctuation", "operator"], style: { color: "var(--foreground)" } },
  ],
};

export function CodeSyntax({ code, language = "tsx" }: { code: string; language?: string }) {
  return <Highlight code={code} language={language} theme={codeTheme}>{({ tokens, getTokenProps }) =>
    <code className={`language-${language}`}>{tokens.map((line, lineIndex) =>
      <span key={lineIndex} className="docs-code-line">{line.filter(token => !token.empty).map((token, tokenIndex) =>
        <span key={tokenIndex} {...getTokenProps({ token })} />)}{lineIndex < tokens.length - 1 ? "\n" : null}</span>)}</code>
  }</Highlight>;
}
