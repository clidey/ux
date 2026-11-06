/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState } from "react";
import * as UX from "@clidey/ux";
import { Demo, Status, DemoIcon } from "./demo-shell";
export function BadgePreview() {
  const [variant, setVariant] = useState<"default" | "secondary" | "destructive" | "outline">(
    "default",
  );
  return (
    <Demo hint="Choose a treatment and see the badge change while keeping its readable label.">
      <div className="ux-demo-row">
        {(["default", "secondary", "destructive", "outline"] as const).map((x) => (
          <UX.Button
            key={x}
            size="sm"
            variant={variant === x ? "secondary" : "ghost"}
            aria-pressed={variant === x}
            onClick={() => setVariant(x)}
          >
            {x}
          </UX.Button>
        ))}
      </div>
      <UX.Badge variant={variant}>
        <DemoIcon name="check-circle" /> Ready to review
      </UX.Badge>
    </Demo>
  );
}
export function AlertPreview() {
  const [error, setError] = useState(false);
  return (
    <Demo hint="Switch between an informative message and a failure with a recovery action.">
      <UX.Alert variant={error ? "destructive" : "default"}>
        <DemoIcon name={error ? "warning" : "info"} />
        <UX.AlertTitle>
          {error ? "The import needs another try" : "Your workspace is up to date"}
        </UX.AlertTitle>
        <UX.AlertDescription>
          {error
            ? "Your original file is safe. Retry when you’re ready."
            : "Everything you need is available on this device."}
        </UX.AlertDescription>
      </UX.Alert>
      <UX.Button variant="outline" onClick={() => setError(!error)}>
        {error ? "Retry import" : "Simulate an error"}
      </UX.Button>
    </Demo>
  );
}
export function SkeletonPreview() {
  const [loading, setLoading] = useState(true);
  return (
    <Demo hint="Toggle loading to compare a stable skeleton layout with the finished content.">
      <div className="ux-demo-row">
        {loading ? (
          <UX.Skeleton className="ux-demo-avatar" />
        ) : (
          <span className="ux-demo-avatar ux-demo-avatar-loaded">AC</span>
        )}
        <div className="ux-demo-skeleton-lines">
          {loading ? (
            <>
              <UX.Skeleton className="ux-demo-skeleton-title" />
              <UX.Skeleton className="ux-demo-skeleton-subtitle" />
            </>
          ) : (
            <>
              <strong>Alex Chen</strong>
              <p>Product designer · Studio workspace</p>
            </>
          )}
        </div>
      </div>
      <UX.Button variant="outline" onClick={() => setLoading(!loading)}>
        {loading ? "Show loaded content" : "Show skeleton"}
      </UX.Button>
    </Demo>
  );
}
export function SpinnerPreview() {
  const [running, setRunning] = useState(true);
  const [size, setSize] = useState<"sm" | "default" | "lg">("default");
  return (
    <Demo hint="Change the spinner size and complete the task to stop the loading state.">
      <div className="ux-demo-row">
        {running ? <UX.Spinner size={size} /> : <UX.CatalogIcon name="check-circle" size={24} />}
        <Status>{running ? "Preparing your workspace…" : "Workspace ready"}</Status>
      </div>
      <div className="ux-demo-row">
        <UX.Select value={size} onValueChange={(v) => setSize(v as typeof size)}>
          <UX.SelectTrigger aria-label="Spinner size">
            <UX.SelectValue />
          </UX.SelectTrigger>
          <UX.SelectContent>
            <UX.SelectItem value="sm">Small</UX.SelectItem>
            <UX.SelectItem value="default">Default</UX.SelectItem>
            <UX.SelectItem value="lg">Large</UX.SelectItem>
          </UX.SelectContent>
        </UX.Select>
        <UX.Button variant="outline" onClick={() => setRunning(!running)}>
          {running ? "Complete task" : "Start task"}
        </UX.Button>
      </div>
    </Demo>
  );
}
export function ToastPreview() {
  // The documentation layout mounts Toaster once, outside transformed panels.
  return (
    <Demo hint="Trigger different notifications. Dismiss them with their close control.">
      <div className="ux-demo-row">
        <UX.Button
          onClick={() =>
            UX.toast.success("Project saved", {
              description: "Your changes are ready for the team.",
            })
          }
        >
          Success toast
        </UX.Button>
        <UX.Button
          variant="outline"
          onClick={() =>
            UX.toast.error("Could not sync", {
              description: "Check your connection and try again.",
            })
          }
        >
          Error toast
        </UX.Button>
        <UX.Button
          variant="secondary"
          onClick={() =>
            UX.toast("Draft archived", {
              action: {
                label: "Undo",
                onClick: () => UX.toast.success("Draft restored"),
              },
            })
          }
        >
          Toast with undo
        </UX.Button>
      </div>
    </Demo>
  );
}
