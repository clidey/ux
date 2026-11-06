/*
 * Copyright 2026 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at https://www.apache.org/licenses/LICENSE-2.0
 */
import { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ThemeProvider,
  useTheme,
  themes,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Progress,
  Input,
  Label,
  Switch,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
  Table,
  TableHeader,
  TableHeadRow,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  CatalogIcon,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@clidey/ux";
import "../../src/index.css";
import "../../src/brand.css";
import "../../themes/fonts.css";
import "./style.css";

const params = new URLSearchParams(location.search);
const initialPalette = params.get("palette") ?? "paper-ink";
const initialMode = params.get("mode") === "light" ? "light" : "dark";
const iconNames = [
  "app",
  "search",
  "settings",
  "home",
  "download",
  "upload",
  "arrow-right",
  "arrow-up-right",
  "check",
  "close",
  "plus",
  "minus",
  "folder",
  "file",
  "copy",
  "edit",
  "calendar",
  "mail",
  "bell",
  "user",
  "lock",
  "globe",
  "code",
  "terminal",
  "chart",
  "table",
  "filter",
  "star",
  "bookmark",
  "link",
  "cloud",
  "clock",
];
const projects = [
  {
    name: "Brand foundations",
    detail: "Identity · Design systems",
    status: "In progress",
    progress: 76,
    people: "AK",
  },
  {
    name: "Workspace experience",
    detail: "Product · Interface",
    status: "In review",
    progress: 92,
    people: "JL",
  },
  {
    name: "Developer portal",
    detail: "Engineering · Documentation",
    status: "In progress",
    progress: 48,
    people: "MR",
  },
];
function Icon({ name, size = 18 }: { name: string; size?: number }) {
  return <CatalogIcon name={name} size={size} />;
}
function Workspace() {
  const { palette, setPalette, theme, setTheme } = useTheme();
  const [view, setView] = useState(params.get("view") ?? "overview");
  const [dialog, setDialog] = useState(params.get("view") === "dialog");
  const [name, setName] = useState("Studio workspace");
  const [notify, setNotify] = useState(true);
  const [saved, setSaved] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [filter, setFilter] = useState("");
  const [projectTab, setProjectTab] = useState("active");
  const visibleProjects = projects.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) &&
      (projectTab === "active" || item.status === "In review"),
  );
  return (
    <TooltipProvider>
      <div className="preview-stage">
        <div className="workspace">
          <aside className="workspace-nav">
            <a
              className="workspace-brand"
              href="https://github.com/clidey/ux"
              aria-label="Clidey UX repository"
            >
              <span className="brand-mark">
                <Icon name="app" size={24} />
              </span>
              <span>
                clidey<span className="brand-dot">.</span>
              </span>
            </a>
            <div className="workspace-switch">
              <span className="avatar">S</span>
              <span>
                <strong>Studio workspace</strong>
                <small>Team plan</small>
              </span>
              <Icon name="chevron-down" size={14} />
            </div>
            <p className="nav-caption">WORKSPACE</p>
            {(
              [
                ["overview", "home", "Overview"],
                ["projects", "folder", "Projects"],
                ["settings", "settings", "Settings"],
                ["icons", "grid", "Icon library"],
              ] as const
            ).map(([id, icon, title]) => (
              <Button
                key={id}
                variant="ghost"
                className={
                  "nav-item " +
                  (view === id || (view === "dialog" && id === "overview") ? "nav-active" : "")
                }
                onClick={() => {
                  setView(id);
                  setFilter("");
                }}
              >
                <Icon name={icon} />
                {title}
                {id === "projects" && <span className="nav-count">3</span>}
              </Button>
            ))}
            <div className="nav-bottom">
              <div className="team-presence">
                <span className="presence-dot" />
                All systems in sync
              </div>
              <div className="workspace-person">
                <span className="avatar person">AC</span>
                <span>
                  <strong>Alex Chen</strong>
                  <small>Personal account</small>
                </span>
              </div>
            </div>
          </aside>
          <div className="workspace-main">
            <header className="workspace-topbar">
              <span className="breadcrumb">
                Workspace <span>/</span>{" "}
                <strong>
                  {view === "icons"
                    ? "Icon library"
                    : view === "settings"
                      ? "Settings"
                      : view === "projects"
                        ? "Projects"
                        : "Overview"}
                </strong>
              </span>
              <div className="topbar-actions">
                <Select value={palette ?? "paper-ink"} onValueChange={setPalette}>
                  <SelectTrigger className="palette-picker" aria-label="Palette">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((item) => (
                      <SelectItem value={item.id} key={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={theme === "dark" ? "Use light mode" : "Use dark mode"}
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                      <Icon name={theme === "dark" ? "sun" : "moon"} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Switch color mode</TooltipContent>
                </Tooltip>
              </div>
            </header>
            <main className="workspace-content">
              <div className="page-heading">
                <div>
                  <p className="eyebrow">YOUR SPACE TO BUILD</p>
                  <h1>
                    {view === "icons"
                      ? "A shared visual language."
                      : view === "settings"
                        ? "Make yourself at home."
                        : view === "projects"
                          ? "Move the work forward."
                          : "Good work starts here."}
                  </h1>
                  <p className="page-description">
                    {view === "icons"
                      ? "One catalog. Every surface. Always in character."
                      : view === "settings"
                        ? "A few thoughtful defaults for your team."
                        : "A little clarity for everything your team is creating."}
                  </p>
                </div>
                {view !== "settings" && (
                  <Button onClick={() => setDialog(true)}>
                    <Icon name="plus" size={16} /> Invite teammate
                  </Button>
                )}
              </div>
              {view === "icons" ? (
                <Card>
                  <CardHeader>
                    <CardTitle>The icon collection</CardTitle>
                    <CardDescription>
                      Catalog icons inherit the active theme’s text color.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="icon-grid">
                      {iconNames.map((icon) => (
                        <div className="icon-tile" key={icon}>
                          <Icon name={icon} size={25} />
                          <span>{icon}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : view === "settings" ? (
                <form
                  className="settings-grid"
                  onChange={() => setSaved(false)}
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSaved(true);
                  }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Workspace details</CardTitle>
                      <CardDescription>
                        A familiar place for your people and projects.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="form-fields">
                      <div>
                        <Label htmlFor="name">Workspace name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(event) => {
                            setName(event.target.value);
                            setSaved(false);
                          }}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Contact email</Label>
                        <Input id="email" type="email" defaultValue="hello@example.com" required />
                      </div>
                      <div>
                        <Label htmlFor="region">Region</Label>
                        <Select defaultValue="europe" onValueChange={() => setSaved(false)}>
                          <SelectTrigger id="region">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="americas">Americas</SelectItem>
                            <SelectItem value="asia">Asia Pacific</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="setting-row">
                        <div>
                          <Label htmlFor="notify">Keep me in the loop</Label>
                          <p>Send a weekly summary of workspace activity.</p>
                        </div>
                        <Switch
                          id="notify"
                          checked={notify}
                          onCheckedChange={(checked) => {
                            setNotify(checked);
                            setSaved(false);
                          }}
                        />
                      </div>
                      <div className="save-row">
                        <Button type="submit">Save changes</Button>
                        <span role="status">
                          {saved ? "Saved in this demo." : "Changes stay in this example."}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="settings-aside">
                    <CardHeader>
                      <span className="feature-icon">
                        <Icon name="settings" size={22} />
                      </span>
                      <CardTitle>Feels like your product.</CardTitle>
                      <CardDescription>
                        Shared components. Consistent interactions. A theme that ties it all
                        together.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline">30 complete palettes</Badge>
                      <p className="aside-note">
                        Try the palette picker above. This entire workspace follows along.
                      </p>
                    </CardContent>
                  </Card>
                </form>
              ) : (
                <>
                  <div className="metric-grid">
                    {[
                      ["Active projects", "12", "+2 this month", "folder"],
                      ["Team momentum", "86%", "A productive week", "chart"],
                      ["Tasks completed", "148", "+24 since Monday", "check"],
                    ].map(([label, value, detail, icon]) => (
                      <Card className="metric" key={label}>
                        <CardContent>
                          <div className="metric-label">
                            {label}
                            <Icon name={icon} size={18} />
                          </div>
                          <div className="metric-value">{value}</div>
                          <div className="metric-detail">
                            <span className="presence-dot" />
                            {detail}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="project-toolbar">
                    <div>
                      <h2>Projects in motion</h2>
                      <p>Small steps. Meaningful progress.</p>
                    </div>
                    <div className="project-tools">
                      <Input
                        type="search"
                        aria-label="Filter projects"
                        placeholder="Find a project…"
                        value={filter}
                        onChange={(event) => setFilter(event.target.value)}
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="outline" size="icon" aria-label="Project actions">
                            <Icon name="more" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onSelect={() => {
                              setProjectTab("active");
                              setFilter("");
                            }}
                          >
                            Show all active projects
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => setProjectTab("review")}>
                            Show projects in review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <Tabs className="project-tabs" value={projectTab} onValueChange={setProjectTab}>
                    <TabsList>
                      <TabsTrigger value="active">Active projects</TabsTrigger>
                      <TabsTrigger value="review">In review</TabsTrigger>
                    </TabsList>
                    <TabsContent value={projectTab} key={projectTab}>
                      <div className="project-table">
                        <Table>
                          <TableHeader>
                            <TableHeadRow>
                              <TableHead>Project</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Progress</TableHead>
                              <TableHead>Lead</TableHead>
                            </TableHeadRow>
                          </TableHeader>
                          <TableBody>
                            {visibleProjects.map((project) => (
                              <TableRow key={project.name}>
                                <TableCell>
                                  <div className="project-name">
                                    <span className="project-symbol">
                                      <Icon name="folder" />
                                    </span>
                                    <span>
                                      <strong>{project.name}</strong>
                                      <small>{project.detail}</small>
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    variant={
                                      project.status === "In review" ? "default" : "secondary"
                                    }
                                  >
                                    {project.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="project-progress">
                                    <Progress
                                      value={project.progress}
                                      aria-label={project.name + " completion"}
                                    />
                                    <span>{project.progress}%</span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <span className="avatar small">{project.people}</span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        {!visibleProjects.length && (
                          <p className="empty-results">
                            No projects match. Try a different search.
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div className="workspace-note">
                    <span className="feature-icon">
                      <Icon name="star" size={20} />
                    </span>
                    <div>
                      <strong>One system. Every detail.</strong>
                      <p>
                        Components, icons, and themes that make the whole experience feel connected.
                      </p>
                    </div>
                    <Badge variant="outline">Built with Clidey UX</Badge>
                  </div>
                </>
              )}
            </main>
            <footer className="workspace-footer">
              <span>
                CLIDEY UX <span> / </span> COMPONENT WORKSPACE
              </span>
              <span>Fictional data. Real components.</span>
            </footer>
          </div>
        </div>
      </div>
      <Dialog open={dialog} onOpenChange={setDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Good work is better together.</DialogTitle>
            <DialogDescription>Invite someone to create with your team.</DialogDescription>
          </DialogHeader>
          <form
            className="invite-form"
            onSubmit={(event) => {
              event.preventDefault();
              setInviteSent(true);
            }}
          >
            <Label htmlFor="invite-email">Email address</Label>
            <Input id="invite-email" placeholder="teammate@example.com" type="email" required />
            <p className="invite-note">This is a local example. No email will be sent.</p>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {inviteSent ? "Invitation prepared" : "Prepare invitation"}
              </Button>
            </DialogFooter>
            {inviteSent && (
              <p role="status">Ready to connect your application’s invitation flow.</p>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
createRoot(document.getElementById("root")!).render(
  <ThemeProvider
    defaultPalette={initialPalette}
    defaultTheme={initialMode}
    storageKey="ux-example-mode"
    paletteStorageKey="ux-example-palette"
  >
    <Workspace />
  </ThemeProvider>,
);
