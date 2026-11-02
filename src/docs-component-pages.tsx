/*
 * Copyright 2025 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { useEffect, useRef, useState } from "react";
import {
  Alert, AlertDescription, AlertTitle, Badge, Button, Checkbox, Input, Kbd, Switch, Table, TableBody, TableCell, TableFooter, toast,
  TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger,
  TextArea,
} from "@clidey/ux";
import { icons } from "../icons";
import clideyMark from "./assets/clidey-mark.webp";
import { CodeSyntax } from "./docs-code-syntax";

export function DemoIcon({ name, size = 16 }: { name: string; size?: number }) {
  const url = icons[name] ?? icons.info;
  return <span className="docs-custom-icon" aria-hidden="true" style={{ width: size, height: size, maskImage: `url("${url}")`, WebkitMaskImage: `url("${url}")` }} />;
}
function copy(value: string) { void navigator.clipboard.writeText(value); }
export function ImportLine({ names }: { names: string }) {
  const code = `import { ${names} } from "@clidey/ux";`;
  return <div className="docs-inline-code docs-example-import"><CodeSyntax code={code} /><button onClick={() => copy(code)}><DemoIcon name="copy" size={13} /> Copy</button></div>;
}
export function ExampleCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return <div className="docs-code docs-example-code"><div className="docs-code-head"><span>tsx · live</span><button onClick={() => { copy(code); setCopied(true); setTimeout(() => setCopied(false), 1600); }}><DemoIcon name={copied ? "check" : "copy"} size={13} /> {copied ? "Copied" : "Copy"}</button></div><pre><CodeSyntax code={code} /></pre></div>;
}
export function Preview({ children, controls }: { children: React.ReactNode; controls?: React.ReactNode }) {
  return <div className="docs-example-preview"><div className="docs-example-preview-head"><span className="docs-eyebrow">PREVIEW</span>{controls}</div><div className="docs-example-stage">{children}</div></div>;
}
export type PropRow = [string, string, string, string];
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return <section className="docs-example-section"><h2>Props</h2><div className="docs-example-props"><div className="docs-example-props-head"><span>PROP</span><span>TYPE</span><span>DEFAULT</span><span>DESCRIPTION</span></div>{rows.map(([name, type, fallback, detail]) => <div className="docs-example-props-row" key={name}><strong>{name}</strong><code>{type}</code><code>{fallback}</code><span>{detail}</span></div>)}</div></section>;
}
export function KeyboardTable({ rows }: { rows: [string, string][] }) {
  return <section className="docs-example-section"><h2>Keyboard</h2><div className="docs-example-keyboard">{rows.map(([key, detail]) => <div key={key}><kbd>{key}</kbd><span>{detail}</span></div>)}</div></section>;
}
export function Usage({ good, bad }: { good: string[]; bad: string[] }) {
  return <section className="docs-example-section"><h2>Usage</h2><div className="docs-example-usage"><div><strong><DemoIcon name="check-circle" size={15} /> Do</strong>{good.map((line) => <p key={line}>{line}</p>)}</div><div><strong><DemoIcon name="x-circle" size={15} /> Don&apos;t</strong>{bad.map((line) => <p key={line}>{line}</p>)}</div></div></section>;
}
function TextFieldPage() {
  const [gstin, setGstin] = useState("DEMO-ID");
  const [amount, setAmount] = useState("1180");
  const error = gstin.length !== 15;
  return <>
    <ImportLine names="Input, TextArea" />
    <Preview><div className="docs-example-form-grid">
      <label className="docs-example-field">GSTIN <em>*</em><Input value={gstin} onChange={(e) => setGstin(e.target.value.toUpperCase().slice(0, 15))} maxLength={15} aria-invalid={error} aria-describedby="gstin-help" className={error ? "docs-example-invalid" : ""} /><small id="gstin-help" className={error ? "error" : ""}>{error ? `GSTIN must be 15 characters (${gstin.length} entered)` : "Valid length"}</small></label>
      <label className="docs-example-field">Amount<div className="docs-example-input-group"><span>₹</span><Input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} onBlur={() => { const n = Number(amount.replace(/,/g, "")); if (Number.isFinite(n)) setAmount(new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(n)); }} /><span>Dr</span></div><small>Formats to Indian grouping on blur</small></label>
      <label className="docs-example-field">Narration<TextArea placeholder="Against DEMO-PO-001" rows={3} /></label>
      <label className="docs-example-field">Place of supply<Input value="Example region" disabled /><small>Disabled · set by party</small></label>
    </div></Preview>
    <ExampleCode code={'<label htmlFor="gstin">GSTIN</label>\n<Input id="gstin" value={gstin} maxLength={15} aria-invalid={gstin.length !== 15} onChange={event => setGstin(event.target.value)} />\n<label htmlFor="amount">Amount</label>\n<Input id="amount" inputMode="decimal" value={amount} onBlur={formatAmount} />'} />
    <PropsTable rows={[["value", "string", "—", "Controlled field value."], ["onChange", "ChangeEventHandler", "—", "Runs as the value changes."], ["aria-invalid", "boolean", "false", "Marks a field with an error."], ["maxLength", "number", "—", "Limits characters accepted."], ["disabled", "boolean", "false", "Prevents editing and focus."], ["showPasswordToggle", "boolean", "false", "Available when type is password."]]} />
    <KeyboardTable rows={[["Tab", "Move to the next field"], ["Escape", "Revert in the host form when implemented"]]} />
    <Usage good={["Keep a visible label and explain the exact error.", "Align amounts right and format them for the user's locale."]} bad={["Use placeholder text as the only label.", "Validate business rules without explaining how to fix the value."]} />
  </>;
}
// Fictional fixtures. Demo identifiers deliberately do not use a valid GSTIN format.
const parties = [
  { name: "Demo Customer A", city: "Example City A", gstin: "DEMO-GSTIN-0001", balance: "5,000 Dr", credit: "1,000" },
  { name: "Demo Customer B", city: "Example City B", gstin: "DEMO-GSTIN-0002", balance: "0.00", credit: "10,000" },
  { name: "Demo Customer C", city: "Example City C", gstin: "DEMO-GSTIN-0003", balance: "500 Cr", credit: "5,000" },
  { name: "Demo Customer D", city: "Example City D", gstin: "DEMO-GSTIN-0004", balance: "1,000 Dr", credit: "3,000" },
  { name: "Demo Customer E", city: "Example City E", gstin: "DEMO-GSTIN-0005", balance: "2,000 Dr", credit: "2,000" },
];
function ComboboxPage() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState("");
  const matches = parties.filter((party) => `${party.name} ${party.city} ${party.gstin}`.toLowerCase().includes(query.toLowerCase()));
  function choose(index: number) { const party = matches[index]; if (party) { setSelected(party.name); setQuery(party.name); setOpen(false); } }
  return <>
    <ImportLine names="Input" />
    <Preview><div className="docs-example-combobox"><label htmlFor="party-search">Party A/c</label><div className="docs-example-combobox-input"><DemoIcon name="search" size={16} /><Input id="party-search" role="combobox" aria-expanded={open} aria-controls="party-options" aria-autocomplete="list" value={query} placeholder="Type to search parties" onFocus={() => setOpen(true)} onChange={(e) => { setQuery(e.target.value); setActive(0); setOpen(true); }} onKeyDown={(e) => { if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((n) => Math.min(n + 1, matches.length - 1)); } else if (e.key === "ArrowUp") { e.preventDefault(); setActive((n) => Math.max(n - 1, 0)); } else if (e.key === "Enter" && open) { e.preventDefault(); choose(active); } else if (e.key === "Escape") setOpen(false); }} /></div>
      {open && <div id="party-options" className="docs-example-combobox-list" role="listbox"><div className="docs-example-combobox-label"><span>PARTY</span><span>BALANCE</span><span>CREDIT LEFT</span></div>{matches.length ? matches.map((party, i) => <button key={party.name} className={active === i ? "active" : ""} role="option" aria-selected={active === i} onMouseEnter={() => setActive(i)} onMouseDown={(e) => e.preventDefault()} onClick={() => choose(i)}><span><strong>{party.name}</strong><small>{party.city} · {party.gstin}</small></span><code>{party.balance}</code><code className={i === 0 ? "warn" : ""}>{party.credit}</code></button>) : <p>No parties found</p>}<div className="docs-example-combobox-foot">↑↓ move · ↵ pick · Esc close</div></div>}
      {selected && !open && <small>Selected: {selected}</small>}<small>Fictional examples · identifiers are not valid GSTINs.</small>
    </div></Preview>
    <ExampleCode code={'import { SearchSelect } from "@clidey/ux";\n\n<SearchSelect label="Party A/c" options={parties.map(party => ({ value: party.id, label: party.name }))} value={partyId} onValueChange={setPartyId} />'} />
    <PropsTable rows={[["options", "{ value, label }[]", "—", "Searchable options for SearchSelect."], ["value", "string", "—", "Controlled selected value."], ["onValueChange", "(value) => void", "—", "Receives the selected value."], ["placeholder", "string", "Select option…", "Text before selection."], ["disabled", "boolean", "false", "Prevents opening the picker."]]} />
    <KeyboardTable rows={[["↑ ↓", "Move through results"], ["Enter", "Choose highlighted result"], ["Esc", "Close the result list"]]} />
    <Usage good={["Show the context a user needs before committing.", "Keep the query visible while a result list is open."]} bad={["Hide important balances behind a second screen.", "Show more context columns than users can scan."]} />
  </>;
}
function CheckboxPage() {
  const [opening, setOpening] = useState(true);
  const [cancelled, setCancelled] = useState(false);
  const [group, setGroup] = useState(true);
  const options = [["Include opening balance", opening, setOpening], ["Show cancelled vouchers", cancelled, setCancelled], ["Group by party", group, setGroup]] as const;
  return <><ImportLine names="Checkbox" /><Preview><div className="docs-example-control-solo"><strong>Report options</strong>{options.map(([label, value, set]) => <label key={label}><Checkbox checked={value} onCheckedChange={(next) => set(next === true)} />{label}</label>)}</div></Preview><ExampleCode code={'<label><Checkbox checked={opening} onCheckedChange={setOpening} /> Include opening balance</label>'} /><PropsTable rows={[["checked", "boolean | indeterminate", "false", "Controlled selection state."], ["onCheckedChange", "(checked) => void", "—", "Runs when selection changes."], ["disabled", "boolean", "false", "Prevents interaction."], ["name", "string", "—", "Form field name."]]} /><KeyboardTable rows={[["Space", "Toggle the focused checkbox"]]} /><Usage good={["Use checkboxes for independent choices.", "Keep labels clickable and specific."]} bad={["Use a checkbox for an immediate on/off setting.", "Use one checkbox to represent several unrelated choices."]} /></>;
}
function RadioPage() {
  const [rounding, setRounding] = useState("nearest");
  return <><p className="docs-native-note">Use native radio inputs; this package does not export a radio primitive.</p><Preview><div className="docs-example-control-solo" role="radiogroup" aria-label="Rounding method"><strong>Rounding method</strong>{[["nearest", "Nearest rupee"], ["up", "Up to next rupee"], ["none", "No rounding"]].map(([value, label]) => <label key={value}><input type="radio" name="rounding" value={value} checked={rounding === value} onChange={() => setRounding(value)} />{label}</label>)}<small>Selected: {rounding === "none" ? "No rounding" : rounding === "up" ? "Up to next rupee" : "Nearest rupee"}</small></div></Preview><ExampleCode code={'<fieldset><legend>Rounding method</legend>\n  <label><input type="radio" name="rounding" value="nearest" checked={rounding === "nearest"} onChange={() => setRounding("nearest")} /> Nearest rupee</label>\n  <label><input type="radio" name="rounding" value="none" checked={rounding === "none"} onChange={() => setRounding("none")} /> No rounding</label>\n</fieldset>'} /><PropsTable rows={[["name", "string", "—", "Shared group name for native radio inputs."], ["value", "string", "—", "Option value."], ["checked", "boolean", "false", "Whether this option is selected."], ["onChange", "ChangeEventHandler", "—", "Updates the selected value."]]} /><KeyboardTable rows={[["↑ ↓", "Move selection within the group"], ["Space", "Select the focused option"]]} /><Usage good={["Use radio options when exactly one choice applies.", "Keep every option visible when the set is short."]} bad={["Use separate checkboxes for mutually exclusive options.", "Hide a short choice set inside a menu."]} /></>;
}
function SwitchPage() {
  const [autoPost, setAutoPost] = useState(true);
  const [lock, setLock] = useState(false);
  return <><ImportLine names="Switch" /><Preview><div className="docs-example-control-solo"><strong>Automation settings</strong><label className="docs-example-switch-row"><span>Auto-post receipts<small>From bank feed after match</small></span><Switch checked={autoPost} onCheckedChange={setAutoPost} /></label><label className="docs-example-switch-row"><span>Lock period<small>Blocks edits before 1 Oct</small></span><Switch checked={lock} onCheckedChange={setLock} /></label></div></Preview><ExampleCode code={'<label><span>Auto-post receipts</span><Switch checked={autoPost} onCheckedChange={setAutoPost} /></label>'} /><PropsTable rows={[["checked", "boolean", "false", "Controlled on/off state."], ["onCheckedChange", "(checked) => void", "—", "Runs when the setting changes."], ["disabled", "boolean", "false", "Prevents interaction."], ["name", "string", "—", "Form field name."]]} /><KeyboardTable rows={[["Space", "Toggle the focused switch"]]} /><Usage good={["Use a switch when the setting applies immediately.", "Explain the effect beside the switch."]} bad={["Use a switch when a later Save action is required.", "Use an unlabeled switch for a high impact setting."]} /></>;
}
function BadgePage() {
  const examples: { text: string; tone: string; icon: string; variant: "default" | "secondary" | "destructive" | "outline" }[] = [
    { text: "Paid", tone: "success", icon: "check", variant: "secondary" }, { text: "Overdue", tone: "danger", icon: "warning", variant: "outline" },
    { text: "Due soon", tone: "warning", icon: "clock", variant: "secondary" }, { text: "Posted", tone: "info", icon: "circle", variant: "secondary" },
    { text: "Draft", tone: "neutral", icon: "edit", variant: "secondary" }, { text: "Cancelled", tone: "void", icon: "close", variant: "outline" },
  ];
  return <>
    <ImportLine names="Badge" />
    <Preview><div className="docs-example-badges"><div>{examples.map((item) => <Badge key={item.text} variant={item.variant} className={`docs-example-badge ${item.tone}`}><DemoIcon name={item.icon} size={12} />{item.text}</Badge>)}</div><small>variant and className combine semantic status with a visible label</small></div></Preview>
    <ExampleCode code={'<Badge variant="secondary" className="status-paid">Paid</Badge>\n<Badge variant="outline" className="status-overdue">Overdue</Badge>'} />
    <PropsTable rows={[["variant", "default | secondary | destructive | outline", "default", "Base visual treatment."], ["className", "string", "—", "Add a semantic status treatment."], ["asChild", "boolean", "false", "Use a child element as the badge root."]]} />
    <Usage good={["Pair status color with a word and, when useful, an icon.", "Keep badge labels short and recognizable."]} bad={["Use color as the only status signal.", "Put a sentence inside a badge."]} />
  </>;
}
const vouchers = [
  { date: "22 Oct", number: "DEMO/0001", party: "Demo Customer A", status: "Overdue", amount: 1180 },
  { date: "21 Oct", number: "DEMO/0004", party: "Demo Customer E", status: "Due soon", amount: 2000 },
  { date: "21 Oct", number: "DEMO/0005", party: "Demo Customer F", status: "Posted", amount: 500 },
  { date: "20 Oct", number: "DEMO/0007", party: "Demo Customer G", status: "Draft", amount: 1000 },
  { date: "20 Oct", number: "DEMO/0006", party: "Demo Customer H", status: "Paid", amount: 250 },
  { date: "22 Oct", number: "DEMO/0003", party: "Walk-in (POS)", status: "Paid", amount: 2477 },
];
function DataTablePage() {
  const [density, setDensity] = useState<"compact" | "comfortable">("compact");
  const [selected, setSelected] = useState<string[]>(["DEMO/0001"]);
  const [sortDown, setSortDown] = useState(false);
  const rows = sortDown ? [...vouchers].sort((a, b) => b.amount - a.amount) : vouchers;
  const total = vouchers.reduce((sum, row) => sum + row.amount, 0);
  const money = (amount: number) => new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  function toggle(number: string) { setSelected((items) => items.includes(number) ? items.filter((item) => item !== number) : [...items, number]); }
  return <>
    <ImportLine names="Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter" />
    <Preview controls={<div className="docs-example-segments"><span>density</span>{(["compact", "comfortable"] as const).map((value) => <button key={value} className={density === value ? "active" : ""} onClick={() => setDensity(value)}>{value}</button>)}</div>}><div className={`docs-example-table-wrap ${density}`}><Table><TableHeader><TableRow><TableHead><input type="checkbox" aria-label="Select all vouchers" checked={selected.length === vouchers.length} onChange={() => setSelected(selected.length === vouchers.length ? [] : vouchers.map((row) => row.number))} /></TableHead><TableHead>Date</TableHead><TableHead>No.</TableHead><TableHead>Party</TableHead><TableHead>Status</TableHead><TableHead><button onClick={() => setSortDown(!sortDown)}>Amount ₹ <DemoIcon name="chevron-down" size={13} /></button></TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.number} data-state={selected.includes(row.number) ? "selected" : undefined} onClick={() => toggle(row.number)}><TableCell><input type="checkbox" aria-label={`Select ${row.number}`} checked={selected.includes(row.number)} onClick={(event) => event.stopPropagation()} onChange={() => toggle(row.number)} /></TableCell><TableCell>{row.date}</TableCell><TableCell>{row.number}</TableCell><TableCell>{row.party}</TableCell><TableCell><Badge variant="secondary" className={`docs-example-table-status ${row.status.toLowerCase().replace(" ", "-")}`}>{row.status}</Badge></TableCell><TableCell>{money(row.amount)}</TableCell></TableRow>)}</TableBody><TableFooter><TableRow><TableCell colSpan={3} /><TableCell colSpan={2}>Total</TableCell><TableCell>{money(total)}</TableCell></TableRow></TableFooter></Table><div className="docs-example-table-foot">{selected.length} selected · ₹{money(vouchers.filter((row) => selected.includes(row.number)).reduce((sum, row) => sum + row.amount, 0))}<span>Click row to select · click Amount to sort</span></div></div></Preview>
    <ExampleCode code={'<Table>\n  <TableHeader><TableRow><TableHead>Party</TableHead><TableHead>Amount</TableHead></TableRow></TableHeader>\n  <TableBody>{rows.map(row => <TableRow key={row.id}><TableCell>{row.party}</TableCell><TableCell>{row.amount}</TableCell></TableRow>)}</TableBody>\n</Table>'} />
    <PropsTable rows={[["maxHeight", "number", "—", "Table scroll height; enables virtualized body behavior."], ["className", "string", "—", "Styling for density and alignment."], ["children", "ReactNode", "—", "Compose header, body and footer primitives."]]} />
    <KeyboardTable rows={[["Tab", "Move between interactive table controls"], ["Space", "Toggle a focused row checkbox"], ["Enter", "Activate a focused action"]]} />
    <Usage good={["Right-align amounts and use tabular numbers.", "Keep totals visible and make selection explicit."]} bad={["Use zebra stripes when borders and hover already distinguish rows.", "Hide the unit or currency from the column label."]} />
  </>;
}
function TabsPage() {
  const [tab, setTab] = useState("lines");
  const [period, setPeriod] = useState("Day");
  const content: Record<string, string> = { lines: "Four item lines totalling ₹1,000.00 before tax.", taxes: "CGST 9% and SGST 9% on all lines. Example place of supply.", attachments: "Three source documents attached to this voucher.", history: "Created 09:42 · reviewed 11:20 · posted 11:42." };
  return <>
    <ImportLine names="Tabs, TabsList, TabsTrigger, TabsContent" />
    <Preview><div className="docs-example-tabs"><Tabs value={tab} onValueChange={setTab}><TabsList className="docs-example-tabs-list">{[["lines", "Lines", "4"], ["taxes", "Taxes", ""], ["attachments", "Attachments", "3"], ["history", "History", ""]].map(([value, label, count]) => <TabsTrigger value={value} key={value}>{label}{count && <small>{count}</small>}</TabsTrigger>)}</TabsList>{Object.entries(content).map(([value, text]) => <TabsContent value={value} key={value}><div className="docs-example-tabs-panel">{text}</div></TabsContent>)}</Tabs><div className="docs-example-period">{["Day", "Week", "Month"].map((value) => <button key={value} className={period === value ? "active" : ""} onClick={() => setPeriod(value)}>{value}</button>)}</div></div></Preview>
    <ExampleCode code={'<Tabs defaultValue="lines">\n  <TabsList><TabsTrigger value="lines">Lines</TabsTrigger><TabsTrigger value="taxes">Taxes</TabsTrigger></TabsList>\n  <TabsContent value="lines">Line items</TabsContent>\n  <TabsContent value="taxes">Tax details</TabsContent>\n</Tabs>'} />
    <PropsTable rows={[["value", "string", "—", "Controlled active tab."], ["defaultValue", "string", "—", "Initial tab for an uncontrolled group."], ["onValueChange", "(value) => void", "—", "Runs when a tab changes."], ["orientation", "horizontal | vertical", "horizontal", "Tab navigation direction."]]} />
    <KeyboardTable rows={[["← →", "Move through horizontal tabs"], ["Home / End", "Jump to first or last tab"]]} />
    <Usage good={["Use tabs for sections of the same record.", "Keep tab labels short and stable."]} bad={["Use tabs as primary app navigation.", "Hide important content in too many tabs."]} />
  </>;
}
function SidebarPage() {
  const [rail, setRail] = useState(false);
  const [active, setActive] = useState("Ledgers");
  const [filter, setFilter] = useState("");
  const filterRef = useRef<HTMLInputElement>(null);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "[" && !(event.target instanceof HTMLInputElement)) setRail((value) => !value); if (event.key === "/" && !(event.target instanceof HTMLInputElement) && document.querySelector(".docs-example-sidebar")) { event.preventDefault(); filterRef.current?.focus(); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  const items = [["Dashboard", "home"], ["Vouchers", "order"], ["Ledgers", "book"], ["Items", "inventory"], ["Trial balance", "table"], ["GST returns", "calculator"], ["Settings", "settings"]].filter(([label]) => label.toLowerCase().includes(filter.toLowerCase()));
  return <>
    <ImportLine names="SidebarProvider, Sidebar, SidebarMenu, SidebarMenuButton" />
    <Preview controls={<div className="docs-example-segments"><span>mode</span><button className={!rail ? "active" : ""} onClick={() => setRail(false)}>Expanded</button><button className={rail ? "active" : ""} onClick={() => setRail(true)}>Rail</button></div>}><div className="docs-example-sidebar"><div className={`docs-example-sidebar-nav ${rail ? "rail" : ""}`}><div className="docs-example-sidebar-brand"><img src={clideyMark} alt="" />{!rail && <strong>Demo Workspace</strong>}</div>{!rail && <div className="docs-example-sidebar-filter"><DemoIcon name="search" size={14} /><input ref={filterRef} value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter menu" /></div>}{items.map(([label, icon]) => <button title={label} key={label} className={active === label ? "active" : ""} onClick={() => setActive(label)}><DemoIcon name={icon} size={17} />{!rail && <span>{label}</span>}</button>)}</div><div className="docs-example-sidebar-canvas"><span className="docs-eyebrow">CONTENT CANVAS · CARRIES THE MODE</span><h3>{active}</h3><p>Navigation chrome stays dark while the content canvas follows the selected theme. Press [ to toggle the rail.</p></div></div></Preview>
    <ExampleCode code={'<SidebarProvider defaultOpen>\n  <Sidebar collapsible="icon">\n    <SidebarMenu>\n      <SidebarMenuButton isActive>Ledgers</SidebarMenuButton>\n    </SidebarMenu>\n  </Sidebar>\n</SidebarProvider>'} />
    <PropsTable rows={[["collapsible", "offcanvas | icon | none", "offcanvas", "Controls the narrow rail or hidden mode."], ["side", "left | right", "left", "Placement of the sidebar."], ["defaultOpen", "boolean", "true", "Initial SidebarProvider state."], ["isActive", "boolean", "false", "Highlights a SidebarMenuButton."]]} />
    <KeyboardTable rows={[["[", "Toggle the preview rail"], ["/", "Focus the preview filter"]]} />
    <Usage good={["Keep primary destinations reachable from the rail.", "Label navigation groups and show the active destination."]} bad={["Theme the navigation chrome like content cards.", "Remove labels without tooltips in a collapsed rail."]} />
  </>;
}
function DocumentStepperPage() {
  const [current, setCurrent] = useState(2);
  const steps = [["Quotation", "QTN/0412"], ["Sales order", "SO/0388"], ["Delivery note", "DN/0361"], ["Invoice", "not started"]];
  return <>
    <ImportLine names="Button" />
    <Preview><div className="docs-example-stepper"><div className="docs-example-step-track">{steps.map(([label, doc], index) => <div className={`docs-example-step ${index < current ? "done" : index === current ? "current" : "todo"}`} key={label}><button aria-label={`${label}: ${doc}`} onClick={() => setCurrent(index)}><DemoIcon name={index < current ? "check" : index === 2 ? "output" : "file-text"} size={16} /></button><span><strong>{label}</strong><small>{doc}</small></span>{index < steps.length - 1 && <i />}</div>)}</div><div className="docs-example-step-callout"><span>{steps[current][0]} {steps[current][1]} {current === 3 ? "is ready to create." : "is open. The next document copies its party, items and rates."}</span><Button onClick={() => setCurrent(Math.min(current + 1, 3))} disabled={current === 3}>Create {steps[Math.min(current + 1, 3)][0].toLowerCase()} <DemoIcon name="arrow-right" size={15} /></Button></div></div></Preview>
    <ExampleCode code={'<div aria-label="Document flow">\n  {steps.map(step => <Button key={step.id} variant="ghost" onClick={() => openDocument(step.id)}>{step.label}</Button>)}\n</div>'} />
    <KeyboardTable rows={[["Tab", "Move between linked documents"], ["Enter", "Open the focused document"]]} />
    <Usage good={["Show which document is current and keep previous documents reachable.", "Create the next document from the current record."]} bad={["Use this flow to paginate a long form.", "Make a future document appear complete."]} />
  </>;
}
const shortcutItems = [["F2", "Date"], ["F4", "Contra"], ["F5", "Payment"], ["F6", "Receipt"], ["F8", "Sales"], ["F9", "Purchase"], ["⌃A", "Accept"], ["⌃D", "Duplicate"], ["Esc", "Back"]];
function KeyBarPage() {
  const [last, setLast] = useState("—");
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return; const pressed = event.key === "Escape" ? "Esc" : event.ctrlKey && /^[ad]$/i.test(event.key) ? `⌃${event.key.toUpperCase()}` : event.key; const match = shortcutItems.find(([key]) => key.toLowerCase() === pressed.toLowerCase()); if (match) { event.preventDefault(); setLast(`${match[0]} · ${match[1]}`); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, []);
  return <><ImportLine names="Button, Kbd" /><Preview><div className="docs-example-keybar"><div>{shortcutItems.map(([key, label]) => <button key={key} onClick={() => setLast(`${key} · ${label}`)}><Kbd>{key}</Kbd>{label}</button>)}</div><p>Click a key or press it on your keyboard. Last: <strong>{last}</strong></p></div></Preview><ExampleCode code={'<Button onClick={openSales}><Kbd>F8</Kbd> Sales</Button>\n// Register the key in the screen that owns this action.'} /><PropsTable rows={[["Kbd children", "ReactNode", "—", "Visible key label."], ["Button onClick", "MouseEventHandler", "—", "Runs the action when clicked."]]} /><Usage good={["Keep shortcut labels beside the action they trigger.", "Scope keyboard handling to the active screen."]} bad={["Capture keys while someone is typing in a field.", "Display a shortcut that is unavailable."]} /></>;
}
const alertCases = {
  info: ["GSTR-1 opens on 1 Nov", "47 invoices are ready to file. Review them in Reports."],
  success: ["Bank reconciled", "HDFC current account matches the statement to 21 Oct."],
  warning: ["Credit limit at 80%", "Demo Customer A has ₹1,000 left of ₹5,000."],
  danger: ["Sync failed", "Connection to the Example location timed out. Retry from Settings."],
} as const;
function AlertPage() {
  const [tone, setTone] = useState<keyof typeof alertCases>("info");
  const [title, description] = alertCases[tone];
  return <><ImportLine names="Alert, AlertTitle, AlertDescription" /><Preview controls={<div className="docs-example-segments"><span>tone</span>{(Object.keys(alertCases) as (keyof typeof alertCases)[]).map((item) => <button key={item} className={tone === item ? "active" : ""} onClick={() => setTone(item)}>{item}</button>)}</div>}><Alert variant={tone === "danger" ? "destructive" : tone} className={`docs-example-alert ${tone}`}><DemoIcon name={tone === "success" ? "check-circle" : tone === "warning" ? "warning" : tone === "danger" ? "x-circle" : "info"} size={18} /><AlertTitle>{title}</AlertTitle><AlertDescription>{description}</AlertDescription></Alert></Preview><ExampleCode code={`<Alert variant="${tone === "danger" ? "destructive" : tone}">\n  <AlertTitle>${title}</AlertTitle>\n  <AlertDescription>${description}</AlertDescription>\n</Alert>`} /><PropsTable rows={[["variant", "default | info | success | warning | destructive", "default", "Semantic alert treatment."], ["dismissible", "boolean", "false", "Show a close control."], ["onClose", "() => void", "—", "Called when the alert is dismissed."]]} /><Usage good={["Say what happened and what to do next.", "Pair a meaningful icon with the message."]} bad={["Use an alert for routine confirmation; use a toast.", "Rely on color alone to explain urgency."]} /></>;
}
function ToastPage() {
  const [messages, setMessages] = useState<{ id: number; title: string; detail: string; undo?: boolean; error?: boolean }[]>([]);
  function show(title: string, detail: string, options?: { undo?: boolean; error?: boolean }) {
    setMessages((items) => [{ id: Date.now(), title, detail, ...options }, ...items].slice(0, 3));
    if (options?.error) toast.error(title, { description: detail });
    else toast.success(title, { description: detail, ...(options?.undo ? { action: { label: "Undo", onClick: () => setMessages((items) => items.filter((item) => item.title !== title)) } } : {}) });
  }
  return <><ImportLine names="toast, Toaster" /><Preview><div className="docs-example-toast-preview"><div className="docs-example-toast-actions"><Button variant="outline" onClick={() => show("DEMO/0002 posted", "₹500.00 to Demo Customer E")}>Success</Button><Button variant="outline" onClick={() => show("3 vouchers archived", "Moved to Archive · Oct 2026", { undo: true })}>With undo</Button><Button variant="outline" onClick={() => show("Posting failed", "Please retry after checking the connection.", { error: true })}>Error</Button></div><div className="docs-example-toast-stack">{messages.map((item) => <div key={item.id} className={item.error ? "error" : ""}><DemoIcon name={item.error ? "x-circle" : "check-circle"} size={18} /><span><strong>{item.title}</strong><small>{item.detail}</small></span>{item.undo && <button onClick={() => setMessages((items) => items.filter((message) => message.id !== item.id))}>Undo</button>}<button aria-label={`Dismiss ${item.title}`} onClick={() => setMessages((items) => items.filter((message) => message.id !== item.id))}><DemoIcon name="close" size={16} /></button></div>)}</div></div></Preview><ExampleCode code={'toast.success("3 vouchers archived", {\n  description: "Moved to Archive · Oct 2026",\n  action: { label: "Undo", onClick: restoreVouchers },\n});'} /><PropsTable rows={[["toast.success", "(message, options) => id", "—", "Show a success message."], ["toast.error", "(message, options) => id", "—", "Show an error message."], ["Toaster", "component", "—", "Mount once near the app root."]]} /><Usage good={["Confirm a completed action briefly.", "Offer Undo when the action is reversible."]} bad={["Put critical instructions only in a timed toast.", "Stack repeated messages for the same action."]} /></>;
}
function DialogPage() {
  const [confirmation, setConfirmation] = useState("");
  const [cancelled, setCancelled] = useState(false);
  return <><ImportLine names="Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter" /><Preview><div className="docs-example-dialog-backdrop"><div className="docs-example-dialog"><span className="docs-example-dialog-icon"><DemoIcon name="trash" size={18} /></span><h3>{cancelled ? "Voucher cancelled" : "Cancel voucher DEMO/0001?"}</h3><p>{cancelled ? "The voucher remains in the day book marked cancelled." : "The voucher stays in the day book marked cancelled. Stock and ledger balances reverse."}</p>{!cancelled && <><label htmlFor="confirm-voucher">Type DEMO/0001 to confirm</label><Input id="confirm-voucher" placeholder="DEMO/0001" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /><div className="docs-example-dialog-actions"><Button variant="outline" onClick={() => setConfirmation("")}>Keep voucher</Button><Button variant="destructive" disabled={confirmation !== "DEMO/0001"} onClick={() => setCancelled(true)}>Cancel voucher</Button></div></>}</div></div></Preview><ExampleCode code={'<Dialog open={open} onOpenChange={setOpen}>\n  <DialogContent>\n    <DialogHeader><DialogTitle>Cancel voucher?</DialogTitle><DialogDescription>Balances will reverse.</DialogDescription></DialogHeader>\n    <Input value={confirmation} onChange={event => setConfirmation(event.target.value)} />\n    <DialogFooter><Button disabled={confirmation !== number}>Cancel voucher</Button></DialogFooter>\n  </DialogContent>\n</Dialog>'} /><PropsTable rows={[["open", "boolean", "—", "Controlled open state."], ["onOpenChange", "(open) => void", "—", "Receives open state changes."], ["DialogContent", "component", "—", "Focus trapped modal content."]]} /><KeyboardTable rows={[["Esc", "Close the dialog"], ["Tab", "Move between controls inside the dialog"]]} /><Usage good={["Explain the consequence before a destructive decision.", "Require exact confirmation for a high impact action."]} bad={["Use a dialog for information that can remain inline.", "Dismiss before the user has made a decision."]} /></>;
}
function SheetPage() {
  const [selected, setSelected] = useState<(typeof vouchers)[number] | null>(null);
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  return <><ImportLine names="Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter" /><Preview controls={<div className="docs-example-segments"><span>size</span>{(["sm", "md", "lg"] as const).map((item) => <button key={item} className={size === item ? "active" : ""} onClick={() => setSize(item)}>{item}</button>)}</div>}><div className="docs-example-sheet-scene"><div className={`docs-example-sheet-list ${selected ? "dimmed" : ""}`}>{vouchers.map((row) => <button key={row.number} onClick={() => setSelected(row)}><code>{row.number}</code><span>{row.party}</span><Badge variant="secondary" className={`docs-example-table-status ${row.status.toLowerCase().replace(" ", "-")}`}>{row.status}</Badge><code>{row.amount.toLocaleString("en-IN", {minimumFractionDigits: 2})}</code></button>)}</div>{selected && <div className={`docs-example-sheet-panel ${size}`}><div className="docs-example-sheet-panel-head"><span className="docs-eyebrow">SALES VOUCHER</span><button aria-label="Close sheet" onClick={() => setSelected(null)}><DemoIcon name="close" size={17} /></button><h3>{selected.number} <Badge variant="secondary" className={`docs-example-table-status ${selected.status.toLowerCase().replace(" ", "-")}`}>{selected.status}</Badge></h3><p>{selected.party} · {selected.date}</p></div><div className="docs-example-sheet-panel-body"><label>Party A/c<Input value={selected.party} readOnly /></label><div><strong>Total</strong><code>{selected.amount.toLocaleString("en-IN", {minimumFractionDigits: 2})}</code></div><p>The list stays in place, so closing returns to the same row.</p></div><div className="docs-example-sheet-panel-foot"><Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button><Button onClick={() => setSelected(null)}>Save</Button></div></div>}</div></Preview><ExampleCode code={'<Sheet open={open} onOpenChange={setOpen}>\n  <SheetContent side="right">\n    <SheetHeader><SheetTitle>{voucher.number}</SheetTitle></SheetHeader>\n    <Input value={party} onChange={event => setParty(event.target.value)} />\n    <SheetFooter><Button onClick={save}>Save</Button></SheetFooter>\n  </SheetContent>\n</Sheet>'} /><PropsTable rows={[["side", "top | right | bottom | left", "right", "Edge from which the sheet opens."], ["open", "boolean", "—", "Controlled open state."], ["onOpenChange", "(open) => void", "—", "Receives open state changes."]]} /><KeyboardTable rows={[["Esc", "Close the sheet"], ["Tab", "Move through the sheet controls"]]} /><Usage good={["Keep the list mounted behind record details.", "Return focus to the same row on close."]} bad={["Use a sheet for a decision that needs full attention.", "Hide the Save action below long content."]} /></>;
}
function MenuPage() {
  const [open, setOpen] = useState(true);
  const [last, setLast] = useState("");
  const actions = [["Open", "eye", "↵"], ["Edit", "edit", "E"], ["Duplicate", "copy", "⌃D"], ["Print", "output", "⌃P"], ["Copy link", "link", ""]];
  return <><ImportLine names="DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem" /><Preview><div className="docs-example-menu-scene"><Button variant="outline" onClick={() => setOpen(!open)}>DEMO/0001 <DemoIcon name="more" size={16} /></Button>{open && <div className="docs-example-menu-popover">{actions.map(([label, icon, key]) => <button key={label} onClick={() => { setLast(label); setOpen(false); }}><DemoIcon name={icon} size={15} /><span>{label}</span><kbd>{key}</kbd></button>)}<hr /><button className="destructive" onClick={() => { setLast("Cancel voucher"); setOpen(false); }}><DemoIcon name="trash" size={15} /><span>Cancel voucher</span></button></div>}{last && <small>Selected: {last}</small>}</div></Preview><ExampleCode code={'<DropdownMenu>\n  <DropdownMenuTrigger asChild><Button variant="outline">Actions</Button></DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuItem onSelect={openVoucher}>Open</DropdownMenuItem>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem variant="destructive" onSelect={cancelVoucher}>Cancel voucher</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>'} /><PropsTable rows={[["onSelect", "(event) => void", "—", "Runs when a menu item is chosen."], ["variant", "default | destructive", "default", "Item treatment."], ["align", "start | center | end", "center", "Menu alignment to its trigger."]]} /><KeyboardTable rows={[["↑ ↓", "Move through menu items"], ["Enter", "Choose the focused item"], ["Esc", "Close the menu"]]} /><Usage good={["Group row actions near their object.", "Put a destructive action last after a separator."]} bad={["Hide a primary action in the menu.", "Show shortcuts that do not work."]} /></>;
}
function CommandPage({ onOpenSearch }: { onOpenSearch?: () => void }) {
  return <><ImportLine names="Command, CommandInput, CommandList, CommandItem" /><Preview><div className="docs-example-command"><Button onClick={onOpenSearch}>Open command palette <Kbd>⌘K</Kbd></Button><p>This docs app uses a searchable command palette. Type a page name and press Enter to jump there.</p></div></Preview><ExampleCode code={'<Command>\n  <CommandInput placeholder="Search pages, components, tokens" />\n  <CommandList>\n    <CommandItem onSelect={openPage}>Overview</CommandItem>\n  </CommandList>\n</Command>'} /><PropsTable rows={[["CommandInput", "component", "—", "Search field for available commands."], ["CommandList", "component", "—", "Scrollable result list."], ["CommandItem onSelect", "(value) => void", "—", "Runs the selected command."]]} /><KeyboardTable rows={[["⌘K / Ctrl+K", "Open the docs palette"], ["↑ ↓", "Move through results"], ["Enter", "Open the highlighted page"], ["Esc", "Close the palette"]]} /><Usage good={["Include pages and actions users can recognize.", "Keep result labels and context readable."]} bad={["Depend on memorized commands for essential navigation.", "Show unavailable commands as active results."]} /></>;
}
function BalancedEntryPage() {
  const [debit, setDebit] = useState([1180, 0, 0]);
  const [credit, setCredit] = useState([0, 1000, 180]);
  const debitTotal = debit.reduce((a, b) => a + b, 0);
  const creditTotal = credit.reduce((a, b) => a + b, 0);
  const difference = debitTotal - creditTotal;
  const [accepted, setAccepted] = useState(false);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.ctrlKey && event.key.toLowerCase() === "a" && difference === 0 && !(event.target instanceof HTMLInputElement)) { event.preventDefault(); setAccepted(true); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [difference]);
  const money = (value: number) => value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const ledgers = [["Demo Customer A", "Sundry debtors · Bal ₹5,000 Dr"], ["Sales @ 18%", "Sales accounts"], ["Output CGST + SGST", "Duties & taxes"]];
  return <><Preview><div className="docs-example-journal"><header><strong>Journal · DEMO-JRN-001</strong><small>22 Oct 2026</small></header><div className="docs-example-journal-head"><span>LEDGER</span><span>DEBIT ₹</span><span>CREDIT ₹</span></div>{ledgers.map(([label, detail], i) => <div className="docs-example-journal-row" key={label}><span><strong>{label}</strong><small>{detail}</small></span><Input aria-label={`${label} debit`} inputMode="decimal" value={debit[i]} onChange={(e) => setDebit((items) => items.map((v, j) => j === i ? Number(e.target.value) || 0 : v))} /><Input aria-label={`${label} credit`} inputMode="decimal" value={credit[i]} onChange={(e) => setCredit((items) => items.map((v, j) => j === i ? Number(e.target.value) || 0 : v))} /></div>)}<div className="docs-example-journal-totals"><div><small>DEBIT</small><code>{money(debitTotal)}</code></div><div><small>CREDIT</small><code>{money(creditTotal)}</code></div><div><small>DIFFERENCE</small><code className={difference ? "off" : "balanced"}>{money(difference)}</code></div></div><footer><span>{accepted ? "Journal accepted." : difference ? `Difference ₹${money(difference)} · Accept is off until balanced.` : "Balanced. Accept posts the journal."}</span><Button disabled={difference !== 0 || accepted} onClick={() => setAccepted(true)} className="docs-journal-accept">Accept <Kbd>⌃A</Kbd></Button></footer></div></Preview><ExampleCode code={'const difference = debitTotal - creditTotal;\n<Button disabled={difference !== 0} onClick={postJournal}>Accept</Button>\n<p aria-live="polite">{difference ? `Difference ₹${difference}` : "Balanced"}</p>'} /><KeyboardTable rows={[["Tab", "Move between amount fields"], ["⌃A", "Accept when balanced"]]} /><Usage good={["Recalculate debit, credit and difference as amounts change.", "Explain why Accept is unavailable."]} bad={["Allow posting when totals differ.", "Hide the difference until the user submits."]} /></>;
}
export function ComponentDocsPage({ id, onOpenSearch }: { id: string; onOpenSearch?: () => void }) {
  switch (id) {
    case "text-field": return <TextFieldPage />;
    case "combobox": return <ComboboxPage />;
    case "checkbox": return <CheckboxPage />;
    case "radio": return <RadioPage />;
    case "switch": return <SwitchPage />;
    case "badge": return <BadgePage />;
    case "data-table": return <DataTablePage />;
    case "tabs": return <TabsPage />;
    case "sidebar": return <SidebarPage />;
    case "document-stepper": return <DocumentStepperPage />;
    case "key-bar": return <KeyBarPage />;
    case "alert": return <AlertPage />;
    case "toast": return <ToastPage />;
    case "dialog": return <DialogPage />;
    case "sheet": return <SheetPage />;
    case "menu": return <MenuPage />;
    case "command": return <CommandPage onOpenSearch={onOpenSearch} />;
    case "balanced-entry": return <BalancedEntryPage />;
    default: return null;
  }
}
