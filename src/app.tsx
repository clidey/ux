/*
 * Copyright 2025 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { icons } from "../icons";
import { Button, Toaster, useTheme, themes, getThemeById } from "@clidey/ux";
import { ComponentDocsPage } from "./docs-component-pages";
import { CodeSyntax } from "./docs-code-syntax";
import { ExtraComponentDocsPage, extraComponentPages } from "./docs-extra-pages";
import { DocsNotFound, NotFoundDocsPage } from "./docs-not-found";
import { PatternDocsPage, patternPages } from "./docs-pattern-pages";
import "./docs.css";
import clideyMark from "./assets/clidey-mark.webp";

type Page = {
  id: string;
  title: string;
  group: string;
  icon: string;
  description?: string;
  showcase?: string;
};
const iconCatalog = Object.entries(icons).map(([name, url]) => ({ name, url }));
const palettePreviews = Object.fromEntries(
  themes.map((theme) => {
    const token = (name: string) => theme.css.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1]?.trim();
    return [theme.id, {
      background: token("background") ?? "#142240",
      card: token("card") ?? "#1c2c4b",
      primary: token("primary") ?? "#4787f3",
    }];
  }),
);
function DocsIcon({ name, size = 16 }: { name: string; size?: number }) {
  const url = icons[name];
  return <span className="docs-custom-icon" aria-hidden="true" style={{ width: size, height: size, maskImage: `url("${url}")`, WebkitMaskImage: `url("${url}")` }} />;
}
const pages: Page[] = [
  {
    id: "overview",
    title: "Overview",
    group: "Get started",
    icon: "book",
    description:
      "Clidey Design is a shared component library and design system for React applications. These docs are built with the same components they describe.",
  },
  {
    id: "installation",
    title: "Installation",
    group: "Get started",
    icon: "download",
    description:
      "Add the package, import two stylesheets in order, and wrap the app in the provider.",
  },
  {
    id: "theming",
    title: "Theming",
    group: "Get started",
    icon: "settings",
    description:
      "Mode and palette live on the document root. Every component reads semantic tokens, so switching either one updates the whole app.",
  },
  {
    id: "color",
    title: "Color",
    group: "Foundations",
    icon: "settings",
    description:
      "Semantic tokens for surfaces, text, accents, status and charts. Values below are live for the current mode and palette.",
  },
  {
    id: "typography",
    title: "Typography",
    group: "Foundations",
    icon: "type",
    description:
      "A clear type scale for display, headings, body copy, labels, and the numbers users compare.",
  },
  {
    id: "iconography",
    title: "Iconography",
    group: "Foundations",
    icon: "ai",
    description:
      "A consistent line icon set. Icons inherit text color; tiles and empty states use the icon token.",
  },
  {
    id: "space",
    title: "Space, shape, motion",
    group: "Foundations",
    icon: "layout",
    description:
      "A 4px spacing grid, practical radii, surface elevation, and three motion durations.",
  },
  {
    id: "palettes",
    title: "Theme palettes",
    group: "Foundations",
    icon: "settings",
    description:
      "Thirty palettes for Clidey Design. Choose a palette to preview this entire site.",
  },
  {
    id: "button",
    title: "Button",
    group: "Components",
    icon: "button",
    description:
      "Runs an action. Use one primary action per view; show shortcuts when an action maps to a key.",
    showcase: "buttons",
  },
  {
    id: "text-field",
    title: "Text field",
    group: "Components",
    icon: "edit",
    description: "Label above, help or error below. Amounts are mono, right-aligned and formatted to the locale on blur.",
    showcase: "forms",
  },
  {
    id: "combobox",
    title: "Combobox",
    group: "Components",
    icon: "search",
    description: "Search-as-you-type picker for ledgers, parties and items. Each row shows the context needed to choose: balance, credit left, stock.",
    showcase: "forms",
  },
  { id: "checkbox", title: "Checkbox", group: "Components", icon: "checkbox", description: "Select one or more independent options.", showcase: "forms" },
  { id: "radio", title: "Radio", group: "Components", icon: "circle", description: "Choose exactly one option from a short visible group.", showcase: "forms" },
  { id: "switch", title: "Switch", group: "Components", icon: "toggle", description: "Turn a setting on or off with an immediate effect.", showcase: "forms" },
  {
    id: "badge",
    title: "Badge",
    group: "Components",
    icon: "badge",
    description: "Status as a word plus a shape. Color is never the only signal.",
    showcase: "feedback",
  },
  {
    id: "data-table",
    title: "Data table",
    group: "Components",
    icon: "table",
    description: "The main data surface. Right-aligned numbers, selection, totals and keyboard navigation.",
    showcase: "data",
  },
  {
    id: "tabs",
    title: "Tabs",
    group: "Components",
    icon: "tabs",
    description: "Underline tabs switch sections of one record. Segmented controls switch the view of the same data.",
    showcase: "navigation",
  },
  {
    id: "sidebar",
    title: "Sidebar",
    group: "Components",
    icon: "sidebar",
    description: "App chrome stays dark while the content canvas carries the theme. Groups are small and labelled; the menu can collapse to a rail.",
    showcase: "navigation",
  },
  {
    id: "document-stepper",
    title: "Document stepper",
    group: "Components",
    icon: "arrow-right",
    description: "Show linked documents so each step starts from the previous one: quotation, order, delivery and invoice.",
    showcase: "navigation",
  },
  {
    id: "key-bar",
    title: "Key bar",
    group: "Components",
    icon: "input",
    description: "List the actions and shortcuts available on the current screen.",
    showcase: "buttons",
  },
  {
    id: "alert",
    title: "Alert",
    group: "Components",
    icon: "info",
    description: "Place a clear status message beside the section it affects.",
    showcase: "feedback",
  },
  {
    id: "toast",
    title: "Toast",
    group: "Components",
    icon: "toast",
    description: "Confirm a completed action with brief, dismissible feedback.",
    showcase: "feedback",
  },
  {
    id: "dialog",
    title: "Dialog",
    group: "Components",
    icon: "dialog",
    description: "Interrupt for a decision and explain the consequence before confirming.",
    showcase: "overlays",
  },
  {
    id: "sheet",
    title: "Sheet",
    group: "Components",
    icon: "drawer",
    description: "Inspect or edit a record while keeping the list in place behind it.",
    showcase: "overlays",
  },
  {
    id: "menu",
    title: "Menu",
    group: "Components",
    icon: "more",
    description: "Keep row and object actions together, with destructive actions separated at the end.",
    showcase: "overlays",
  },
  {
    id: "command",
    title: "Command palette",
    group: "Components",
    icon: "terminal",
    description: "Find pages and actions from anywhere with ⌘K.",
    showcase: "data",
  },
  ...extraComponentPages.map((item) => ({ ...item, group: "Components" })),
  { id: "404-page", title: "404 page", group: "Components", icon: "warning", description: "An animated fallback page featuring the Clidey Design character. Preview its loop, once, and still states." },
  {
    id: "balanced-entry",
    title: "Balanced entry",
    group: "Patterns",
    icon: "book",
    description: "Keep debit, credit and difference live, and explain why Accept is unavailable until the journal balances.",
    showcase: "data",
  },
  ...patternPages.map((item) => ({ ...item, group: "Patterns" })),
];
const showcaseLoaders: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  buttons: lazy(() =>
    import("./showcases/buttons-showcase").then((m) => ({ default: m.ButtonsShowcase })),
  ),
  forms: lazy(() =>
    import("./showcases/forms-showcase").then((m) => ({ default: m.FormsShowcase })),
  ),
  navigation: lazy(() =>
    import("./showcases/navigation-showcase").then((m) => ({ default: m.NavigationShowcase })),
  ),
  overlays: lazy(() =>
    import("./showcases/overlays-showcase").then((m) => ({ default: m.OverlaysShowcase })),
  ),
  feedback: lazy(() =>
    import("./showcases/feedback-showcase").then((m) => ({ default: m.FeedbackShowcase })),
  ),
  data: lazy(() => import("./showcases/data-showcase").then((m) => ({ default: m.DataShowcase }))),
};
const tokenGroups = [
  {
    label: "Surfaces · lightness only",
    tokens: ["background", "card", "popover", "muted", "border", "sidebar"],
  },
  {
    label: "Text & interaction",
    tokens: ["foreground", "muted-foreground", "accent", "accent-hover", "selection", "ring"],
  },
  {
    label: "Accents",
    tokens: ["primary", "primary-hover", "brand", "brand-readable", "highlight", "icon"],
  },
  { label: "Functional", tokens: ["destructive", "success", "success-muted", "warning"] },
  {
    label: "Charts",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-highlight"],
  },
];
function getInitialPage() {
  const id = location.hash.slice(1);
  if (!id && location.pathname === "/") return "overview";
  return pages.some((p) => p.id === id) ? id : "404";
}
function copy(value: string) {
  void navigator.clipboard.writeText(value);
}
function CodeBlock({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="docs-code">
      <div className="docs-code-head">
        <span>{label}</span>
        <button
          onClick={() => {
            copy(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
        >
          <DocsIcon name={copied ? "check" : "copy"} size={14} /> {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre><CodeSyntax code={code} language={label === "shell" ? "bash" : label === "css" ? "css" : "tsx"} /></pre>
    </div>
  );
}
function Intro({ page }: { page: Page }) {
  return (
    <div className="docs-intro">
      <div className="docs-eyebrow">
        {page.group.toUpperCase()}{" "}
        {page.group === "Components" && <span className="docs-stable">Stable</span>}
      </div>
      <h1>{page.title}</h1>
      <p>{page.description}</p>
    </div>
  );
}
function Overview({ go }: { go: (id: string) => void }) {
  const cards: [string, string, string, string][] = [
    ["installation", "Install", "Two imports and a provider.", "download"],
    ["theming", "Theme", "Light, dark, and thirty palettes.", "settings"],
    ["color", "Tokens", "Every color is a semantic token.", "settings"],
    ["iconography", "Icons", "A consistent line icon set.", "ai"],
    ["data-table", "Data table", "The core ERP surface.", "table"],
    ["dialog", "Overlays", "Sheet, dialog, and menu.", "drawer"],
  ];
  return (
    <>
      <div className="docs-card-grid">
        {cards.map(([id, title, description, icon]) => (
          <button className="docs-card" key={id} onClick={() => go(id)}>
            <span className="docs-card-icon">
              <DocsIcon name={icon} size={20} />
            </span>
            <strong>{title}</strong>
            <span>{description}</span>
          </button>
        ))}
      </div>
      <h2>ERP principles</h2>
      <div className="docs-principles">
        {[
          ["01", "Keyboard first", "Every action has a key. The key bar shows what the current screen accepts.", "key-bar"],
          [
            "02",
            "Context where you pick",
            "Ledger, party and item pickers show balances, credit limits and stock before you commit.",
            "combobox",
          ],
          ["03", "Always balanced", "Totals and differences stay live. Accept is disabled until the document balances, and the screen says why.", "balanced-entry"],
          [
            "04",
            "Flows, not forms",
            "Quotation, order, delivery and invoice link up, so each step starts from the previous document.",
            "document-stepper",
          ],
        ].map(([n, title, body, id]) => (
          <button key={n} className="docs-principle" onClick={() => go(id)}>
            <span>{n}</span>
            <strong>{title}</strong>
            <p>{body}</p>
            <em>{pages.find((p) => p.id === id)?.title} →</em>
          </button>
        ))}
      </div>
      <h2>Explore patterns</h2>
      <div className="docs-card-grid">{patternPages.slice(0, 6).map(pattern => <button className="docs-card" key={pattern.id} onClick={() => go(pattern.id)}><span className="docs-card-icon"><DocsIcon name={pattern.icon} size={20} /></span><strong>{pattern.title}</strong><span>{pattern.description}</span></button>)}</div>
      <h2>Used by</h2>
      <div className="docs-card-grid">
        <div className="docs-card">
          <strong>WhoDB</strong>
          <span>Data and application surfaces</span>
        </div>
        <div className="docs-card">
          <strong>Dory</strong>
          <span>Documentation and guides</span>
        </div>
        <div className="docs-card">
          <strong>Sandbox</strong>
          <span>Themeable app builder</span>
        </div>
      </div>
    </>
  );
}
function Installation() {
  return (
    <div className="docs-stack">
      <section>
        <h3>1 · Add the package</h3>
        <CodeBlock label="shell" code={"pnpm add @clidey/ux"} />
      </section>
      <section>
        <h3>2 · Import styles (order matters)</h3>
        <CodeBlock
          label="tsx · main.tsx"
          code={
            'import "@clidey/ux/styles.css";\nimport "@clidey/ux/brand.css"; // after styles, outside Tailwind layers'
          }
        />
      </section>
      <section>
        <h3>3 · Provide theme and palette</h3>
        <CodeBlock
          label="tsx · App.tsx"
          code={
            'import { ThemeProvider } from "@clidey/ux";\n\nexport function App() {\n  return <ThemeProvider defaultTheme="system" defaultPalette="paper-ink">\n    <YourApp />\n  </ThemeProvider>;\n}'
          }
        />
      </section>
    </div>
  );
}
function Theming() {
  return (
    <>
      <div className="docs-card-grid">
        {[
          [":root", "Paper · light", "Default product colors."],
          [".dark", "Ink · dark", "Deep surfaces, lifted accents."],
          [".theme-*", "Palette", "Thirty choices shared with sandbox."],
        ].map(([a, b, c]) => (
          <div className="docs-card" key={a}>
            <span className="docs-mono docs-blue">{a}</span>
            <strong>{b}</strong>
            <span>{c}</span>
          </div>
        ))}
      </div>
      <h2>The rules</h2>
      <div className="docs-rules">
        {[
          "Use semantic tokens for every component.",
          "Keep text contrast readable in both modes.",
          "Use a single primary accent per surface.",
          "Show hover, active, focus, and disabled states.",
          "Use surface color to show elevation in dark mode.",
          "Respect reduced motion.",
        ].map((rule, i) => (
          <div key={rule}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {rule}
          </div>
        ))}
      </div>
      <h3>Switch mode and palette</h3>
      <CodeBlock
        label="tsx"
        code={
          'const { theme, setTheme, palette, setPalette } = useTheme();\nsetTheme("dark");\nsetPalette("midnight-noir");'
        }
      />
      <h3>Read tokens in your CSS</h3>
      <CodeBlock
        label="css"
        code={
          ".my-panel {\n  background: var(--card);\n  color: var(--card-foreground);\n  border: 1px solid var(--border);\n}"
        }
      />
    </>
  );
}
function Color() {
  const [copied, setCopied] = useState("");
  const [tokenValues, setTokenValues] = useState<Record<string, string>>({});
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const style = getComputedStyle(document.documentElement);
        setTokenValues(Object.fromEntries(tokenGroups.flatMap((group) => group.tokens).map((token) => [token, style.getPropertyValue(`--${token}`).trim()])));
      });
    };
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });
    update();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);
  return (
    <>
      {tokenGroups.map((group) => (
        <section className="docs-token-group" key={group.label}>
          <div className="docs-eyebrow">{group.label.toUpperCase()}</div>
          <div className="docs-swatches">
            {group.tokens.map((token) => (
              <button
                className="docs-swatch"
                key={token}
                onClick={() => {
                  copy(`var(--${token})`);
                  setCopied(token);
                }}
                title={`Copy var(--${token})`}
              >
                <span className="docs-swatch-color" style={{ background: `var(--${token})` }}>
                  {copied === token ? "Copied" : ""}
                </span>
                <strong>--{token}</strong>
                <small>{tokenValues[token]}</small>
              </button>
            ))}
          </div>
        </section>
      ))}
      <p className="docs-hint">
        Click a swatch to copy its CSS variable. Switch mode or palette in the top bar to see other
        values.
      </p>
    </>
  );
}
function Typography() {
  const rows = [
    ["display", "Books that balance"],
    ["h1", "Sales register"],
    ["h2", "Outstanding receivables"],
    ["h3", "Voucher DEMO/0001"],
    ["h4", "Party details"],
    ["body-lg", "Pickers show the balance before you commit."],
    ["body", "Demo Customer A has 6 overdue bills totalling ₹5,000."],
    ["small", "Last posted 11:42 by Priya Shah"],
    ["eyebrow", "BOOKS · VOUCHERS · SALES"],
    ["data", "₹ 1,180.00  Dr  DEMO/0001"],
  ];
  return (
    <div className="docs-type-scale">
      {rows.map(([key, value]) => (
        <div className="docs-type-row" key={key}>
          <div className="docs-mono">{key}</div>
          <div className={`docs-type-${key}`}>{value}</div>
        </div>
      ))}
    </div>
  );
}
function Iconography() {
  const [query, setQuery] = useState("");
  const shown = iconCatalog.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <div className="docs-inline-code">
        import {"{ icons }"} from <b>&quot;@clidey/ux/icons&quot;</b>{" "}
        <button onClick={() => copy('import { icons } from "@clidey/ux/icons"')}>Copy</button>
      </div>
      <div className="docs-icon-search">
        <DocsIcon name="search" size={16} />
        <input
          placeholder={`Search ${iconCatalog.length} icons`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <section>
            <div className="docs-icons">
              {shown.map(({ name, url }) => (
                <button key={name} onClick={() => copy(name)} title={`Copy ${name}`}>
                  <span className="docs-custom-icon" aria-hidden="true" style={{ width: 20, height: 20, maskImage: `url("${url}")`, WebkitMaskImage: `url("${url}")` }} />
                  <span>{name}</span>
                </button>
              ))}
            </div>
          </section>
      <CodeBlock
        label="tsx · Vite"
        code={'import { icons } from "@clidey/ux/icons";\n\n<img src={icons.search} alt="" width={16} height={16} />'}
      />
    </>
  );
}
function Space() {
  return (
    <>
      <div className="docs-space-grid">
        <section>
          <h2>Spacing</h2>
          {[4, 8, 12, 16, 24, 32, 48, 64].map((px, i) => (
            <div className="docs-space-row" key={px}>
              <span>space-{[1, 2, 3, 4, 6, 8, 12, 16][i]}</span>
              <i style={{ width: px * 3 }} />
              <small>{px}px</small>
            </div>
          ))}
        </section>
        <section>
          <h2>Radius</h2>
          <div className="docs-radius">
            {[4, 6, 8, 10, 14].map((n) => (
              <div key={n}>
                <i style={{ borderRadius: n }} />
                <small>{n}px</small>
              </div>
            ))}
          </div>
          <h2>Elevation</h2>
          <div className="docs-elevation">
            <div>0 · background</div>
            <div>1 · card</div>
            <div>2 · popover</div>
          </div>
        </section>
      </div>
      <h2>Motion</h2>
      <div className="docs-card-grid">
        {[
          ["120ms", "Hover, press, toggle"],
          ["180ms", "Menu, popover, rail"],
          ["240ms", "Sheet, dialog"],
        ].map(([a, b]) => (
          <div className="docs-card" key={a}>
            <strong className="docs-mono">{a}</strong>
            <span>{b}</span>
          </div>
        ))}
      </div>
    </>
  );
}
function Palettes() {
  const { palette, setPalette } = useTheme();
  return (
    <div className="docs-palette-grid">
      {themes.map((t) => (
        <button
          className={`docs-palette ${palette === t.id ? "selected" : ""}`}
          key={t.id}
          onClick={() => setPalette(t.id)}
        >
          <span className="docs-palette-preview">
            <i style={{ background: palettePreviews[t.id].background }} />
            <i style={{ background: palettePreviews[t.id].card }} />
            <i style={{ background: palettePreviews[t.id].primary }} />
          </span>
          <span>
            <strong>{t.name}</strong>
            <small>{t.description}</small>
          </span>
        </button>
      ))}
    </div>
  );
}
function ButtonPage() {
  const { palette, theme } = useTheme();
  const [variant, setVariant] = useState<
    "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"
  >("primary");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [state, setState] = useState<"idle" | "loading" | "disabled">("idle");
  const [extra, setExtra] = useState<"none" | "icon" | "shortcut">("icon");
  const code = `${extra === "icon" ? 'import { icons } from "@clidey/ux/icons";\n\n' : ""}<Button${variant === "primary" ? "" : ` variant="${variant}"`}${size === "md" ? "" : ` size="${size}"`}${state === "loading" ? " loading" : state === "disabled" ? " disabled" : ""}>${extra === "icon" ? '<img src={icons.plus} alt="" width={16} height={16} />' : ""}Post voucher${extra === "shortcut" ? "<kbd>^A</kbd>" : ""}</Button>`;
  return (
    <>
      <div className="docs-inline-code">
        import {"{ Button }"} from <b>&quot;@clidey/ux&quot;</b>{" "}
        <button onClick={() => copy('import { Button } from "@clidey/ux"')}>Copy</button>
      </div>
      <div className="docs-preview">
        <div className="docs-preview-controls">
          <span className="docs-eyebrow">PREVIEW</span>
          <div className="docs-control">
            <label>variant</label>
            {(["primary", "secondary", "outline", "ghost", "destructive", "link"] as const).map(
              (v) => (
                <button
                  key={v}
                  className={variant === v ? "active" : ""}
                  onClick={() => setVariant(v)}
                >
                  {v}
                </button>
              ),
            )}
          </div>
          <div className="docs-control">
            <label>size</label>
            {(["sm", "md", "lg"] as const).map((v) => (
              <button key={v} className={size === v ? "active" : ""} onClick={() => setSize(v)}>
                {v}
              </button>
            ))}
          </div>
          <div className="docs-control">
            <label>state</label>
            {(["idle", "loading", "disabled"] as const).map((v) => (
              <button key={v} className={state === v ? "active" : ""} onClick={() => setState(v)}>
                {v}
              </button>
            ))}
          </div>
          <div className="docs-control">
            <label>extras</label>
            {(["none", "icon", "shortcut"] as const).map((v) => (
              <button key={v} className={extra === v ? "active" : ""} onClick={() => setExtra(v)}>
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="docs-preview-stage">
          <Button
            variant={variant === "primary" ? "default" : variant}
            size={size === "md" ? "default" : size}
            disabled={state === "disabled"}
            loading={state === "loading"}
          >
            {state !== "loading" && extra === "icon" ? <DocsIcon name="plus" size={16} /> : null}
            Post voucher{extra === "shortcut" && <kbd>^A</kbd>}
          </Button>
          <span>
            {getThemeById(palette ?? "")?.name ?? "Default"} palette · {theme}{" "}
            mode
          </span>
        </div>
      </div>
      <CodeBlock label="tsx · live" code={code} />
      <h2>More examples</h2>
      <Suspense fallback={<p>Loading examples…</p>}>{<ButtonsShowcase />}</Suspense>
    </>
  );
}
const ButtonsShowcase = showcaseLoaders.buttons;
function ComponentPage({ page }: { page: Page }) {
  const Showcase = showcaseLoaders[page.showcase ?? ""];
  return (
    <>
      {Showcase ? (
        <div className="docs-legacy-showcase">
          <Suspense fallback={<p>Loading examples…</p>}>
            <Showcase />
          </Suspense>
        </div>
      ) : null}
    </>
  );
}
export default function App() {
  const [id, setId] = useState(getInitialPage);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchIndex, setSearchIndex] = useState(0);
  const { theme, setTheme, palette, setPalette } = useTheme();
  const page = pages.find((p) => p.id === id) ?? { id: "404", title: "Page not found", group: "Get started", icon: "warning" };
  const index = pages.indexOf(page);
  const filtered = useMemo(
    () => pages.filter((p) => `${p.title} ${p.group} ${p.description ?? ""}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  useEffect(() => {
    const f = () => setId(getInitialPage());
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  useEffect(() => {
    const f = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
      if (e.key === "/" && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        document.getElementById("docs-filter")?.focus();
      }
    };
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, []);
  function go(next: string) {
    window.history.pushState(null, "", `#${next}`);
    setId(next);
    setMobileOpen(false);
    setSearchOpen(false);
    document.querySelector(".docs-main-scroll")?.scrollTo(0, 0);
  }
  return (
    <div className="docs-app">
      <aside className={`docs-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="docs-logo">
          <img className="docs-mark" src={clideyMark} alt="Clidey" />
          <div>
            <strong>Clidey Design</strong>
            <small>@clidey/ux · 1.5.4</small>
          </div>
          <button
            className="docs-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <DocsIcon name="close" size={18} />
          </button>
        </div>
        <div className="docs-filter">
          <DocsIcon name="search" size={16} />
          <input
            id="docs-filter"
            placeholder="Filter docs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd>/</kbd>
        </div>
        <nav aria-label="Documentation">
          {["Get started", "Foundations", "Components", "Patterns"].map((group) => {
            const items = filtered.filter((p) => p.group === group);
            return items.length ? (
              <div className="docs-nav-group" key={group}>
                <div className="docs-nav-label">{group}</div>
                {items.map((p) => {
                  return (
                    <button
                      key={p.id}
                      className={id === p.id ? "active" : ""}
                      onClick={() => go(p.id)}
                    >
                      <DocsIcon name={p.icon} size={16} />
                      <span>{p.title}</span>
                      {p.id === "balanced-entry" && <em>BETA</em>}
                    </button>
                  );
                })}
              </div>
            ) : null;
          })}
        </nav>
        <div className="docs-sidebar-foot">
          <span>⌁ &nbsp;clidey/ux · main</span>
          <span>{pages.length} pages</span>
        </div>
      </aside>
      <div className="docs-content">
        <header className="docs-topbar">
          <div className="docs-breadcrumb">
            <button
              className="docs-menu-button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <DocsIcon name="menu" size={20} />
            </button>
            <span>{page.group}</span>
            <DocsIcon name="chevron-right" size={16} />
            <strong>{page.title}</strong>
          </div>
          <div className="docs-top-actions">
            <button
              className="docs-search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Search documentation"
            >
              <DocsIcon name="search" size={15} />
              <kbd>⌘K</kbd>
            </button>
            <SelectPrimitive.Root value={palette ?? "paper-ink"} onValueChange={setPalette}>
              <SelectPrimitive.Trigger className="docs-palette-trigger" aria-label="Theme palette">
                <SelectPrimitive.Value />
                <SelectPrimitive.Icon className="docs-palette-chevron">
                  <DocsIcon name="chevron-down" size={16} />
                </SelectPrimitive.Icon>
              </SelectPrimitive.Trigger>
              <SelectPrimitive.Portal>
                <SelectPrimitive.Content className="docs-palette-menu" position="popper" align="end" sideOffset={5}>
                  <SelectPrimitive.Viewport className="docs-palette-viewport">
                    {themes.map((t) => (
                      <SelectPrimitive.Item className="docs-palette-item" value={t.id} key={t.id}>
                        <span className="docs-palette-item-swatch" style={{ background: palettePreviews[t.id].primary }} aria-hidden="true" />
                        <SelectPrimitive.ItemText>{t.name}</SelectPrimitive.ItemText>
                        <SelectPrimitive.ItemIndicator className="docs-palette-check">
                          <DocsIcon name="check" size={15} />
                        </SelectPrimitive.ItemIndicator>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
              </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
            <div className="docs-mode">
              <button
                className={theme === "light" ? "active" : ""}
                aria-label="Light mode"
                onClick={() => setTheme("light")}
              >
                <DocsIcon name="sun" size={16} />
              </button>
              <button
                className={theme === "dark" ? "active" : ""}
                aria-label="Dark mode"
                onClick={() => setTheme("dark")}
              >
                <DocsIcon name="moon" size={16} />
              </button>
              <button
                className={theme === "system" ? "active" : ""}
                aria-label="System mode"
                onClick={() => setTheme("system")}
              >
                <DocsIcon name="monitor" size={16} />
              </button>
            </div>
          </div>
        </header>
        <main className="docs-main-scroll">
          <article className={`docs-article ${id === "404" ? "docs-article-404" : ""}`}>
            {id === "404" ? <DocsNotFound onHome={() => go("overview")} /> : <>
            <Intro page={page} />
            {id === "overview" ? (
              <Overview go={go} />
            ) : id === "installation" ? (
              <Installation />
            ) : id === "theming" ? (
              <Theming />
            ) : id === "color" ? (
              <Color />
            ) : id === "typography" ? (
              <Typography />
            ) : id === "iconography" ? (
              <Iconography />
            ) : id === "space" ? (
              <Space />
            ) : id === "palettes" ? (
              <Palettes />
            ) : id === "button" ? (
              <ButtonPage />
            ) : id === "404-page" ? (
              <NotFoundDocsPage onHome={() => go("overview")} />
            ) : patternPages.some(item => item.id === id) ? (
              <PatternDocsPage id={id} />
            ) : ["text-field", "combobox", "checkbox", "radio", "switch", "badge", "data-table", "tabs", "sidebar", "document-stepper", "key-bar", "alert", "toast", "dialog", "sheet", "menu", "command", "balanced-entry"].includes(id) ? (
              <ComponentDocsPage id={id} onOpenSearch={() => setSearchOpen(true)} />
            ) : extraComponentPages.some((item) => item.id === id) ? (
              <ExtraComponentDocsPage id={id} />
            ) : (
              <ComponentPage page={page} />
            )}
            <footer className="docs-prev-next">
              <button disabled={index === 0} onClick={() => go(pages[index - 1]?.id)}>
                <small>← Previous</small>
                <strong>{pages[index - 1]?.title}</strong>
              </button>
              <button
                disabled={index === pages.length - 1}
                onClick={() => go(pages[index + 1]?.id)}
              >
                <small>Next →</small>
                <strong>{pages[index + 1]?.title}</strong>
              </button>
            </footer>
            </>}
          </article>
        </main>
      </div>
      {searchOpen && (
        <div className="docs-search-overlay" onMouseDown={() => setSearchOpen(false)}>
          <div className="docs-search-dialog" onMouseDown={(e) => e.stopPropagation()}>
            <div>
              <DocsIcon name="search" size={18} />
              <input
                autoFocus
                placeholder="Search pages, components, tokens"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSearchIndex(0); }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") { event.preventDefault(); setSearchIndex((value) => Math.min(value + 1, filtered.length - 1)); }
                  if (event.key === "ArrowUp") { event.preventDefault(); setSearchIndex((value) => Math.max(value - 1, 0)); }
                  if (event.key === "Enter" && filtered[searchIndex]) { event.preventDefault(); go(filtered[searchIndex].id); }
                }}
              />
              <kbd>ESC</kbd>
            </div>
            <section>
              {filtered.map((p, i) => (
                <button key={p.id} className={i === searchIndex ? "active" : ""} onMouseEnter={() => setSearchIndex(i)} onClick={() => go(p.id)}>
                  <span className="docs-search-result-icon"><DocsIcon name={p.icon} size={18} /></span>
                  <span className="docs-search-result-text"><strong>{p.title}</strong><small>{p.group}{p.group === "Components" ? ` · ${p.title}` : ""}</small></span>
                  {i === searchIndex && <span className="docs-search-enter">↵</span>}
                </button>
              ))}
              {!filtered.length && <p className="docs-search-empty">No pages found.</p>}
            </section>
            <footer className="docs-search-footer">↑↓ move <span>↵ open</span> <span>Esc close</span></footer>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}
