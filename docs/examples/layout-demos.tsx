/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState } from "react";
import * as UX from "@clidey/ux";
import { Demo, Status, DemoIcon } from "./demo-shell";
export function AccordionPreview() {
  return (
    <Demo hint="Expand each section with the pointer or Enter; use arrows between headers.">
      <UX.Accordion type="single" collapsible defaultValue="one">
        <UX.AccordionItem value="one">
          <UX.AccordionTrigger>What belongs in a workspace?</UX.AccordionTrigger>
          <UX.AccordionContent>
            Your projects, people, and a shared set of defaults.
          </UX.AccordionContent>
        </UX.AccordionItem>
        <UX.AccordionItem value="two">
          <UX.AccordionTrigger>Can the team change its theme?</UX.AccordionTrigger>
          <UX.AccordionContent>
            Yes. Keep the same components and choose a different palette.
          </UX.AccordionContent>
        </UX.AccordionItem>
        <UX.AccordionItem value="three">
          <UX.AccordionTrigger>Where do changes get saved?</UX.AccordionTrigger>
          <UX.AccordionContent>
            This example keeps state in the browser. Connect your application’s persistence layer.
          </UX.AccordionContent>
        </UX.AccordionItem>
      </UX.Accordion>
    </Demo>
  );
}
export function SeparatorPreview() {
  const [vertical, setVertical] = useState(false);
  return (
    <Demo hint="Switch orientation to see how the separator organizes a toolbar or a stack.">
      <div className={vertical ? "ux-demo-row ux-demo-separator-row" : "ux-demo-form"}>
        <span>Workspace</span>
        <UX.Separator
          orientation={vertical ? "vertical" : "horizontal"}
          className={vertical ? "ux-demo-vertical-separator" : ""}
        />
        <span>Projects</span>
        <UX.Separator
          orientation={vertical ? "vertical" : "horizontal"}
          className={vertical ? "ux-demo-vertical-separator" : ""}
        />
        <span>Activity</span>
      </div>
      <UX.Button variant="outline" onClick={() => setVertical(!vertical)}>
        Use {vertical ? "horizontal" : "vertical"} separators
      </UX.Button>
    </Demo>
  );
}
export function ScrollAreaPreview() {
  const [count, setCount] = useState(18);
  return (
    <Demo hint="Scroll the bounded activity list and add another entry.">
      <UX.ScrollArea className="ux-demo-scroll">
        {Array.from({ length: count }, (_, i) => (
          <div className="ux-demo-list-row" key={i}>
            <DemoIcon name="file" />
            <span>Project update {String(i + 1).padStart(2, "0")}</span>
            <UX.Badge variant="outline">Saved</UX.Badge>
          </div>
        ))}
      </UX.ScrollArea>
      <UX.Button variant="outline" onClick={() => setCount((n) => n + 1)}>
        Add activity entry
      </UX.Button>
      <Status>{count} entries</Status>
    </Demo>
  );
}
export function ResizablePreview() {
  return (
    <Demo hint="Drag the divider, or focus it and use arrow keys to resize the panels.">
      <div className="ux-demo-panels">
        <UX.ResizablePanelGroup direction="horizontal">
          <UX.ResizablePanel defaultSize={35} minSize={20}>
            <div className="ux-demo-panel">
              <DemoIcon name="folder" />
              <strong>Projects</strong>
              <p>Studio foundations</p>
              <p>Developer portal</p>
            </div>
          </UX.ResizablePanel>
          <UX.ResizableHandle withHandle />
          <UX.ResizablePanel minSize={25}>
            <div className="ux-demo-panel">
              <UX.Badge variant="outline">In progress</UX.Badge>
              <h3>Room to focus.</h3>
              <p>Adjust the split to fit the task in front of you.</p>
            </div>
          </UX.ResizablePanel>
        </UX.ResizablePanelGroup>
      </div>
    </Demo>
  );
}
export function MasterDetailPreview() {
  const [selected, setSelected] = useState<string | null>(null);
  const names = ["Studio foundations", "Developer portal", "Product launch"];
  return (
    <Demo hint="Choose a project. Resize the window to try the mobile back-to-list behavior.">
      <div className="ux-demo-panels">
        <UX.MasterDetailPanels
          list={
            <div className="ux-demo-panel">
              {names.map((name) => (
                <UX.Button
                  key={name}
                  variant={selected === name ? "secondary" : "ghost"}
                  onClick={() => setSelected(name)}
                >
                  {name}
                </UX.Button>
              ))}
            </div>
          }
          detail={
            <div className="ux-demo-panel">
              {selected ? (
                <>
                  <UX.Badge variant="outline">Project details</UX.Badge>
                  <h3>{selected}</h3>
                  <p>One focused place for the work your team is doing.</p>
                </>
              ) : (
                <p>Select a project to inspect its details.</p>
              )}
            </div>
          }
          detailOpen={selected !== null}
          onBack={() => setSelected(null)}
          backLabel="All projects"
          listDefaultSize={40}
        />
      </div>
    </Demo>
  );
}
export function StackListPreview() {
  const [status, setStatus] = useState("In progress");
  return (
    <Demo hint="Change the project’s status and see the metadata list update.">
      <UX.StackList>
        <UX.StackListItem item="Project">Studio foundations</UX.StackListItem>
        <UX.StackListItem item="Owner">Alex Chen</UX.StackListItem>
        <UX.StackListItem item="Status">
          <UX.Badge variant="secondary">{status}</UX.Badge>
        </UX.StackListItem>
        <UX.StackListItem item="Visibility">Team workspace</UX.StackListItem>
      </UX.StackList>
      <UX.Select value={status} onValueChange={setStatus}>
        <UX.SelectTrigger aria-label="Project status">
          <UX.SelectValue />
        </UX.SelectTrigger>
        <UX.SelectContent>
          {["In progress", "In review", "Complete"].map((x) => (
            <UX.SelectItem key={x} value={x}>
              {x}
            </UX.SelectItem>
          ))}
        </UX.SelectContent>
      </UX.Select>
    </Demo>
  );
}
