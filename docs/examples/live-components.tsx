/* Copyright 2026 Clidey, Inc. Licensed under Apache-2.0. */
import { useState, type CSSProperties } from "react";
import {
  Button,
  Badge,
  Input,
  Label,
  Switch,
  Checkbox,
  Progress,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  CatalogIcon,
  Alert,
  AlertTitle,
  AlertDescription,
  getThemeById,
} from "@clidey/ux";
import "./live-components.css";

export function ButtonDemo() {
  const [count, setCount] = useState(0);
  const [saving, setSaving] = useState(false);
  return (
    <div className="ux-demo">
      <div className="ux-demo-row">
        <Button onClick={() => setCount((value) => value + 1)}>
          <CatalogIcon name="plus" /> Add one
        </Button>
        <Button variant="outline" onClick={() => setCount(0)}>
          Reset
        </Button>
        <Badge variant="secondary">
          <span role="status">Clicked {count} times</span>
        </Badge>
      </div>
      <div className="ux-demo-row">
        <Button
          variant="secondary"
          loading={saving}
          onClick={() => {
            setSaving(true);
            setTimeout(() => setSaving(false), 900);
          }}
        >
          {saving ? "Saving…" : "Try loading state"}
        </Button>
        <Button variant="destructive" onClick={() => setCount((value) => Math.max(0, value - 1))}>
          Remove one
        </Button>
        <Button disabled>Disabled</Button>
      </div>
      <p>These are actual UX buttons. Click them or use Tab, Enter, and Space.</p>
    </div>
  );
}

export function FormDemo() {
  const [name, setName] = useState("Studio");
  const [region, setRegion] = useState("europe");
  const [updates, setUpdates] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [saved, setSaved] = useState("");
  return (
    <form
      className="ux-demo ux-demo-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(`Saved ${name.trim()} in ${region}.`);
      }}
      onChange={() => setSaved("")}
    >
      <div>
        <Label htmlFor="demo-workspace">Workspace name</Label>
        <Input
          id="demo-workspace"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="demo-region">Region</Label>
        <Select
          value={region}
          onValueChange={(value) => {
            setRegion(value);
            setSaved("");
          }}
        >
          <SelectTrigger id="demo-region">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="europe">Europe</SelectItem>
            <SelectItem value="americas">Americas</SelectItem>
            <SelectItem value="asia">Asia Pacific</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="ux-demo-setting">
        <Label htmlFor="demo-updates">Weekly updates</Label>
        <Switch
          id="demo-updates"
          checked={updates}
          onCheckedChange={(value) => {
            setUpdates(value);
            setSaved("");
          }}
        />
      </div>
      <div className="ux-demo-row">
        <Checkbox
          id="demo-terms"
          checked={accepted}
          onCheckedChange={(value) => setAccepted(value === true)}
        />
        <Label htmlFor="demo-terms">I’m ready to create this workspace</Label>
      </div>
      <div className="ux-demo-row">
        <Button type="submit" disabled={!accepted || !name.trim()}>
          Save workspace
        </Button>
        <span role="status">{saved}</span>
      </div>
      <p>Local demo state only. No account is created and no request is sent.</p>
    </form>
  );
}

export function DialogDemo() {
  const [invited, setInvited] = useState(false);
  return (
    <div className="ux-demo">
      <Dialog>
        <DialogTrigger>
          <Button>
            <CatalogIcon name="user-plus" /> Invite teammate
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bring your team together</DialogTitle>
            <DialogDescription>
              Try the focus handling, form controls, and Escape key.
            </DialogDescription>
          </DialogHeader>
          <form
            className="ux-demo-form"
            onSubmit={(event) => {
              event.preventDefault();
              setInvited(true);
            }}
          >
            <div>
              <Label htmlFor="demo-invite">Email address</Label>
              <Input id="demo-invite" type="email" placeholder="teammate@example.com" required />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Prepare invitation</Button>
            </DialogFooter>
            {invited && <p role="status">Invitation prepared locally. No email was sent.</p>}
          </form>
        </DialogContent>
      </Dialog>
      <p>Open the dialog, tab through its fields, and press Escape to return focus.</p>
    </div>
  );
}

export function FeedbackDemo() {
  const [value, setValue] = useState(35);
  return (
    <div className="ux-demo">
      <div className="ux-demo-row">
        <Badge>In progress</Badge>
        <Badge variant="secondary">Draft</Badge>
        <Badge variant="outline">Reviewed</Badge>
      </div>
      <Label>Project progress: {value}%</Label>
      <Progress value={value} aria-label="Project progress" />
      <div className="ux-demo-row">
        <Button
          variant="outline"
          disabled={value === 0}
          onClick={() => setValue((n) => Math.max(0, n - 10))}
        >
          Decrease
        </Button>
        <Button disabled={value === 100} onClick={() => setValue((n) => Math.min(100, n + 10))}>
          Advance
        </Button>
        <Button variant="ghost" onClick={() => setValue(35)}>
          Reset
        </Button>
      </div>
      {value === 100 && (
        <Alert>
          <CatalogIcon name="check-circle" />
          <AlertTitle>All done</AlertTitle>
          <AlertDescription>The progress control reached its completed state.</AlertDescription>
        </Alert>
      )}
      <p>Change the value to see progress, disabled actions, and completion feedback.</p>
    </div>
  );
}

export function IconDemo() {
  const [selected, setSelected] = useState("search");
  const [size, setSize] = useState("24");
  const names = ["search", "home", "settings", "folder", "chart-line", "calendar", "mail", "star"];
  return (
    <div className="ux-demo">
      <div className="ux-demo-row">
        {names.map((name) => (
          <Button
            key={name}
            size="icon"
            variant={selected === name ? "secondary" : "ghost"}
            aria-label={name}
            aria-pressed={selected === name}
            onClick={() => setSelected(name)}
          >
            <CatalogIcon name={name} />
          </Button>
        ))}
      </div>
      <div className="ux-demo-row">
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger aria-label="Icon size">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["16", "24", "32", "48"].map((n) => (
              <SelectItem key={n} value={n}>
                {n} pixels
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <CatalogIcon name={selected} size={Number(size)} aria-label={selected} />
        <code>{selected}</code>
      </div>
      <p>Choose an icon and size. Artwork comes from the UX catalog.</p>
    </div>
  );
}

export function ThemeDemo() {
  const [palette, setPalette] = useState("paper-ink");
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [count, setCount] = useState(0);
  const definition = getThemeById(palette);
  const block = definition?.css.match(new RegExp(mode + "\\s*\\{([^}]+)\\}"))?.[1] ?? "";
  const tokens = Object.fromEntries(
    [...block.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]),
  );
  return (
    <div className="ux-demo">
      <div className="ux-demo-row">
        <Select value={palette} onValueChange={setPalette}>
          <SelectTrigger aria-label="Preview palette">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paper-ink">Paper &amp; Ink</SelectItem>
            <SelectItem value="midnight-noir">Midnight Noir</SelectItem>
            <SelectItem value="forest-moss">Forest Moss</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
          Use {mode === "dark" ? "light" : "dark"} preview
        </Button>
      </div>
      <div
        className={"ux-theme-preview " + mode}
        style={
          { ...tokens, colorScheme: mode, fontFamily: definition?.typography.body } as CSSProperties
        }
      >
        <div className="ux-demo-row">
          <Badge variant="outline">{definition?.name}</Badge>
          <span>{mode} mode</span>
        </div>
        <h3>Your product, in character.</h3>
        <p>The same controls and state follow the selected palette.</p>
        <div className="ux-demo-row">
          <Button onClick={() => setCount((n) => n + 1)}>Keep building</Button>
          <Button variant="outline" onClick={() => setCount(0)}>
            Reset
          </Button>
          <span role="status">{count} steps forward</span>
        </div>
      </div>
      <p>Preview tokens are scoped to this example; the documentation theme stays yours.</p>
    </div>
  );
}

export function ComponentShowcase() {
  return (
    <Tabs defaultValue="buttons" className="ux-live">
      <TabsList className="ux-live-tabs">
        <TabsTrigger value="buttons">Buttons</TabsTrigger>
        <TabsTrigger value="forms">Forms</TabsTrigger>
        <TabsTrigger value="dialogs">Dialogs</TabsTrigger>
        <TabsTrigger value="feedback">Feedback</TabsTrigger>
        <TabsTrigger value="icons">Icons</TabsTrigger>
        <TabsTrigger value="themes">Themes</TabsTrigger>
      </TabsList>
      <TabsContent value="buttons">
        <ButtonDemo />
      </TabsContent>
      <TabsContent value="forms">
        <FormDemo />
      </TabsContent>
      <TabsContent value="dialogs">
        <DialogDemo />
      </TabsContent>
      <TabsContent value="feedback">
        <FeedbackDemo />
      </TabsContent>
      <TabsContent value="icons">
        <IconDemo />
      </TabsContent>
      <TabsContent value="themes">
        <ThemeDemo />
      </TabsContent>
    </Tabs>
  );
}
