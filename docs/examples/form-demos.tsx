/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState } from "react";
import * as UX from "@clidey/ux";
import { Demo, Status } from "./demo-shell";
export function InputPreview() {
  const [text, setText] = useState("Studio workspace");
  const [disabled, setDisabled] = useState(false);
  return (
    <Demo hint="Edit the fields, reveal the password, or disable the controls.">
      <div className="ux-demo-form">
        <div>
          <UX.Label htmlFor="preview-name">Workspace name</UX.Label>
          <UX.Input
            id="preview-name"
            value={text}
            disabled={disabled}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <UX.Label htmlFor="preview-secret">Password</UX.Label>
          <UX.Input
            id="preview-secret"
            type="password"
            defaultValue="a-demo-password"
            showPasswordToggle
            disabled={disabled}
          />
        </div>
        <div>
          <UX.Label htmlFor="preview-description">Description</UX.Label>
          <UX.TextArea
            id="preview-description"
            placeholder="A place to do your best work…"
            disabled={disabled}
          />
        </div>
        <div className="ux-demo-row">
          <UX.Switch id="preview-disable" checked={disabled} onCheckedChange={setDisabled} />
          <UX.Label htmlFor="preview-disable">Disable fields</UX.Label>
        </div>
        <Status>{text.length} characters in the workspace name</Status>
      </div>
    </Demo>
  );
}
export function LabelPreview() {
  return (
    <Demo hint="Click either label to move focus to its associated input.">
      <div className="ux-demo-form">
        <div>
          <UX.Label htmlFor="label-email">Email address</UX.Label>
          <UX.Input id="label-email" type="email" placeholder="you@example.com" />
        </div>
        <div className="ux-demo-row">
          <UX.Checkbox id="label-consent" />
          <UX.Label htmlFor="label-consent">Send me product updates</UX.Label>
        </div>
      </div>
    </Demo>
  );
}
export function CheckboxPreview() {
  const [items, setItems] = useState(["Design"]);
  const options = ["Design", "Engineering", "Product"];
  return (
    <Demo hint="Choose individual teams or use the indeterminate parent to select all.">
      <div className="ux-demo-form">
        <div className="ux-demo-row">
          <UX.Checkbox
            id="check-all"
            checked={items.length === 3 ? true : items.length ? "indeterminate" : false}
            onCheckedChange={(v) => setItems(v ? options : [])}
          />
          <UX.Label htmlFor="check-all">All teams</UX.Label>
        </div>
        <UX.Separator />
        {options.map((team) => (
          <div className="ux-demo-row" key={team}>
            <UX.Checkbox
              id={"check-" + team}
              checked={items.includes(team)}
              onCheckedChange={(v) =>
                setItems(v ? [...items, team] : items.filter((x) => x !== team))
              }
            />
            <UX.Label htmlFor={"check-" + team}>{team}</UX.Label>
          </div>
        ))}
        <Status>{items.length} teams selected</Status>
      </div>
    </Demo>
  );
}
export function SwitchPreview() {
  const [on, setOn] = useState(true);
  return (
    <Demo hint="Toggle the switch with the pointer or Space to update the setting immediately.">
      <div className="ux-demo-setting">
        <div>
          <UX.Label htmlFor="switch-sync">Background sync</UX.Label>
          <p>Keep this workspace up to date.</p>
        </div>
        <UX.Switch id="switch-sync" checked={on} onCheckedChange={setOn} />
      </div>
      <Status>Sync is {on ? "enabled" : "paused"}</Status>
    </Demo>
  );
}
export function SelectPreview() {
  const [value, setValue] = useState("monthly");
  const [search, setSearch] = useState("design");
  return (
    <Demo hint="Use arrows and Enter in the select, then try filtering the searchable picker.">
      <div className="ux-demo-form">
        <div>
          <UX.Label htmlFor="period-select">Reporting period</UX.Label>
          <UX.Select value={value} onValueChange={setValue}>
            <UX.SelectTrigger id="period-select">
              <UX.SelectValue />
            </UX.SelectTrigger>
            <UX.SelectContent>
              {["daily", "weekly", "monthly"].map((x) => (
                <UX.SelectItem key={x} value={x}>
                  {x[0].toUpperCase() + x.slice(1)}
                </UX.SelectItem>
              ))}
            </UX.SelectContent>
          </UX.Select>
        </div>
        <div>
          <UX.Label>Team</UX.Label>
          <UX.SearchSelect
            options={[
              { value: "design", label: "Design" },
              { value: "engineering", label: "Engineering" },
              { value: "product", label: "Product" },
            ]}
            value={search}
            onValueChange={setSearch}
            placeholder="Find a team"
          />
        </div>
        <Status>
          {value} report · {search}
        </Status>
      </div>
    </Demo>
  );
}
export function MultiSearchPreview() {
  const [value, setValue] = useState(["name", "status"]);
  return (
    <Demo hint="Search the options, toggle multiple values, or select all columns.">
      <div className="ux-demo-form">
        <UX.Label>Visible columns</UX.Label>
        <UX.MultiSearchSelect
          value={value}
          onValueChange={setValue}
          options={[
            { value: "name", label: "Project name" },
            { value: "owner", label: "Owner" },
            { value: "status", label: "Status" },
            { value: "updated", label: "Last updated" },
          ]}
        />
        <Status>{value.length ? value.join(", ") : "No columns selected"}</Status>
      </div>
    </Demo>
  );
}
