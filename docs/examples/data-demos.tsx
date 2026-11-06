/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState } from "react";
import * as UX from "@clidey/ux";
import { Demo, Status } from "./demo-shell";
const projects = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  name:
    ["Studio foundations", "Developer portal", "Product launch"][i % 3] +
    " " +
    String(i + 1).padStart(2, "0"),
  status: i % 3 === 0 ? "In review" : "In progress",
  progress: Math.min(98, 24 + i * 2),
}));
export function TablePreview() {
  const [query, setQuery] = useState("");
  const [ascending, setAscending] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);
  const rows = projects
    .filter((x) => x.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
  return (
    <Demo hint="Filter, sort, select a row, and scroll the automatically windowed table.">
      <div className="ux-demo-row">
        <UX.SearchInput
          aria-label="Filter demo projects"
          placeholder="Find a project…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <UX.Button variant="outline" onClick={() => setAscending(!ascending)}>
          Name {ascending ? "A–Z" : "Z–A"}
        </UX.Button>
      </div>
      <UX.Table maxHeight={260}>
        <UX.TableHeader>
          <UX.TableHeadRow>
            <UX.TableHead>Project</UX.TableHead>
            <UX.TableHead>Status</UX.TableHead>
            <UX.TableHead>Progress</UX.TableHead>
            <UX.TableHead>Action</UX.TableHead>
          </UX.TableHeadRow>
        </UX.TableHeader>
        <UX.TableBody>
          {rows.map((row) => (
            <UX.TableRow key={row.id} data-state={selected === row.id ? "selected" : undefined}>
              <UX.TableCell>{row.name}</UX.TableCell>
              <UX.TableCell>
                <UX.Badge variant={row.status === "In review" ? "default" : "secondary"}>
                  {row.status}
                </UX.Badge>
              </UX.TableCell>
              <UX.TableCell>{row.progress}%</UX.TableCell>
              <UX.TableCell>
                <UX.Button size="sm" variant="ghost" onClick={() => setSelected(row.id)}>
                  Inspect
                </UX.Button>
              </UX.TableCell>
            </UX.TableRow>
          ))}
        </UX.TableBody>
      </UX.Table>
      {!rows.length && <p>No matching projects. Clear the search to see them again.</p>}
      <Status>
        {rows.length} projects{selected ? " · Inspecting project " + selected : ""}
      </Status>
    </Demo>
  );
}
const files: UX.TreeDataItem[] = [
  {
    id: "workspace",
    name: "Workspace",
    children: [
      {
        id: "design",
        name: "Design",
        children: [
          { id: "tokens", name: "tokens.css" },
          { id: "components", name: "components.tsx" },
        ],
      },
      {
        id: "notes",
        name: "Notes",
        children: [
          { id: "readme", name: "README.md" },
          { id: "roadmap", name: "roadmap.md" },
        ],
      },
    ],
  },
];
export function TreePreview() {
  const [expanded, setExpanded] = useState(["workspace", "design"]);
  const [selected, setSelected] = useState("tokens.css");
  return (
    <Demo hint="Expand folders, choose a file, or collapse the whole tree.">
      <div className="ux-demo-tree">
        <UX.Tree
          data={files}
          expandedIds={expanded}
          onExpandChange={setExpanded}
          initialSelectedItemId="tokens"
          onSelectChange={(item) => setSelected(item?.name ?? "Nothing selected")}
        />
      </div>
      <div className="ux-demo-row">
        <UX.Button variant="outline" onClick={() => setExpanded(["workspace", "design", "notes"])}>
          Expand all
        </UX.Button>
        <UX.Button variant="ghost" onClick={() => setExpanded([])}>
          Collapse all
        </UX.Button>
      </div>
      <Status>Selected: {selected}</Status>
    </Demo>
  );
}
