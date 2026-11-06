/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState, type KeyboardEvent } from "react";
import * as UX from "@clidey/ux";
import { Demo, Status, DemoIcon } from "./demo-shell";
export function tabKeyboard(event: KeyboardEvent<HTMLElement>) {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  const tabs = Array.from(
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
  );
  const i = tabs.indexOf(event.target as HTMLButtonElement);
  if (i < 0) return;
  event.preventDefault();
  const n =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? tabs.length - 1
        : (i + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
  tabs[n].focus();
  tabs[n].click();
}
export function TabsPreview() {
  return (
    <Demo hint="Switch views with the pointer, or use Left, Right, Home, and End on the tab strip.">
      <UX.Tabs defaultValue="overview">
        <UX.TabsList aria-label="Project sections" onKeyDown={tabKeyboard}>
          <UX.TabsTrigger value="overview">Overview</UX.TabsTrigger>
          <UX.TabsTrigger value="activity">Activity</UX.TabsTrigger>
          <UX.TabsTrigger value="settings">Settings</UX.TabsTrigger>
        </UX.TabsList>
        <UX.TabsContent value="overview">
          <div className="ux-demo-panel">
            <UX.Badge>On track</UX.Badge>
            <h3>Studio foundations</h3>
            <p>A shared language for everything your team builds.</p>
          </div>
        </UX.TabsContent>
        <UX.TabsContent value="activity">
          <div className="ux-demo-panel">
            <p>Alex updated the component library.</p>
            <p>Jordan reviewed the workspace layout.</p>
          </div>
        </UX.TabsContent>
        <UX.TabsContent value="settings">
          <div className="ux-demo-panel">
            <UX.Label htmlFor="tab-title">Project name</UX.Label>
            <UX.Input id="tab-title" defaultValue="Studio foundations" />
          </div>
        </UX.TabsContent>
      </UX.Tabs>
    </Demo>
  );
}
export function BreadcrumbPreview() {
  const [current, setCurrent] = useState("Foundations");
  const select = (event: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    event.preventDefault();
    setCurrent(name);
  };
  return (
    <Demo hint="Follow the parent links to change the local location, then restore the nested path.">
      <UX.Breadcrumb>
        <UX.BreadcrumbList>
          <UX.BreadcrumbItem>
            <UX.BreadcrumbLink href="#workspace" onClick={(e) => select(e, "Workspace")}>
              Workspace
            </UX.BreadcrumbLink>
          </UX.BreadcrumbItem>
          {current !== "Workspace" && (
            <>
              <UX.BreadcrumbSeparator />
              <UX.BreadcrumbItem>
                <UX.BreadcrumbLink href="#projects" onClick={(e) => select(e, "Projects")}>
                  Projects
                </UX.BreadcrumbLink>
              </UX.BreadcrumbItem>
            </>
          )}
          {current === "Foundations" && (
            <>
              <UX.BreadcrumbSeparator />
              <UX.BreadcrumbItem>
                <UX.BreadcrumbPage>Foundations</UX.BreadcrumbPage>
              </UX.BreadcrumbItem>
            </>
          )}
        </UX.BreadcrumbList>
      </UX.Breadcrumb>
      <Status>Current location: {current}</Status>
      <UX.Button variant="outline" onClick={() => setCurrent("Foundations")}>
        Open Foundations
      </UX.Button>
    </Demo>
  );
}
export function PaginationPreview() {
  const [page, setPage] = useState(1);
  return (
    <Demo hint="Move through pages and watch the displayed records change.">
      <div className="ux-demo-result-list">
        {Array.from({ length: 3 }, (_, i) => (
          <div className="ux-demo-list-row" key={i}>
            <DemoIcon name="folder" />
            Project {String((page - 1) * 3 + i + 1).padStart(2, "0")}
          </div>
        ))}
      </div>
      <UX.DataPagination totalPages={5} currentPage={page} onPageChange={setPage} />
      <Status>Page {page} of 5</Status>
    </Demo>
  );
}
export function CommandPreview() {
  const [selected, setSelected] = useState("Nothing selected");
  return (
    <Demo hint="Search commands, move through results with arrows, and press Enter to run one.">
      <UX.Command className="ux-demo-command">
        <UX.CommandInput placeholder="Find a page or action…" />
        <UX.CommandList>
          <UX.CommandEmpty>No command matches. Try “project”.</UX.CommandEmpty>
          <UX.CommandGroup heading="Workspace">
            {[
              ["home", "Open overview"],
              ["folder", "Open projects"],
              ["settings", "Open settings"],
            ].map(([icon, label]) => (
              <UX.CommandItem key={label} onSelect={() => setSelected(label)}>
                <DemoIcon name={icon} />
                {label}
              </UX.CommandItem>
            ))}
          </UX.CommandGroup>
          <UX.CommandSeparator />
          <UX.CommandGroup heading="Actions">
            <UX.CommandItem onSelect={() => setSelected("New project prepared")}>
              <DemoIcon name="plus" />
              Create project
            </UX.CommandItem>
          </UX.CommandGroup>
        </UX.CommandList>
      </UX.Command>
      <Status>{selected}</Status>
    </Demo>
  );
}
export function SidebarPreview() {
  const [selected, setSelected] = useState("Overview");
  const [open, setOpen] = useState(true);
  return (
    <Demo hint="Use the embedded sidebar to switch sections or collapse it to an icon rail.">
      <UX.SidebarProvider className="ux-demo-sidebar-provider">
        <UX.Sidebar variant="embed" collapsible="icon" open={open} onOpenChange={setOpen}>
          <UX.SidebarHeader>
            <UX.SidebarMenu>
              <UX.SidebarMenuItem>
                <UX.SidebarMenuButton onClick={() => setOpen(!open)} tooltip="Toggle navigation">
                  <DemoIcon name="app" />
                  <span>Studio workspace</span>
                </UX.SidebarMenuButton>
              </UX.SidebarMenuItem>
            </UX.SidebarMenu>
          </UX.SidebarHeader>
          <UX.SidebarContent>
            <UX.SidebarGroup>
              <UX.SidebarGroupLabel>Workspace</UX.SidebarGroupLabel>
              <UX.SidebarMenu>
                {[
                  ["home", "Overview"],
                  ["folder", "Projects"],
                  ["settings", "Settings"],
                ].map(([icon, label]) => (
                  <UX.SidebarMenuItem key={label}>
                    <UX.SidebarMenuButton
                      isActive={selected === label}
                      tooltip={label}
                      onClick={() => setSelected(label)}
                    >
                      <DemoIcon name={icon} />
                      <span>{label}</span>
                    </UX.SidebarMenuButton>
                  </UX.SidebarMenuItem>
                ))}
              </UX.SidebarMenu>
            </UX.SidebarGroup>
          </UX.SidebarContent>
        </UX.Sidebar>
        <div className="ux-demo-panel ux-demo-sidebar-content">
          <UX.Button
            variant="ghost"
            size="icon"
            aria-label="Toggle demo sidebar"
            onClick={() => setOpen(!open)}
          >
            <DemoIcon name="sidebar" />
          </UX.Button>
          <h3>{selected}</h3>
          <p>The surrounding content stays in place.</p>
        </div>
      </UX.SidebarProvider>
    </Demo>
  );
}
