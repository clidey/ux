/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState } from "react";
import * as UX from "@clidey/ux";
import { Demo, Status, DemoIcon } from "./demo-shell";
export function AlertDialogPreview() {
  const [removed, setRemoved] = useState(false);
  return (
    <Demo hint="Open the confirmation, cancel it, or remove the fictional draft.">
      <UX.AlertDialog>
        <UX.AlertDialogTrigger>
          <UX.Button variant="destructive">Remove draft</UX.Button>
        </UX.AlertDialogTrigger>
        <UX.AlertDialogContent>
          <UX.AlertDialogHeader>
            <UX.AlertDialogTitle>Remove this draft?</UX.AlertDialogTitle>
            <UX.AlertDialogDescription>
              This example changes local state only. Your real projects are untouched.
            </UX.AlertDialogDescription>
          </UX.AlertDialogHeader>
          <UX.AlertDialogFooter>
            <UX.AlertDialogCancel>Keep draft</UX.AlertDialogCancel>
            <UX.AlertDialogAction onClick={() => setRemoved(true)}>
              Remove draft
            </UX.AlertDialogAction>
          </UX.AlertDialogFooter>
        </UX.AlertDialogContent>
      </UX.AlertDialog>
      <Status>{removed ? "The demo draft was removed." : "Draft is available."}</Status>
      {removed && (
        <UX.Button variant="ghost" onClick={() => setRemoved(false)}>
          Restore demo
        </UX.Button>
      )}
    </Demo>
  );
}
export function DropdownPreview() {
  const [layout, setLayout] = useState("Board");
  const [archived, setArchived] = useState(false);
  return (
    <Demo hint="Open the menu, choose a view, or toggle archived items with the keyboard.">
      <UX.DropdownMenu>
        <UX.DropdownMenuTrigger>
          <UX.Button variant="outline">
            <DemoIcon name="sliders" />
            View options
          </UX.Button>
        </UX.DropdownMenuTrigger>
        <UX.DropdownMenuContent>
          <UX.DropdownMenuLabel>Project layout</UX.DropdownMenuLabel>
          <UX.DropdownMenuRadioGroup value={layout} onValueChange={setLayout}>
            {["Board", "List", "Timeline"].map((x) => (
              <UX.DropdownMenuRadioItem value={x} key={x}>
                {x}
              </UX.DropdownMenuRadioItem>
            ))}
          </UX.DropdownMenuRadioGroup>
          <UX.DropdownMenuSeparator />
          <UX.DropdownMenuCheckboxItem
            checked={archived}
            onCheckedChange={(v) => setArchived(v === true)}
          >
            Show archived
          </UX.DropdownMenuCheckboxItem>
        </UX.DropdownMenuContent>
      </UX.DropdownMenu>
      <Status>
        {layout} view · Archived projects {archived ? "visible" : "hidden"}
      </Status>
    </Demo>
  );
}
export function ContextMenuPreview() {
  const [action, setAction] = useState("No action yet");
  return (
    <Demo hint="Right-click the project, or focus it and press Shift+F10.">
      <UX.ContextMenu>
        <UX.ContextMenuTrigger className="ux-demo-context" tabIndex={0}>
          <DemoIcon name="folder" />
          <strong>Studio foundations</strong>
          <span>Right-click for project actions</span>
        </UX.ContextMenuTrigger>
        <UX.ContextMenuContent>
          <UX.ContextMenuItem onSelect={() => setAction("Opened Studio foundations")}>
            Open project
          </UX.ContextMenuItem>
          <UX.ContextMenuItem onSelect={() => setAction("Created a local duplicate")}>
            Duplicate
          </UX.ContextMenuItem>
          <UX.ContextMenuSeparator />
          <UX.ContextMenuItem onSelect={() => setAction("Archived the demo project")}>
            Archive
          </UX.ContextMenuItem>
        </UX.ContextMenuContent>
      </UX.ContextMenu>
      <Status>{action}</Status>
    </Demo>
  );
}
export function PopoverPreview() {
  const [name, setName] = useState("Studio foundations");
  const [open, setOpen] = useState(false);
  return (
    <Demo hint="Edit the project in place and save to update its visible name.">
      <div className="ux-demo-row">
        <strong>{name}</strong>
        <UX.Popover open={open} onOpenChange={setOpen}>
          <UX.PopoverTrigger>
            <UX.Button variant="outline" size="sm">
              Edit project
            </UX.Button>
          </UX.PopoverTrigger>
          <UX.PopoverContent>
            <form
              className="ux-demo-form"
              onSubmit={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              <UX.Label htmlFor="popover-project">Project name</UX.Label>
              <UX.Input
                id="popover-project"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <UX.Button type="submit">Save name</UX.Button>
            </form>
          </UX.PopoverContent>
        </UX.Popover>
      </div>
    </Demo>
  );
}
export function TooltipPreview() {
  const [saved, setSaved] = useState(false);
  return (
    <Demo hint="Hover the control or focus it with Tab. Its tooltip follows the action state.">
      <UX.TooltipProvider delayDuration={150}>
        <UX.Tooltip>
          <UX.TooltipTrigger>
            <UX.Button
              size="icon"
              variant="outline"
              aria-label={saved ? "Remove bookmark" : "Bookmark project"}
              onClick={() => setSaved(!saved)}
            >
              <DemoIcon name={saved ? "check" : "bookmark"} />
            </UX.Button>
          </UX.TooltipTrigger>
          <UX.TooltipContent>
            {saved ? "Saved to your workspace" : "Save this project for later"}
          </UX.TooltipContent>
        </UX.Tooltip>
      </UX.TooltipProvider>
      <Status>{saved ? "Project bookmarked" : "Project not bookmarked"}</Status>
    </Demo>
  );
}
export function SheetPreview() {
  const [side, setSide] = useState<"right" | "left">("right");
  const [name, setName] = useState("Studio");
  return (
    <Demo hint="Choose an edge, open the panel, and edit a workspace without leaving the page.">
      <div className="ux-demo-row">
        <UX.Select value={side} onValueChange={(x) => setSide(x as typeof side)}>
          <UX.SelectTrigger aria-label="Sheet edge">
            <UX.SelectValue />
          </UX.SelectTrigger>
          <UX.SelectContent>
            <UX.SelectItem value="right">Right edge</UX.SelectItem>
            <UX.SelectItem value="left">Left edge</UX.SelectItem>
          </UX.SelectContent>
        </UX.Select>
        <UX.Sheet>
          <UX.SheetTrigger>
            <UX.Button>Open workspace panel</UX.Button>
          </UX.SheetTrigger>
          <UX.SheetContent side={side}>
            <UX.SheetHeader>
              <UX.SheetTitle>Workspace details</UX.SheetTitle>
              <UX.SheetDescription>
                Keep the surrounding context while making a quick change.
              </UX.SheetDescription>
            </UX.SheetHeader>
            <div className="ux-demo-form ux-demo-sheet-body">
              <UX.Label htmlFor="sheet-workspace">Workspace name</UX.Label>
              <UX.Input
                id="sheet-workspace"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <UX.SheetFooter>
              <UX.SheetClose asChild>
                <UX.Button>Done</UX.Button>
              </UX.SheetClose>
            </UX.SheetFooter>
          </UX.SheetContent>
        </UX.Sheet>
      </div>
      <Status>Workspace: {name}</Status>
    </Demo>
  );
}
export function DrawerPreview() {
  const [open, setOpen] = useState(false);
  const [goal, setGoal] = useState(12);
  return (
    <Demo hint="Open the drawer, change the weekly goal, then close it by dragging or using Done.">
      <UX.Drawer open={open} onOpenChange={setOpen}>
        <UX.DrawerTrigger>
          <UX.Button variant="outline">Set weekly goal</UX.Button>
        </UX.DrawerTrigger>
        <UX.DrawerContent>
          <div className="ux-demo-drawer-body">
            <UX.DrawerHeader>
              <UX.DrawerTitle>A little momentum</UX.DrawerTitle>
              <UX.DrawerDescription>
                Choose a weekly goal for this example workspace.
              </UX.DrawerDescription>
            </UX.DrawerHeader>
            <div className="ux-demo-row">
              <UX.Button
                variant="outline"
                size="icon"
                aria-label="Decrease goal"
                onClick={() => setGoal((n) => Math.max(1, n - 1))}
              >
                <DemoIcon name="minus" />
              </UX.Button>
              <span className="ux-demo-metric">{goal}</span>
              <UX.Button
                variant="outline"
                size="icon"
                aria-label="Increase goal"
                onClick={() => setGoal((n) => n + 1)}
              >
                <DemoIcon name="plus" />
              </UX.Button>
            </div>
            <UX.DrawerFooter>
              <UX.Button onClick={() => setOpen(false)}>Done</UX.Button>
            </UX.DrawerFooter>
          </div>
        </UX.DrawerContent>
      </UX.Drawer>
      <Status>{goal} tasks per week</Status>
    </Demo>
  );
}
export function FormSheetPreview() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("Studio");
  const [saved, setSaved] = useState("Studio");
  return (
    <Demo hint="Open the form sheet, edit the name, and save to update the workspace.">
      <UX.Button variant="outline" onClick={() => setOpen(true)}>
        Edit workspace
      </UX.Button>
      <UX.FormSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Edit workspace"
        description="A focused form with a pinned action."
        footer={
          <UX.Button
            onClick={() => {
              setSaved(name);
              setOpen(false);
            }}
          >
            Save workspace
          </UX.Button>
        }
      >
        <div className="ux-demo-form">
          <UX.Label htmlFor="form-sheet-name">Workspace name</UX.Label>
          <UX.Input id="form-sheet-name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
      </UX.FormSheet>
      <Status>Saved workspace: {saved}</Status>
    </Demo>
  );
}
export function ConfirmPreview() {
  const [open, setOpen] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [archived, setArchived] = useState(false);
  return (
    <Demo hint="Try confirmation both with and without a blocking dependency.">
      <div className="ux-demo-row">
        <UX.Checkbox
          id="confirm-blocker"
          checked={blocked}
          onCheckedChange={(v) => setBlocked(v === true)}
        />
        <UX.Label htmlFor="confirm-blocker">Require an outstanding review</UX.Label>
      </div>
      <UX.Button variant="outline" onClick={() => setOpen(true)}>
        Archive project
      </UX.Button>
      <UX.ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Archive Studio foundations?"
        description="This changes only the local demonstration."
        dependencies={blocked ? ["Complete the outstanding review first."] : []}
        confirmLabel="Archive project"
        onConfirm={() => {
          setArchived(true);
          setOpen(false);
        }}
      />
      <Status>{archived ? "Project archived in this demo." : "Project is active."}</Status>
      {archived && (
        <UX.Button variant="ghost" onClick={() => setArchived(false)}>
          Reset project
        </UX.Button>
      )}
    </Demo>
  );
}
