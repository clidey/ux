/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import type { ReactNode } from "react";
import * as UX from "@clidey/ux";
import "./live-components.css";
export function Demo({ children, hint }: { children: ReactNode; hint: string }) {
  return (
    <div className="ux-demo ux-component-demo" data-ux-demo>
      <div className="ux-demo-content">{children}</div>
      <p className="ux-demo-hint">
        <UX.CatalogIcon name="cursor" size={14} />
        {hint}
      </p>
    </div>
  );
}
export function Status({ children }: { children: ReactNode }) {
  return (
    <span className="ux-demo-status" role="status">
      {children}
    </span>
  );
}
export function DemoIcon({ name }: { name: string }) {
  return <UX.CatalogIcon name={name} size={18} />;
}
