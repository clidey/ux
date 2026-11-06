/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState } from "react";
import * as UX from "@clidey/ux";
import { Demo, Status, DemoIcon } from "./demo-shell";
export function ButtonGroupPreview() {
  const [view, setView] = useState("Week");
  const [vertical, setVertical] = useState(false);
  return (
    <Demo hint="Switch the selected range and change the direction of the connected control.">
      <div className="ux-demo-row">
        <UX.ButtonGroup orientation={vertical ? "vertical" : "horizontal"}>
          {["Day", "Week", "Month"].map((item) => (
            <UX.Button
              key={item}
              variant={view === item ? "secondary" : "outline"}
              aria-pressed={view === item}
              onClick={() => setView(item)}
            >
              {item}
            </UX.Button>
          ))}
        </UX.ButtonGroup>
        <UX.Button variant="ghost" onClick={() => setVertical(!vertical)}>
          Use {vertical ? "horizontal" : "vertical"}
        </UX.Button>
      </div>
      <Status>{view} view</Status>
    </Demo>
  );
}
export function CopyPreview() {
  const [text, setText] = useState("workspace-studio");
  const [copied, setCopied] = useState(false);
  return (
    <Demo hint="Change the text and copy it to your clipboard.">
      <div className="ux-demo-row">
        <UX.Input
          aria-label="Text to copy"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setCopied(false);
          }}
        />
        <UX.CopyButton text={text} onCopy={() => setCopied(true)} tooltipLabel="Copy text" />
      </div>
      <Status>{copied ? "Copied to clipboard" : "Ready to copy"}</Status>
    </Demo>
  );
}
export function KbdPreview() {
  const [platform, setPlatform] = useState("mac");
  return (
    <Demo hint="Change platforms to see how shortcut labels adapt.">
      <div className="ux-demo-row">
        <UX.Kbd>{platform === "mac" ? "⌘" : "Ctrl"}</UX.Kbd>
        <UX.Kbd>K</UX.Kbd>
        <span>Open command search</span>
      </div>
      <UX.Button
        variant="outline"
        onClick={() => setPlatform(platform === "mac" ? "windows" : "mac")}
      >
        Show {platform === "mac" ? "Windows" : "macOS"} shortcut
      </UX.Button>
    </Demo>
  );
}
export function CardPreview() {
  const [saved, setSaved] = useState(false);
  return (
    <Demo hint="Save the project to change the card’s action and status.">
      <UX.Card className="ux-demo-card">
        <UX.CardHeader>
          <UX.CardTitle>Studio foundations</UX.CardTitle>
          <UX.CardDescription>One shared language for your next product.</UX.CardDescription>
          <UX.CardAction>
            <UX.Badge variant={saved ? "default" : "secondary"}>
              {saved ? "Saved" : "Draft"}
            </UX.Badge>
          </UX.CardAction>
        </UX.CardHeader>
        <UX.CardContent>
          <div className="ux-demo-metric">
            12 <span>components in progress</span>
          </div>
          <UX.Progress value={68} aria-label="Project completion" />
        </UX.CardContent>
        <UX.CardFooter>
          <UX.Button onClick={() => setSaved(!saved)}>
            <DemoIcon name={saved ? "check" : "bookmark"} />
            {saved ? "Saved to workspace" : "Save project"}
          </UX.Button>
        </UX.CardFooter>
      </UX.Card>
    </Demo>
  );
}
export function EmptyStatePreview() {
  const [created, setCreated] = useState(false);
  return (
    <Demo hint="Create a first project to leave the empty state, then reset the example.">
      {created ? (
        <div className="ux-demo-form">
          <UX.Badge>Project created</UX.Badge>
          <h3>Untitled project</h3>
          <UX.Button variant="outline" onClick={() => setCreated(false)}>
            Reset example
          </UX.Button>
        </div>
      ) : (
        <UX.EmptyState
          title="A fresh start"
          description="Your next idea deserves a place to grow."
          icon={<UX.CatalogIcon name="folder-plus" size={36} />}
        >
          <UX.Button onClick={() => setCreated(true)}>Create a project</UX.Button>
        </UX.EmptyState>
      )}
    </Demo>
  );
}
export function NotFoundPreview() {
  const [home, setHome] = useState(false);
  return (
    <Demo hint="Try the recovery action and the character’s motion controls.">
      {home ? (
        <div className="ux-demo-form">
          <h3>Back in your workspace.</h3>
          <UX.Button variant="outline" onClick={() => setHome(false)}>
            Show the missing page again
          </UX.Button>
        </div>
      ) : (
        <UX.NotFoundPage
          title="This page wandered off."
          description="Your workspace is still right here."
          homeLabel="Return to workspace"
          onHome={() => setHome(true)}
          showMotionControls
          defaultMotion="off"
        />
      )}
    </Demo>
  );
}

export function IconPresentationPreview() {
  const [variant, setVariant] = useState<"plain" | "subtle" | "solid">("subtle");
  return (
    <Demo hint="Compare presentation variants while keeping the same catalog artwork.">
      <div className="ux-demo-row">
        {(["plain", "subtle", "solid"] as const).map((value) => (
          <UX.Button
            key={value}
            variant={variant === value ? "secondary" : "ghost"}
            onClick={() => setVariant(value)}
          >
            {value}
          </UX.Button>
        ))}
      </div>
      <div className="ux-demo-row">
        <UX.Icon icon={<UX.CatalogIcon name="star" />} variant={variant} size={32} />
        <UX.Icon icon={<UX.CatalogIcon name="folder" />} variant={variant} size={32} />
        <UX.Icon icon={<UX.CatalogIcon name="settings" />} variant={variant} size={32} />
      </div>
    </Demo>
  );
}
