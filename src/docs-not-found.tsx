/*
 * Copyright 2026 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { useEffect, useRef, useState } from "react";
import { Button } from "@clidey/ux";

type Motion = "loop" | "once" | "off";
const duration = 5.4;
const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const easeInOutCubic = (value: number) => value < .5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;
// The animated character uses the same curved arms and beacon as the loading mark.
// Its two curved arms, signal paths, stem, rings, and beacon form this character.
const armLeft = "M10 22 Q55 118 100 118";
const armRight = "M190 22 Q145 118 100 118";
const stem = "M100 40 V152";

export function DocsNotFound({ onHome }: { onHome: () => void }) {
  const [motion, setMotion] = useState<Motion>("loop");
  const stage = useRef<HTMLDivElement>(null);
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const wall = useRef<HTMLSpanElement>(null);
  const signals = useRef<SVGPathElement[]>([]);
  const rings = useRef<SVGCircleElement[]>([]);
  const impact = useRef<SVGGElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = 0;
    const draw = (time: number) => {
      if (!stage.current || !outer.current || !inner.current || !wall.current || !impact.current) return;
      const still = motion === "off" || prefersReduced.matches;
      const p = still ? 4 : motion === "once" ? Math.min(time, 4) : time % duration;
      const contact = wall.current.offsetLeft - 140 + 4;
      outer.current.style.left = `${contact}px`;
      let x = -66, y = -30, rot = -68, sx = 1, sy = 1, opacity = 1, impactOpacity = 0, impactScale = 1;
      let ringsOpacity = [1, 1, 1, 1];
      if (p < 1.3) {
        const u = p / 1.3;
        x = -(contact + 160) * (1 - u * u);
        y = 0;
        rot = 7;
        opacity = clamp(p / .25);
        const leadingRing = Math.min(1, .7 + u);
        ringsOpacity = [leadingRing, leadingRing, .4, .4];
      } else if (p < 1.46) {
        const d = p - 1.3;
        x = 0;
        y = 0;
        sx = 1 - .2 * Math.sin(Math.PI * d / .16);
        sy = 2 - sx;
        rot = 7 * (1 - d / .16);
        const midRing = .4 + .6 * clamp(d / .16);
        ringsOpacity = [1, 1, midRing, midRing];
        impactOpacity = clamp(1 - d / .6);
        impactScale = .7 + .6 * d / .6;
      } else if (p < 2.36) {
        const d = p - 1.3;
        const u = clamp((d - .16) / .9);
        const fall = easeInOutCubic(u);
        x = -68 * fall;
        y = -32 * fall - 10 * Math.sin(Math.PI * u) ** 2;
        rot = -72 * fall;
        impactOpacity = clamp(1 - d / .6);
        impactScale = .7 + .6 * Math.min(d / .6, 1);
      } else {
        const e = p - 2.36;
        const settle = (1 - Math.exp(-2.5 * e)) ** 2;
        x = -68 + 2 * settle;
        y = -32 + 2 * settle;
        rot = -72 + 4 * settle;
        if (p >= 4.6) opacity = clamp(1 - (p - 4.6) / .5);
        if (p >= 5.1) opacity = 0;
      }
      outer.current.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      outer.current.style.opacity = String(opacity);
      inner.current.style.transform = `scale(${sx}, ${sy})`;
      impact.current.style.opacity = String(impactOpacity);
      impact.current.style.transform = `translate(204px, 30px) scale(${impactScale})`;
      rings.current.forEach((ring, i) => { if (ring) ring.style.opacity = String(ringsOpacity[i]); });
      // Both signal copies use the loader's traveling half-length stroke until contact.
      signals.current.forEach((path, i) => {
        if (!path) return;
        path.style.strokeDasharray = p < 1.3 ? ".5 1.5" : "1 0";
        path.style.strokeDashoffset = p < 1.3 ? String(-((p / .9 + i * .34) % 2)) : "0";
      });
    };
    const tick = (now: number) => {
      if (!started) started = now;
      draw((now - started) / 1000);
      if (motion === "loop" && !prefersReduced.matches || motion === "once" && !prefersReduced.matches && (now - started) / 1000 < 4) frame = requestAnimationFrame(tick);
    };
    draw(motion === "off" || prefersReduced.matches ? 4 : 0);
    if (motion !== "off" && !prefersReduced.matches) frame = requestAnimationFrame(tick);
    const onReducedChange = () => { cancelAnimationFrame(frame); started = 0; if (prefersReduced.matches) draw(4); else frame = requestAnimationFrame(tick); };
    prefersReduced.addEventListener("change", onReducedChange);
    return () => { cancelAnimationFrame(frame); prefersReduced.removeEventListener("change", onReducedChange); };
  }, [motion]);

  return <section className="docs-404" aria-labelledby="docs-404-title">
    <div className="docs-404-content">
      <span className="docs-eyebrow">PAGE NOT FOUND</span>
      <h1 id="docs-404-title">This page took a wrong turn.</h1>
      <p>The route you followed is missing. Our little navigator found the wall first.</p>
      <div className="docs-404-stage" ref={stage} aria-hidden="true">
        <div className="docs-404-character" ref={outer}>
          <div className="docs-404-character-inner" ref={inner}>
            <svg viewBox="0 0 200 160" fill="none">
              <path className="docs-404-track blue" d={armLeft} /><path className="docs-404-track blue" d={armRight} /><path className="docs-404-track orange" d={stem} />
              <path className="docs-404-signal blue" d={armLeft} pathLength="1" ref={el => { if (el) signals.current[0] = el; }} />
              <path className="docs-404-signal blue" d={armRight} pathLength="1" ref={el => { if (el) signals.current[1] = el; }} />
              <path className="docs-404-signal orange" d={stem} pathLength="1" ref={el => { if (el) signals.current[2] = el; }} />
              {[[10, 22, 8], [190, 22, 8], [46, 83, 5.5], [154, 83, 5.5]].map(([cx, cy, r], i) => <circle key={i} className="docs-404-ring" cx={cx} cy={cy} r={r} strokeWidth={i < 2 ? 4 : 3.5} ref={el => { if (el) rings.current[i] = el; }} />)}
              <circle className="docs-404-head" cx="100" cy="20" r="12" />
              <g className="docs-404-impact" ref={impact}><path d="M-6 -22 L-14 -42 M2 -26 L2 -48 M10 -22 L20 -40" /></g>
            </svg>
          </div>
        </div>
        <span className="docs-404-number" ref={wall}>404</span>
      </div>
      <div className="docs-404-actions"><Button onClick={onHome}>Back to overview →</Button><div className="docs-404-motion" role="group" aria-label="Animation playback">{(["loop", "once", "off"] as const).map(value => <button key={value} aria-pressed={motion === value} className={motion === value ? "active" : ""} onClick={() => setMotion(value)}>{value}</button>)}</div></div>
    </div>
  </section>;
}
