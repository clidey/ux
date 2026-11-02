/*
 * Copyright 2026 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  TextArea,
} from "@clidey/ux";
import {
  DemoIcon,
  ExampleCode,
  ImportLine,
  KeyboardTable,
  Preview,
  Usage,
} from "./docs-component-pages";

type Pattern = {
  id: string;
  title: string;
  icon: string;
  description: string;
  imports: string;
  code: string;
  steps: string[];
  good: string;
  bad: string;
};
export const patternPages: Pattern[] = [
  {
    id: "search-filter",
    title: "Search and filter",
    icon: "filter",
    description:
      "Combine a query and structured filters, preserve their state, and explain an empty result.",
    imports: "Input, Select, Button, Badge",
    code: 'const visible = records.filter(record =>\n  record.name.toLowerCase().includes(query.toLowerCase()) &&\n  (status === "all" || record.status === status)\n);\n<Input value={query} onChange={event => setQuery(event.target.value)} />\n<Button onClick={clearFilters}>Clear filters</Button>',
    steps: [
      "Type a project name to narrow the list.",
      "Choose a status to combine filters.",
      "Clear filters to restore the complete list.",
    ],
    good: "Keep applied filters visible and make clearing them easy.",
    bad: "Show an unexplained blank table when nothing matches.",
  },
  {
    id: "bulk-actions",
    title: "Bulk actions",
    icon: "checkbox",
    description: "Select several records, show the affected count, and offer a reversible action.",
    imports: "Checkbox, Button, Alert",
    code: 'const count = selected.size;\n<Button disabled={!count} onClick={archiveSelected}>\n  Archive {count || "selected"}\n</Button>\n{archived.length > 0 && <Button onClick={undoArchive}>Undo archive</Button>}',
    steps: [
      "Select individual records or select all.",
      "Archive only the selected records.",
      "Undo restores both the records and their original order.",
    ],
    good: "Show the selection count beside the bulk action.",
    bad: "Apply a bulk action to hidden or unselected records.",
  },
  {
    id: "inline-editing",
    title: "Inline editing",
    icon: "edit",
    description:
      "Edit one value in context with explicit Save and Cancel actions and clear validation.",
    imports: "Input, Button, Label",
    code: '<form onSubmit={saveName}>\n  <Label htmlFor="project-name">Project name</Label>\n  <Input id="project-name" value={draft} onChange={event => setDraft(event.target.value)} />\n  <Button disabled={!draft.trim()}>Save</Button>\n  <Button type="button" variant="outline" onClick={cancel}>Cancel</Button>\n</form>',
    steps: [
      "Open the editor beside the current value.",
      "Try clearing the name to see validation.",
      "Save commits the value; Cancel keeps the original.",
    ],
    good: "Keep edits local until the user saves.",
    bad: "Save incomplete values merely because focus moved away.",
  },
  {
    id: "create-flow",
    title: "Guided creation",
    icon: "arrow-right",
    description:
      "Break a short setup into focused steps and retain entered values when going back.",
    imports: "Input, Label, Select, Button, Progress",
    code: 'const [step, setStep] = useState(0);\n<Progress value={(step + 1) / 3 * 100} />\n<Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>\n<Button disabled={!canContinue} onClick={() => setStep(step + 1)}>Continue</Button>',
    steps: [
      "Name the demo project.",
      "Choose access and review the summary.",
      "Go back to amend details, then create the project.",
    ],
    good: "Preserve entered values and explain each step.",
    bad: "Reset earlier fields when the user goes back.",
  },
  {
    id: "settings-form",
    title: "Settings with save",
    icon: "settings",
    description:
      "Group related preferences, track unsaved changes, and let users save or discard them together.",
    imports: "Switch, Button, Label",
    code: 'const dirty = JSON.stringify(draft) !== JSON.stringify(saved);\n<Switch checked={draft.notifications} onCheckedChange={notifications => setDraft({ ...draft, notifications })} />\n<Button disabled={!dirty} onClick={() => setSaved(draft)}>Save changes</Button>\n<Button disabled={!dirty} variant="outline" onClick={() => setDraft(saved)}>Discard</Button>',
    steps: [
      "Toggle a preference to see the unsaved state.",
      "Save commits all preferences together.",
      "Discard restores the last saved values.",
    ],
    good: "Make the save model and unsaved state explicit.",
    bad: "Mix immediate changes and deferred saves without explaining them.",
  },
  {
    id: "browse-detail",
    title: "Browse and inspect",
    icon: "sidebar",
    description:
      "Keep a list and its selected record together so users can move between items without losing context.",
    imports: "Input, Badge, Button",
    code: "const [selectedId, setSelectedId] = useState(records[0].id);\nconst selected = records.find(record => record.id === selectedId);\n<button aria-pressed={record.id === selectedId} onClick={() => setSelectedId(record.id)}>\n  {record.name}\n</button>\n<Detail record={selected} />",
    steps: [
      "Choose a project in the list.",
      "Inspect its details beside the selection.",
      "Change its status and see the list update.",
    ],
    good: "Keep selection visible and update both views together.",
    bad: "Replace the whole page for every quick inspection.",
  },
  {
    id: "destructive-action",
    title: "Destructive confirmation",
    icon: "trash",
    description:
      "Explain a consequential action, require deliberate confirmation, and preserve a safe exit.",
    imports: "Dialog, DialogContent, Input, Button",
    code: '<Dialog open={open} onOpenChange={setOpen}>\n  <DialogContent>\n    <DialogHeader><DialogTitle>Delete demo project?</DialogTitle></DialogHeader>\n    <Input aria-label="Confirmation" value={confirmation} onChange={event => setConfirmation(event.target.value)} />\n    <Button variant="destructive" disabled={confirmation !== "DELETE"} onClick={remove}>Delete project</Button>\n  </DialogContent>\n</Dialog>',
    steps: [
      "Open the confirmation to see its consequences.",
      "Type DELETE to enable the destructive action.",
      "Cancel safely or delete the fictional project and restore the demo.",
    ],
    good: "Name the object and explain what will be removed.",
    bad: "Use a vague OK label for a destructive action.",
  },
  {
    id: "file-attachment",
    title: "Attach a file",
    icon: "paperclip",
    description:
      "Choose a file, validate it, and review the attachment before adding it to a draft.",
    imports: "Input, Button, Alert",
    code: '<Input type="file" accept=".csv,.txt" onChange={chooseFile} />\n{file && <p>{file.name} · {Math.ceil(file.size / 1024)} KB</p>}\n<Button disabled={!file || !!error} onClick={attachToDraft}>Attach to draft</Button>',
    steps: [
      "Choose a CSV or text file up to 5 MB.",
      "Review its name and size before attaching.",
      "Remove the selection or attach it to the local demo draft.",
    ],
    good: "Validate file type and size before committing the attachment.",
    bad: "Say a file was uploaded before a transfer has happened.",
  },
  {
    id: "activity-feed",
    title: "Activity and comments",
    icon: "history",
    description:
      "Show a record’s history in order and let users add a short comment without leaving the record.",
    imports: "TextArea, Button, Badge",
    code: 'function addComment(event) {\n  event.preventDefault();\n  if (!comment.trim()) return;\n  setActivity(items => [...items, { id: crypto.randomUUID(), text: comment.trim() }]);\n  setComment("");\n}',
    steps: [
      "Read the demo record’s recent activity.",
      "Write and post a comment.",
      "See the new entry appear with its timestamp.",
    ],
    good: "Separate system events from user comments using clear labels.",
    bad: "Lose the draft comment when another event appears.",
  },
  {
    id: "dashboard-overview",
    title: "Overview dashboard",
    icon: "chart",
    description:
      "Combine a small set of metrics with a period selector and consistent supporting comparisons.",
    imports: "Button, Progress",
    code: 'const summary = summaries[period];\n<Button aria-pressed={period === "week"} onClick={() => setPeriod("week")}>This week</Button>\n<strong>{summary.completed}</strong>\n<Progress value={summary.completed / summary.total * 100} />',
    steps: [
      "Switch between the week and month views.",
      "Watch the metrics and completion breakdown update together.",
      "Use the same period across every summary.",
    ],
    good: "Keep the scope and period visible beside the metrics.",
    bad: "Compare metrics that use different date ranges.",
  },
  {
    id: "recovery-states",
    title: "Empty and error recovery",
    icon: "refresh",
    description:
      "Give empty collections, filtered results, and errors their own useful explanation and next action.",
    imports: "Button, Select, Badge",
    code: 'if (state === "error") return <Button onClick={retry}>Try again</Button>;\nif (!items.length) return <Button onClick={createFirst}>Create first item</Button>;\nreturn <RecordList items={items} />;',
    steps: [
      "Switch between an empty collection, a failed request, and filtered results.",
      "Use the offered recovery action.",
      "See a useful success state without losing context.",
    ],
    good: "Offer an action that addresses the cause of the state.",
    bad: "Use the same blank message for errors and empty results.",
  },
  {
    id: "review-submit",
    title: "Review and submit",
    icon: "check-circle",
    description:
      "Let users inspect a draft, fix validation issues, and explicitly confirm before submitting.",
    imports: "Input, Checkbox, Button, Alert",
    code: 'const canSubmit = title.trim().length > 0 && confirmed;\n<form onSubmit={submit}>\n  <Input aria-label="Request title" value={title} onChange={event => setTitle(event.target.value)} />\n  <Checkbox checked={confirmed} onCheckedChange={value => setConfirmed(value === true)} />\n  <Button disabled={!canSubmit}>Submit request</Button>\n</form>',
    steps: [
      "Edit the fictional request and inspect its summary.",
      "Confirm that the details are ready.",
      "Submit and see a clear completion state.",
    ],
    good: "Keep the final summary and submit action together.",
    bad: "Allow submission before required confirmation is complete.",
  },
];
const initialRecords = [
  { id: "DEMO-001", name: "Demo Project A", status: "Active", owner: "Demo User A" },
  { id: "DEMO-002", name: "Demo Project B", status: "Draft", owner: "Demo User B" },
  { id: "DEMO-003", name: "Demo Project C", status: "Active", owner: "Demo User A" },
  { id: "DEMO-004", name: "Demo Project D", status: "Paused", owner: "Demo User C" },
];
function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="pattern-notice" role="status">
      <DemoIcon name="check-circle" />
      {children}
    </div>
  );
}
function PatternHeader({ title, detail }: { title: string; detail: string }) {
  return (
    <header className="pattern-head">
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
      <Badge variant="secondary">Demo</Badge>
    </header>
  );
}
function SearchFilter() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const visible = initialRecords.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) &&
      (status === "all" || r.status === status),
  );
  return (
    <div className="pattern-panel">
      <PatternHeader title="Projects" detail="Find a project by name or status." />
      <div className="pattern-body">
        <div className="pattern-toolbar">
          <Input
            aria-label="Search projects"
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger aria-label="Project status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["all", "Active", "Draft", "Paused"].map((s) => (
                <SelectItem key={s} value={s}>
                  {s === "all" ? "All statuses" : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            disabled={!query && status === "all"}
            onClick={() => {
              setQuery("");
              setStatus("all");
            }}
          >
            Clear
          </Button>
        </div>
        <small className="pattern-muted" role="status">
          {visible.length} of {initialRecords.length} projects
        </small>
        <div className="pattern-list">
          {visible.map((r) => (
            <div className="pattern-row" key={r.id}>
              <DemoIcon name="folder" />
              <span>
                <strong>{r.name}</strong>
                <small>{r.id}</small>
              </span>
              <Badge variant="secondary">{r.status}</Badge>
            </div>
          ))}
        </div>
        {!visible.length && (
          <div className="pattern-empty">
            <DemoIcon name="search" size={26} />
            <strong>No matching projects</strong>
            <p>Try another name or clear your filters.</p>
            <Button
              variant="outline"
              onClick={() => {
                setQuery("");
                setStatus("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
function BulkActions() {
  const [selected, setSelected] = useState<string[]>([]);
  const [archived, setArchived] = useState<string[]>([]);
  const visible = initialRecords.filter((r) => !archived.includes(r.id));
  return (
    <div className="pattern-panel">
      <PatternHeader title="Project library" detail="Archive several demo projects together." />
      <div className="pattern-body">
        <div className="pattern-toolbar">
          <label className="pattern-check">
            <Checkbox
              aria-label="Select all projects"
              checked={
                visible.length > 0 && selected.length === visible.length
                  ? true
                  : selected.length
                    ? "indeterminate"
                    : false
              }
              disabled={!visible.length}
              onCheckedChange={(v) => setSelected(v ? visible.map((r) => r.id) : [])}
            />
            Select all
          </label>
          <span className="pattern-muted" aria-live="polite">
            {selected.length} selected
          </span>
          <Button
            disabled={!selected.length}
            onClick={() => {
              setArchived([...archived, ...selected]);
              setSelected([]);
            }}
          >
            Archive selected
          </Button>
        </div>
        <div className="pattern-list">
          {visible.map((r) => (
            <label className="pattern-row" key={r.id}>
              <Checkbox
                aria-label={`Select ${r.name}`}
                checked={selected.includes(r.id)}
                onCheckedChange={(v) =>
                  setSelected(v ? [...selected, r.id] : selected.filter((id) => id !== r.id))
                }
              />
              <span>
                <strong>{r.name}</strong>
                <small>{r.id}</small>
              </span>
              <Badge variant="secondary">{r.status}</Badge>
            </label>
          ))}
        </div>
        {archived.length > 0 && (
          <Notice>
            {archived.length} archived
            <Button variant="ghost" size="sm" onClick={() => setArchived([])}>
              Undo archive
            </Button>
          </Notice>
        )}
      </div>
    </div>
  );
}
function InlineEditing() {
  const [name, setName] = useState("Demo Project A");
  const [draft, setDraft] = useState(name);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="pattern-panel">
      <PatternHeader
        title="Project details"
        detail="Change one value without leaving the record."
      />
      <div className="pattern-body">
        {editing ? (
          <form
            className="pattern-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!draft.trim()) return;
              setName(draft.trim());
              setEditing(false);
              setSaved(true);
            }}
          >
            <Label htmlFor="pattern-project-name">Project name</Label>
            <Input
              autoFocus
              id="pattern-project-name"
              value={draft}
              aria-invalid={!draft.trim()}
              aria-describedby="pattern-name-help"
              onChange={(e) => setDraft(e.target.value)}
            />
            <small id="pattern-name-help" className="pattern-muted">
              {draft.trim() ? "Use a short, recognizable name." : "Enter a project name to save."}
            </small>
            <div className="pattern-actions">
              <Button disabled={!draft.trim()}>Save</Button>
              <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="pattern-row">
            <span>
              <small>Project name</small>
              <strong>{name}</strong>
            </span>
            <Button
              variant="outline"
              onClick={() => {
                setDraft(name);
                setEditing(true);
                setSaved(false);
              }}
            >
              <DemoIcon name="edit" />
              Edit
            </Button>
          </div>
        )}
        {saved && <Notice>Project name updated.</Notice>}
      </div>
    </div>
  );
}
function CreateFlow() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [access, setAccess] = useState("private");
  const [done, setDone] = useState(false);
  return (
    <div className="pattern-panel">
      <PatternHeader
        title="Create a project"
        detail={
          done
            ? "Your demo project is ready."
            : `Step ${step + 1} of 3 · ${["Details", "Access", "Review"][step]}`
        }
      />
      <div className="pattern-body">
        {done ? (
          <div className="pattern-empty">
            <DemoIcon name="check-circle" size={32} />
            <strong>{name} created</strong>
            <p>Access: {access}. You can change it in project settings.</p>
            <Button
              variant="outline"
              onClick={() => {
                setDone(false);
                setStep(0);
                setName("");
              }}
            >
              Create another
            </Button>
          </div>
        ) : (
          <>
            <Progress value={((step + 1) / 3) * 100} />
            {step === 0 ? (
              <div className="pattern-form">
                <Label htmlFor="flow-name">Project name</Label>
                <Input
                  id="flow-name"
                  placeholder="Example project"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            ) : step === 1 ? (
              <div className="pattern-form">
                <Label>Who can access this project?</Label>
                <Select value={access} onValueChange={setAccess}>
                  <SelectTrigger aria-label="Project access">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private · only you</SelectItem>
                    <SelectItem value="team">Team · workspace members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <dl className="pattern-summary">
                <div>
                  <dt>Name</dt>
                  <dd>{name}</dd>
                </div>
                <div>
                  <dt>Access</dt>
                  <dd>{access}</dd>
                </div>
              </dl>
            )}
            <div className="pattern-actions">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
                Back
              </Button>
              <Button
                disabled={!name.trim()}
                onClick={() => (step === 2 ? setDone(true) : setStep(step + 1))}
              >
                {step === 2 ? "Create project" : "Continue"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
function SettingsForm() {
  const defaults = { notifications: true, digest: false, reminders: true };
  const [saved, setSaved] = useState(defaults);
  const [draft, setDraft] = useState(defaults);
  const [message, setMessage] = useState("");
  const dirty = JSON.stringify(saved) !== JSON.stringify(draft);
  return (
    <div className="pattern-panel">
      <PatternHeader title="Notification preferences" detail="Choose which updates you receive." />
      <div className="pattern-body">
        {(
          [
            {
              key: "notifications",
              label: "Project updates",
              detail: "Changes to projects you follow.",
            },
            {
              key: "digest",
              label: "Weekly digest",
              detail: "A summary of your workspace activity.",
            },
            {
              key: "reminders",
              label: "Task reminders",
              detail: "A reminder before a task is due.",
            },
          ] as const
        ).map((item) => (
          <label className="pattern-row" key={item.key}>
            <span>
              <strong>{item.label}</strong>
              <small>{item.detail}</small>
            </span>
            <Switch
              checked={draft[item.key]}
              onCheckedChange={(v) => {
                setDraft({ ...draft, [item.key]: v });
                setMessage("");
              }}
            />
          </label>
        ))}
        <div className="pattern-savebar">
          <span className="pattern-muted" aria-live="polite">
            {dirty ? "Unsaved changes" : message || "All changes saved"}
          </span>
          <div className="pattern-actions">
            <Button
              variant="outline"
              disabled={!dirty}
              onClick={() => {
                setDraft(saved);
                setMessage("Changes discarded");
              }}
            >
              Discard
            </Button>
            <Button
              disabled={!dirty}
              onClick={() => {
                setSaved(draft);
                setMessage("Preferences saved");
              }}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
function BrowseDetail() {
  const [records, setRecords] = useState(initialRecords);
  const [id, setId] = useState(initialRecords[0].id);
  const record = records.find((r) => r.id === id)!;
  return (
    <div className="pattern-panel">
      <PatternHeader title="Workspace projects" detail="Choose a project to inspect its details." />
      <div className="pattern-split">
        <div className="pattern-master">
          {records.map((r) => (
            <button key={r.id} aria-pressed={r.id === id} onClick={() => setId(r.id)}>
              <DemoIcon name="folder" />
              <span>
                <strong>{r.name}</strong>
                <small>{r.status}</small>
              </span>
            </button>
          ))}
        </div>
        <div className="pattern-detail">
          <Badge variant="secondary">{record.status}</Badge>
          <h3>{record.name}</h3>
          <dl className="pattern-summary">
            <div>
              <dt>Reference</dt>
              <dd>{record.id}</dd>
            </div>
            <div>
              <dt>Owner</dt>
              <dd>{record.owner}</dd>
            </div>
          </dl>
          <Button
            variant="outline"
            onClick={() =>
              setRecords(
                records.map((r) =>
                  r.id === id ? { ...r, status: r.status === "Active" ? "Paused" : "Active" } : r,
                ),
              )
            }
          >
            {record.status === "Active" ? "Pause project" : "Activate project"}
          </Button>
        </div>
      </div>
    </div>
  );
}
function DestructiveAction() {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [deleted, setDeleted] = useState(false);
  return (
    <div className="pattern-panel">
      <PatternHeader title="Project settings" detail="Manage the fictional Demo Project A." />
      <div className="pattern-body">
        {deleted ? (
          <Notice>
            Demo project deleted.
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDeleted(false);
                setConfirmation("");
              }}
            >
              Restore demo
            </Button>
          </Notice>
        ) : (
          <div className="pattern-danger">
            <div>
              <strong>Delete project</strong>
              <p>Removes the project and its draft tasks.</p>
            </div>
            <Button
              variant="destructive"
              onClick={() => {
                setConfirmation("");
                setOpen(true);
              }}
            >
              Delete project
            </Button>
          </div>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Demo Project A?</DialogTitle>
            <DialogDescription>
              The project and its draft tasks will be removed. Type DELETE to confirm.
            </DialogDescription>
          </DialogHeader>
          <Label htmlFor="pattern-delete">Confirmation</Label>
          <Input
            id="pattern-delete"
            autoComplete="off"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Keep project
            </Button>
            <Button
              variant="destructive"
              disabled={confirmation !== "DELETE"}
              onClick={() => {
                setDeleted(true);
                setOpen(false);
              }}
            >
              Delete project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
function FileAttachment() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [attached, setAttached] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  function clear() {
    setFile(null);
    setError("");
    setAttached(false);
    setInputKey((k) => k + 1);
  }
  return (
    <div className="pattern-panel">
      <PatternHeader title="Draft attachments" detail="CSV or text files · maximum 5 MB." />
      <div className="pattern-body">
        <label className="pattern-dropzone">
          <DemoIcon name="paperclip" size={28} />
          <strong>Choose an attachment</strong>
          <span className="pattern-muted">Review your file before adding it to the draft.</span>
          <Input
            key={inputKey}
            type="file"
            className="pattern-file-input"
            aria-label="Choose attachment"
            accept=".csv,.txt"
            disabled={attached}
            onChange={(e) => {
              const next = e.target.files?.[0] ?? null;
              setAttached(false);
              setFile(next);
              setError(
                next && (!/\.(csv|txt)$/i.test(next.name) || next.size > 5 * 1024 * 1024)
                  ? "Choose a CSV or text file smaller than 5 MB."
                  : "",
              );
            }}
          />
          <span className="pattern-file-picker" aria-hidden="true">{attached ? "File attached" : file ? "Change file" : "Choose file"}</span>
        </label>
        {error && (
          <p className="pattern-error" role="alert">
            {error}
          </p>
        )}
        {file && (
          <div className="pattern-row">
            <DemoIcon name="file-text" />
            <span>
              <strong>{file.name}</strong>
              <small>
                {Math.max(1, Math.ceil(file.size / 1024))} KB ·{" "}
                {attached ? "Attached to draft" : "Ready to attach"}
              </small>
            </span>
            <Button variant="ghost" onClick={clear}>
              Remove
            </Button>
          </div>
        )}
        <div className="pattern-actions">
          <Button disabled={!file || !!error || attached} onClick={() => setAttached(true)}>
            {attached ? "Attached" : "Attach to draft"}
          </Button>
        </div>
        {attached && <Notice>Attachment added to this demo draft.</Notice>}
      </div>
    </div>
  );
}
function ActivityFeed() {
  const [comment, setComment] = useState("");
  const [activity, setActivity] = useState([
    {
      id: "event-1",
      text: "Demo User A created the project.",
      time: "Earlier today",
      comment: false,
    },
    {
      id: "event-2",
      text: "Project status changed to Active.",
      time: "A few minutes ago",
      comment: false,
    },
  ]);
  return (
    <div className="pattern-panel">
      <PatternHeader title="Project activity" detail="History and comments for Demo Project A." />
      <div className="pattern-body">
        <ol className="pattern-timeline" aria-live="polite">
          {activity.map((item) => (
            <li key={item.id}>
              <span className="pattern-timeline-dot">
                <DemoIcon name={item.comment ? "chat" : "history"} />
              </span>
              <div>
                <small>
                  {item.comment ? "You · Comment" : "Project event"} · {item.time}
                </small>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <form
          className="pattern-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!comment.trim()) return;
            setActivity([
              ...activity,
              { id: crypto.randomUUID(), text: comment.trim(), time: "Just now", comment: true },
            ]);
            setComment("");
          }}
        >
          <Label htmlFor="pattern-comment">Add a comment</Label>
          <TextArea
            id="pattern-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a short update…"
            rows={2}
          />
          <div className="pattern-actions">
            <Button disabled={!comment.trim()}>Post comment</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
function DashboardOverview() {
  const [period, setPeriod] = useState<"week" | "month">("week");
  const data =
    period === "week"
      ? { completed: 18, total: 24, projects: 4, reviews: 3 }
      : { completed: 72, total: 100, projects: 12, reviews: 8 };
  return (
    <div className="pattern-panel">
      <PatternHeader title="Workspace overview" detail="Sample activity for the selected period." />
      <div className="pattern-body">
        <div className="pattern-period" role="group" aria-label="Reporting period">
          {(["week", "month"] as const).map((v) => (
            <Button
              key={v}
              variant={period === v ? "default" : "outline"}
              aria-pressed={period === v}
              onClick={() => setPeriod(v)}
            >
              This {v}
            </Button>
          ))}
        </div>
        <div className="pattern-metrics" aria-live="polite">
          {[
            ["Completed tasks", data.completed],
            ["Active projects", data.projects],
            ["Awaiting review", data.reviews],
          ].map(([label, value]) => (
            <div key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
              <span>This {period}</span>
            </div>
          ))}
        </div>
        <div className="pattern-form">
          <div className="pattern-row">
            <strong>Task completion</strong>
            <span>
              {data.completed} of {data.total}
            </span>
          </div>
          <Progress value={(data.completed / data.total) * 100} />
          <small className="pattern-muted">
            {Math.round((data.completed / data.total) * 100)}% of tasks completed this {period}.
          </small>
        </div>
      </div>
    </div>
  );
}
function RecoveryStates() {
  const [mode, setMode] = useState("empty");
  const [resolved, setResolved] = useState(false);
  return (
    <div className="pattern-panel">
      <PatternHeader title="Project list" detail="Every state has a useful next step." />
      <div className="pattern-body">
        <Select
          value={mode}
          onValueChange={(v) => {
            setMode(v);
            setResolved(false);
          }}
        >
          <SelectTrigger aria-label="Preview state">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="empty">Empty collection</SelectItem>
            <SelectItem value="error">Request failed</SelectItem>
            <SelectItem value="filtered">No search results</SelectItem>
          </SelectContent>
        </Select>
        {resolved ? (
          <>
            <Notice>
              {mode === "empty"
                ? "Your first demo project is ready."
                : mode === "error"
                  ? "Projects loaded successfully."
                  : "Filters cleared."}
            </Notice>
            <div className="pattern-row">
              <DemoIcon name="folder" />
              <span>
                <strong>Demo Project A</strong>
                <small>DEMO-001</small>
              </span>
              <Badge variant="secondary">Active</Badge>
            </div>
          </>
        ) : (
          <div className="pattern-empty">
            <DemoIcon
              name={mode === "error" ? "warning" : mode === "filtered" ? "search" : "folder"}
              size={30}
            />
            <strong>
              {mode === "error"
                ? "Projects could not be loaded"
                : mode === "filtered"
                  ? "No projects match your filters"
                  : "No projects yet"}
            </strong>
            <p>
              {mode === "error"
                ? "Try again to reload your project list."
                : mode === "filtered"
                  ? "Clear the filters to see all projects."
                  : "Create a project to start organizing your work."}
            </p>
            <Button onClick={() => setResolved(true)}>
              {mode === "error"
                ? "Try again"
                : mode === "filtered"
                  ? "Clear filters"
                  : "Create first project"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
function ReviewSubmit() {
  const [title, setTitle] = useState("Example request");
  const [notes, setNotes] = useState("Please review this demo project.");
  const [confirmed, setConfirmed] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="pattern-panel">
      <PatternHeader title="Review request" detail="Check your draft before submitting." />
      <div className="pattern-body">
        {done ? (
          <div className="pattern-empty">
            <DemoIcon name="check-circle" size={32} />
            <strong>Request submitted</strong>
            <p>{title} is ready for review.</p>
            <Badge variant="secondary">DEMO-REQUEST-001</Badge>
            <Button
              variant="outline"
              onClick={() => {
                setDone(false);
                setConfirmed(false);
              }}
            >
              Back to draft
            </Button>
          </div>
        ) : (
          <form
            className="pattern-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (title.trim() && confirmed) setDone(true);
            }}
          >
            <Label htmlFor="review-title">Request title</Label>
            <Input
              id="review-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setConfirmed(false);
              }}
            />
            <Label htmlFor="review-notes">Notes</Label>
            <TextArea
              id="review-notes"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setConfirmed(false);
              }}
              rows={2}
            />
            <dl className="pattern-summary">
              <div>
                <dt>Project</dt>
                <dd>Demo Project A</dd>
              </div>
              <div>
                <dt>Reviewer</dt>
                <dd>Demo User B</dd>
              </div>
            </dl>
            <label className="pattern-check">
              <Checkbox checked={confirmed} onCheckedChange={(v) => setConfirmed(v === true)} />I
              have reviewed these details
            </label>
            <div className="pattern-actions">
              <Button disabled={!title.trim() || !confirmed}>Submit request</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
function PatternDemo({ id }: { id: string }) {
  switch (id) {
    case "search-filter":
      return <SearchFilter />;
    case "bulk-actions":
      return <BulkActions />;
    case "inline-editing":
      return <InlineEditing />;
    case "create-flow":
      return <CreateFlow />;
    case "settings-form":
      return <SettingsForm />;
    case "browse-detail":
      return <BrowseDetail />;
    case "destructive-action":
      return <DestructiveAction />;
    case "file-attachment":
      return <FileAttachment />;
    case "activity-feed":
      return <ActivityFeed />;
    case "dashboard-overview":
      return <DashboardOverview />;
    case "recovery-states":
      return <RecoveryStates />;
    case "review-submit":
      return <ReviewSubmit />;
    default:
      return null;
  }
}
export function PatternDocsPage({ id }: { id: string }) {
  const page = patternPages.find((p) => p.id === id);
  const [revision, setRevision] = useState(0);
  if (!page) return null;
  return (
    <>
      <ImportLine names={page.imports} />
      <Preview
        controls={
          <button className="pattern-reset" onClick={() => setRevision((v) => v + 1)}>
            <DemoIcon name="refresh" />
            Reset demo
          </button>
        }
      >
        <PatternDemo key={`${id}-${revision}`} id={id} />
      </Preview>
      <section className="docs-example-section">
        <h2>Try the flow</h2>
        <ol className="pattern-guide">
          {page.steps.map((step, i) => (
            <li key={step}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
      <ExampleCode code={page.code} />
      <KeyboardTable
        rows={[
          ["Tab / Shift+Tab", "Move between controls"],
          ["Enter / Space", "Activate the focused action"],
        ]}
      />
      <Usage good={[page.good]} bad={[page.bad]} />
    </>
  );
}
