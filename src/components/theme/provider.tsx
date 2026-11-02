/*
 * Copyright 2025 Clidey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createContext, useContext, useEffect, useState } from "react";
import { applyTheme, getThemeById, themes } from "@/themes";

type Theme = "dark" | "light" | "system";

const THEMES: readonly Theme[] = ["dark", "light", "system"];

// localStorage is writable by any same-origin script, so the stored value is
// untrusted: anything outside the known set falls back to the default.
function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  defaultPalette?: string;
  paletteStorageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  palette: string | null;
  setPalette: (palette: string | null) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  palette: null,
  setPalette: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "@clidey/ux/theme",
  defaultPalette,
  paletteStorageKey = "@clidey/ux/palette",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    const stored = localStorage.getItem(storageKey);
    return isTheme(stored) ? stored : defaultTheme;
  });
  const [palette, setPalette] = useState<string | null>(() => {
    if (typeof window === "undefined") return defaultPalette ?? null;
    const stored = localStorage.getItem(paletteStorageKey);
    return stored && getThemeById(stored)
      ? stored
      : defaultPalette && getThemeById(defaultPalette)
        ? defaultPalette
        : null;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const resolvedTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;
    if (palette) {
      const definition = getThemeById(palette);
      if (definition) applyTheme(definition, resolvedTheme);
    } else {
      for (const { className } of themes) root.classList.remove(className);
      root.removeAttribute("data-theme");
      for (const property of ["--theme-transition-duration", "--theme-transition-easing", "--theme-font-heading", "--theme-font-body", "--theme-font-mono"]) root.style.removeProperty(property);
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
    }
  }, [theme, palette]);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      const resolved = media.matches ? "dark" : "light";
      if (palette) {
        const definition = getThemeById(palette);
        if (definition) applyTheme(definition, resolved);
      } else {
        document.documentElement.classList.toggle("dark", media.matches);
        document.documentElement.classList.toggle("light", !media.matches);
      }
    };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [theme, palette]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
    palette,
    setPalette: (newPalette: string | null) => {
      if (newPalette && !getThemeById(newPalette)) return;
      if (newPalette) localStorage.setItem(paletteStorageKey, newPalette);
      else localStorage.removeItem(paletteStorageKey);
      setPalette(newPalette);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export { themes };
