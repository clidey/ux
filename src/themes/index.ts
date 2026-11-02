/*
 * Copyright 2025 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import type React from "react";
import midnightNoirCSS from "./css/midnight-noir.css?raw";
import auroraGlassCSS from "./css/aurora-glass.css?raw";
import emberForgeCSS from "./css/ember-forge.css?raw";
import cyberMatrixCSS from "./css/cyber-matrix.css?raw";
import velvetRoseCSS from "./css/velvet-rose.css?raw";
import arcticSteelCSS from "./css/arctic-steel.css?raw";
import solarGoldCSS from "./css/solar-gold.css?raw";
import brutalistConcreteCSS from "./css/brutalist-concrete.css?raw";
import neonTokyoCSS from "./css/neon-tokyo.css?raw";
import deepOceanCSS from "./css/deep-ocean.css?raw";
import retroAmberCSS from "./css/retro-amber.css?raw";
import paperInkCSS from "./css/paper-ink.css?raw";
import vaporSynthCSS from "./css/vapor-synth.css?raw";
import marsColonyCSS from "./css/mars-colony.css?raw";
import forestMossCSS from "./css/forest-moss.css?raw";
import midnightRaidCSS from "./css/midnight-raid.css?raw";
import candyPopCSS from "./css/candy-pop.css?raw";
import obsidianVaultCSS from "./css/obsidian-vault.css?raw";
import hologramHudCSS from "./css/hologram-hud.css?raw";
import newspaperGothicCSS from "./css/newspaper-gothic.css?raw";
import desertSandstoneCSS from "./css/desert-sandstone.css?raw";
import iceCrystalCSS from "./css/ice-crystal.css?raw";
import tokyoZenCSS from "./css/tokyo-zen.css?raw";
import nordicFrostCSS from "./css/nordic-frost.css?raw";
import mumbaiSpiceCSS from "./css/mumbai-spice.css?raw";
import saharaDuskCSS from "./css/sahara-dusk.css?raw";
import seoulNeonCSS from "./css/seoul-neon.css?raw";
import saoPauloCarnivalCSS from "./css/sao-paulo-carnival.css?raw";
import berlinTechnoCSS from "./css/berlin-techno.css?raw";
import sydneySurfCSS from "./css/sydney-surf.css?raw";

export interface ThemeDefinition {
  id: string;
  name: string;
  description: string;
  inspiration: string[];
  personality: string;
  css: string;
  className: string;
  dataAttr: string;
  motion: {
    duration: string;
    easing: string;
    personality: string;
  };
  typography: {
    style: string;
    heading: string;
    body: string;
    mono: string;
  };
  surface: {
    style: string;
    borderRadius: string;
  };
  previewStyle?: (mode: "dark" | "light") => React.CSSProperties;
}

export const themes: ThemeDefinition[] = [
  {
    id: "paper-ink",
    name: "Paper & Ink",
    description:
      "The Clidey Design default. Paper and Ink surfaces, Signal Blue actions. Follows the viewer’s light or dark setting.",
    inspiration: ["Clidey Design default"],
    personality: "Clear and capable",
    css: paperInkCSS,
    className: "theme-paper-ink",
    dataAttr: "paper-ink",
    motion: { duration: "200ms", easing: "cubic-bezier(0.2, 0, 0, 1)", personality: "calm" },
    typography: {
      style: "brand",
      heading: "Bricolage Grotesque, Hanken Grotesk, sans-serif",
      body: "Hanken Grotesk, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "paper", borderRadius: "8px" },
  },
  {
    id: "midnight-noir",
    name: "Midnight Noir",
    description:
      "True-black surfaces and one electric blue. Built for dense data on dark displays.",
    inspiration: ["Dense data"],
    personality: "Precise and compact",
    css: midnightNoirCSS,
    className: "theme-midnight-noir",
    dataAttr: "midnight-noir",
    motion: { duration: "150ms", easing: "cubic-bezier(0.22, 1, 0.36, 1)", personality: "snappy" },
    typography: {
      style: "geometric",
      heading: "Geist, Inter, system-ui, sans-serif",
      body: "Geist, Inter, system-ui, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "oled", borderRadius: "6px" },
  },
  {
    id: "arctic-steel",
    name: "Arctic Steel",
    description: "Monochrome steel with ink-on-white actions. Quiet enough for any internal tool.",
    inspiration: ["Monochrome internal tools"],
    personality: "Quiet precision",
    css: arcticSteelCSS,
    className: "theme-arctic-steel",
    dataAttr: "arctic-steel",
    motion: { duration: "150ms", easing: "cubic-bezier(0.2, 0, 0, 1)", personality: "snappy" },
    typography: {
      style: "minimalist",
      heading: "IBM Plex Sans, sans-serif",
      body: "IBM Plex Sans, sans-serif",
      mono: "IBM Plex Mono, monospace",
    },
    surface: { style: "ruled", borderRadius: "6px" },
  },
  {
    id: "obsidian-vault",
    name: "Obsidian Vault",
    description: "Near-black with an indigo accent. Calm, finance-grade contrast.",
    inspiration: ["Finance dashboards"],
    personality: "Measured and calm",
    css: obsidianVaultCSS,
    className: "theme-obsidian-vault",
    dataAttr: "obsidian-vault",
    motion: { duration: "180ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)", personality: "measured" },
    typography: {
      style: "clean",
      heading: "Lexend, sans-serif",
      body: "Lexend, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "filled", borderRadius: "8px" },
  },
  {
    id: "nordic-frost",
    name: "Nordic Frost",
    description: "Cool grey-blue neutrals with a muted steel accent.",
    inspiration: ["Nordic utility"],
    personality: "Measured comfort",
    css: nordicFrostCSS,
    className: "theme-nordic-frost",
    dataAttr: "nordic-frost",
    motion: { duration: "180ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)", personality: "measured" },
    typography: {
      style: "humanist",
      heading: "Libre Franklin, sans-serif",
      body: "Libre Franklin, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "raised", borderRadius: "8px" },
  },
  {
    id: "ice-crystal",
    name: "Ice Crystal",
    description: "Pale, airy blues and generous radius. Light mode leads.",
    inspiration: ["Pale blue utility"],
    personality: "Soft and airy",
    css: iceCrystalCSS,
    className: "theme-ice-crystal",
    dataAttr: "ice-crystal",
    motion: { duration: "220ms", easing: "cubic-bezier(0.3, 0, 0, 1)", personality: "soft" },
    typography: {
      style: "geometric",
      heading: "Sora, sans-serif",
      body: "Sora, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "raised", borderRadius: "12px" },
  },
  {
    id: "newspaper-gothic",
    name: "Newspaper Gothic",
    description: "Black and white with serif headlines and ruled tables.",
    inspiration: ["Editorial newspapers"],
    personality: "Crisp editorial",
    css: newspaperGothicCSS,
    className: "theme-newspaper-gothic",
    dataAttr: "newspaper-gothic",
    motion: { duration: "120ms", easing: "linear", personality: "crisp" },
    typography: {
      style: "gothic",
      heading: "Source Serif 4, Georgia, serif",
      body: "Libre Franklin, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "ruled", borderRadius: "0px" },
  },
  {
    id: "tokyo-zen",
    name: "Tokyo Zen",
    description: "Warm off-white, generous space and a single vermilion accent.",
    inspiration: ["Japanese restraint"],
    personality: "Spacious and slow",
    css: tokyoZenCSS,
    className: "theme-tokyo-zen",
    dataAttr: "tokyo-zen",
    motion: { duration: "260ms", easing: "cubic-bezier(0.25, 0.1, 0.25, 1)", personality: "slow" },
    typography: {
      style: "minimalist",
      heading: "Zen Kaku Gothic New, sans-serif",
      body: "Zen Kaku Gothic New, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "ruled", borderRadius: "4px" },
  },
  {
    id: "velvet-rose",
    name: "Velvet Rose",
    description: "A rose accent and serif headings, for client-facing apps.",
    inspiration: ["Client-facing apps"],
    personality: "Soft and composed",
    css: velvetRoseCSS,
    className: "theme-velvet-rose",
    dataAttr: "velvet-rose",
    motion: { duration: "220ms", easing: "cubic-bezier(0.3, 0, 0, 1)", personality: "soft" },
    typography: {
      style: "editorial",
      heading: "Newsreader, Georgia, serif",
      body: "DM Sans, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "raised", borderRadius: "10px" },
  },
  {
    id: "desert-sandstone",
    name: "Desert Sandstone",
    description: "Terracotta on sand. Warm, readable and low glare.",
    inspiration: ["Warm workspaces"],
    personality: "Measured warmth",
    css: desertSandstoneCSS,
    className: "theme-desert-sandstone",
    dataAttr: "desert-sandstone",
    motion: { duration: "200ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)", personality: "measured" },
    typography: {
      style: "humanist",
      heading: "Epilogue, sans-serif",
      body: "Epilogue, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "filled", borderRadius: "10px" },
  },
  {
    id: "cyber-matrix",
    name: "Cyber Matrix",
    description: "Monospace terminal green for operations consoles.",
    inspiration: ["Operations consoles"],
    personality: "Instant and precise",
    css: cyberMatrixCSS,
    className: "theme-cyber-matrix",
    dataAttr: "cyber-matrix",
    motion: { duration: "90ms", easing: "steps(4)", personality: "instant" },
    typography: {
      style: "terminal",
      heading: "JetBrains Mono, monospace",
      body: "JetBrains Mono, monospace",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "outlined", borderRadius: "2px" },
  },
  {
    id: "hologram-hud",
    name: "Hologram HUD",
    description: "A cyan instrument panel with squared corners.",
    inspiration: ["Instrument panels"],
    personality: "Compact and precise",
    css: hologramHudCSS,
    className: "theme-hologram-hud",
    dataAttr: "hologram-hud",
    motion: { duration: "140ms", easing: "cubic-bezier(0.22, 1, 0.36, 1)", personality: "snappy" },
    typography: {
      style: "technical",
      heading: "Chakra Petch, sans-serif",
      body: "IBM Plex Sans, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "outlined", borderRadius: "2px" },
  },
  {
    id: "retro-amber",
    name: "Retro Amber",
    description: "The amber CRT palette in a monospace face.",
    inspiration: ["Amber terminals"],
    personality: "Instant and warm",
    css: retroAmberCSS,
    className: "theme-retro-amber",
    dataAttr: "retro-amber",
    motion: { duration: "100ms", easing: "steps(3)", personality: "instant" },
    typography: {
      style: "terminal",
      heading: "IBM Plex Mono, monospace",
      body: "IBM Plex Mono, monospace",
      mono: "IBM Plex Mono, monospace",
    },
    surface: { style: "outlined", borderRadius: "2px" },
  },
  {
    id: "midnight-raid",
    name: "Midnight Raid",
    description: "Lime on charcoal, for incident and on-call tools.",
    inspiration: ["Incident consoles"],
    personality: "Snappy and focused",
    css: midnightRaidCSS,
    className: "theme-midnight-raid",
    dataAttr: "midnight-raid",
    motion: { duration: "140ms", easing: "cubic-bezier(0.22, 1, 0.36, 1)", personality: "snappy" },
    typography: {
      style: "compact",
      heading: "Rubik, sans-serif",
      body: "Rubik, sans-serif",
      mono: "IBM Plex Mono, monospace",
    },
    surface: { style: "bordered", borderRadius: "4px" },
  },
  {
    id: "berlin-techno",
    name: "Berlin Techno",
    description: "Signal yellow on black, uppercase headings and no radius.",
    inspiration: ["Industrial design"],
    personality: "Hard cut",
    css: berlinTechnoCSS,
    className: "theme-berlin-techno",
    dataAttr: "berlin-techno",
    motion: { duration: "80ms", easing: "linear", personality: "hard cut" },
    typography: {
      style: "condensed",
      heading: "Archivo Narrow, sans-serif",
      body: "Archivo, sans-serif",
      mono: "Space Mono, monospace",
    },
    surface: { style: "heavy frames", borderRadius: "0px" },
  },
  {
    id: "brutalist-concrete",
    name: "Brutalist Concrete",
    description: "Raw greys, heavy 2px rules and square corners.",
    inspiration: ["Brutalist architecture"],
    personality: "Hard cut",
    css: brutalistConcreteCSS,
    className: "theme-brutalist-concrete",
    dataAttr: "brutalist-concrete",
    motion: { duration: "0ms", easing: "linear", personality: "hard cut" },
    typography: {
      style: "brutalist",
      heading: "Archivo, sans-serif",
      body: "Space Mono, monospace",
      mono: "Space Mono, monospace",
    },
    surface: { style: "heavy frames", borderRadius: "0px" },
  },
  {
    id: "neon-tokyo",
    name: "Neon Tokyo",
    description: "A magenta accent on violet-black with a display headline face.",
    inspiration: ["Vivid applications"],
    personality: "Bouncy",
    css: neonTokyoCSS,
    className: "theme-neon-tokyo",
    dataAttr: "neon-tokyo",
    motion: {
      duration: "240ms",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      personality: "bouncy",
    },
    typography: {
      style: "display",
      heading: "Syne, sans-serif",
      body: "DM Sans, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "raised", borderRadius: "10px" },
  },
  {
    id: "vapor-synth",
    name: "Vapor Synth",
    description: "A lavender accent with geometric type.",
    inspiration: ["Geometric applications"],
    personality: "Smooth",
    css: vaporSynthCSS,
    className: "theme-vapor-synth",
    dataAttr: "vapor-synth",
    motion: { duration: "220ms", easing: "cubic-bezier(0.3, 0, 0, 1)", personality: "smooth" },
    typography: {
      style: "geometric",
      heading: "Space Grotesk, sans-serif",
      body: "Space Grotesk, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "bordered", borderRadius: "10px" },
  },
  {
    id: "candy-pop",
    name: "Candy Pop",
    description: "Soft periwinkle and round corners for friendly tools.",
    inspiration: ["Friendly tools"],
    personality: "Bouncy",
    css: candyPopCSS,
    className: "theme-candy-pop",
    dataAttr: "candy-pop",
    motion: {
      duration: "260ms",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      personality: "bouncy",
    },
    typography: {
      style: "rounded",
      heading: "Nunito, sans-serif",
      body: "Nunito, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "raised", borderRadius: "18px" },
  },
  {
    id: "seoul-neon",
    name: "Seoul Neon",
    description: "Electric cyan on indigo-black.",
    inspiration: ["High-contrast applications"],
    personality: "Snappy",
    css: seoulNeonCSS,
    className: "theme-seoul-neon",
    dataAttr: "seoul-neon",
    motion: { duration: "160ms", easing: "cubic-bezier(0.22, 1, 0.36, 1)", personality: "snappy" },
    typography: {
      style: "display",
      heading: "Red Hat Display, sans-serif",
      body: "Red Hat Display, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "bordered", borderRadius: "10px" },
  },
  {
    id: "sao-paulo-carnival",
    name: "São Paulo Carnival",
    description: "Festive yellow and green with a wide display face.",
    inspiration: ["Festive operations"],
    personality: "Bouncy",
    css: saoPauloCarnivalCSS,
    className: "theme-sao-paulo-carnival",
    dataAttr: "sao-paulo-carnival",
    motion: {
      duration: "260ms",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      personality: "bouncy",
    },
    typography: {
      style: "display",
      heading: "Unbounded, sans-serif",
      body: "Nunito Sans, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "raised", borderRadius: "14px" },
  },
  {
    id: "aurora-glass",
    name: "Aurora Glass",
    description: "A violet accent on tinted surfaces. Surfaces stay solid so text stays legible.",
    inspiration: ["Solid tinted surfaces"],
    personality: "Smooth",
    css: auroraGlassCSS,
    className: "theme-aurora-glass",
    dataAttr: "aurora-glass",
    motion: { duration: "240ms", easing: "cubic-bezier(0.3, 0, 0, 1)", personality: "smooth" },
    typography: {
      style: "geometric",
      heading: "Plus Jakarta Sans, sans-serif",
      body: "Plus Jakarta Sans, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "raised", borderRadius: "14px" },
  },
  {
    id: "deep-ocean",
    name: "Deep Ocean",
    description: "Navy depths and a clear sky-blue accent.",
    inspiration: ["Navy operations"],
    personality: "Smooth",
    css: deepOceanCSS,
    className: "theme-deep-ocean",
    dataAttr: "deep-ocean",
    motion: { duration: "220ms", easing: "cubic-bezier(0.3, 0, 0, 1)", personality: "smooth" },
    typography: {
      style: "geometric",
      heading: "Manrope, sans-serif",
      body: "Manrope, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "filled", borderRadius: "12px" },
  },
  {
    id: "sydney-surf",
    name: "Sydney Surf",
    description: "Turquoise and sand, rounded and open.",
    inspiration: ["Coastal applications"],
    personality: "Smooth",
    css: sydneySurfCSS,
    className: "theme-sydney-surf",
    dataAttr: "sydney-surf",
    motion: { duration: "220ms", easing: "cubic-bezier(0.3, 0, 0, 1)", personality: "smooth" },
    typography: {
      style: "humanist",
      heading: "Karla, sans-serif",
      body: "Karla, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "raised", borderRadius: "14px" },
  },
  {
    id: "forest-moss",
    name: "Forest Moss",
    description: "Moss greens and warm neutrals.",
    inspiration: ["Natural applications"],
    personality: "Measured",
    css: forestMossCSS,
    className: "theme-forest-moss",
    dataAttr: "forest-moss",
    motion: { duration: "200ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)", personality: "measured" },
    typography: {
      style: "humanist",
      heading: "Figtree, sans-serif",
      body: "Figtree, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "bordered", borderRadius: "12px" },
  },
  {
    id: "ember-forge",
    name: "Ember Forge",
    description: "Forged orange on charcoal brown.",
    inspiration: ["Warm operations"],
    personality: "Snappy",
    css: emberForgeCSS,
    className: "theme-ember-forge",
    dataAttr: "ember-forge",
    motion: { duration: "160ms", easing: "cubic-bezier(0.22, 1, 0.36, 1)", personality: "snappy" },
    typography: {
      style: "geometric",
      heading: "Outfit, sans-serif",
      body: "Outfit, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "filled", borderRadius: "8px" },
  },
  {
    id: "mars-colony",
    name: "Mars Colony",
    description: "Rust red with a sturdy grotesque.",
    inspiration: ["Operations consoles"],
    personality: "Measured",
    css: marsColonyCSS,
    className: "theme-mars-colony",
    dataAttr: "mars-colony",
    motion: { duration: "180ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)", personality: "measured" },
    typography: {
      style: "humanist",
      heading: "Chivo, sans-serif",
      body: "Chivo, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "bordered", borderRadius: "4px" },
  },
  {
    id: "solar-gold",
    name: "Solar Gold",
    description: "A gold accent on warm neutrals.",
    inspiration: ["Warm operations"],
    personality: "Measured",
    css: solarGoldCSS,
    className: "theme-solar-gold",
    dataAttr: "solar-gold",
    motion: { duration: "200ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)", personality: "measured" },
    typography: {
      style: "humanist",
      heading: "Work Sans, sans-serif",
      body: "Work Sans, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "filled", borderRadius: "8px" },
  },
  {
    id: "mumbai-spice",
    name: "Mumbai Spice",
    description: "A saffron accent on plum-tinted neutrals.",
    inspiration: ["Warm operations"],
    personality: "Smooth",
    css: mumbaiSpiceCSS,
    className: "theme-mumbai-spice",
    dataAttr: "mumbai-spice",
    motion: { duration: "220ms", easing: "cubic-bezier(0.3, 0, 0, 1)", personality: "smooth" },
    typography: {
      style: "humanist",
      heading: "Mukta, sans-serif",
      body: "Mukta, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "raised", borderRadius: "10px" },
  },
  {
    id: "sahara-dusk",
    name: "Sahara Dusk",
    description: "Burnt orange with a serif display face.",
    inspiration: ["Editorial operations"],
    personality: "Slow",
    css: saharaDuskCSS,
    className: "theme-sahara-dusk",
    dataAttr: "sahara-dusk",
    motion: { duration: "260ms", easing: "cubic-bezier(0.25, 0.1, 0.25, 1)", personality: "slow" },
    typography: {
      style: "editorial",
      heading: "Instrument Serif, Georgia, serif",
      body: "Instrument Sans, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
    surface: { style: "ruled", borderRadius: "12px" },
  },
];

export function getThemeById(id: string): ThemeDefinition | undefined {
  return themes.find((t) => t.id === id);
}

export function injectTheme(theme: ThemeDefinition): HTMLStyleElement {
  const existing = document.getElementById(`theme-${theme.id}`) as HTMLStyleElement;
  if (existing) return existing;

  const style = document.createElement("style");
  style.id = `theme-${theme.id}`;
  style.textContent = theme.css;
  document.head.appendChild(style);
  return style;
}

export function applyTheme(theme: ThemeDefinition, mode: "dark" | "light") {
  injectTheme(theme);
  const root = document.documentElement;
  for (const { className } of themes) root.classList.remove(className);
  root.classList.remove("dark", "light");
  root.classList.add(theme.className, mode);
  root.setAttribute("data-theme", theme.dataAttr);

  root.style.setProperty("--theme-transition-duration", theme.motion.duration);
  root.style.setProperty("--theme-transition-easing", theme.motion.easing);
  root.style.setProperty("--theme-font-heading", theme.typography.heading);
  root.style.setProperty("--theme-font-body", theme.typography.body);
  root.style.setProperty("--theme-font-mono", theme.typography.mono);
}
