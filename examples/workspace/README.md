# Component workspace

A working composition of `@clidey/ux` components with fictional data and local-only actions.

```sh
pnpm install --frozen-lockfile --ignore-scripts
pnpm dev:examples
```

Open <http://127.0.0.1:3190/examples/workspace/>. The example imports the library source through the repository's Vite alias; in your own app, import `@clidey/ux/styles.css` and optionally `@clidey/ux/theme-fonts.css` instead of the source stylesheets.

- Select a palette and color mode in the header.
- Search projects and switch between active and review tabs.
- Use the project menu and invitation dialog.
- Open Settings to change and save local example state.
- Open Icon library to see named catalog artwork.

No request is sent and no invitation is delivered. Palette and mode preferences are persisted using example-specific local storage keys.

For repeatable screenshots, use a fresh browser context and query parameters: `?palette=paper-ink&mode=dark&view=overview`. Modes are `light` and `dark`; views are `overview`, `projects`, `settings`, `icons`, and `dialog`. Saved preferences take precedence over query defaults.

Capture public screenshots after fonts and images finish loading. The transparent outer stage includes the interface's shadow; do not capture a personal desktop or real customer data.
