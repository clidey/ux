/*
 * Copyright 2026 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { NotFoundPage } from "@clidey/ux";
import { ExampleCode, ImportLine, Preview, PropsTable, Usage } from "./docs-component-pages";

export function DocsNotFound({ onHome }: { onHome: () => void }) {
  return <NotFoundPage onHome={onHome} homeLabel="Back to overview →" showMotionControls />;
}
export function NotFoundDocsPage({ onHome }: { onHome: () => void }) {
  return (
    <>
      <ImportLine names="NotFoundPage" />
      <Preview>
        <DocsNotFound onHome={onHome} />
      </Preview>
      <ExampleCode
        code={
          'import { NotFoundPage } from "@clidey/ux";\n\n<NotFoundPage\n  homeHref="/"\n  homeLabel="Back to home"\n  title="This page took a wrong turn."\n  defaultMotion="loop"\n/>'
        }
      />
      <PropsTable
        rows={[
          [
            "title / description / eyebrow",
            "ReactNode",
            "Default page copy",
            "Customize the text for your application.",
          ],
          [
            "homeHref / homeLabel",
            "string",
            '"/" / "Back to home"',
            "Home link destination and label.",
          ],
          ["onHome", "() => void", "—", "Use your router instead of the home link."],
          ["action", "ReactNode", "Home action", "Replace the home action; null hides it."],
          [
            "motion / onMotionChange",
            '"loop" | "once" | "off" / function',
            "—",
            "Control playback from your application.",
          ],
          [
            "defaultMotion",
            '"loop" | "once" | "off"',
            '"loop"',
            "Initial playback for uncontrolled use.",
          ],
          ["showMotionControls", "boolean", "false", "Show the Loop, Once, and Off controls."],
          ["className", "string", "—", "Style or position the outer section."],
        ]}
      />
      <Usage
        good={[
          "Offer a clear route back into the application.",
          "Respect reduced motion; the component automatically shows a still pose.",
        ]}
        bad={["Trap the user on a missing route without a next action."]}
      />
    </>
  );
}
