# SVG icons

All icons are available in one public catalog. Import an individual asset in a Vite app:

```tsx
import searchUrl from "@clidey/ux/icons/svg/search.svg?url";

<img src={searchUrl} alt="" />
```

Or use the complete URL map:

```tsx
import { icons } from "@clidey/ux/icons";

<img src={icons.search} alt="" />
```

The main `@clidey/ux` entry does not import these assets. Exact duplicates are shared; distinct artwork with the same name uses `-alt` suffixes.
