/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState, useSyncExternalStore } from "react";
import { Button, CatalogIcon } from "@clidey/ux";
import template from "../ai/starter-prompt.txt?raw";
import "./live-components.css";

export function StartWithAI() {
  const url = useSyncExternalStore(
    () => () => {},
    () => new URL(`${import.meta.env.BASE_URL}llms.txt`, location.origin).href,
    () => "https://clidey.github.io/ux/llms.txt",
  );
  const [message, setMessage] = useState("");
  const prompt = template.replace("{{CONTEXT_URL}}", url);
  return (
    <section className="ux-ai-starter" aria-label="Start building with Claude or Codex">
      <div className="ux-ai-starter-heading">
        <div>
          <span className="ux-ai-eyebrow">YOUR IDEA → YOUR APP</span>
          <h3>One prompt. The whole design system.</h3>
          <p>Copy this into Claude Code or Codex, then describe what you want to build.</p>
        </div>
        <Button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(prompt);
              setMessage("Starter prompt copied.");
            } catch {
              setMessage("Select the prompt below and copy it manually.");
            }
          }}
        >
          <CatalogIcon name="copy" size={16} />
          Copy starter prompt
        </Button>
      </div>
      <a className="ux-ai-context-link" href={url}>
        Read the complete build context <CatalogIcon name="arrow-up-right" size={14} />
      </a>
      <pre className="ux-ai-prompt" tabIndex={0}>
        <code>{prompt}</code>
      </pre>
      <span role="status" className="ux-demo-status">
        {message}
      </span>
    </section>
  );
}
